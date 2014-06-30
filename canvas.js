/* global v */

var c = (function () {
    var canvas;
    var ctx;
    var width;
    var height;
    var actors = [];

    /**
    * @name setCanvas
    * @description set the canvas
    * @param {String} c id for the canvas
    * @return {Boolean} true if canvas was found and set
    */
    var setCanvas = function (c) {
        canvas = document.getElementById(c);
        if (canvas) {
            width = canvas.width;
            height = canvas.height;
            ctx = canvas.getContext('2d');

            ctx.fillStyle = '#09F';
        }
        return !!canvas;
    };

    /**
    * @name clear
    * @description clear the canvas
    */
    var clear = function () {
        ctx.clearRect(0, 0, width, height);
    };

    /**
    * @name animate
    * @description run animation until further notice
    * @param {Function} animationFn return false to stop animation
    */
    var animate = function (animationFn) {
        clear();
        actors.forEach(function (actor) {
            actor.animate();
        });

        if (animationFn() !== false) {
            setTimeout(function () {
                requestAnimationFrame(function () {
                    animate(animationFn);
                });
            }, 10);
        }
    }; 

    /**
    * @name circle
    * @description draw a circle
    * @param {Number} config.x
    * @param {Number} config.y
    * @param {Number} config.radius
    * @param {String} config.color
    */
    var circle = function (config) {
        var x, y, r, c;

        if (ctx) {
            x = config.x;
            y = config.y;
            r = config.radius;
            c = config.color || '#000';

            y = y + r / 2;
            x = x + r / 2;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(x, y, r, 0, 2 * Math.PI, false);
            ctx.fillStyle = c;
            ctx.fill();
        }
    };

    /**
    * @class Actor
    * @description an item that exists on a canvas
    */
    var Actor = function () {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
    };

    Actor.prototype.position = function (x, y) {
        this.x = x;
        this.y = y;
        this.w = 0;
        this.h = 0;
    };

    Actor.prototype.onFrame = function () {};

    Actor.prototype.draw = function () {
        console.log('define draw method');
        // set the w & h when you're done
    };

    Actor.prototype.move = function () {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    };

    Actor.prototype.animate = function () {
        this.onFrame();
        this.move();
        if (this.checkForCollisions()) {
            this.onCollision();
        }
        this.draw();
    };

    Actor.prototype.checkForCollisions = function () {
        var that = this,
            collidesWith = [];

        actors.forEach(function (actor) {

            if (actor !== that) {
                if (that.intersect(actor)) {
                    collidesWith.push(actor);
                }
            }
        });

        this.collidesWith = collidesWith;
        return collidesWith.length > 0;
    };

    Actor.prototype.intersect = function (actor) {
        var intersect = false,
            xDist = Math.abs(actor.position.x - this.position.x),
            yDist = Math.abs(actor.position.y - this.position.y);

        return xDist < actor.w && xDist < this.w &&
            yDist < actor.h && yDist < this.h;
    };

    Actor.prototype.onCollision = function () {
        console.log('implement me');
    };

    /**
    * Get a normal vector from another actor.  When two actors collide, we
    * need the surface normal to determine the reflection.
    * @param {Actor} referenceActor the actor trying to bounce off this actor
    * @return {Vector}
    */
    Actor.prototype.getSurfaceNormal = function (referenceActor) {
        // vector from reference to this
        var thisPosition = this.position;
        var referencePosition = referenceActor.position;
        var vector = new v.Vector(referencePosition.x - thisPosition.x, 
            referencePosition.y - thisPosition.y);

        vector.normalize();
        return vector;
    };

    Actor.prototype.constrain = function () {
        // this.onFrame = function () {
        //     if (this.x > w) {
        //         this.x = w;
        //         this.xSpeed *= -1;
        //     } else if (this.x < 0) {
        //         this.x = 0;
        //         this.xSpeed *= -1;
        //     }
        // };
    };

    var w = function () {
        return width;
    };

    var h = function () {
        return height;
    };

    var addActor = function (actor) {
        actors.push(actor);
    };

    var rand = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var getRandomColor = function (alpha) {
        var r = rand(0, 255),
            g = rand(0, 255),
            b = rand(0, 255);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    };

    return {
        canvas: setCanvas,
        clear: clear,
        circle: circle,
        animate: animate,
        Actor: Actor,
        w: w,
        h: h,
        addActor: addActor,
        rand: rand,
        getRandomColor: getRandomColor
    };
}());