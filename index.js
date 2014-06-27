$(function () {

    var Circle = function (x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    };

    Circle.prototype = new c.Actor();

    Circle.prototype.draw = function () {
        c.circle(this.x, this.y, this.radius);
    };

    Circle.prototype.update = function () {
        this.xSpeed += 0.1;
        this.radius += 1;

        if (this.x > c.w()) {
            console.log(c.w());
            this.x = c.w();
            this.xSpeed *= -1;
        }
    };

    var circle = new Circle(0, 100, 10);
    circle.xSpeed = 0.2;
    // circle.ySpeed = 0.1;

    c.canvas('canvas');

    $('#circle').on('click', function () {
        c.animate(function () {
            circle.animate();
            // return circle.x > 400;
        });
    });

});