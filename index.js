/* global v c */

$(function () {

    var Circle = function (x, y, radius) {
        this.position = new v.Vector(x, y);

        this.radius = radius;
        this.w = this.radius * 2;
        this.h = this.radius * 2;

        this.velocity = new v.Vector();
        this.acceleration = new v.Vector();
        this.gravity = new v.Vector(0, 0.3);
        this.wind = new v.Vector(0.1, 0);
    };

    Circle.prototype = new c.Actor();

    Circle.prototype.draw = function () {
        c.circle({
            x: this.position.x,
            y: this.position.y,
            radius: this.radius,
            color: this.color
        });
    };

    Circle.prototype.applyForces = function () {
        this.acceleration.zero();
        this.acceleration.add(this.wind);
        this.acceleration.add(this.gravity);
    };

    Circle.prototype.onFrame = function () {
        var w = c.w(),
            h = c.h();

        this.applyForces();
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        if (this.position.x > w || this.position.x < 0) {
            this.velocity.x *= -1;
            if (this.position.x) {
                this.position.x = w;
            } else {
                this.position.x = 0;
            }
        }

        if (this.position.y > h || this.position.y < 0) {
            this.velocity.y *= -1;
            if (this.position.y) {
                this.position.y = h;
            } else {
                this.position.y = 0;
            }
        }

        this.constructor.prototype.onFrame();
    };

    Circle.prototype.applyForce = function (vector) {
        this.acceleration.add(vector);
    };

    Circle.prototype.onCollision = function () {
        // this.xSpeed *= 0.8; 
        // this.ySpeed *= -1;
    };

    // var getABunchOfBalls = function () {
    //     var i,
    //         max = 40,
    //         balls = [],
    //         circle,
    //         maxSpeed = 30;

    //     for (i = 0; i < max; i++) {
    //         circle = new Circle(i * 10, i * 10, 6);
    //         circle.xSpeed = Math.min((i + 1) / 10, maxSpeed);
    //         circle.ySpeed = Math.min((i + 1) / 10, maxSpeed);
    //         circle.color = c.getRandomColor(0.5);

    //         balls.push(circle);
    //     }

    //     return balls;
    // };

    c.canvas('canvas');
    
    var b1 = new Circle(200, 1, 12);
    b1.color = c.getRandomColor(0.5);
    c.addActor(b1);

    var b2 = new Circle(1, 1, 10);
    b2.color = c.getRandomColor(0.5);
    c.addActor(b2);

    // var b2 = new Circle(200, 100, 12);
    // b2.velocity = new v.Vector();
    // b2.acceleration = new v.Vector(0.1, 0.2);
    // b2.color = c.getRandomColor(0.5);
    // c.addActor(b2);

    // getABunchOfBalls().forEach(function (ball) {
    //     c.addActor(ball);
    // });

    $('#circle').on('click', function () {
        var start = Date.now(),
            runTime = 60;

        c.animate(function () {
            return Date.now() - start < runTime * 1000;
        });
    });

});