$(function () {

    var Circle = function (x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    };

    var circle = new Circle(0, 100, 30);

    c.canvas('canvas');

    $('#circle').on('click', function () {
        c.animate(function () {
            c.circle(circle.x, circle.y, circle.radius);
            circle.x += 20;

            return circle.x > 400;
        });
    });

});