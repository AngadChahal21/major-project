// 2d platformer game 
// Angadveer Chahal
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let PARTICLE_SIZE = 15;
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
  background(0);
  //background(menuBackground);
  for(let particle of particles){
    particle.update();
    particle.display();
  }
}

function makeParticles(){
  for(let i = 0; i < height*15; i+=15){
    for(let j = 0; j < width*15; j+=15){
      let color = menuBackground.get(i,j);
      particles.push(new Particle(i + 10, j - 150, color));
    }
  }
}
