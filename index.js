/* global c */

$(function () {

    var Circle = function (x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.growthRate = 1;
        this.xAcceleration = 1.1;
    };

    Circle.prototype = new c.Actor();

    Circle.prototype.draw = function () {
        c.circle({
            x: this.x,
            y: this.y,
            radius: this.radius,
            color: this.color
        });
        this.w = this.radius * 2;
        this.h = this.radius * 2;
    };

    Circle.prototype.onFrame = function () {
        var w = c.w(),
            h = c.h();

        if (this.x > w) {
            this.x = w;
            this.xSpeed *= -1;
        } else if (this.x < 0) {
            this.x = 0;
            this.xSpeed *= -1;
        }

        if (this.y > h) {
            this.y = h;
            this.ySpeed *= -1;
        } else if (this.y < 0) {
            this.y = 0;
            this.ySpeed *= -1;
        }

        // this.xSpeed *= this.xAcceleration;
        // this.radius += this.growthRate;

        if (this.radius > 100 || this.radius < 5) {
            this.growthRate *= -1;
        }

        this.constructor.prototype.onFrame();
    };

    Circle.prototype.onCollision = function () {
        this.xSpeed *= 0.8; 
        // this.ySpeed *= -1;
    };

    var getABunchOfBalls = function () {
        var i,
            max = 40,
            balls = [],
            circle,
            maxSpeed = 30;

        for (i = 0; i < max; i++) {
            circle = new Circle(i * 10, i * 10, 6);
            circle.xSpeed = Math.min((i + 1) / 10, maxSpeed);
            circle.ySpeed = Math.min((i + 1) / 10, maxSpeed);
            circle.color = c.getRandomColor(0.5);

            balls.push(circle);
        }

        return balls;
    };

    c.canvas('canvas');
    
    // var b1 = new Circle(100, 100, 12);
    // b1.xSpeed = 1;
    // b1.ySpeed = 0;
    // b1.color = c.getRandomColor(0.5);
    // c.addActor(b1);

    // var b2 = new Circle(200, 100, 12);
    // b2.xSpeed = -1;
    // b2.ySpeed = 0.3;
    // b2.color = c.getRandomColor(0.5);
    // c.addActor(b2);

    getABunchOfBalls().forEach(function (ball) {
        c.addActor(ball);
    });

    $('#circle').on('click', function () {
        var start = Date.now(),
            runTime = 60;

        c.animate(function () {
            return Date.now() - start < runTime * 1000;
        });
    });

});