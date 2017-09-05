//Image Objects
var monster_img;
var cookie_img;
var pie_img;
var cake_img;

var points; //int that tracks points scored
var bounc
var missed; //int that tracks the cookies that are missed
var prob; //represents random int value from 1 to 10. Anything that is less than a 6 means a cookie spawns. 7-8 means pie spawn. 9-10 means cake spawn
var speed = 2.5;

//Image Coordinates
var monster_x, monster_y;
var cookie_x, cookie_y;
var pie_x, pie_y;
var cake_x, cake_y;

//Restart Button/
var button;

//Mode Buttons and gamestate
var stock_button;
var surv_button;
var gameState; // 0 is survival and 1 is stock and 2 is main menu

//Music + Sounds
var cookie_snd; 
var blech_snd; //HAS NOT BEEN ADDED YET!

function preload() {
  monster_img = loadImage("assets/cookie_monster.png");
  cookie_img = loadImage("assets/cookie.png");
  cake_img = loadImage("assets/cake.png");
  pie_img = loadImage("assets/pie.png");
  cookie_snd = loadSound("assets/cookie.mp3");
}

function setup() {
  createCanvas(720, 400);
  monster_x = 150
  monster_y = height-150;
  cookie_x = 725;
  cookie_y = random(350);
  pie_x = 725; 
  pie_y =  random(350);
  cake_x = 725;
  cake_y = random(350);
  prob = random(0,11); 
  points = 0;
  missed = 0;
  button = createButton('Click to restart!');
  surv_button = createButton('Play Survival Mode');
  stock_button = createButton('Play Stock Mode');
  gameState = 2;
  
  
}

function activateSurvival() {
  gameState = 0;
}
function activateStock() {
  gameState = 1;
  surv_button.hide();
  stock_button.hide();
}
function activateMenu() {
  gameState = 2;
}
function draw() {
  if (gameState == 2) {
    surv_button.mousePressed(activateSurvival);
    stock_button.mousePressed(activateStock);
  }
  else if (gameState == 1) { //Stock Mode
    if (missed == 3) {
      loseGame();
    }
    else if (points == 10) {
      winGame(); 
    }
    else {
      background(200);
      displayPoints();
    
      image(monster_img, monster_x, monster_y);
    
      if (prob <= 6) {
        image(cookie_img, cookie_x, cookie_y);
        moveCookie();
      }
      else if (prob >= 7 && prob <= 8) {
        image(pie_img, pie_x, pie_y);
        movePie();
      }
      else {
        image(cake_img, cake_x, cake_y);
        moveCake();
      }
      moveMonster();
      checkForChomp();
    }
  }
  else {
    if (missed == 1) {
      loseGame();
    }
    else {
      background(200);
      displayPoints();
    
      image(monster_img, monster_x, monster_y);
    
      if (prob <= 6) {
        image(cookie_img, cookie_x, cookie_y);
        moveCookie();
      }
      else if (prob >= 7 && prob <= 8) {
        image(pie_img, pie_x, pie_y);
        movePie();
      }
      else {
        image(cake_img, cake_x, cake_y);
        moveCake();
      }
      moveMonster();
      checkForChomp();
    }
  }
  
}

function displayPoints() {
  fill(160);
  textSize(150);
  fill(100,255,100);
  text(points,10,370);
  fill(255,100,100);
  text(missed, 10, 120);
}
function winGame() {
  
  background(color(100,255,100));
  fill(160);
  textSize(150);
  text("You win!", 10, 200);
  button.mousePressed(restart);
  textSize(70); 
  text("Your score: " + points, 30, 300);
  
}
function loseGame() {
  background(color(255,100,100));
  fill(160);
  textSize(150);
  text("You lose!", 10, 200);
  button.mousePressed(restart);
  textSize(70); 
  text("Your score: " + points, 30, 300);
  
}
function restart() {
  points = 0;
  missed = 0;
  speed = 4;
}
function moveCookie() {
  if(cookie_x < 0) {
    cookie_x = 725;
    cookie_y = random(350);
    missed++;
    prob = random(0,11);
  }
  else 
    cookie_x -= speed;
}
function moveCake() {
  if(cake_x < 0) {
    cake_x = 725;
    cake_y = random(350);
    prob = random(0, 11);
  }
  else 
    cake_x -= speed;
}
function movePie() {
  if(pie_x < 0) {
    pie_x = 725;
    pie_y = random(350);
    prob = random(0,11);
  }
  else 
    pie_x -= speed;
}

function moveMonster() {
  if(keyIsDown(UP_ARROW) && monster_y > 0)
    monster_y -= 3;
  if(keyIsDown(DOWN_ARROW) && monster_y < height-150)
    monster_y += 3;
}

function checkForChomp() {
  //d1 is used for cookies
  var d1 = dist(cookie_x, cookie_y, monster_x, monster_y);
  if (d1 < 100) {
    cookie_snd.play();
    points++;
    cookie_x = 725;
    cookie_y = random(350);
    prob = random(0,11);
    speed++;
  }
  //d2 is used for cakes 
  var d2 = dist(cake_x, cake_y, monster_x, monster_y);
  if (d2 < 100) {
    missed++;
    cake_x = 725;
    cake_y = random(350);
    prob = random(0,11);
  }
  //d3 is used for pie
  var d3 = dist(pie_x, pie_y, monster_x, monster_y);
  if (d3 < 100) {
    missed++; 
    pie_x = 725; 
    pie_y = random(350);
    prob = random(0,11);
  }
}
