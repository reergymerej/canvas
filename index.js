/* global c */
/* global v */

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
        // this.acceleration.add(this.wind);
        // this.acceleration.add(this.gravity);
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
        var collidedWith = this.collidesWith[0];
        var normal = collidedWith.getSurfaceNormal(this);
        this.velocity = v.Vector.reflect(this.velocity, normal);
        this.position.add(this.velocity);
    };

    c.canvas('canvas');
    
    var b1 = new Circle(100, 100, 12);
    b1.color = c.getRandomColor(0.5);
    b1.velocity = new v.Vector(1, 1);
    c.addActor(b1);

    var b2 = new Circle(170, 150, 10);
    b2.color = c.getRandomColor(0.5);
    b2.velocity = new v.Vector(0, 0);
    c.addActor(b2);

    c.animate(function () {
        // return Date.now() - start < runTime * 1000;
    });
});