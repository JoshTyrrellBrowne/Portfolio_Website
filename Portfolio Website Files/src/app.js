const hamburgerButton = document.getElementById('hamburger')
const navList = document.getElementById('nav-list')

function toggleButton() {
    navList.classList.toggle('show')
}

hamburgerButton.addEventListener('click', toggleButton)

// function to set randomised velocities for the animated text objects
function setVelocity(object) {
    // random starting speed (between 25 and 100 pps)
    object.xVel = Math.floor(Math.random() * 76 + 25) / FPS;
    object.yVel = Math.floor(Math.random() * 76 + 25) / FPS;

    // random direction
    if (Math.floor(Math.random() * 2) == 0) {
        object.xVel = -object.xVel;
    }
    if (Math.floor(Math.random() * 2) == 0) {
        object.yVel = -object.yVel;
    }
}

// initialise the passed objects position to a position off screen
function initPosition(object) {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
    object.webElement.style.left = x.toString() + "px";
    object.webElement.style.top = y.toString() + "px";
}

// declare variables
const FPS = 30;
var textSize = 100;
var bodyObjWebEl = document.getElementById('body');
var textObj;

var css_object = {
    ID: 'animatedText-CSS',
    webElement: document.getElementById('animatedText-CSS'),
    xVel: 0,
    yVel: 0,
}

var html_object = {
    ID: 'animatedText-HTML',
    webElement: document.getElementById('animatedText-HTML'),
    xVel: 0,
    yVel: 0,
}

var js_object = {
    ID: 'animatedText-JS',
    webElement: document.getElementById('animatedText-JS'),
    xVel: 0,
    yVel: 0,
}

initPosition(css_object);
initPosition(html_object);
initPosition(js_object);

setVelocity(css_object);
setVelocity(html_object);
setVelocity(js_object);

// set up interval (game loop)
setInterval(update.bind(null, css_object), 1000 / FPS);
setInterval(update.bind(null, html_object), 1000 / FPS);
setInterval(update.bind(null, js_object), 1000 / FPS);

// starting position
xCSS = bodyObjWebEl.clientWidth / 2;
yCSS = 100; //bodyObjWebEl.clientHeight / 2;

xHTML = bodyObjWebEl.clientWidth / 2;
yHTML = 100; //bodyObjWebEl.clientHeight / 2;

// update function
function update(textObj) {
    bodyObjWebEl = document.getElementById('body');
    //textObj = document.getElementById(textObjID);
    var elementRect = textObj.webElement.getBoundingClientRect();

    // move position (first we need to get its current pos)
    x = elementRect.left;
    y = elementRect.top;

    // then we move it
    x += textObj.xVel;
    y += textObj.yVel;

    // bounce off screen edge
    // p.s + & - int's here are just my tweaks for better looks
    if (x < 0 && textObj.xVel < 0) {
        textObj.xVel = -textObj.xVel;
        x += textObj.xVel;
    }
    if ((x + elementRect.width + 10) > window.innerWidth && textObj.xVel > 0) {
        textObj.xVel = -textObj.xVel;
        x += textObj.xVel;
    }
    if (y < -10 && textObj.yVel < 0) {
        textObj.yVel = -textObj.yVel;
        y += textObj.yVel;
    }
    if ((y + elementRect.height - 12) > window.innerHeight && textObj.yVel > 0) {
        textObj.yVel = -textObj.yVel;
        y += textObj.yVel;
    }
    textObj.webElement.style.left = x.toString() + "px";
    textObj.webElement.style.top = y.toString() + "px";
}