var v = (function () {
    var Vector = function (xChange, yChange) {
        this.x = xChange || 0;
        this.y = yChange || 0;
    };

    Vector.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
    };

    Vector.subtract = function (v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
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

    Vector.multiply = function (v1, v2) {
        return new Vector(v1.x * v2.x, v1.y * v2.y);
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
            this.multiply(x);
        }
    };

    Vector.add = function (v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    };

    Vector.prototype.zero = function () {
        this.x = 0;
        this.y = 0;
    };

    Vector.dotProduct = function (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    };

    /**
    * @description Get the reflect a vector based off a surface.
    * @name reflect
    * @param {Vector} vector
    * @param {Vector} surfaceNormal unit normal of surface (perpendicular
    * to surface with magnitude of 1)
    * @return {Vector}
    */
    Vector.reflect = function (vector, surfaceNormal) {

        // Basically if you have a vector v, which represents the object's velocity, and
        // a normalized normal vector n, which is perpendicular to the surface with
        // which the object collides, then the new velocity v' is given by the equation:

        // v' = 2 * (v . n) * n - v;

        // Where '*' is the scalar multiplication operator, '.' is the dot product of two vectors,
        // and '-' is the subtraction operator for two vectors.
        // v is reflected off of the surface, and gives a reflection vector v' 
        // which is used as the new velocity of the object. 


        // R = V - 2N(V * N)
        // var reflection = Vector.multiply(vector, surfaceNormal);
        var reflection = Vector.dotProduct(vector, surfaceNormal);
        var twoN = new Vector(surfaceNormal.x * 2, surfaceNormal.y * 2);
        reflection = Vector.multiply(twoN, reflection);
        // return Vector.subtract(vector, reflection);
        return Vector.subtract(reflection, vector);
    };


    var v1 = new Vector(3, 3);
    var normal = new Vector(-6, 0);

    normal.normalize();

    console.log(Vector.reflect(v1, normal));

    v1 = new Vector(6, 4);
    console.log(Vector.reflect(v1, normal));

    v1 = new Vector(3, 3);
    normal = new Vector(-1, -1);
    normal.normalize();
    console.log(Vector.reflect(v1, normal));

    return {
        Vector: Vector
    };
}());