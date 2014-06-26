var c = (function () {
    var canvas;
    var ctx;
    var width;
    var height;

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
        if (animationFn() === false) {
            requestAnimationFrame(function () {
                animate(animationFn);
            });
        }
    }; 

    /**
    * @name circle
    * @description draw a circle
    * @param {Number} x
    * @param {Number} y
    */
    var circle = function (x, y, radius) {
        ctx = canvas.getContext('2d');
        if (ctx) {
            y = y + 0.5 * radius;
            x = x + 0.5 * radius;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            ctx.fill();
        }
    };

    return {
        canvas: setCanvas,
        clear: clear,
        circle: circle,
        animate: animate
    };
}());