abstract class Shape {
  protected float   rot;
  protected float   rot_init;
  protected int     scl;
  protected int     scl_init;
  protected PVector trans;
  protected PVector offset;
  protected PVector init_position;
  protected color   clr;
  protected boolean mouse_on;
  protected boolean static_shape;
  protected boolean borde = false;

  public Shape() {
    this( random(100, width-100), random(100, height-100), radians( 45 ), 1, color( random( 200, 255 ), random( 200, 255 ), random( 200, 255 ) ) );
  }

  public Shape(float x, float y, float r, int s, color c) {
    trans         = new PVector(x, y);
    offset        = new PVector( 0, 0 );
    init_position = new PVector( x, y );
    rot           = r;
    rot_init      = r;
    scl           = s;
    scl_init      = s;
    clr           = c;
    mouse_on      = false;
    static_shape  = false;
  }

  public void draw() {
    pushStyle();
    pushMatrix();
    translate( getTranslation().x, getTranslation().y );
    rotate( getRotation() );
    scale( getScaling(), 1 );
    fill( getColor() );
    strokeWeight( mouse_on || borde ? 4 : 1 );
    stroke( mouse_on ? color( 255, 0, 0 ) : color ( 0 ) );
    drawShape();
    popMatrix();
    popStyle();
  }

  /*** NO FUE NECESARIO ***/

  // La selección de la pieza se lleva a cabo con el color y el manejo de offset.

  // TODO: para la seleccion de la pieza escoja uno de los siguientes prototipos
  // public abstract boolean grabsInput(float x, float y);
  // public boolean grabsInput(float x, float y) {}

  /*** NO FUE NECESARIO ***/

  protected abstract void drawShape();

  public int getScaling() {
    return scl;
  }

  public int getInitScaling() {
    return scl_init;
  }

  public void setScaling( int s ) {
    scl = s;
  }

  public void mirror() {
    if ( getScaling() == 1 )
      setScaling( -1 );
    else
      setScaling( 1 );
  }

  public float getRotation() {
    return rot;
  }

  public float getInitRotation() {
    return rot_init;
  }

  public void setRotation(float r) {
    rot = r;
  }

  public PVector getTranslation() {
    return trans;
  }

  public void setTranslation(float x, float y) {
    trans.x = x;
    trans.y = y;
  }

  public PVector getOffset() {
    return offset;
  }

  public void setOffset( float x, float y ) {
    offset.x = x;
    offset.y = y;
  }

  public PVector getInitPosition() {
    return init_position;
  }

  public color getColor() {
    return clr;
  }

  public void setColor( int grey ) {
    clr = color( grey );
  }

  public void setColor( int red, int green, int blue ) {
    clr = color( red, green, blue );
  }

  public boolean getStatic() {
    return static_shape;
  }

  public void freeze() {
    static_shape = true;
  }

  public void unFreeze() {
    static_shape = false;
  }
}

class Triangle extends Shape {
  protected float[] size = new float[2];

  public Triangle() {
    this( random( 100, width-100 ), random( 100, height-100 ), radians( 0 ), 1, color( random( 255 ), random( 255 ), random( 255 ) ), (int)random( 3 ) );
  }

  public Triangle( float y, int t ) {
    this( 100, y, 0, 1, color( random( 150, 255 ), random( 150, 255 ), random( 150, 255 ) ), t );
  }

  public Triangle( float x, float y, float r, int s, int c, int t ) {
    super( x, y, r, s, c );
    switch( t ) {    //type ==> 1=Large    2=Medium    3=Small
    case 1:
      size[0] = 200;
      size[1] = 100;
      break;
    case 2:
    default:
      size[0] = 100*sqrt(2);
      size[1] = 50*sqrt(2);
      break;
    case 3:
      size[0] = 100;
      size[1] = 50;
      break;
    }
  }

  public Triangle( float x, float y, float r, int s, int c, int t, boolean st ) {
    this( x, y, r, s, c, t );
    borde = st;
  } 

  protected void drawShape() {
    triangle( 0, 0, 0, getWidth(), getWidth()/2, getHeight() );
  }

  public float getHeight() {
    return size[1];
  }

  public float getWidth() {
    return size[0];
  }
}

class Rect extends Shape {
  protected float edge;

  public Rect() {
    super();
    setEdge( 50*sqrt(2) );
  }

  public Rect( float y ) {
    this( 100+(35*sqrt(2)), y, radians( 45 ), 1, color( random( 150, 255 ), random( 150, 255 ), random( 150, 255 ) ) );
  }

  public Rect( float x, float y, float r, int s, int c ) {
    super( x, y, r, s, c );
    setEdge( 50*sqrt(2) );
  }

  public Rect( float x, float y, float r, int s, int c, boolean st ) {
    this( x, y, r, s, c );
    borde = st;
  } 

  protected void drawShape() {
    rectMode(CENTER);
    rect(0, 0, edge, edge);
  }

  public float edge() {
    return edge;
  }

  public void setEdge(float e) {
    edge = e;
  }
}

class Parall extends Shape {
  protected float[] size = new float[2];

  public Parall() {
    this( random( 100, width-100 ), random( 100, height-100 ), radians( 0 ), 1, color( random( 255 ), random( 255 ), random( 255 ) ) );
  }

  public Parall( float y ) {
    this( 100, y, 0, 1, color( random( 150, 255 ), random( 150, 255 ), random( 150, 255 ) ) );
  }

  public Parall( float x, float y, float r, int s, int c) {
    super( x, y, r, s, c );
    size[0] = 100;
    size[1] = 50;
  }

  public Parall( float x, float y, float r, int s, int c, boolean st ) {
    this( x, y, r, s, c );
    borde = st;
  } 

  protected void drawShape() {
    quad( 0, 0, getWidth(), 0, getWidth() + getHeight(), getHeight(), getHeight(), getHeight() );
  }

  public float getHeight() {
    return size[1];
  }

  public float getWidth() {
    return size[0];
  }
}

class Level {
  protected String  name; 
  protected int     difficulty;
  protected Shape[] shapes;

  //Triangle 1
  protected PVector trans_1;
  protected float r_1;
  protected int   scl_1;
  //Triangle 2
  protected PVector trans_2;
  protected float r_2;
  protected int   scl_2;
  //Triangle 3
  protected PVector trans_3;
  protected float r_3;
  protected int   scl_3;
  //Triangle 4
  protected PVector trans_4;
  protected float r_4;
  protected int   scl_4;
  //Triangle 5
  protected PVector trans_5;
  protected float x_5, y_5, r_5;
  protected int   scl_5;
  //Square 6
  protected PVector trans_6;
  protected float r_6;
  protected int   scl_6;
  //Parallelogram 7
  protected PVector trans_7;
  protected float r_7;
  protected int   scl_7;

  public void setName( String n ) {
    name = n;
  }

  public void setDifficulty( int d ) {
    difficulty = d;
  }

  public String getName() {
    return name;
  }

  public void setValues( Shape[] shapes ) {
    setValues( shapes[0], shapes[1], shapes[2], shapes[3], shapes[4], shapes[5], shapes[6] );
  }

  public void setValues( Shape s_1, Shape s_2, Shape s_3, Shape s_4, Shape s_5, Shape s_6, Shape s_7 ) {
    this.setValues1( s_1.getTranslation().x, s_1.getTranslation().y, s_1.getRotation(), s_1.getScaling() );
    this.setValues2( s_2.getTranslation().x, s_2.getTranslation().y, s_2.getRotation(), s_2.getScaling() );
    this.setValues3( s_3.getTranslation().x, s_3.getTranslation().y, s_3.getRotation(), s_3.getScaling() );
    this.setValues4( s_4.getTranslation().x, s_4.getTranslation().y, s_4.getRotation(), s_4.getScaling() );
    this.setValues5( s_5.getTranslation().x, s_5.getTranslation().y, s_5.getRotation(), s_5.getScaling() );
    this.setValues6( s_6.getTranslation().x, s_6.getTranslation().y, s_6.getRotation(), s_6.getScaling() );
    this.setValues7( s_7.getTranslation().x, s_7.getTranslation().y, s_7.getRotation(), s_7.getScaling() );
    this.createShapes();
  }

  public void setValues1( float x, float y, float r, int scl ) {
    trans_1 = new PVector( x, y );
    r_1   = r;
    scl_1 = scl;
  }

  public void setValues2( float x, float y, float r, int scl ) {
    trans_2 = new PVector( x, y );
    r_2   = r;
    scl_2 = scl;
  }

  public void setValues3( float x, float y, float r, int scl ) {
    trans_3 = new PVector( x, y );
    r_3   = r;
    scl_3 = scl;
  }

  public void setValues4( float x, float y, float r, int scl ) {
    trans_4 = new PVector( x, y );
    r_4   = r;
    scl_4 = scl;
  }

  public void setValues5( float x, float y, float r, int scl ) {
    trans_5 = new PVector( x, y );
    r_5   = r;
    scl_5 = scl;
  }

  public void setValues6( float x, float y, float r, int scl ) {
    trans_6 = new PVector( x, y );
    r_6   = r;
    scl_6 = scl;
  }

  public void setValues7( float x, float y, float r, int scl ) {
    trans_7 = new PVector( x, y );
    r_7   = r;
    scl_7 = scl;
  }

  public void createShapes() {
    shapes    = new Shape[7];
    shapes[0] = new Triangle( trans_1.x, trans_1.y, r_1, scl_1, color( 10 ), 1 );
    shapes[1] = new Triangle( trans_2.x, trans_2.y, r_2, scl_2, color( 10 ), 1 );
    shapes[2] = new Triangle( trans_3.x, trans_3.y, r_3, scl_3, color( 10 ), 2 );
    shapes[3] = new Triangle( trans_4.x, trans_4.y, r_4, scl_4, color( 10 ), 3 );
    shapes[4] = new Triangle( trans_5.x, trans_5.y, r_5, scl_5, color( 10 ), 3 );
    shapes[5] = new Rect    ( trans_6.x, trans_6.y, r_6, scl_6, color( 10 ) );
    shapes[6] = new Parall  ( trans_7.x, trans_7.y, r_7, scl_7, color( 10 ) );
  }

  public void display() {
    for ( Shape shape : shapes )
      shape.draw();
  }
  
  String str(int i) {
    String s = i + "," + name + "," + difficulty + "," +
    trans_1.x + "," + trans_1.y + "," + r_1 + "," + scl_1 + "," + 
    trans_2.x + "," + trans_2.y + "," + r_2 + "," + scl_2 + "," + 
    trans_3.x + "," + trans_3.y + "," + r_3 + "," + scl_3 + "," + 
    trans_4.x + "," + trans_4.y + "," + r_4 + "," + scl_4 + "," + 
    trans_5.x + "," + trans_5.y + "," + r_5 + "," + scl_5 + "," + 
    trans_6.x + "," + trans_6.y + "," + r_6 + "," + scl_6 + "," + 
    trans_7.x + "," + trans_7.y + "," + r_7 + "," + scl_7;
    return s;
  }
}

class Button {
  protected boolean available;
  protected boolean mouse_on;
  protected PVector trans;
  protected PVector size;
  protected String  content;
  protected color[] colors;    //[0]->backg   [1]->text n' stroke  /  [2]->backg unavailable   [3]->text n' stroke unavailable

  Button( float x, float y, color backg, String c ) {
    content      = c;
    available    = true;
    trans        = new PVector( x, y );
    size         = new PVector( content.length()*15, 45 );
    colors       = new color[4];
    colors[0]    = backg;
    colors[1]    = color( 0 );
    //Unavailable colors
    colors[2]    = color( red( backg ), green( backg ) + 25, blue( backg ) + 50); 
    colors[3]    = color( 100 );
  }

  Button( float x, float y, String c ) {
    this( x, y, color( 255, 204, 153 ), c );
  }

  //--------------------------------------------------

  public void setAvailability( boolean a ) {
    available = a;
  }

  public void setContent( String c ) {
    content = c;
  }

  public void setTranslation( float x, float y ) {
    trans.x = x;
    trans.y = y;
  }

  public void setSize( float w, float h ) {
    size.x = w;
    size.y = h;
  }

  public boolean getAvailability() {
    return available;
  }

  public PVector getTranslation() {
    return trans;
  }

  public PVector getSize() {
    return size;
  }

  public color getColors( int c ) {
    switch( c ) {
    case 0:
      return colors[0];
    case 1:
      return colors[1];
    case 2:
      return colors[2];
    case 3:
    default:
      return colors[3];
    }
  }

  public String getContent() {
    return content;
  }

  //--------------------------------------------------

  public boolean isMouseOn() {
    if ( mouseX >= getTranslation().x && mouseX <= getTranslation().x + getSize().x &&
      mouseY >= getTranslation().y && mouseY <= getTranslation().y + getSize().y )
      return true;
    return false;
  }

  //--------------------------------------------------

  public void draw() {
    pushStyle();
    pushMatrix();
    translate( getTranslation().x, getTranslation().y );
    strokeWeight( isMouseOn() ? 1 : 2 );
    stroke( getAvailability() ? getColors( 1 ) : getColors( 3 ) );
    fill( getAvailability() ? getColors( 0 ) : getColors( 2 ) );
    rect( 0, 0, getSize().x, getSize().y, 15 );
    fill( getAvailability() ? getColors( 1 ) : getColors( 3 ) );
    textFont( florentia, 15 );
    textAlign( CENTER, CENTER );
    text( getContent(), getSize().x/2, getSize().y/2 ); 
    popMatrix();
    popStyle();
  }
}

class InputBox extends Button {
  InputBox( float x, float y, float w, float h ) {
    super( x, y, color( 255 ), "" );
    setSize( w, h );
  }

  InputBox( float y ) {
    this( 35, y, width-70, 50 );
  }

  public boolean isMouseOn() {
    return false;
  }

  public void draw() {
    pushStyle();
    pushMatrix();
    translate( getTranslation().x, getTranslation().y );
    strokeWeight( isMouseOn() ? 1 : 2 );
    stroke( getAvailability() ? getColors( 1 ) : getColors( 3 ) );
    fill( getAvailability() ? getColors( 0 ) : getColors( 2 ) );
    rect( 0, 0, getSize().x, getSize().y, 15 );
    fill( getAvailability() ? getColors( 1 ) : getColors( 3 ) );
    textFont( florentia, 15 );
    textAlign( LEFT, CENTER );
    text( getContent(), getTranslation().x+30, getSize().y/2 ); 
    popMatrix();
    popStyle();
  }
}

PFont    florentia;
Shape[]  shapes;
Button   play, create, free, save, quit, next, levels_btn;
InputBox inputName;
int      mode           = 0;    // 0 -> modo libre    /   1 -> modo creativo    /   2 -> modo solucionador 
boolean  grid_help      = true;
boolean  level_finished = false;
boolean  input_name     = false;

ArrayList<Level> Levels;
Level auxLevel;

// TODO Implemente
// 1. La manipulacion de las piezas con el mouse y el teclado  √
// 2. La evaluacion de la solucion
// 3. El modo de creacion de nuevos problemas

void setup() {
  size(800, 750);
  loadPixels();

  florentia = createFont( "florentia.ttf", 20 );
  textFont( florentia, 75 );

  Levels = new ArrayList<Level>();

  loadLevels("../src/tangram/data/Levels.csv", Levels);

  shapes    = new Shape[7];
  shapes[0] = new Triangle( 100, 1 );
  shapes[1] = new Triangle( 175, 1 );
  shapes[2] = new Triangle( 250, 2 );
  shapes[3] = new Triangle( 300, 3 );
  shapes[4] = new Triangle( 325, 3 );
  shapes[5] = new Rect( 450 );
  shapes[6] = new Parall( 500 );

  free   = new Button( 50, 30, "Modo Libre" );
  play   = new Button( 500, 30, "Jugar" );
  create = new Button( 600, 30, "Crear Nivel" );
  save   = new Button( width-230, height-130, "Guardar Nivel" );
  next   = new Button( (width/2)-200, height-145, "Siguiente nivel" );
  quit   = new Button( (width/2)+100, height-145, color(255, 100, 100), "Salir" );

  inputName = new InputBox( height-330 );
}

void draw() {

  loadPixels();
  background( mode == 1 ? color( 230 ) : color(255, 255, 186) );
  if ( grid_help )
    drawGrid(10);
  switch( mode ) {
  case 0:
    pushStyle();
    textFont( florentia, 30 );
    textAlign( CENTER, TOP );
    fill( 0 );
    text( "MODO LIBRE", 350, 30 );
    play.setContent( "Jugar" );
    popStyle();
    break;
  case 1:
    pushStyle();
    textFont( florentia, 30 );
    textAlign( CENTER, CENTER );
    fill( 0 );
    text( "MODO CREATIVO", 350, 30 );
    textFont( florentia, 20 );
    text( "Número de niveles: " + str( Levels.size() ), 350, 70 );
    popStyle();
    save.draw();
    play.setContent( "Jugar" );
    break;
  case 2:
    pushStyle();
    textFont( florentia, 30 );
    textAlign( CENTER, TOP );
    fill( 0 );
    text( "MODO\nSOLUCIONADOR", 350, 30 );
    textFont( florentia, 25 );
    text( auxLevel.getName(), 600, 100 );
    popStyle();
    play.setContent( "Otro" );
    auxLevel.display();
    int i = 0;
    for ( int j = 0; j< width*height; j++ ) {
      if ( pixels[j] == color( 10 ) )
        i++;
    }
    if ( i <= 200 ) {
      level_finished = true;
      levelFinished();
    } else 
    level_finished = false;
    break;
  }
  textFont( florentia, 15 );
  textAlign( RIGHT, BOTTOM );
  fill( 0 );
  text( "Arrastra las figuras con el puntero, cambia su ángulo con la rueda y puedes hacer efecto espejo con click derecho \nPara visualizar u ocultar la cuadricula oprime la tecla 'c' y para organizar las figuras con la tecla 'o' \nCUIDADO! La cuadricula es una ayuda para ti, mas no significa que todas las figuras se puedan colocar usándola", width, height );
  // Yo también siento nauseas al ver esta linea, lo siento 

  next.setAvailability( level_finished );
  quit.setAvailability( level_finished );

  if ( input_name ) {
    inputName.draw();
    quit.setAvailability( true );
    quit.draw();
  }

  for ( Shape shape : shapes )
    if ( !input_name ) shape.draw();
  free.draw();
  play.draw();
  create.draw();
}

void drawGrid( float scale ) {
  pushStyle();  
  strokeWeight( 2 );
  int i;
  for ( i=0; i<=width/scale; i++ ) {
    stroke(0, 0, 0, 20);
    line( i*scale, 0, i*scale, height );
  }
  for ( i=0; i<=height/scale; i++ ) {
    stroke( 0, 0, 0, 20 );
    line( 0, i*scale, width, i*scale );
  }
  popStyle();
}

void getInitPositions( Shape[] shapes ) {
  for ( Shape shape : shapes ) {
    shape.setTranslation(  shape.getInitPosition().x, shape.getInitPosition().y );
    shape.setRotation( shape.getInitRotation() );
    shape.setScaling( shape.getInitScaling() );
  }
}

void levelFinished() {
  textFont( florentia, 30 );
  textAlign( CENTER, CENTER );
  fill( 0 );
  text( "Felicidades, terminaste el nivel satisfactoriamente", width/2, height-90 );
  next.draw();
  quit.draw();
}

void saveLevel() {
  String[] rs = loadStrings("../src/tangram/data/Levels.csv");
  
  int i = Levels.size();
  Levels.add(i, new Level());
  Levels.get( i ).setName( inputName.getContent() );
  Levels.get( i ).setDifficulty( 0 ); //For now
  Levels.get( i ).setValues1( shapes[0].getTranslation().x, shapes[0].getTranslation().y, shapes[0].getRotation(), shapes[0].getScaling() );
  Levels.get( i ).setValues2( shapes[1].getTranslation().x, shapes[1].getTranslation().y, shapes[1].getRotation(), shapes[1].getScaling() );
  Levels.get( i ).setValues3( shapes[2].getTranslation().x, shapes[2].getTranslation().y, shapes[2].getRotation(), shapes[2].getScaling() );
  Levels.get( i ).setValues4( shapes[3].getTranslation().x, shapes[3].getTranslation().y, shapes[3].getRotation(), shapes[3].getScaling() );
  Levels.get( i ).setValues5( shapes[4].getTranslation().x, shapes[4].getTranslation().y, shapes[4].getRotation(), shapes[4].getScaling() );
  Levels.get( i ).setValues6( shapes[5].getTranslation().x, shapes[5].getTranslation().y, shapes[5].getRotation(), shapes[5].getScaling() );
  Levels.get( i ).setValues7( shapes[6].getTranslation().x, shapes[6].getTranslation().y, shapes[6].getRotation(), shapes[6].getScaling() );
  Levels.get( i ).createShapes();
  rs.push(Levels.get(i).str(i));

  saveStrings("../src/tangram/data/Levels.csv", rs);

  mode = 0;
  input_name = false;
  getInitPositions( shapes );
}
//--------------------------------------------------

void loadLevels( String path, ArrayList<Level> Levels) {
  String[] rows = loadStrings(path);
  for (int i = 0; i < rows.length-1; i++) {
    if (trim(rows[i+1]).length() == 0) {
      continue; // skip empty rows
    }
    if (rows[i+1].startsWith("#")) {
      continue;  // skip comment lines
    }

    // split the row on the tabs
    String[] pieces = split(rows[i+1], ",");
    // copy to the table array

    Levels.add( i, new Level() );
    Levels.get( i ).setName( pieces[1] );
    Levels.get( i ).setDifficulty( parseInt(pieces[2]) );
    Levels.get( i ).setValues1(parseFloat(pieces[3]), parseFloat(pieces[4]), radians(parseFloat(pieces[5]) ), parseInt(pieces[6]));
    Levels.get( i ).setValues2(parseFloat(pieces[7]), parseFloat(pieces[8]), radians(parseFloat(pieces[9]) ), parseInt(pieces[10]));
    Levels.get( i ).setValues3(parseFloat(pieces[11]), parseFloat(pieces[12]), radians(parseFloat(pieces[13]) ), parseInt(pieces[14]));
    Levels.get( i ).setValues4(parseFloat(pieces[15]), parseFloat(pieces[16]), radians(parseFloat(pieces[17]) ), parseInt(pieces[18]));
    Levels.get( i ).setValues5(parseFloat(pieces[19]), parseFloat(pieces[20]), radians(parseFloat(pieces[21]) ), parseInt(pieces[22]));
    Levels.get( i ).setValues6(parseFloat(pieces[23]), parseFloat(pieces[24]), radians(parseFloat(pieces[25]) ), parseInt(pieces[26]));
    Levels.get( i ).setValues7(parseFloat(pieces[27]), parseFloat(pieces[28]), radians(parseFloat(pieces[29]) ), parseInt(pieces[30]));
    Levels.get( i ).createShapes();
  }
}

//--------------------------------------------------

void keyReleased() {
  if ( input_name ) {
    if ( keyCode != ENTER )
      inputName.setContent( inputName.getContent() + String.fromCharCode(key) );
    if ( inputName.getContent().length() >= 2 ) {
      if ( keyCode == BACKSPACE )
        inputName.setContent( inputName.getContent().substring( 0, inputName.getContent().length()-2 ) );
      else if ( keyCode == ENTER )
        saveLevel();
    }
  } else {
    if ( key == 'c' || key == 'C' )
      grid_help = !grid_help;
    else if ( key == 'o' || key == 'O' )
      getInitPositions( shapes );
  }
}

void mouseMoved() {
  mouseCoordinate();
  int pointerColor = get( mouseX, mouseY );
  for ( Shape shape : shapes ) {
    if ( pointerColor == shape.clr )
      shape.mouse_on = true;
    else
      shape.mouse_on = false;
  }
}

void mousePressed() {
  for ( Shape shape : shapes ) {
    int pointerColor = get( mouseX, mouseY );
    if ( pointerColor == shape.clr ) {
      if ( mouseButton == LEFT ) {
        shape.mouse_on = true;
        float x, y;
        x = mouseX - shape.getTranslation().x;
        y = mouseY - shape.getTranslation().y;
        shape.setOffset( x, y );
      } else if ( mouseButton == RIGHT ) {
        shape.mirror();
      }
    }
  }

  if      ( free.isMouseOn() && free.getAvailability() ) {
    getInitPositions( shapes );
    mode = 0;
  } else if ( create.isMouseOn() && create.getAvailability() ) {
    getInitPositions( shapes );
    mode = 1;
  } else if ( play.isMouseOn() && play.getAvailability() ) {
    getInitPositions( shapes );
    mode = 2;
    int a = Levels.indexOf( auxLevel ), i = (int)random( 0, Levels.size() );
    if ( Levels.size() >= 2 ) while ( a == i ) i = (int)random( 0, Levels.size() );
    auxLevel = Levels.get( i );
    getInitPositions( shapes );
  } else if ( save.isMouseOn() && save.getAvailability() && mode == 1 ) {
    play.setAvailability( false );
    create.setAvailability( false );
    free.setAvailability( false );
    if ( input_name ) saveLevel();
    else {
      input_name = true;
      save.setContent( "Guardar nombre" );
      quit.setContent( "Cancelar" );
      save.setTranslation( save.getTranslation().x, save.getTranslation().y-100 );
      quit.setTranslation( save.getTranslation().x - 500, save.getTranslation().y );
    }
  } else if ( quit.isMouseOn() && quit.getAvailability() ) {
    if ( input_name ) {
      mode = 1;
      input_name = false;
      save.setTranslation( save.getTranslation().x, save.getTranslation().y+100 );
    } else exit();
  } else if ( next.isMouseOn() && next.getAvailability() ) {
    int a = Levels.indexOf( auxLevel ), i = (int)random( 0, Levels.size() );
    if ( Levels.size() >= 2 ) while ( a == i ) i = (int)random( 0, Levels.size() );
    auxLevel = Levels.get( i );
    getInitPositions( shapes );
  }
}

void mouseCoordinate() {
  int h = parseInt($("canvas")[0].style.height), 
    w = h * width / height;
  mouseX = map(mouseX, 0, w, 0, width);
  mouseY = map(mouseY, 0, h, 0, height);
}

void mouseDragged() {
  mouseCoordinate();
  for ( Shape shape : shapes ) {
    if ( shape.mouse_on ) {
      float x, y;
      x = mouseX - shape.getOffset().x;
      y = mouseY - shape.getOffset().y;
      if (grid_help)
        shape.setTranslation( x - x%10, y - y%10 );
      else
        shape.setTranslation( x, y );
    }
  }
}

void mouseScrolled() {
  float roll = mouseScroll;
  for ( Shape shape : shapes ) {
    if ( shape.mouse_on ) {
      shape.setRotation( shape.getRotation() + radians( roll*15 ) );
    }
  }
}