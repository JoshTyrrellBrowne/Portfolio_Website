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

// declare variables
const FPS = 30;
var textSize = 100;
var bodyObj = document.getElementById('body');
var textObj;// = document.getElementById('animatedText-CSS');
var textOjID_css = 'animatedText-CSS'
var textOjID_html = 'animatedText-HTML'


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


setVelocity(css_object);
setVelocity(html_object);
setVelocity(js_object);

// set up interval (game loop)
setInterval(update.bind(null, css_object), 1000 / FPS);
setInterval(update.bind(null, html_object), 1000 / FPS);
setInterval(update.bind(null, js_object), 1000 / FPS);

// starting position
xCSS = bodyObj.clientWidth / 2;
yCSS = 100; //bodyObj.clientHeight / 2;

xHTML = bodyObj.clientWidth / 2;
yHTML = 100; //bodyObj.clientHeight / 2;

// update function
function update(textObj) {
    //bodyObj = document.getElementById('body');
    //textObj = document.getElementById(textObjID);
    var elementRect = textObj.webElement.getBoundingClientRect();

    // move position (first we need to get its current pos)
    x = elementRect.left;
    y = elementRect.top;

    // then we move it
    x += textObj.xVel;
    y += textObj.yVel;

    // bounce off screen edge
    if (x < 0 && textObj.xVel < 0) {
        textObj.xVel = -textObj.xVel;
        x += textObj.xVel;
    }
    //if (x > bodyObj.clientWidth && textObj.xVel > 0) {
    //    textObj.xVel = -textObj.xVel;
    //    x += textObj.xVel;
    //}
    if ((x + elementRect.width) > window.innerWidth && textObj.xVel > 0) {
        textObj.xVel = -textObj.xVel;
        x += textObj.xVel;
    }
    if (y < 0 && textObj.yVel < 0) {
        textObj.yVel = -textObj.yVel;
        y += textObj.yVel;
    }
    //if (y > bodyObj.clientHeight && textObj.yVel > 0) {
    //    textObj.yVel = -textObj.yVel;
    //    y += textObj.yVel;
    //}
    if ((y + elementRect.height) > window.innerHeight && textObj.yVel > 0) {
        textObj.yVel = -textObj.yVel;
        y += textObj.yVel;
    }
    textObj.webElement.style.left = x.toString() + "px";
    textObj.webElement.style.top = y.toString() + "px";
}