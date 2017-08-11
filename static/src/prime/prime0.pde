// Object declaration
IntegerSequence sequence;
int current = 1;
int rep = 1;
int terms = 13;

void setup() {
    size(720, 640);
}

void draw() {
    background(0);
    sequence = new Primos();
    //object use
    switch (rep) {
        case 1:
            sequence.display(terms);
            break;
        case 2:
            sequence.barChart(terms);
            break;
        case 3:
            sequence.lineChart(terms);
            break;
        case 4:
            sequence.curveFitting(terms);
            break;
    }
}

void keyPressed() {
    loop();
    if (key == '>')
        rep = rep < 4 ? rep + 1 : 1;
    if (key == '<')
        rep = rep > 0 ? rep - 1 : 4;
    if (key == '+')
        terms = terms < 30 ? terms + 1 : 1;
    if (key == '-')
        terms = terms > 1 ? terms - 1 : 24;
       println(terms);
}

// Super abstract class Sequence

abstract class IntegerSequence {
  /**
   * The sequence author
   */
  abstract String author();

  /**
   * The sequence description
   */
  abstract String description();

  /**
   * Computes the nth sequence term
   */
  abstract int compute(int n);

  /**
   * Returns the first n seq terms as an array.
   */
  int [] toArray(int n) {
    int[] seq = new int[n];
    for (int i=0; i<n; i++)
      seq[i] = compute(i+1);
    return seq;
  }

  // All display functions must scale the canvas properly

  /**
   * Display n seq terms as you wish
   */
  abstract void display(int n);

  /**
   * Display n seq terms as a bar chart: https://en.wikipedia.org/wiki/Bar_chart
   * Warning: Should be implemented here in the super class!
   */
  void barChart(int n) {
    pushStyle();
    background(0);
    float c = compute(n)+compute(n)*0.05;
    float w = ((width-60)-20)/n;
    float a = (height-height/10)/c;
    fill(255);
    stroke(50);
    textSize(20);
    textAlign(CENTER, CENTER);
    //Dibuja las lineas de fondo y los numeros del grafico
    for (int i = 0; i<=n; i++) {
      line(w*i+60, (height-height/10)-(a*compute(n)), w*i+60, (height-height/10));
      line(60, (height-height/10)-(a*compute(i)), w*n+60, (height-height/10)-(a*compute(i)));
      text(i, 60+w*i, (height-height/10)+10);
      text(compute(i), 30, (height-height/10)-(a*compute(i)));
    }
    rectMode(CORNERS);
    //Dibuja las barras del diagrama
    for (int i=0; i <=n; i++) {
      fill((compute(i)*1000)/255, 150, compute(i));
      rect((w*i+60-w/3), height-height/10, w*i+60+w/3, (height-height/10)-(a*compute(i)));
    }
    popStyle();
  }

  /**
   * Display n seq terms as a line chart: https://en.wikipedia.org/wiki/Line_chart
   * Warning: Should be implemented here in the super class!
   */
  void lineChart(int n) {
    pushStyle();
    background(0);
    float c = compute(n)+compute(n)*0.05;
    float w = ((width-60)-10)/n;
    float a = (height-height/10)/c;
    textSize(15);
    textAlign(CENTER, CENTER);
    stroke(50);
    fill(250);
    //Dibuja las lineas de fondo y los numeros del grafico
    for (int i = 0; i<=n; i++) {
      line(w*i+60, (height-height/10)-(a*compute(n)), w*i+60, (height-height/10));
      line(60, (height-height/10)-(a*compute(i)), w*n+60, (height-height/10)-(a*compute(i)));
      text(i, 60+w*i, (height-height/10)+10);
      text(compute(i), 30, (height-height/10)-(a*compute(i)));
    }
    fill(2, 159, 139);
    stroke(2, 129, 216);
    strokeWeight(4);
    //dibuja el grafico
    for (int i=1; i <=n; i++)
      line(w*(i-1)+60, (height-height/10)-(a*compute(i-1)), w*i+60, (height-height/10)-(a*compute(i)));
    for (int i=1; i <=n; i++) {
      noStroke();
      ellipse(w*i+60, (height-height/10)-(a*compute(i)), 12, 12);
    }
    popStyle();
  }

  /**
   * Display n seq terms as a curve firring: https://en.wikipedia.org/wiki/Curve_fitting
   * Hint: refer to the section 'Curves' here: https://processing.org/reference/
   * Warning: Should be implemented here in the super class!
   */
  void curveFitting(int n) {
    pushStyle();
    background(0);
    float c = compute(n)+compute(n)*0.05;
    float w = ((width-60)-10)/n;
    float a = (height-height/10)/c;
    textSize(15);
    textAlign(CENTER, CENTER);
    stroke(50);
    fill(250);
    //Dibuja las lineas de fondo y los numeros del grafico
    for (int i = 0; i<=n; i++) {
      line(w*i+60, (height-height/10)-(a*compute(n)), w*i+60, (height-height/10));
      line(60, (height-height/10)-(a*compute(i)), w*n+60, (height-height/10)-(a*compute(i)));
      text(i, 60+w*i, (height-height/10)+10);
      text(compute(i), 30, (height-height/10)-(a*compute(i)));
    }
    stroke(2, 129, 216);
    strokeWeight(4);
    noFill();
    //Dibuja la curva
    beginShape();
    for (int i=-1; i <=n+1; i++)
      curveVertex(w*i+60, (height-height/10)-(a*compute(i)));
    endShape();
    fill(2, 159, 139);
    for (int i=1; i <=n; i++) {
      noStroke();
      ellipse(w*i+60, (height-height/10)-(a*compute(i)), 12, 12);
    }
    popStyle();
  }
}

class Primos extends IntegerSequence {

    String author() {
        String author = "Euclides, matemático y geómetra griego";
        return author;
    }

    String description() {
        String des = "Son números mayores que 1 y que solamente tienen dos divisores, el 1 y el mismo";
        return des;
    }

    int compute(int n) {
        int resp = 0;
        int index = 0;
        int i = 1;
        while (index < n) {
            if (capacidad(i) == 2) {
                if (index == n - 1)
                    resp = i;
                index++;
            }
            i++;
        }
        return resp;
    }

    void display(int n) {
        pushStyle();
        noFill();
        stroke(255);
        background(0);
        //Espiral en la que cada curva pasa por todos los multiplos del primer numero en ella
        //Los numero pirimos son aquellos que solo son atravesados por dos curvas y estan señalados por puntos rosados 
        int w = width / compute(n);
        line(0, height / 2, width, height / 2);
        for (int j = 1; j < compute(n); j++) {
            stroke(10 * (j - 4) / j * 2, 600 / (j * 0.3), 1000 / (0.3 * j));
            for (int i = 0; i < compute(n); i++) {
                if (i % 2 == 0)
                    arc(w * i * j + w * j / 2, height / 2, w * j, w * j, PI, 2 * PI);
                else
                    arc(w * i * j + w * j / 2, height / 2, w * j, w * j, 0, PI);
            }
        }
        stroke(255, 0, 102);
        fill(255, 0, 90);
        for (int g = 0; g < n; g++)
            ellipse(w * compute(g), height / 2, w / 3, w / 3);
        popStyle();
    }

    int capacidad(int n) {
        int resp = 0;
        for (int i = 1; i <= n; i++)
            if (n % i == 0)
                resp++;
        return resp;
    }
}