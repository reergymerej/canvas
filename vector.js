var v = (function () {
    var Vector = function (xChange, yChange) {
        this.x = xChange || 0;
        this.y = yChange || 0;
    };

    Vector.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
    };

    Vector.prototype.divide = function (x) {
        if (x) {
            this.x /= x;
            this.y /= x;
        }
    };

    Vector.prototype.multiply = function (x) {
        this.x *= x;
        this.y *= x;
    };

    Vector.prototype.getMagnitude = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };

    Vector.prototype.normalize = function () {
        this.divide(this.getMagnitude());
    };

    Vector.prototype.limit = function (x) {
        var m = this.getMagnitude();
        if (m > x) {
            this.normalize();
            this.multiply(max);
        }
    };

    Vector.add = function (v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    };

    Vector.prototype.zero = function () {
        this.x = 0;
        this.y = 0;
    };


    var v1 = new Vector(1, 3);
    var v2 = new Vector(2, 6);

    console.log(Vector.add(v1, v2));

    return {
        Vector: Vector
    };
}());