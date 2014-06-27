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
        c.circle(this.x, this.y, this.radius);
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

    var circle = new Circle(0, 100, 10);
    circle.constrain();
    circle.xSpeed = 12;
    circle.ySpeed = 7;

    var circle2 = new Circle(90, 88, 14);
    circle2.constrain();
    circle2.xSpeed = 6;
    circle2.ySpeed = 5;

    c.canvas('canvas');

    $('#circle').on('click', function () {
        c.animate(function () {
            circle.animate();
            circle2.animate();

            // return circle.x > 400;
        });
    });

});