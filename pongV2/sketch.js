//General Game Properties
var gameState; //0 is menu, 1 is single player game, 2 is multi player game, 3 is help, 4 is options, 5 is about the author
var points1; //keeps track of points for player 1
var points2; //player 2 points
var bounces; //times the ball has bounced since the last point was scored
var winPoints = 10; //Points needed to win the game
var background_color; //background color of menu, options, and help
var difficulty; //difficulty of single player game -- : -- 0 is Easy -- 1 is Hard

//Paddle Properties
var paddle1_x, paddle1_y;//coordinates of center of paddle
var paddle2_x, paddle2_y;//coordinates of center of paddle
var p_height = 150; //height of paddle
var p_width = 5; //paddle width
var paddle_color; //color of paddle
var paddle_speed = 10; //speed at which the paddle moves

//Ball Properties
var ball_x, ball_y; //coordinates of the center of ball
var ball_radius = 20; 
var dx; //speed in x direction
var dx_cap = 50; //maximum speed that the ball can attain
var dy; //speed in y direction
var ball_color; 

//Buttons
var buttonMenu; //Once game has ended, this button returns user to main menu
var buttonSingle; //button on home screen that tells draw handler to start a one player game
var buttonDouble; //button on home screen that tells draw handler to start a two player game
var buttonHelp; //button on home screen that takes you to a help menu
var buttonOptions;//button on home screen that takes you to an Options menu
var buttonReset;//once game has ended, this button resets the game
var easy;
var medium;
var hard;

//Sliders for Options Menu
var ballRed, ballGreen, ballBlue; 

//Music + Sounds
var blip;
var menu_snd;

//SETUP FUNCTIONS
//preloads music and images
function preload() {
    blip = loadSound("assets/blip.mp3");
    menu_snd = loadSound("assets/menu.mp3");
}
//Button setup function
function buttonSetup() {
    buttonSingle = createButton("Singleplayer");
    buttonDouble = createButton("Multiplayer");
    buttonHelp = createButton("Help");
    buttonOptions = createButton("Options");
    buttonMenu = createButton("Return to Menu");
    buttonReset = createButton("Reset");
    
    //difficulty setup
    easy = createButton("Easy");
    medium = createButton("Medium");
    hard = createButton("Hard");
}
//Main setup function. Initializes all major components
function setup() { 
    createCanvas(800,400);
    //The game starts on the Menu screen 
    gameState = 0; 
    
    //background color initialized to purple
    background_color = color(180,0,255);
    //Button objects are assigned
    buttonSetup();
    buttonMenu.position(1000,1000);
    buttonReset.position(2000,2000);
    //Keeps track of player points and bounces
    points1 = 0;
    points2 = 0;
    bounces = 0;

    //Image is created from top left --> center of ball is offset by radius in x and y direction
    ball_color = color(255,100,100);
    ball_x = 400;
    ball_y = 200;
    newSpeed();
    
    //Paddle coordinates and other properties are loaded
    paddle_color = color(240,240,240); //pale white color
    paddle1_x = p_width/2;
    paddle1_y = 200;
    paddle2_x = 800 - p_width/2;
    paddle2_y = 200;
    
    //Setup for sliders on Options screen. Initially positioned far off screen to appear invisible
    ballRed = createSlider(0, 255, 255);
    ballRed.position(4000,4000);
    ballGreen = createSlider(0, 255, 100);
    ballGreen.position(4500,4000);
    ballBlue = createSlider(0, 255, 100);
    ballBlue.position(5000,4000);
}

//DRAW & GAMESTATE FUNCTIONS
//Main draw handler. Constantly updating after program calls setup
function draw() {
    if (gameState == 0) {
        drawMenu();
        buttonSingle.mousePressed(activateSingleplayer);
        buttonDouble.mousePressed(activateMultiplayer);
        buttonHelp.mousePressed(activateHelp);
        buttonOptions.mousePressed(activateOptions);
    }
    else if (gameState == 1) {
        menu_snd.stop();
        buttonMenu.position(1000,1000);
        buttonReset.position(2000,2000);
        drawSingleplayer();
    }
    else if (gameState == 2) {
        menu_snd.stop();
        buttonMenu.position(1000,1000);
        buttonReset.position(2000,2000);
        drawMultiplayer();
    }
    else if (gameState == 3) {
        drawHelp();
    }
    else if (gameState == 4) {
        drawOptions();
    }
    else if (gameState == 5) {
        drawAuthor();
    }
}
//draws Menu to draw handler
function drawMenu() {
    background(background_color);
    if (!menu_snd.isPlaying()) {
        menu_snd.play();
    }
    fill(255);
    textAlign(CENTER);
    textFont("Times New Roman",50);
    text("Welcome to Anirudh's Pong Arcade!",400, 150);
    buttonSingle.size(100,20);
    buttonSingle.position(350,200);
    buttonDouble.size(100,20);
    buttonDouble.position(350,250);
    buttonHelp.size(100,20);
    buttonHelp.position(350, 300);
    buttonOptions.size(100,20);
    buttonOptions.position(350,350);
  
}
//changes gameState to that of Menu
function activateMenu() {
    gameState = 0;
    buttonMenu.position(1000,1000);
    buttonReset.position(2000,2000);
    ballRed.position(4000,4000);
    ballGreen.position(4500,4000);
    ballBlue.position(5000,4000);
    easy.position(5500, 4000);
    medium.position(6000, 4000);
    hard.position(6500, 4000);
}
//draws singleplayer game mode to draw handler
function drawSingleplayer() {
    if (points1 == winPoints || points2 == winPoints) {
        winGame();
    } 
    else {
        background(120);
        stroke(150);
        line(400,0,400,400);
      
        displayPoints();
      
        moveBall();
        drawBall();
        checkCollision();
      
        movePaddle1();
        movePaddle2AI();
        drawPaddle1();
        drawPaddle2();
    }
    
}
//changes gamestate to that of singleplayer
function activateSingleplayer() {
    gameState = 1; 
    buttonSingle.position(2000,1000);
    buttonDouble.position(3000,1000);
    buttonHelp.position(4000,1000);
    buttonOptions.position(5000,1000);
}
//draws multiplayer game mode to draw handler
function drawMultiplayer() {
    //background elements
    if (points1 == winPoints || points2 == winPoints) {
        winGame();
    } 
    else {
        background(120);
        stroke(150);
        line(400,0,400,400);
      
        displayPoints();
      
        moveBall();
        drawBall();
        checkCollision();
      
        movePaddle1();
        movePaddle2();
        drawPaddle1();
        drawPaddle2();
    }
    
}
//changes gamestate to that of multiplayer
function activateMultiplayer() {
    gameState = 2;
    buttonSingle.position(2000,1000);
    buttonDouble.position(3000,1000);
    buttonHelp.position(4000,1000);
    buttonOptions.position(5000,1000);
}
function drawHelp() {
    background(background_color);
    fill(255);
    textFont("Times New Roman", 40);
    text("Help", 400, 50);
    textSize(18);
    buttonMenu.size(100,20);
    buttonMenu.position(675,25);
    buttonMenu.mousePressed(activateMenu);
    textAlign(LEFT);
    text("It takes a certain kind of gamer to master the art of Pong.\nNot every gamer can handle it. Some crack.\nThey rage quit and walk away from video games forever." , 25, 100);
    
    text("ABOUT THE CREATOR: \nAnirudh is from Sammamish, Washington. Anirudh is well aware that an 'about the author' section\n is tacky for a Pong game,"
    + " but he felt uncomfortable leaving the 'Help' menu so sparse. \nHis favorite subjects in high school were American history, Spanish, and mathematics.\n"
    +" Anirudh loathes the idea of describing himself in the third person but chose to do \nso anyway for the sake of biographic convention.", 25, 200);
    textAlign(CENTER);
    
}
//changes gamestate to that of Help menu
function activateHelp() {
    gameState = 3;
    buttonSingle.position(2000,1000);
    buttonDouble.position(3000,1000);
    buttonHelp.position(4000,1000);
    buttonOptions.position(5000,1000);
}
//draws options menu to draw handler
function drawOptions() {
    background(background_color);
    fill(255);
    textFont("Times New Roman", 40);
    text("Options", 400, 50);
    buttonMenu.size(100,20);
    buttonMenu.position(675,25);
    buttonMenu.mousePressed(activateMenu);
    textSize(30);
    var offset = 0;
    text("Adjust Ball Color", 150+offset, 150);
    textSize(20);
    //Draw Sliders in visible location
    text("Red", 80+offset, 190);
    text("Green", 80+offset, 230);
    text("Blue", 80+offset, 270);
    ballRed.position(120+offset,175);
    ballGreen.position(120+offset,215);
    ballBlue.position(120+offset,255);
    var r = ballRed.value();
    var g = ballGreen.value();
    var b = ballBlue.value();
    ball_color = color(r,g,b);
    textSize(30);
    text("Adjust Difficulty", 400+offset, 150);
    textSize(20);
    text("Easy", 330+offset,190);
    text("Medium",330+offset, 230);
    text("Hard", 330+offset, 270);
    easy.position(370+offset, 190);
    medium.position(370+offset, 230);
    hard.position(370+offset, 270);
    easy.mousePressed(setEasy);
    hard.mousePressed(setHard);
}
//changes gamestate to that of options menu
function activateOptions() {
    gameState = 4; 
    buttonSingle.position(2000,1000);
    buttonDouble.position(3000,1000);
    buttonHelp.position(4000,1000);
    buttonOptions.position(5000,1000);
}

//Pong Game functions
//sets difficulty to hard
function setHard() {
    difficulty = 1;
}
function setEasy() {
    difficulty = 0;
}
//displays win game screen
function winGame() {
    //background(color(150,255,150));
    background(color(random(50,200),random(180,256),random(180,256)));
    buttonMenu.size(100,20);
    buttonMenu.position(675,25);
    buttonMenu.mousePressed(activateMenu);
    buttonReset.size(100,20);
    buttonReset.position(675, 50);
    buttonReset.mousePressed(resetGame);
    fill(ball_color);
    stroke(ball_color);
    moveBall();
    drawBall();
    wallCollision();
    fill(color(240));
    textSize(100);
    textAlign(CENTER);
    if (points1 > points2) {
        text("Player 1 wins!", 400, 200);
    }
    else {
        text("Player 2 wins!", 400, 200);
    }
}
//resets game once reset button has been clicked
function resetGame() { 
    points1 = 0;
    points2 = 0;
    bounces = 0;
}
//draws paddles and ballto draw handler
function drawPaddle1() {
    //Paddle is drawn as an offset of the center 
    //paddle coordinates since rectangles drawn from top left
    fill(paddle_color);
    stroke(paddle_color);
    rect(paddle1_x - p_width/2, paddle1_y - p_height/2, p_width, p_height);
    noStroke();
}
function drawPaddle2() {
    fill(paddle_color);
    stroke(paddle_color);
    rect(paddle2_x - p_width/2, paddle2_y - p_height/2, p_width, p_height);
    noStroke();
}
function drawBall() {
    fill(ball_color);
    stroke(ball_color);
    ellipse(ball_x, ball_y, ball_radius*2, ball_radius*2);
    noStroke();
}
//moves ball
function moveBall() {
    ball_x += dx;
    ball_y += dy;
}
//Generates new random speed for ball once a point has been scored
function newSpeed() { 
    dx = random(3,6);
    dy = random(1,6);
    /*
    var flipx = random(0,2); //controls random orientation of ball in x axis. 0 is negative, 1 is positive
    var flipy = random(0,2); //controls random orientation of ball in y axis
    if (flipx == 0) {
        dx = -dx;
    }
    if (flipy == 0) {
        dy = -dy;
    }
    */
}
//displays points to the screen
function displayPoints() {
    fill(150);
    textSize(75);
    text(CENTER);
    text(points1,350,65);
    text(points2,450,65);
    textSize(20);
    fill(color(240,240,240));
    text("Bounces: " + bounces, 700, 50);
    
}
//collision mechanics with wall and paddle during gameplay
function checkCollision() { 
    //collision for paddle 1
    //if the ball hits the right paddle
    if ((ball_x - ball_radius <= paddle1_x + p_width/2) && (ball_y >= paddle1_y - p_height/2) && (ball_y <= paddle1_y + p_height/2)) {
        if (abs(dx) < dx_cap) {
            if (dx < 0) {
                dx--;
            }
            else {
                dx++;
            }
        }
        dx = -dx;
        blip.play();
        bounces++;
    }
    else if ((ball_x - ball_radius <= paddle1_x + p_width/2) && ((ball_y <= paddle1_y - p_height/2) || (ball_y >= paddle1_y + p_height/2))) {
        points2++;
        ball_x = 400;
        ball_y = 200;
        
        newSpeed();
        
        bounces = 0;
        
    }
    //collision for paddle 2
    //if the ball hits the left paddle
    if ((ball_x + ball_radius >= paddle2_x - p_width/2) && (ball_y >= paddle2_y - p_height/2) && (ball_y <= paddle2_y + p_height/2)) {
        if (abs(dx) < dx_cap) {
            if (dx < 0) {
                dx--;
            }
            else {
                dx++;
            }
        }
        dx = -dx;
        blip.play();
        bounces++;
    }
    else if ((ball_x + ball_radius >= paddle2_x - p_width/2) && ((ball_y <= paddle2_y - p_height/2) || (ball_y >= paddle2_y + p_height/2))) {
        points1++;
        ball_x = 400;
        ball_y = 200;
        
        newSpeed();
        bounces = 0;
    }
    
    if (ball_y - ball_radius <= 0 || ball_y + ball_radius >= 400) {
        dy = -dy;
    }
    
}
//Enables the ball to bounce around freely from all the walls during the win game screen
function wallCollision() { //ball only interacts with wall 
    if (ball_x - ball_radius <= 0 || ball_x + ball_radius >= 800) {
        dx = -dx;
    }
    if (ball_y - ball_radius <= 0 || ball_y + ball_radius >= 400) {
        dy = -dy;
    }
}
//moves paddles
function movePaddle1() {
    if (keyIsDown(87) && paddle1_y - p_height/2 >= 0) {
        paddle1_y -= paddle_speed;
    }
    if (keyIsDown(83) && paddle1_y + p_height/2 <= 400) {
        paddle1_y += paddle_speed;
    }
}
function movePaddle2() {
  if (keyIsDown(UP_ARROW) && paddle2_y - p_height/2 >= 0) {
      paddle2_y -= paddle_speed;
  }
  if (keyIsDown(DOWN_ARROW) && paddle2_y + p_height/2 <= 400) {
      paddle2_y += paddle_speed;
  }
}
//Turns paddle 2 into an AI for singleplayer
function movePaddle2AI() {
    if (ball_y < paddle2_y && paddle2_y - p_height/2 >= 0) {
        if (difficulty == 1) { //HARD
            paddle2_y -= paddle_speed;
        }
        else { //EASY
            paddle2_y -= paddle_speed/4;
        }
    }
    if (ball_y > paddle2_y && paddle2_y + p_height/2 <= 400) {
        if (difficulty == 1) { //HARD
            paddle2_y += paddle_speed;
        }
        else { //EASY
            paddle2_y += paddle_speed/4;
        }
    }
}

