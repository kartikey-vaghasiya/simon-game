// >>>>>>>>>>>>>>> Initial Variable declaration >>>>>>>>>>>>>>>>>
let level = 0;
let color = ["red", "blue", "green", "yellow"];
let gameSeq = [];
let userSeq = [];
let started = false;

// >>>>>>>>>>>>>>>>>>>>>>>>> Logic part >>>>>>>>>>>>>>>>>>>>>>>>>
// Event Listner 
document.addEventListener("keypress", function () {
    if (!started) {
        document.querySelector(".heading").textContent = "Simon Game";
        let timeout = setTimeout(function () {
            nextSeq();
        }, 1000);
    }
    started = true;
});

for (let i = 0; i < 4; i++) {
    document.querySelectorAll("div")[i].addEventListener("click", function () {

        // pushing color which is clicked
        let boxClicked = this.getAttribute("class"); // this is of string class 
        userSeq.push(boxClicked);

        // Sound and animation
        let boxObj = this;
        clickAnimation(boxObj);
        playSound();

        // CHECK ANSWER 
        checkAns(userSeq.length - 1);

    });
}

// >>>>>>>>>>>>>>> Functions >>>>>>>>>>>>>>>>>
// checking answers
function checkAns(len) {
    if (userSeq[len] === gameSeq[len]) {
        if (userSeq.length === gameSeq.length) {
            let timeout = setTimeout(function () {
                document.querySelector(".score").textContent = level;
                nextSeq();
            }, 1000);
        }
    } else {
        playSound("loose");
        document.querySelector(".score").textContent = 0;
        document.querySelector(".heading").textContent = " YOU LOSE!! PRESS ANYKEY TO START ";
        start();
    }
}

// next seq
function nextSeq() {
  
    level++;
    userSeq = [];

    let ranNum = Math.floor(Math.random() * 4); // Range [ 0-3 ]
    let ranColor = color[ranNum];

    gameSeq.push(ranColor);

    let timeout = setTimeout(function () {
        let obj = document.querySelector("." + ranColor);
        playSound();
        clickAnimation(obj);
    }, 1000);

}

// Start Over 

function start() {

    
    let timeout = setTimeout( function(){
    } , 5000);

    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}


// Sound and Animation 

function playSound(arg) {
    if (arg == "loose") {
        let au = new Audio("sounds/loose.wav");
        au.play();
    } else {
        let au = new Audio("sounds/clicked.wav");
        au.play();
    }
}

function clickAnimation(obj) {
    obj.classList.add("boxSelected");

    let timeout = setTimeout(function () {
        obj.classList.remove("boxSelected");
    }, 100);
}