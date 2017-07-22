//  ¡¡ Experimental  Game !! 
//  ¡¡  Not finished!! 
// Instructions :  move the balloon with Arrow Keys 'UP, LEFT, RIGHT'  

var Bounce = function () {
    var GRAVITY = .2;
    var bounce, floor;
    var static = false;
    var obstacles, obstacle, obstacle2, star;
    var colp = loadImage("../images/future-games/win.png");
    var lose = loadImage("../images/future-games/lose.jpg");
    var imClick = loadImage("../images/future-games/click.png");
    var enem = loadAnimation("../images/future-games/Bounce/e1.png", "../images/future-games/Bounce/e2.png", "../images/future-games/Bounce/e3.png", "../images/future-games/Bounce/e4.png", "../images/future-games/Bounce/e5.png");
    var numEne = 1;
    var GameOver = false;
    var enemies;
    var win;
    var song, sWin, sDie;
    this.setup = function () {
        background(200, 50, 100);
        song = loadSound('../sounds/future-games/all.mp3');
        song.setVolume(0.2);
        sWin = loadSound('../sounds/future-games/Stick/win.mp3');
        sDie = loadSound('../sounds/future-games/Galaga/explosion.mp3');

        //	initGame();
        GameOver = true;
        win = createSprite(width / 2, height / 2, 10, 10);
        win.addImage(imClick);
        drawSprite(win);
        //updateSprites(true);

    };
    initGame = function () {
        if (GameOver) {
            win.remove();
            GameOver = false;
        }
        bounce = createSprite(width / 2, height - 30, 30, 30);
        bounce.draw = function () {
            fill(180, 100, 100);
            ellipse(0, 0, 30, 30)
        };
        bounce.maxSpeed = 6;

        obstacles = new Group();

        enemies = new Group();

        floor = createSprite(width / 2, height, width, 30);
        floor.shapeColor = 0;
        floor.immovable = true;
        obstacles.add(floor);
        obstacle = createSprite(width / 2, height - 90, 40, 40);
        //obstacles.add(obstacle);
        obstacle.mouseActive = true;
        obstacle2 = createSprite(width / 4, height - 90, 40, 40);
        obstacle2.mouseActive = true;
        star = createSprite(width / 8, 40, 40, 40);
        star.addImage(loadImage("../images/future-games/star.png"));
        star.velocity.x = 1.5;

        for (var j = 0; j < numEne; j++) {
            var a = createSprite(width / 2, 50 * ((j + 1) * 2) + 10, 50, 50);
            enemies.add(a);

            if ((j) % 2 != 0)
                a.velocity.x = 2;
            else
                a.velocity.x = -2;
            a.addAnimation("e", enem);
            a.animation.frameDelay = 5;
        }

    }
    change = function (spr) {
        if (spr.position.x > width || spr.position.x < 0)
            spr.velocity.x *= -1;
    }
    draw = function () {
        if (!GameOver) {
            if (!song.isPlaying())
                song.play();
            Keydown();
            static = false;
            background(200, 50, 100);
            //bounce.bounce(floor);
            change(star);
            for (var i = 0; i < enemies.length; i++)
                change(enemies.get(i));
            if (!static)
                bounce.velocity.y += GRAVITY;

            bounce.position.x = constrain(bounce.position.x, 0 + bounce.width / 2, width - bounce.width / 2);
            if (obstacle.mouseIsPressed && !bounce.collide(obstacle)) {
                obstacle.position.x = mouseX;
                obstacle.position.y = mouseY;
            }
            if (obstacle2.mouseIsPressed && !bounce.collide(obstacle2)) {
                obstacle2.position.x = mouseX;
                obstacle2.position.y = mouseY;
            }
            bounce.collide(enemies, die);
            bounce.collide(obstacles, function () {
                static = true;
                bounce.velocity.y = 0;
            });
            bounce.collide(obstacle, function () {
                static = true;
                bounce.velocity.y = 0;
            });
            bounce.collide(obstacle2, function () {
                static = true;
                bounce.velocity.y = 0;
            });
            bounce.collide(star, finish);
        }
        drawSprites();



    };
    mousePressed = function () {
        if (GameOver) {

            win.remove();
            if (song.isPlaying())
                song.stop();
            song.play();
            initGame();

        }
    }
    finish = function () {
        sWin.play();
        if (GameOver == false) {
            //updateSprites(false);
            enemies.removeSprites();
            obstacles.removeSprites();
            obstacle.remove();
            obstacle2.remove();
            star.remove();
            bounce.remove();
        }
        GameOver = true;
        win = createSprite(width / 2, height / 2, 10, 10);
        win.addImage(colp);
        drawSprite(win);
        numEne = (numEne < 5 ? numEne + 1 : 5);
    }
    die = function () {
        sDie.play();
        if (GameOver == false) {
            //updateSprites(false);

            obstacles.removeSprites();
            enemies.removeSprites();
            obstacle.remove();
            obstacle2.remove();
            star.remove();
            bounce.remove();
        }
        GameOver = true;
        win = createSprite(width / 2, height / 2, 10, 10);
        win.addImage(lose);
        drawSprite(win);
    }
    Keydown = function () {
        if (keyIsDown(RIGHT_ARROW))
            bounce.velocity.x = 1.3;

        if (keyIsDown(LEFT_ARROW))
            bounce.velocity.x = -1.3;

        if (bounce.velocity.y == 0)
            if (keyIsDown(UP_ARROW)) {
                bounce.velocity.y = -6;
            }
        if (!keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
            bounce.velocity.x = 0;
        }

        return false;

    }


    newGame = function () {

    }
}

var Colors = function () {
    var fst_cube, color_Cube, n, cubes, drop;
    var count = 0;
    var GameOver = true;
    var song = loadSound('../sounds/future-games/all.mp3');
    var imp = loadSound('../sounds/future-games/Stick/win.mp3');
    var imClick = loadImage("../images/future-games/click.png");
    var win = createSprite(width / 2, height / 2, 10, 10);;
    this.setup = function () {
        colorMode(HSB, 360, 100, 100);
        //Create a group of sprites "cubes" with different colors 
        //that will be the target of the drop.
        cubes = new Group();
        song.setVolume(0.2);
        fst_cube = width / 10;

        for (var i = 0; i < 5; i++) {
            color_Cube = createSprite(fst_cube, 600, width / 5, 50);
            color_Cube.shapeColor = addColor(i);
            fst_cube += width / 5;
            cubes.add(color_Cube);
        }
        updateSprites(true);
    };

    addColor = function (n) {
        //this function gives a color according to the number in the parameter 
        var color;
        switch (n) {
            case 0:
                color = "yellow";
                break;
            case 1:
                color = "green";
                break;
            case 2:
                color = "blue";
                break;
            case 3:
                color = "red";
                break;
            case 4:
                color = "pink";
                break;
            default:
                color = 0;
        }
        return color;
    }
    // 
    var spriteEx;
    var sprScore;
    draw = function () {
        background(200, 50, 100);
        drawSprites(cubes);
        if (!GameOver) // if is playing 
        {

            drawSprites();
            drop.velocity.y = (count > 8) ? (count / 2 * 0.5) : 2;
            drop.position.x = constrain(mouseX, 0, width);


            for (var i = 0; i < 5; i++)
                if (drop.overlap(cubes[i])) // check the overlapping and send to the 
                    //function that checks it 
                    check(cubes[i], i, drop);
        } else {

            win.addImage(imClick);
            drawSprite(win);

        }
    };
    var arrScore = [];
    score = function (s) {

        text(s, 200, 200);

        for (var i = 0; i < arrScore.length; i++) {
            arrScore[i].remove();
        }
        for (var j = 0; j < s.length; j++) {
            var imgN = loadImage("../images/future-games/numbers/" + s[j] + ".png");
            if (j == arrScore.length) {
                arrScore.push(createSprite(200 + 60 * j, 200, 60, 60));
                arrScore[j].remove();
            }
            arrScore[j] = createSprite(50 + 60 * j, 50, 60, 60);
            arrScore[j].addImage(imgN);
        }

    }
    NewGame = function () // starts a new game 
    {

        var nColor = addColor(GetRandom());
        var got = loadImage("../images/future-games/" + nColor + ".png");
        drop = createSprite(width / 2, 0, 20, 20);

        drop.shapeColor = nColor;
        drop.addImage(got);
        drop.velocity.y = 30;
        score(count.toString());


    };
    check = function (cube, n, drop) //evaluate if the drop overlap was with the correct cube 
    // so, it define if continue the game, or finish it 
    {
        if (drop.shapeColor == cube.shapeColor) {
            imp.play();
            count++;
            NewGame();
        } else {
            win = createSprite(width / 2, height / 2, 10, 10);
            for (var i = 0; i < arrScore.length; i++) {
                arrScore[i].remove();
            }
            arrScore = [];
            count = 0;
            GameOver = true;
        }
    };
    //The mouse pressed is used for stating a new game 
    mousePressed = function () {
        if (GameOver) {
            win.remove();
            if (song.isPlaying())
                song.stop();
            song.play();
            GameOver = false;
            NewGame();
        }
    }
    GetRandom = function () {
        return Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    }
}

var Stick = function () {
    var stick = [];
    var top = [];
    var donut;
    var donuts = [new Group(), new Group(), new Group()];
    var colors = ["YELLOW", "ORANGE", "RED", "PINK", "PURPLE", "BLUE"]
    var selected = -1;
    var sizeSelected = 0;
    var comesFrom = -1;
    var GameOver = true;
    var colp = loadImage("../images/future-games/win.png");
    var imClick = loadImage("../images/future-games/click.png");
    var NUMBER_OF_DONUTS = 0;
    var song, sWin, sTake;
    this.setup = function () {

        background(200, 50, 100);
        song = loadSound('../sounds/future-games/Stick/theme.mp3');
        song.setVolume(0.2);
        sWin = loadSound('../sounds/future-games/Stick/win.mp3');
        sTake = loadSound('../sounds/future-games/Stick/take.mp3');
        win = createSprite(width / 2, height / 2, 10, 10);
        win.addImage(imClick);
        drawSprite(win);

    };
    finish = function () {
        updateSprites(false);
        for (var i = 0; i < 3; i++) {
            donuts[i].removeSprites();
        }
        //Count=0;

    }

    mousePressed = function () {
        if (GameOver) {
            GameOver = false;
            win.remove();
            if (NUMBER_OF_DONUTS < 6)
                NUMBER_OF_DONUTS++;
            initGame(NUMBER_OF_DONUTS);
        }


    }

    var win;
    draw = function () {
        background(200, 50, 100);
        if (!song.isPlaying() && !GameOver)
            song.play();
        if (donuts[2].length == NUMBER_OF_DONUTS && NUMBER_OF_DONUTS > 0) {

            if (GameOver == false)
                finish();
            GameOver = true;
            if (song.isPlaying())
                song.stop()
            sWin.play();
            win = createSprite(width / 2, height / 2, 10, 10);
            win.addImage(colp);
            drawSprite(win);


        }
        for (var i = 0; i < 3; i++)
            takeOne(i);
        if (selected != -1) {
            donuts[comesFrom][selected].position.y = 300;
            for (var i = 0; i < 3; i++)
                grabOne(i)
        }

        drawSprites();
    }

    initGame = function (n) {


        updateSprites(true);
        if (song.isPlaying())
            song.stop();
        song.play();
        selected = -1;
        sizeSelected = 0;
        comesFrom = -1;
        GameOver = false;
        donuts = [new Group(), new Group(), new Group()];
        for (var i = top.length; i < 3; i++) {
            stick.push(createSprite(width * (i + 1) / 4, 500, 20, 300));
            top.push(createSprite(width * (i + 1) / 4, 340, 20, 20));
            top[i].shapeColor = "BLACK";
            stick[i].shapeColor = "WHITE";
            stick[i].mouseActive = true;
            top[i].mouseActive = true;
        }
        for (var i = 0; i < n; i++) {

            donut = createSprite(width / 4, 600 - (i * 40 + 20), 150 - (i * 20), 40);
            donut.shapeColor = colors[i];
            donuts[0].add(donut);
            donuts[0][i].mouseActive = true;
        }

        drawSprites();

    };
    grabOne = function (n) {
        if (top[n].mouseIsPressed) {

            if (donuts[n].length == 0 || donuts[n][donuts[n].length - 1].width > sizeSelected) {
                donuts[n].add(createSprite(width * (n + 1) / 4, 600 - (donuts[n].length * 40 + 20), sizeSelected, 40));
                donuts[n][donuts[n].length - 1].shapeColor = donuts[comesFrom][selected].shapeColor;
                donuts[n][donuts[n].length - 1].mouseActive = true;
                donuts[comesFrom][selected].remove();
                selected = -1;
            } else if (donuts[n][donuts[n].length - 1].width == sizeSelected) {
                donuts[n][donuts[n].length - 1].position.y = 600 - ((donuts[n].length - 1) * 40 + 20)
                selected = -1;
            }
            sTake.play();
        }
    }


    takeOne = function (n) {

        if (donuts[n].length > 0) {
            if (donuts[n][donuts[n].length - 1].mouseIsPressed && selected == -1) {
                sTake.play();
                selected = donuts[n].length - 1;
                sizeSelected = donuts[n][selected].width;
                //donuts1[donuts1.length-1].remove();
                comesFrom = n;
            }
        }
    }

}

var Cloud = function () {
    var GRAVITY = .09;
    var panfu, GameOver;
    var cloud, clouds, Count = 0;
    var floor;
    var cloimg, colp, mont, trans;
    var v;
    this.setup = function () {

        colp = loadImage("../images/future-games/colpatria.png");
        mont = loadImage("../images/future-games/mount.png");
        clouds = new Group();
        cloimg = loadImage("../images/future-games/whitecloud.png", 20, 20);
        trans = loadImage("../images/future-games/transmilenio.png", 30, 109);
        GameOver = true;
        panfu = createSprite(width / 2, height / 2, 30, 30);
        panfu.shapeColor = 255;
        panfu.addImage(trans);

        floor = createSprite(width / 2, height, width, 30);
        floor.shapeColor = 35;
        floor.immovable = true;
    };

    draw = function () {
        background(200, 50, 100);
        panfu.bounce(floor);
        if (!GameOver) {

            panfu.velocity.y += GRAVITY;

            if (panfu.position.y > v + height / 2)
                die();
            camera.off();
            image(mont, 0, 200, width, height);
            image(colp, width / 2, 90, 100, 520);
            camera.on();
            textSize(30);
            text(Count, width - 40, v)
            panfu.position.x = constrain(mouseX, 0, width - panfu.width / 2);
            panfu.overlap(clouds, removecloud);

            for (var i = 0; i < clouds.length; i++) {
                if (clouds[i].position.y > panfu.position.y + height / 2) {
                    clouds[i].remove();
                    cloud = createSprite(random(0, width), panfu.position.y - height, 70, 30)
                    cloud.addImage(cloimg);
                    clouds.add(cloud);
                    cloud.immovable = true;
                }
            }

            drawSprites(clouds);
        }

        if (v > panfu.position.y)
            v = panfu.position.y;


        camera.position.y = constrain(panfu.position.y, v, v - height / 2);
        if (GameOver)
            text("New Game", width / 2, height / 2);
        drawSprite(panfu);
        cloud = createSprite(random(0, width), panfu.position.y - height, 70, 30)
        drawSprite(floor);

    };

    die = function () {
        updateSprites(false);
        clouds.removeSprites();
        GameOver = true;
        //Count=0;

    }
    mousePressed = function () {
        if (GameOver)
            newGame();
    }

    newGame = function () {
        Count = 0;
        panfu.position.x = width / 2;
        panfu.position.y = height / 2;
        GameOver = false;
        v = height / 2;
        updateSprites(true);
        panfu.velocity.y = 0;
        //Creates a group of 3-4 cloud for the game 
        for (var i = 0; i < random(3, 4); i++) {
            cloud = createSprite(random(0, width), random(0, height - 30), 70, 30)
            cloud.addImage(cloimg);
            clouds.add(cloud);
            cloud.immovable = true;
        }

    }
    removecloud = function (pan, cloud) {
        cloud.remove();
        // this give the panfu a special velocity for the jump after the collision 
        panfu.velocity.y = -8;
        // and create a new one after removing the one of the collition
        cloud = createSprite(random(0, width), panfu.position.y - height, 70, 30)
        cloud.addImage(cloimg);
        clouds.add(cloud);
        cloud.immovable = true;
        //this is used for counting the score	
        Count++;

    }
}

// This version only contain 2 levels. for the nonce...

// Instructions: move the plane with the mouse 
// and shoot with a click (max 3 bullets) for kill the Aliens  and Winn!!!!! 
//
//
var Galaga = function () {
    var Plane;
    var img;
    var psize = 50,
        GameOver, moved;
    var asteroids, Count, level = 0,
        lifes;
    var bulls;
    var frame = 1;
    var ROWS = 5,
        COL = 12,
        total;
    var bgImg, planeimg, bbee, gbee;
    var destroyed, destroyed2, laser, start, explosion, wins;
    
    this.setup = function () {
        // ####Animaciones ####
        bgImg = loadAnimation("../images/future-games/Galaga/back1.png", "../images/future-games/Galaga/back2.png", "../images/future-games/Galaga/back3.png", "../images/future-games/Galaga/back4.png");
        planeimg = loadImage("../images/future-games/Galaga/Galaga.png");
        bbee = loadAnimation("../images/future-games/Galaga/bbee1.png", "../images/future-games/Galaga/bbee2.png");
        gbee = loadAnimation("../images/future-games/Galaga/gbee1.png", "../images/future-games/Galaga/gbee2.png");
        destroyed = loadSound('../sounds/future-games/Galaga/galaga_destroyed.mp3');
        destroyed2 = loadSound('../sounds/future-games/Galaga/galaga_destroyed2.mp3');
        laser = loadSound('../sounds/future-games/Galaga/laser.mp3');
        start = loadSound('../sounds/future-games/Galaga/start.mp3');
        explosion = loadSound('../sounds/future-games/Galaga/explosion.mp3');
        wins = loadSound('../sounds/future-games/Galaga/coin_credit.mp3');
        frameRate(frame);
        laser.setVolume(0.2);
        destroyed.setVolume(0.4);
        destroyed2.setVolume(0.5);
        bgImg.frameDelay = 11;
        GameOver = true;
        asteroids = new Group();
        bulls = new Group();
        Plane = createSprite(width / 2, height / 1.2, psize, psize);
        Plane.addImage(planeimg);
        textAlign(CENTER);
        textSize(50);
        fill(0, 100, 100);
        text("Click New Game", width / 2, height / 2);
    };

    draw = function () {
        fill(0, 100, 100);
        textSize(20);
        textAlign(CENTER);
        if (!GameOver) {
            background(0);
            animation(bgImg, width / 2, height / 2);
            Plane.position.x = constrain(mouseX, psize / 2, width - psize / 2);

            for (var i = 0; i < bulls.length; i++)
                if (bulls[i].position.y < 0) {
                    bulls[i].remove();
                }



            for (var i = 0; i < asteroids.length; i++) //Die 
                if (asteroids[i].position.y > height / 1.2) {
                    asteroids[i].remove();
                    die();
                }

            if (asteroids.length <= 0) {
                win();
                text("WIN!!!, Click Next Level", width / 2, height / 2);
            }

            r = parseInt(random(0, asteroids.length));


            if (second() % 2) {
                moved = true;
            }

            if (second() % 2 == 0 && moved) {
                movebee();
            }

            ///Highs score and Lifes 
            text("HIGH SCORE " + lifes, width / 1.2, height / 1.1 + 20);
            fill(255);
            text(Count, width / 1.2, height / 1.1 + 40)
            for (var i = 0; i < lifes; i++)
                image(planeimg, i * 50, height / 1.1, 40, 40);
            ///
            asteroids.overlap(bulls, erase); // Bulls and Asteroids overlap
            drawSprites();
        }
    };

    movebee = function () {
        r = parseInt(random(asteroids.length));
        asteroids[r].setSpeed(1, 90);
        asteroids[r].rotationSpeed = 3;
        moved = false;
    }

    newgame = function () {
        updateSprites(true);
        Count = 0;
        total = 0;
        lifes = 3;
        GameOver = false;
        levels(level);
        moved = true;
        start.play();
    }

    die = function () {
        explosion.play();
        lifes--;
        if (lifes < 0) {
            GameOver = true;
            updateSprites(false);
            text("Click Again", width / 2, height / 2);
            asteroids.removeSprites();
        }
    }

    win = function () {
        wins.play();
        GameOver = true;
        level++;
        updateSprites(false);
        fill(0, 100, 100);
        asteroids.removeSprites();
    }

    mousePressed = function () {
        if (bulls.length < 3) {
            var s = createSprite(constrain(mouseX, psize / 2, width - psize / 2), height / 1.2 - 10, 5, 10);
            bulls.add(s);
            s.velocity.y = -4;
            s.life = height / 1.5;
            laser.play();
        }
        if (GameOver)
            newgame();
    };
    
    erase = function (asteroid, bull) {
        if (asteroid.getAnimationLabel() == 'blue')
            destroyed.play();
        else
            destroyed2.play();
        bull.remove();
        asteroid.remove();
        Count++;
    };

    levels = function (level) //Retorna el nivel deseado 
    {
        switch (level) {
            case 0:
                // !!!!!! LEVEL #1 !!!!!!!
                for (var i = 0; i < ROWS; i++) {
                    for (var j = i; j < COL - i; j++) {
                        var a = createSprite(25 * (j + 1), 25 * (i + 1), 20, 20);
                        asteroids.add(a);
                        total++; //total asteroid
                        if ((j + i) % 2 != 0)
                            a.addAnimation("green", gbee);
                        else
                            a.addAnimation("blue", bbee);
                        a.animation.frameDelay = 50;

                    }
                    for (var j = ROWS - i - 1; j < COL - (ROWS - i - 1); j++) {
                        var a = createSprite(25 * (j) + 25 * COL, 25 * (i + 1), 20, 20);
                        asteroids.add(a);
                        total++; // Total asteroid
                        if ((j + i) % 2 != 0)
                            a.addAnimation("green", gbee);
                        else
                            a.addAnimation("blue", bbee);
                        a.animation.frameDelay = 50;
                    }
                }
                break;
            case 1:
                //!!!!!!! LEVEL # 2 !!!!!!!
                for (var i = 0; i < ROWS; i++) {
                    for (var j = i; j < COL - i; j++) {
                        var a = createSprite(45 * (j + 1), 25 * (i + 1), 20, 20);
                        asteroids.add(a);
                        a.velocity.y = 0.1;
                        total++; //Total Asteroid 
                        if ((j + i) % 2 != 0)
                            a.addAnimation("green", gbee);
                        else
                            a.addAnimation("blue", bbee);
                        a.animation.frameDelay = 50;
                    }
                }
                break;
        }
    };

}

// 0 Galaga, 1 Cloud, 2 Stick, 3 Colors, 4 Bounce; 
//
//
var sketch = function (p) {
    var game, play, numbergames = 5,
        bool = false;
    var square, Squares;
    var tex = ["Galaga", "Cloud", "Stick", "Colors", "Bounce"]
    var imgs = [];
    var canvas;
    
    setup = function () { //Overwrite
        canvas = createCanvas(600, 600);
        canvas.canvas.parentElement.removeChild(canvas.canvas)
        document.getElementById("future-games").appendChild(canvas.canvas)
        colorMode(HSB, 360, 100, 100);
        play = false;
        setImages();
        Squares = new Group();
        for (var i = 0; i < numbergames; i++) {
            square = createSprite(100 * (i + 1), height / 2, 60, 60);
            Squares.add(square);
            square.mouseActive = true;
        }
    };

    draw = function () { //Overwrite
        background(0, 50, 100);

        if (!play) {
            for (var i = 0; i < numbergames; i++) {
                if (Squares[i].mouseIsOver) {
                    image(imgs[i], 0, 0, 600, 600);
                    fill(5, 95, 100);
                    textFont("Helvetica");
                    textAlign(CENTER);
                    textSize(50);
                    text(tex[i], width / 2, 100);
                }
                if (Squares[i].mouseIsPressed) {
                    selected(i);
                    break
                }
            }

            drawSprites();
        }

    };

    selected = function (n) {
        Squares.removeSprites();
        switch (n) {
            case 0:
                game = new Galaga;
                game.setup();
                break;
            case 1:
                game = new Cloud;
                game.setup();
                break;
            case 2:
                game = new Stick;
                game.setup();
                break;
            case 3:
                game = new Colors;
                game.setup();
                break;
            case 4:
                game = new Bounce;
                game.setup();
                break;
            default:
                break;
        }
        play = true;
    };

    setImages = function () {
        imgs.push(loadImage("../images/future-games/Galaga.png"));
        imgs.push(loadImage("../images/future-games/Cloud.png"));
        imgs.push(loadImage("../images/future-games/stick.png"));
        imgs.push(loadImage("../images/future-games/colors.png"));
        imgs.push(loadImage("../images/future-games/bounce.png"));
    }
}

sketch()