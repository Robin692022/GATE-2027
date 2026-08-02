/* ==========================================================
   FORGE
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeGreeting();

    initializeCountdown();

    initializeRoadmap();

    initializeNavigation();

    animateProgressBars();

});

/* ==========================================================
   DYNAMIC GREETING
   ========================================================== */

function initializeGreeting(){

    const greeting = document.getElementById("greeting");

    const hour = new Date().getHours();

    let text = "Good Evening.";

    if(hour >= 5 && hour < 12){

        text = "Good Morning.";

    }

    else if(hour >=12 && hour <17){

        text = "Good Afternoon.";

    }

    else{

        text = "Good Evening.";

    }

    greeting.textContent = text;

}

/* ==========================================================
   GATE COUNTDOWN
   ========================================================== */

function initializeCountdown(){

    const countdown =
        document.getElementById("countdown");

    updateCountdown();

    setInterval(updateCountdown,60000);

    function updateCountdown(){

        const gateDate =
            new Date("2027-02-06T09:30:00");

        const now = new Date();

        const distance =
            gateDate-now;

        if(distance<0){

            countdown.innerHTML="Exam Day";

            return;

        }

        const days =
            Math.floor(distance/(1000*60*60*24));

        const hours =
            Math.floor(

                (distance%(1000*60*60*24))

                /(1000*60*60)

            );

        const minutes =
            Math.floor(

                (distance%(1000*60*60))

                /(1000*60)

            );

        countdown.innerHTML=

            `
            ${days}
            <span>Days</span>

            ${hours}
            <span>Hr</span>

            ${minutes}
            <span>Min</span>
            `;

    }

}

/* ==========================================================
   ROADMAP
   ========================================================== */

function initializeRoadmap(){

    const phases =
        document.querySelectorAll(".phase");

    phases.forEach((phase)=>{

        const button =
            phase.querySelector(".expand");

        const body =
            phase.querySelector(".phase-body");

        if(body){

            body.style.maxHeight=
                body.scrollHeight+"px";

        }

        button.addEventListener("click",(e)=>{

            e.stopPropagation();

            togglePhase(phase);

        });

        phase
        .querySelector(".phase-header")
        .addEventListener("click",()=>{

            togglePhase(phase);

        });

    });

}

function togglePhase(activePhase){

    document.querySelectorAll(".phase")
    .forEach((phase)=>{

        const body=
            phase.querySelector(".phase-body");

        const button=
            phase.querySelector(".expand");

        if(!body) return;

        if(phase===activePhase){

            if(body.classList.contains("closed")){

                body.classList.remove("closed");

                body.style.maxHeight=
                    body.scrollHeight+"px";

                button.style.transform=
                    "rotate(180deg)";

            }

            else{

                body.classList.add("closed");

                body.style.maxHeight=0;

                button.style.transform=
                    "rotate(0deg)";

            }

        }

        else{

            body.classList.add("closed");

            body.style.maxHeight=0;

            button.style.transform=
                "rotate(0deg)";

        }

    });

}

/* ==========================================================
   NAVIGATION
   ========================================================== */

function initializeNavigation(){

    const navItems=
        document.querySelectorAll(".nav-item");

    navItems.forEach(item=>{

        item.addEventListener("click",()=>{

            navItems.forEach(btn=>

                btn.classList.remove("active")

            );

            item.classList.add("active");

        });

    });

}

/* ==========================================================
   PROGRESS BAR ANIMATION
   ========================================================== */

function animateProgressBars(){

    const bars =
        document.querySelectorAll(".bar");

    bars.forEach(bar=>{

        const finalWidth=

            bar.style.width;

        bar.style.width="0";

        setTimeout(()=>{

            bar.style.width=
                finalWidth;

        },300);

    });

}

/* ==========================================================
   CARD HOVER TILT
   ========================================================== */

const cards =
    document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect=
            card.getBoundingClientRect();

        const x=
            e.clientX-rect.left;

        const y=
            e.clientY-rect.top;

        const rotateX=
            ((y/rect.height)-0.5)*8;

        const rotateY=
            ((x/rect.width)-0.5)*-8;

        card.style.transform=

        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-6px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform=
        "perspective(900px)";

    });

});

/* ==========================================================
   RIPPLE BUTTON EFFECT
   ========================================================== */

document
.querySelectorAll("button")
.forEach(button=>{

button.addEventListener("click",function(e){

const ripple=
document.createElement("span");

const rect=
this.getBoundingClientRect();

const size=
Math.max(rect.width,rect.height);

ripple.style.width=size+"px";
ripple.style.height=size+"px";

ripple.style.left=
e.clientX-rect.left-size/2+"px";

ripple.style.top=
e.clientY-rect.top-size/2+"px";

ripple.className="ripple";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

/* ==========================================================
   LOCAL STORAGE FOUNDATION
   ========================================================== */

const ForgeStorage={

save(key,data){

localStorage.setItem(

key,

JSON.stringify(data)

);

},

load(key){

const data=
localStorage.getItem(key);

if(data){

return JSON.parse(data);

}

return null;

},

remove(key){

localStorage.removeItem(key);

}

};

window.ForgeStorage=ForgeStorage;
