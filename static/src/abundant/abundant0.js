var abundant0 = function(p) {

    var value = 0;
    var n = 12;
    p.setup = function() {
        p.createCanvas(400, 400);
        p.colorMode(p.HSB, 360, 100, 100);
        // p.noLoop();     
    };

    p.draw = function() {
        p.background(0);
        var l = new Abundants(p);
        l.draw(n);
        l.sethue(value);

    };

    p.mouseMoved = function() {
        value = (value + 1) % 360;
    };


    p.keyTyped = function() {
        if (p.key === "-") {
            n--;
        } else if (p.key === "+") {
            n++;
        }
    };

    var Sequence = function(p) {
        //Overwrite

        hue = 180;


        this.sethue = function(n) {
            hue = n;
        };

        //this.compute = function(){};
        this.draw = function() {};

        this.to_array = function(n) {
            var num = [];
            for (var i = 0; i < n; i++)
                num.push(this.compute(i + 1));
            return num;
        };



        this.barChart = function(p, n) {

            var lay = this.to_array(n);
            var count = 0;
            for (var i = 0; i < n; i++) {
                //console.log(lay[i]);
                var wid = p.map(lay[i], lay[0], lay[n - 1], lay[0], p.width);
                p.stroke(hue, 100, 30);
                p.fill(hue, 100, 100);
                p.rect(0, (p.height / n) * count, wid, p.height / n);
                count++;
            }
        };

        this.lineChart = function(p, n) {
            var lay = this.to_array(n);
            for (var i = 0; i < n - 1; i++) {
                var x = p.map(i + 1, 0, n, 0, p.width);
                var y = p.map(lay[i], 0, lay[n - 1], p.height, 0);
                var x2 = p.map(i + 2, 0, n, 0, p.width);
                var y2 = p.map(lay[i + 1], 0, lay[n - 1], p.height, 0);
                p.stroke(hue, 100, 100);
                p.fill(hue, 100, 100);
                p.line(x, y, x2, y2);
                p.ellipse(x, y, 6, 6);

            }
        };

        this.curveChart = function(p, n) {
            var lay = this.to_array(n);
            var xy = [];
            for (var i = 0; i < n; i++) {
                var x = p.map(i + 1, 0, n, 0, p.width);
                var y = p.map(lay[i], 0, lay[n - 1], p.height, 0);
                xy.push(x);
                xy.push(y);
            }
            //console.log(xy);
            p.bezier(xy);

        }

    };

    var Abundants = function(p) {


        this.compute = function(n) {
            var cont = 0;
            var number = 0;
            while (true) {
                number++;
                var divisors = sum_of_div(number);
                if (divisors > number) {
                    cont++;
                }
                if (cont == n)
                    break;
            }
            return number;
        }
        compute = function(n) {
            var cont = 0;
            var number = 0;
            while (true) {
                number++;
                var divisors = sum_of_div(number);
                if (divisors > number) {
                    cont++;
                }
                if (cont == n)
                    break;
            }
            return number;
        }

        function sum_of_div(n) {
            var cont = 0;
            for (var i = 1; i < n; i++)
                if (n % i == 0)
                    cont += i;
            return cont;
        }

        function sumDivArray(n) {
            var div = [];
            for (var i = 0; i < n; i++) {
                div.push(sum_of_div(this.compute(i + 1)));
            }
            return div;
        }



        this.draw = function(n) {
            var terms = n;
            var abundants = [];
            abundants.push(this.to_array(terms));
            abundants.push(sumDivArray(terms));
            var wth = 0;
            for (var i = 0; i < terms; i++)
                wth += abundants[1][i];
            var x = 0;
            if (n < 3)
                wth *= 3;
            for (var i = 0; i < terms; i++) {
                x += p.map(abundants[1][i] / 2, 0, wth, 0, p.width);
                var radious = p.map(abundants[0][i], 0, wth, 0, p.width);
                p.fill(hue, p.map(abundants[0][i], 0, abundants[0][terms - 1], 0, 100), 100);
                p.ellipse(x, radious / 2 + p.mouseY, radious, radious);
                var y = radious + p.map(abundants[1][i] / 2, 0, wth, 0, p.width) + p.mouseY;
                radious = p.map(abundants[1][i], 0, wth, 0, p.width);
                p.fill(hue + 130, p.map(abundants[1][i], 0, abundants[1][terms - 1], 0, 100), 100);
                p.ellipse(x, y, radious, radious);
                x += p.map(abundants[1][i] / 2, 0, wth, 0, p.width);

            }


        }

    };

    Abundants.prototype = new Sequence;
};

var myp5 = new p5(abundant0, 'abundant0');