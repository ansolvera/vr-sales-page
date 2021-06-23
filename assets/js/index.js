// ********************
// COUNTDOWN WIDGET
// ********************

const countdownWidget = document.querySelector('#countdown');
const retreatDate = new Date("September 24, 2021 00:00:00").getTime();

const timer = () => {
    const now = new Date().getTime();
    let diff = retreatDate - now;
    if(diff < 0) {
        countdownWidget.classList.add('is-hidden');
    }

let days = Math.floor(diff / (1000*60*60*24));
let hours = Math.floor(diff % (1000*60*60*24) / (1000*60*60));
let minutes = Math.floor(diff % (1000*60*60) / (1000*60));
let seconds = Math.floor(diff % (1000*60) / 1000);

days <= 9 ? days = `0${days}` : days;
hours <= 9 ? hours = `0${hours}` : hours;
minutes <= 9 ? minutes = `0${minutes}` : minutes;
seconds <= 9 ? seconds = `0${seconds}` : seconds;

document.querySelector('#days').textContent = days;
document.querySelector('#hours').textContent = hours;
document.querySelector('#minutes').textContent = minutes;
document.querySelector('#seconds').textContent = seconds;

}

timer();
setInterval(timer, 1000);

// ********************
// CAROUSEL
// ********************

let emblaNode = document.querySelector('.embla');
let viewportNode = document.querySelector('.embla__viewport');
let options = { loop: true };
let embla = EmblaCarousel(viewportNode, options);

let prevButtonNode = document.querySelector('.embla__prev');
let nextButtonNode = document.querySelector('.embla__next');

prevButtonNode.addEventListener('click', embla.scrollPrev, false);
nextButtonNode.addEventListener('click', embla.scrollNext, false);

embla.slideNodes().forEach((slideNode, index) => {
    slideNode.addEventListener('click', () => onSlideclick(index), false)
});

// ********************
// VIDEO RIBBON
// ********************

let ribbon = document.querySelector('#ribbon');
let video = document.querySelector('#video');

ribbon.addEventListener('click', () => {
    let player = new Vimeo.Player(video);
    player.setMuted(false);
    ribbon.classList.add("is-hidden");
})