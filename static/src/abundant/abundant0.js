var sketch = function (p) {
    var n = 10;
    var abundants = [];
    var tmp = new Array();

    function sum_of_div(n) {
        tmp.push(n);
        var sum = 0;
        for (var i = 1; i < n; i++)
            if (n % i == 0) {
                sum = sum + i;
                tmp.push(i);
            }
        return sum;
    }
    
    p.setup = function () {
        p.createCanvas(576, 438);
        p.noLoop();
    }
    
    p.draw = function () {
        p.background(0, 50, 50);
        var cont = 0;
        var number = 1;
        while (true) {
            if (cont == n)
                break;
            tmp = new Array();
            var sumDiv = sum_of_div(number);
            if (number < sumDiv) {
                tmp.push(sumDiv);
                abundants.push(tmp);
                cont++;
            }
            number++;
        }
        var scale = 3;
        var x = 0;
        for (var xi = 0; xi < 6; xi++) {
            var radOfSum = abundants[xi][abundants[xi].length - 1] / 2.0;
            x += radOfSum * scale;
            var radOfNumber = abundants[xi][0] / 2.0;
            var y = radOfNumber * scale;
            p.fill(255, 255, 200);
            p.noStroke();
            p.ellipse(x, y, radOfNumber * 2 * scale, radOfNumber * 2 * scale);
            y += radOfNumber * scale;
            for (var i = 1; i < abundants[xi].length; i++) {
                var length = abundants[xi].length;
                var diamOfActual = abundants[xi][i];
                var diamOfFirst = abundants[xi][1];
                var diamOfLast = abundants[xi][length - 2] * 1.1;
                var a = p.map(diamOfActual, diamOfFirst, diamOfLast, 0, 255);
                p.fill(255, 255 - a, 255 - a);
                p.noStroke();
                y += diamOfActual / 2.0 * scale;
                p.ellipse(x, y, diamOfActual * scale, diamOfActual * scale);
                y += diamOfActual / 2.0 * scale;
            }
            x += radOfSum * scale;
        }
    }
};
var myp5 = new p5(sketch, 'abundant0');
