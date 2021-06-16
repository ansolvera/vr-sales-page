const { gulp, src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const markdown = require('gulp-markdown');
const fileinclude = require('gulp-file-include');

// PROCESS MARKDOWN
function mdTask() {
    return src('assets/md/*.md')
        .pipe(markdown())
        .pipe(dest('dist/includes'));
}

// INCLUDE HTML INCLUDES
function fileInclude() {
    return src(['dist/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist'));
}

// COMPILE, PREFIX + MINIFY CSS, OUTPUT TO DIST
function scssTask() {
    let plugins = [
        cssnano,
        autoprefixer({ cascade: false })
    ];
    return src('assets/scss/main.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// MINIFY JS, OUTPUT TO DIST
function jsTask() {
    return src('assets/js/index.js', { sourcemaps: true })
        .pipe(terser())
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// INITIALIZE LOCAL SERVER
function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: 'dist'
        }
    });
    cb();
}

// RELOAD BROWSERSYNC SERVER
function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

// DEFAULT GULP TASK
exports.default = series(
    mdTask,
    fileInclude,
    scssTask,
    jsTask,
    browsersyncServe,
    watchTask
    );

// WATCH TASK
function watchTask() {
    watch('dist/.*html', browsersyncReload);
    watch(['assets/**/*.md', 'assets/**/*.scss', 'assets/**/*.js'], series(mdTask, fileInclude, scssTask, jsTask, browsersyncReload));
}