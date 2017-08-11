var fibonacci0 = function(p) {

    var sequence, simulatedInheritance, n = 1,
        serie = 0,
        mode = 0,
        counter = 0;

    p.setup = function() {
        p.createCanvas(1368, 768);
        p.colorMode(p.HSB);
        p.textAlign(p.LEFT);
        p.textSize(12);
        p.background(0, 0, 50);
        sequence = new Fibonacci();
        simulatedInheritance = new Sequence();
    }

    p.draw = function() {
        p.background(0, 0, 50);
        p.textFont("Arial");
        switch (mode) {
            case 0:
                sequence.display(n);
                break;
            case 1:
                sequence.barChart(n);
                break;
            case 2:
                sequence.lineChart(n);
                break;
            case 3:
                sequence.curveFitting(n);
                break;
        }
    }

    p.keyTyped = function() {
        switch (p.key) {
            case '+':
                n++;
                break;
            case '-':
                if (n > 1)
                    n--;
                break;
            case '>':
                mode = (mode + 1) % 4;
                break;
            case '<':
                console.log(mode)
                mode = (mode == 0) ? 3 : mode-1;
                console.log(mode)
                break;
        }
    }

    this.modeChoosed = function() {
        switch (mode) {
            case 0:
                return 'Imagination!'
                break;
            case 1:
                return 'Bar chart';
                break;
            case 2:
                return 'Line chart';
                break;
            case 3:
                return 'Curve fitting';
                break;
        }
    }

    var Sequence = function(p) {}

    Sequence.prototype.drawTable = function(valCompute, lineV, lineH) {
        width = p.width;
        height = p.height;
        p.rect(width / 8, height / 8, 6 * width / 8, 6 * height / 8);
        p.textSize(15);
        p.textAlign(p.RIGHT);
        for (var i = 0; i <= valCompute; i++) {
            p.text(valCompute - i, width / 8, p.map(i, 0, valCompute, height / 8, 7 * height / 8));
            if (lineH)
                p.line(width / 8, p.map(i, 0, valCompute, height / 8, 7 * height / 8), 7 * width / 8, p.map(i, 0, valCompute, height / 8, 7 * height / 8));
        }
        p.textAlign(p.CENTER);
        for (var i = 0; i <= n; i++) {
            p.text(i, p.map(i, 0, n, width / 8, 7 * width / 8), 7 * height / 8 + 15);
            if (lineV)
                p.line(p.map(i, 0, n, width / 8, 7 * width / 8), height / 8, p.map(i, 0, n, width / 8, 7 * width / 8), 7 * height / 8);
        }
    }

    Sequence.prototype.maxValue = function(i) {
        var number = 0;
        for (var j = 1; j <= n; j++) {
            if (number < sequence.compute(j))
                number = sequence.compute(j);
        }
        return number;
    }

    Sequence.prototype.barChart = function(n) {
        var valCompute = this.maxValue(n);
        p.strokeWeight(0.1);
        this.drawTable(valCompute, false, true);
        p.strokeCap(p.SQUARE);
        p.strokeWeight(10);
        p.stroke(0, 100, 100);
        for (var i = 1; i <= n; i++) {
            x = p.map(i, 0, n, width / 8, 7 * width / 8);
            y = p.map(sequence.compute(i), 0, valCompute, p.height / 8, 7 * p.height / 8);
            p.line(x, 7 * p.height / 8, x, p.height - y);
        }
        p.strokeWeight(1);
        p.stroke(255);
        p.strokeCap(p.ROUND);
    }

    Sequence.prototype.lineChart = function(n) {
        var valCompute = this.maxValue(n);
        x = p.map(1, 0, n, p.width / 8, 7 * p.width / 8);
        y = p.map(sequence.compute(1), 0, valCompute, p.height / 8, 7 * p.height / 8);
        var xBak = x,
            yBak = y;
        p.strokeWeight(0.1);
        this.drawTable(valCompute, true, true);
        p.stroke(0, 100, 100);
        for (var i = 1; i <= n; i++) {
            x = p.map(i, 0, n, p.width / 8, 7 * p.width / 8);
            y = p.map(sequence.compute(i), 0, valCompute, p.height / 8, 7 * p.height / 8);
            p.strokeWeight(5);
            p.point(x, p.height - y);
            p.strokeWeight(3);
            p.line(xBak, p.height - yBak, x, p.height - y);
            xBak = x;
            yBak = y;
        }
        p.strokeWeight(1);
        p.stroke(255);
    }

    Sequence.prototype.curveFitting = function(n) {
        var valCompute = this.maxValue(n);
        p.strokeWeight(0.1);
        this.drawTable(valCompute, false, true);
        p.strokeCap(p.SQUARE);
        p.strokeWeight(3);
        p.stroke(0, 100, 100);
        p.beginShape();
        for (var i = 0; i <= n + 1; i++) {
            x = p.map(i, 0, n, p.width / 8, 7 * p.width / 8);
            y = p.map(sequence.compute(i), 0, valCompute, p.height / 8, 7 * p.height / 8);
            p.curveVertex(x, p.height - y);
        }
        p.endShape();
        p.strokeWeight(1);
        p.stroke(255);
        p.strokeCap(p.ROUND);
    }

    function Fibonacci() {
        this.x;
        this.y;
    }

    Fibonacci.prototype.author = function() {
        return "Leonardo Bonacci";
    }

    Fibonacci.prototype.description = function() {
        return "Fibonacci sequence returns 1 for first two and the sum of last two numbers.";
    }

    Fibonacci.prototype.compute = function(i) {
        if (i == 1 || i == 2)
            return 1;
        if (i > 1)
            return this.compute(i - 1) + this.compute(i - 2);
        return -1;
    }

    Fibonacci.prototype.detWid = function() {
        if (n % 2 == 0)
            return this.compute(n) + this.compute(n - 1);
        return this.compute(n);
    }

    Fibonacci.prototype.detHei = function() {
        if (n % 2 == 0)
            return this.compute(n);
        return this.compute(n + 1);
    }

    Fibonacci.prototype.remapW = function(x) {
        return p.map(x, 0, this.detWid(), 0, p.width);
    }

    Fibonacci.prototype.remapH = function(y) {
        return p.map(y, 0, this.detHei(), 0, p.height);
    }

    Fibonacci.prototype.display = function(n) {
        for (var i = 1; i <= n; i++) {
            p.stroke(0, 100, 0);
            var nH = this.remapH(this.compute(i) * 2),
                nW = this.remapW(this.compute(i) * 2);
            switch (counter) {
                case 0:
                    if (i == 1) {
                        this.x = this.remapW(this.detWid() - this.sum(i + 1));
                        this.y = this.remapH(this.detHei() - this.sum(i));
                        p.arc(this.x, this.y, nW, nH, p.HALF_PI, p.PI);
                    }
                    if (i == 2) {
                        p.arc(this.x, this.y, nW, nH, 0, p.HALF_PI);
                        counter = 3;
                    }
                    break;
                case 1:
                    this.x = this.x + this.remapW(this.compute(i - 2));
                    p.arc(this.x, this.y, nW, nH, p.HALF_PI, p.PI);
                    counter++;
                    break;
                case 2:
                    this.y = this.y - this.remapH(this.compute(i - 2));
                    p.arc(this.x, this.y, nW, nH, 0, p.HALF_PI);
                    counter++;
                    break;
                case 3:
                    this.x = this.x - this.remapW(this.compute(i - 2));
                    p.arc(this.x, this.y, nW, nH, p.PI + p.HALF_PI, p.TWO_PI);
                    counter++;
                    break;
                case 4:
                    this.y = this.y + this.remapH(this.compute(i - 2));
                    p.arc(this.x, this.y, nW, nH, p.PI, p.PI + p.HALF_PI);
                    counter = 1;
                    break;
            }
            this.dibujoRect(i, nW, nH);
            p.stroke(0, 100, 0);
        }
        counter = 0;
    }

    Fibonacci.prototype.sum = function(i) {
        var resultado = 0;
        for (var j = 0;
            (i + j * 4) <= n; j++)
            resultado += this.compute(i + j * 4);
        return resultado;
    }

    Fibonacci.prototype.dibujoRect = function(i, nW, nH) {
        p.stroke(0, 100, 0);
        var a = this.compute(i);
        p.textSize(p.map(a, 0, this.compute(n), 5, 50));
        switch (i % 4) {
            case 1:
                p.rect(this.x - nW / 2, this.y, nW / 2, nH / 2);
                p.fill(255);
                p.text(a, this.x - nW / 2 + nW / 4, this.y + nH / 4);
                break;
            case 2:
                p.rect(this.x, this.y, nW / 2, nH / 2);
                p.fill(255);
                p.text(a, this.x + nW / 5, this.y + nH / 4);
                break;
            case 3:
                p.rect(this.x, this.y - nH / 2, nW / 2, nH / 2);
                p.fill(255);
                p.text(a, this.x + nW / 5, this.y - nH / 2 + nH / 4);
                break;
            case 0:
                p.rect(this.x - nW / 2, this.y - nH / 2, nW / 2, nH / 2);
                p.fill(255);
                p.text(a, this.x - nW / 2 + nW / 4, this.y - nH / 2 + nH / 4);
                break;
        }
        p.noFill();
        p.stroke(0, 100, 0);
    }

    Fibonacci.prototype.barChart = function(n) {
        simulatedInheritance.barChart(n);
    }

    Fibonacci.prototype.lineChart = function(n) {
        simulatedInheritance.lineChart(n);
    }

    Fibonacci.prototype.curveFitting = function(n) {
        simulatedInheritance.curveFitting(n);
    }
}

var myp5 = new p5(fibonacci0, 'fibonacci0');