// 2d platformer game 
// Angadveer Chahal
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let PARTICLE_SIZE = 10;
let menuBackground;
let mainBackground;
let p;
let particles = [];

class Particle{
  constructor(x, y, color){
    this.x = x;
    this. y = y;
    this.color = color;
  }

  update(){

  }

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
  background(menuBackground);
  circle(mouseX, mouseY, 100);
  for(let particle of particles){
    particle.display();
  }
}

function makeParticles(){
  for(let i = 0; i < height; i+=10){
    for(let j = 0; j < width; j+=10){
      let color = menuBackground.get(i,j);
      particles.push(new Particle(i,j,color));
    }
  }
}
