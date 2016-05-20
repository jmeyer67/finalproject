/**
 * Created by justinmeyer on 2/17/16.
 */
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();



// namespace for game
var SMASH = {

    // set up some initial screen values
    WIDTH: 320,
    HEIGHT:  480,

    scale:  1,
    offset: {top: 0, left: 0},

    //stores touches, particles, bugs
    entities: [],
    //time spawn of skull
    nextEye: 100,
    //tracking player
    score: {
        taps: 0,
        hit: 0,
        escaped: 0,
        accuracy: 0
    },

    RATIO:  null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,
    ua:  null,
    android: null,
    ios:  null,

    init: function() {

        // the proportion of width to height that will change with screen resize
        SMASH.RATIO = SMASH.WIDTH / SMASH.HEIGHT;
        SMASH.currentWidth = SMASH.WIDTH;
        SMASH.currentHeight = SMASH.HEIGHT;
        SMASH.canvas = document.getElementsByTagName('canvas')[0];
        SMASH.canvas.width = SMASH.WIDTH;
        SMASH.canvas.height = SMASH.HEIGHT;

        // interact with the canvas api
        SMASH.ctx = SMASH.canvas.getContext('2d');
        // check for IOS and android so that we can hide the address bar in
// our resize function
        SMASH.ua = navigator.userAgent.toLowerCase();
        SMASH.android = SMASH.ua.indexOf('android') > -1 ? true : false;
        SMASH.ios = ( SMASH.ua.indexOf('iphone') > -1 || SMASH.ua.indexOf('ipad') > -1  ) ? true : false;

        // look for clicks
        window.addEventListener('click', function(e) {
            e.preventDefault();
            SMASH.Input.set(e);
        }, false);



        // look for touches
        window.addEventListener('touchstart', function(e) {
            e.preventDefault();
            SMASH.Input.set(e.touches[0]);
        }, false);
        window.addEventListener('touchmove', function(e) {
            // but prevent default screen scroll or zoom
            e.preventDefault();
        }, false);
        window.addEventListener('touchend', function(e) {
            e.preventDefault();
        }, false);


        // resize
        SMASH.resize();
        SMASH.loop();
    },

    resize: function() {

        SMASH.currentHeight = window.innerHeight;
        // resize the width in proportion to height
        SMASH.currentWidth = SMASH.currentHeight * SMASH.RATIO;
        // the address bar, thus hiding it.
        if (SMASH.android || SMASH.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }
        // set the new canvas style width and height
        SMASH.canvas.style.width = SMASH.currentWidth + 'px';
        SMASH.canvas.style.height = SMASH.currentHeight + 'px';
        // the amount by which the css resized canvas
        // is different to the actual (480x320) size.
        SMASH.scale = SMASH.currentWidth / SMASH.WIDTH;
        // position of canvas
        SMASH.offset.top = SMASH.canvas.offsetTop;
        SMASH.offset.left = SMASH.canvas.offsetLeft;
        //some browsers don't fire if there is not
        // a short delay
        window.setTimeout(function() {
            window.scrollTo(0,1);
        }, 1);
    },

    // and checked for collisions etc
    update: function() {
        var i,
            checkCollision = false; // we only need to check for a collision
        // if the user tapped on this game tick

        // decrease our nextEye counter
        SMASH.nextEye -= 1;
        // if the counter is less than zero
        if (SMASH.nextEye < 0) {
            // put a new instance of Skull into our entities array
            SMASH.entities.push(new SMASH.Eye());
            // reset the counter with a random value
            SMASH.nextEye = ( Math.random() * 100 ) + 100;
        }

        // spawn a new instance of Touch
        // if the user has tapped the screen
        if (SMASH.Input.tapped) {
            // keep track of taps; needed to
            // calculate accuracy
            SMASH.score.taps += 1;
            // add a new touch
            SMASH.entities.push(new SMASH.Touch(SMASH.Input.x, SMASH.Input.y));
            // set tapped back to false
            // to avoid spawning a new touch
            // in the next cycle
            SMASH.Input.tapped = false;
            checkCollision = true;
        }

        // cycle through all entities and update as necessary
        for (i = 0; i < SMASH.entities.length; i += 1) {
            SMASH.entities[i].update();

            if (SMASH.entities[i].type === 'eye' && checkCollision) {
                hit = SMASH.collides(SMASH.entities[i],
                    {x: SMASH.Input.x, y: SMASH.Input.y, r: 7});
                if (hit) {
                    // spawn an exposion
                    for (var n = 0; n < 5; n +=1 ) {
                        SMASH.entities.push(new SMASH.Particle(
                            SMASH.entities[i].x,
                            SMASH.entities[i].y,
                            2,
                            // random opacity to mix it up
                            'rgba(255,255,255,'+Math.random()*1+')'
                        ));
                    }
                    SMASH.score.hit += 1;
                }

                SMASH.entities[i].remove = hit;
            }

            // delete from array if remove property
            // flag is set to true
            if (SMASH.entities[i].remove) {
                SMASH.entities.splice(i, 1);
            }
        }



        // calculate accuracy
        SMASH.score.accuracy = (SMASH.score.hit / SMASH.score.taps) * 100;
        SMASH.score.accuracy = isNaN(SMASH.score.accuracy) ?
            0 :
            ~~(SMASH.score.accuracy); // a handy way to round floats

    },


    // this is where we draw all the entities
    render: function() {

        var i;


        SMASH.Draw.rect(0, 0, SMASH.WIDTH, SMASH.HEIGHT, '#EA2102');

        //for (i = 0; i < SMASH.wave.total; i++) {

            //POP.Draw.circle(
               // POP.wave.x + POP.wave.offset +  (i * POP.wave.r),
               // POP.wave.y,
                //POP.wave.r,
               // '#fff');
       // }

        // cycle through all entities and render to canvas
        for (i = 0; i < SMASH.entities.length; i += 1) {
            SMASH.entities[i].render();
        }

        // display scores
        SMASH.Draw.text('Hit: ' + SMASH.score.hit, 20, 30, 14, '#fff');
        SMASH.Draw.text('Escaped: ' + SMASH.score.escaped, 20, 50, 14, '#fff');
        SMASH.Draw.text('Accuracy: ' + SMASH.score.accuracy + '%', 20, 70, 14, '#fff');

    },


    // the actual loop
    // requests animation frame
    // then proceeds to update
    // and render
    loop: function() {

        requestAnimFrame( SMASH.loop );

        SMASH.update();
        SMASH.render();
    }


};

// checks if two entties are touching
SMASH.collides = function(a, b) {

    var distance_squared = ( ((a.x - b.x) * (a.x - b.x)) +
    ((a.y - b.y) * (a.y - b.y)));

    var radii_squared = (a.r + b.r) * (a.r + b.r);

    if (distance_squared < radii_squared) {
        return true;
    } else {
        return false;
    }
};


// abstracts various canvas operations into
// standalone functions
SMASH.Draw = {

    clear: function() {
        SMASH.ctx.clearRect(0, 0, SMASH.WIDTH, SMASH.HEIGHT);
    },


    rect: function(x, y, w, h, col) {
        SMASH.ctx.fillStyle = col;
        SMASH.ctx.fillRect(x, y, w, h);
    },


    //create Eye picture loop
   circle: function(x, y, r, col) {
       var radial = SMASH.ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
       radial.addColorStop(0, '#110BC4');
       radial.addColorStop(0.9, '#0a0021');
       radial.addColorStop(1, 'rgba(1,159,98,0)');

       SMASH.ctx.fillStyle = radial;
       SMASH.ctx.beginPath();
       SMASH.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
       SMASH.ctx.closePath();
       SMASH.ctx.fill();
   },
   // SMASH.ctx.beginPath();
    //SMASH.ctx.arc(75, 75, 5, 0, 2*Math.PI);
    //SMASH.ctxt.closePath();
    //SMASH.ctx.fill();
        //SMASH.ctx.strokeStyle = "#F00";
        //SMASH.ctx.beginPath();
        //SMASH.ctx.arc(x , y , r, 0,  Math.PI * 2 , true);
        //SMASH.ctx.closePath();
        //SMASH.ctx.stroke();
   // circle: function() {



    //var radial = ctx.createRadialGradient(105,105,20,112,120,50);
   // radgrad2.addColorStop(0, '#FF5F98');
   // radgrad2.addColorStop(0.75, '#FF0188');
    //radgrad2.addColorStop(1, 'rgba(255,1,136,0)');


       // SMASH.ctx.fillStyle = radgrad;
       // SMASH.ctx.fillRect(0,0,150,150);
       // SMASH.ctx.fillStyle = radgrad2;
        //SMASH.ctx.fillRect(0,0,75,75);

    //},

        text: function(string, x, y, size, col) {
        SMASH.ctx.font = 'bold '+size+'px Monospace';
        SMASH.ctx.fillStyle = col;
        SMASH.ctx.fillText(string, x, y);
    }

};



SMASH.Input = {

    x: 0,
    y: 0,
    tapped :false,

    set: function(data) {
        this.x = (data.pageX - SMASH.offset.left) / SMASH.scale;
        this.y = (data.pageY - SMASH.offset.top) / SMASH.scale;
        this.tapped = true;

    }

};

SMASH.Touch = function(x, y) {

    this.type = 'touch';    // we'll need this later
    this.x = x;             // the x coordinate
    this.y = y;             // the y coordinate
    this.r = 5;             // the radius
    this.opacity = 1;       // inital opacity. the dot will fade out
    this.fade = 0.05;       // amount by which to fade on each game tick


    this.update = function() {
        // reduce the opacity accordingly
        this.opacity -= this.fade;
        // if opacity if 0 or less, flag for removal
        this.remove = (this.opacity < 0) ? true : false;
    };

    this.render = function() {
        SMASH.Draw.circle(this.x, this.y, this.r, 'rgba(255,0,0,'+this.opacity+')');
    };

};

SMASH.Eye = function() {

    this.type = 'eye';
    this.r = (Math.random() * 20) + 10;
    this.speed = (Math.random() * 3) + 1;

    this.x = (Math.random() * (SMASH.WIDTH) - this.r);
    this.y = SMASH.HEIGHT + (Math.random() * 100) + 100;

    // the amount by which the eye
    // will move from side to side
    this.waveSize = 5 + this.r;
    // we need to remember the original
    // x position for our  wave calculation
    this.xConstant = this.x;

    this.remove = false;


    this.update = function() {

        // a sine wave is commonly a function of time
        var time = new Date().getTime() * 0.002;

        this.y -= this.speed;
        // the x coord to follow a sine wave
        this.x = this.waveSize * Math.sin(time) + this.xConstant;

        // if offscreen flag for removal
        if (this.y < -10) {
            SMASH.score.escaped += 1; // update score
            this.remove = true;
        }

    };

    this.render = function() {

        SMASH.Draw.circle(this.x, this.y, this.r, 'rgba(255,255,255,1)');
    };

};

SMASH.Particle = function(x, y,r, col) {

    this.x = x;
    this.y = y;
    this.r = r;
    this.col = col;

    // determines whether particle will
    // travel to the right of left
    // 50% chance of either happening
    this.dir = (Math.random() * 2 > 1) ? 1 : -1;

    // random values so particles do not
    // travel at the same speeds
    this.vx = ~~(Math.random() * 4) * this.dir;
    this.vy = ~~(Math.random() * 7);

    this.remove = false;

    this.update = function() {

        // update coordinates
        this.x += this.vx;
        this.y += this.vy;

        // increase velocity so particle
        // accelerates off screen
        this.vx *= 0.99;
        this.vy *= 0.99;

        // adding this negative amount to the
        // y velocity exerts an upward pull on
        // the particle, as if drawn to the top of screen

        this.vy = 1.25;

        // offscreen
        if (this.y < 0) {
            this.remove = true;
        }

    };


    this.render = function() {
        SMASH.Draw.circle(this.x, this.y, this.r, this.col);
    };

};

window.addEventListener('load', SMASH.init, false);
window.addEventListener('resize', SMASH.resize, false);




// the address bar, thus hiding it.
//if (SMASH.android || SMASH.ios) {
   // document.body.style.height = (window.innerHeight + 50) + 'px';
//}