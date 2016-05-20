/**
 * Created by justinmeyer on 5/12/16.
 */
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);


// Background image
var backgroundReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function () {
    backgroundReady = true;
};
//need to make a 600 by 600 image here
backgroundImage.src = "images/space1.jpg";

//rocket
var rocketReady = false;
var rocketImage = new Image();
rocketImage.onload = function (){
    rocketReady= true;
};
rocketImage.src="images/rocket.png";

//robot
var robotReady = false;
var robotImage = new Image();
robotImage.onload =function(){
    robotReady=true;
};
robotImage.src="images/robot.png";

//rock
var rockReady = false;
var rockImage = new Image();
rockImage.onload=function(){
    rockReady=true;
};
rockImage.src="images/rock.png";

//rock1
var rock1Ready = false;
var rock1Image = new Image();
rock1Image.onload=function(){
    rock1Ready=true;
};
rock1Image.src="images/rock.png";
//rock2
var rock2Ready = false;
var rockI2mage = new Image();
rock2Image.onload=function(){
    rock2Ready=true;
};
rock2Image.src="images/rock.png";
//rock3
var rock3Ready = false;
var rock3Image = new Image();
rock3Image.onload=function(){
    rock3Ready=true;
};
rock3Image.src="images/rock.png";
//rock4
var rock4Ready = false;
var rock4Image = new Image();
rock4Image.onload=function(){
    rock4Ready=true;
};
rock4Image.src="images/rock.png";
//rock5
var rock5Ready = false;
var rock5Image = new Image();
rock5Image.onload=function(){
    rock5Ready=true;
};
rock5Image.src="images/rock.png";
//rock6
var rock6Ready = false;
var rock6Image = new Image();
rock6Image.onload=function(){
    rock6Ready=true;
};
rock6Image.src="images/rock.png";

// Game objects
var rocket = {
    speed: 256 // movement in pixels per second
};
var robot = {};

var rock= {};
var rock1= {};
var rock2= {};
var rock3= {};
var rock4= {};
var rock5= {};
var rock6= {};


var robotDestroy = 0;

var keysPressed = {};

addEventListener("keydown", function (e) {
    keysPressed[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);


var reset = function () {
    rocket.x = canvas.width / 2;
    rocket.y = canvas.height / 2;


    robot.x = 32 + (Math.random() * (canvas.width - 64));
    robot.y = 32 + (Math.random() * (canvas.height - 64));
//need to put in multiple instances
    rock.x = 32 + (Math.random() * (canvas.width - 64));
    rock.y = 32 + (Math.random() * (canvas.height - 64));

    rock1.x = 32 + (Math.random() * (canvas.width - 64));
    rock1.y = 32 + (Math.random() * (canvas.height - 64));

    rock2.x = 32 + (Math.random() * (canvas.width - 64));
    rock2.y = 32 + (Math.random() * (canvas.height - 64));

    rock3.x = 32 + (Math.random() * (canvas.width - 64));
    rock3.y = 32 + (Math.random() * (canvas.height - 64));

    rock4.x = 32 + (Math.random() * (canvas.width - 64));
    rock4.y = 32 + (Math.random() * (canvas.height - 64));

    rock5.x = 32 + (Math.random() * (canvas.width - 64));
    rock5.y = 32 + (Math.random() * (canvas.height - 64));

    rock6.x = 32 + (Math.random() * (canvas.width - 64));
    rock6.y = 32 + (Math.random() * (canvas.height - 64));
};




var update = function (modified) {
    //want to make rocket always moving here//
    //down arrow pressed
    if (38 in keysPressed) {
        rocket.y -=rocket.speed * modified;
    }
    //up arrow pressed
    if (40 in keysPressed) {
        rocket.y += rocket.speed * modified;
    }
    //left arrow pressed
    if (37 in keysPressed){
        rocket.x -=rocket.speed*modified;

    }
    //right arrow pressed
    if (39 in keysPressed){
        rocket.x +=rocket.speed * modified;
    }
    if(rocket.x <=(robot.x + 32)&&robot.x <= (rocket.x +32)&&rocket.y<=(robot.y +32)&&robot.y <=(rocket.y +32)){
        ++robotDestroy;
        reset();
    }
};
var draw= function (){
    //make space background
    if (backgroundReady){
        ctx.drawImage(backgroundImage, 0, 0);
    }
    if (rocketReady){
        ctx.drawImage(rocketImage, rocket.x, rocket.y);
    }
    if(robotReady){
        ctx.drawImage(robotImage, robot.x, robot.y);
    }

    ctx.fillStyle= "rgba(247,193,0)";
    ctx.font= "18px  Sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline= "top";
    ctx.fillText("Robots destroyed" + robotDestroy, 32, 32);
};

var gameLoop = function(){
    var now =Date.now();
    var later= now - then;

    update(later/1000);
    draw();

    then = now;

    requestAnimationFrame(gameLoop);
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
gameLoop();
