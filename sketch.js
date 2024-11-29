// 2d platformer game 
// Angadveer Chahal
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//home menu
let PARTICLE_SIZE = 15;
let menuBackground;
let mainBackground;
let p;
let particles = [];

let GameState = "startScreen";

// Images 
let grassImage, waterImage, coinsImage, characterImage;

//

class Particle{
  constructor(x, y, color){
    this.x = x;
    this. y = y;
    this.color = color;
    this.targetX = x;
    this.targetY = y;
  }

  //mouse interaction
  update(){
    //defining vectors 
    let currentParticle = createVector(this.x, this.y);
    let mouseParticle = createVector(mouseX, mouseY);
    let totalForce = createVector(0,0);

    //defining distances
    let mouseToCurrent = p5.Vector.sub(currentParticle, mouseParticle);
    let distanceFromMouse = mouseToCurrent.mag();

    //checking for required distance
    if(distanceFromMouse < 100){
      let repulsion = map(distanceFromMouse, 100, 0, 1, 5);
      mouseToCurrent.setMag(repulsion);
    }

    //adding mouse repulsion effect
    totalForce.add(mouseToCurrent);
    this.x += totalForce.x;
    this.y += totalForce.y; 
  }

  //display particle image
  display(){
    fill(this.color);
    noStroke;
    ellipse(this.x, this.y, PARTICLE_SIZE);
  }
}

function preload(){
  menuBackground = loadImage('./pictures/menu-background.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeParticles();
}

function draw() {
  background(0);
  //background(menuBackground);
  for(let particle of particles){
    particle.update();
    particle.display();
  }
}

//pushing particles for the home menu
function makeParticles(){
  for(let i = 0; i < height*15; i+=15){
    for(let j = 0; j < width*15; j+=15){
      let color = menuBackground.get(i,j);
      particles.push(new Particle(i + 10, j - 150, color));
    }
  }
}
