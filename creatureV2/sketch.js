//Adjusts the value of the block ratio
var DIM = 12;     
var offset = DIM; //offset is applied to each transformation in the x axis
var x = 0.0;
var bgcolor = 255
var blinked = false;
var shirtColor = 244;

function setup() {
    
    
    //Creates basic components of frame
    createCanvas(60 * DIM, 45 * DIM);
    
    
}
function drawCreature(DIM, offset) {
    //Top Hat --Rich Razzleberry
    fill(149, 69, 103);
    stroke(149, 69, 103);
    rect(7*DIM+offset, 1*DIM, 2*DIM, 6*DIM);
    rect(3*DIM+offset, 6*DIM, 10*DIM, 2*DIM);
    
    //Head + Neck --Very Vanilla
    
    fill(255, 250, 226);
    stroke(255, 250, 226);
    rect(3*DIM+offset, 8*DIM, 10*DIM, 3*DIM);
    triangle(3*DIM+offset, 11*DIM, 7*DIM+offset,11*DIM, 7*DIM+offset, 15*DIM);
    rect(7*DIM+offset, 11*DIM, 2*DIM, 5*DIM);
    triangle(9*DIM+offset, 11*DIM, 13*DIM+offset, 11*DIM, 9*DIM+offset, 15*DIM);
    
    //Arms --Very Vanilla
    rect(offset, 20*DIM, 4*DIM, 8*DIM);
    rect(12*DIM+offset, 20*DIM, 4*DIM, 8*DIM);
    // Shirt | Torso --Island Indigo 
    
    fill(shirtColor);
    stroke(shirtColor);
    rect(offset, 16*DIM, 16*DIM, 4*DIM);
    rect(4*DIM+offset, 20*DIM, 8*DIM, 8*DIM);
    // --Real Red
    fill(198,44,58);
    stroke(198,44,58);
    ellipse(8*DIM+offset,20*DIM,6*DIM, 6*DIM);
    
    
    //Legs + Pants --Strawberry Slush
    fill(239, 79, 117);
    stroke(239, 79, 117);
    rect(4*DIM+offset, 28*DIM, 8*DIM, 16*DIM);
    stroke(127, 63, 120);
    line(8*DIM+offset,32*DIM, 8*DIM+offset, 44*DIM);
    
    //Eye --Black and White
    
    fill(255, 255, 255);
    stroke(0,0,0); 
    quad(4*DIM+offset, 11*DIM, 8*DIM+offset, 9*DIM, 12*DIM+offset, 11*DIM, 8*DIM+offset, 13*DIM);
    fill(0,0,0);
    ellipse(8*DIM+offset, 11*DIM, 3*DIM, 3*DIM);
    
    //Innner Eye
    fill(40,250,140);
    ellipse(8*DIM+offset, 11*DIM, 1*DIM, 1*DIM);
}
function blink(DIM, offset) {
    //Top Hat --Rich Razzleberry
    fill(149, 69, 103);
    stroke(149, 69, 103);
    rect(7*DIM+offset, 1*DIM, 2*DIM, 6*DIM);
    rect(3*DIM+offset, 6*DIM, 10*DIM, 2*DIM);
    
    //Head + Neck --Very Vanilla
    
    fill(255, 250, 226);
    stroke(255, 250, 226);
    rect(3*DIM+offset, 8*DIM, 10*DIM, 3*DIM);
    triangle(3*DIM+offset, 11*DIM, 7*DIM+offset,11*DIM, 7*DIM+offset, 15*DIM);
    rect(7*DIM+offset, 11*DIM, 2*DIM, 5*DIM);
    triangle(9*DIM+offset, 11*DIM, 13*DIM+offset, 11*DIM, 9*DIM+offset, 15*DIM);
    
    //Arms --Very Vanilla
    rect(offset, 20*DIM, 4*DIM, 8*DIM);
    rect(12*DIM+offset, 20*DIM, 4*DIM, 8*DIM);
    // Shirt | Torso --Island Indigo 
    
    fill(shirtColor);
    stroke(shirtColor);
    rect(offset, 16*DIM, 16*DIM, 4*DIM);
    rect(4*DIM+offset, 20*DIM, 8*DIM, 8*DIM);
    // --Real Red
    fill(198,44,58);
    stroke(198,44,58);
    ellipse(8*DIM+offset,20*DIM,6*DIM, 6*DIM);
    
    
    //Legs + Pants --Strawberry Slush
    fill(239, 79, 117);
    stroke(239, 79, 117);
    rect(4*DIM+offset, 28*DIM, 8*DIM, 16*DIM);
    stroke(127, 63, 120);
    line(8*DIM+offset,32*DIM, 8*DIM+offset, 44*DIM);
    
    //Eye --Black and White
    fill(255, 255, 255);
    stroke(0,0,0); 
    quad(4*DIM+offset, 11*DIM, 8*DIM+offset, 10.5*DIM, 12*DIM+offset, 11*DIM, 8*DIM+offset, 11.5*DIM);
    
}
function hill(x, y, w, h) {
    var hillColor = color(80,255,160);
    fill(hillColor);
    arc((x+(w/2)), y, w, h, PI, 0, PIE);
}
function cloud(x, y, w, h) {
    var cloudColor = color(240, 230, 255);
    fill(cloudColor);
    stroke(cloudColor);
    ellipse(x,y,w,h);
    ellipse(x+(w/2),y,w,h);
    ellipse(x+w,y,w,h);
    ellipse(x+((3*w)/2),y,w,h);
    ellipse(x+(w/3),y-(h/2),w,h);
    ellipse(x+((2*w)/3),y-(h/2),w,h);
    ellipse(x+1.2*w,y-(h/2),w,h);
}
function draw() {
    //sets background color to bgcolor, which is randomly changed each time ENTER is pressed
    background(bgcolor);
    
    /* Code that automatically changes background color in sync with a sine wave
    var dx = PI/32;
    var amp = 1;
    if (amp == amp * sin(x)) {
        background(random(255));
        x += dx;
    }
    else {
        x += dx;
    }
    */
    //Draws Hills and Clouds
    stroke(0,0,0);
    hill(-100,600,400,500);
    hill(100,600,700,600);
    hill(0,600,600, 400);
    cloud(100, 100, 70*1.618, 70);
    cloud(400,200, 60*1.618, 60);
    
    
    //Translates the creature without displacing location of hills and clouds
    translate(mouseX-8*DIM, mouseY-20*DIM);
    stroke(0,0,0); 
    //control flow for blink state of creature. Displays depending on whether or not mouse has been pressed.
    if (!blinked) {
        drawCreature(DIM, offset);
    }
    else {
        blink(DIM, offset);
    }
    
    
}


// @Override
function keyPressed() {
    if (keyCode == ENTER) {  
        bgcolor = color(random(256), random(256), random(256));
    }
    
    if (keyCode ==  RIGHT_ARROW) {
        offset += DIM;
    }
    //moves
    if (keyCode == LEFT_ARROW) {
        offset -= DIM;
    }
    //Randomly changes color of the creature's t-shirt
    if (keyCode == UP_ARROW) {
        shirtColor = color(random(256), random(256), random(256));
    }
    
}
// @Override
function mousePressed() {
    if(mousePressed) {
        blinked = !blinked;
    }
}

