const countdownWidget=document.querySelector("#countdown"),retreatDate=new Date("September 24, 2021 00:00:00").getTime(),timer=()=>{const e=(new Date).getTime();let t=retreatDate-e;t<0&&countdownWidget.classList.add("is-hidden");let o=Math.floor(t/864e5),n=Math.floor(t%864e5/36e5),r=Math.floor(t%36e5/6e4),c=Math.floor(t%6e4/1e3);o<=9&&(o=`0${o}`),n<=9&&(n=`0${n}`),r<=9&&(r=`0${r}`),c<=9&&(c=`0${c}`),document.querySelector("#days").textContent=o,document.querySelector("#hours").textContent=n,document.querySelector("#minutes").textContent=r,document.querySelector("#seconds").textContent=c};timer(),setInterval(timer,1e3);const ribbon=document.querySelector("#ribbon"),close=document.querySelector("#close");close.addEventListener("click",(()=>{ribbon.classList.add("is-hidden")}));
//# sourceMappingURL=index.js.map