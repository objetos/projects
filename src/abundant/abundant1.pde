IntegerSequence sequence;
int terms = 20;

void setup() {
  size(720, 640);
  sequence = new Abundantes();
}

void draw() {
  background(255);  
  pushStyle();
  sequence.display(terms);
  popStyle();
}

// switch serie empleando la barra espaciadora
public void keyPressed() {
  if (key == '+')terms = terms<100?terms+1:2;
  if (key == '-')terms = terms>2?terms-1:100;
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

}

public class Abundantes extends IntegerSequence {

  private int[] numerosAbundantes= new int[100];


  public String author() {
    return "catalina";
  }
  public String description() {
    return "serie de numeros abundantes";
  }

  public int compute(int u) {
    int x=0;
    for (int n=1; x<u; n++) {
      int sum = 0;
      for (int i=1; i<n; i++) {
        if (n%i==0) {
          sum+= i;
        }
      }
      if (sum > n) {
        numerosAbundantes[x]=n;
        x++;
      }
    }
    return numerosAbundantes[u-1];
  }


  public void display(int n) {
    toArray(n);
    int [] arreglo= toArray(n);
    int t=0;

    translate(width/2, height/2);
    for (int i=0; i<n; i++) {
      float m= map(numerosAbundantes[i], numerosAbundantes[0], numerosAbundantes[n-1], 1, width/2);
      arreglo[i]= int(m);
    }

    while (t<numerosAbundantes.length-1 && n-1>0) {
      line(0, arreglo[t], arreglo[n-1], 0);
      line(0, -arreglo[t], arreglo[n-1], 0);
      line(0, arreglo[t], -arreglo[n-1], 0);
      line(0, -arreglo[t], -arreglo[n-1], 0);
      t++;
      n--;
    }
  }
}
