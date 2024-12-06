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
let grassImage, soilImage; // grass tiles
let waterBlockImage, waterContinuousImage, waterLeftEdgeImage, waterRightEdgeImage; // water tiles
let coinsImage;

//dimensions 
let grassW, grassH, waterW, waterH;

//groups 
let ground, soil, water, waterLeft, waterRight, waterCont, coins;

let tilemap, tilemap2;

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
  //backdrops
  menuBackground = loadImage('./pictures/menu-background.jpeg');
  mainBackground = loadImage('./tileset/2Background/Background.png');

  //water
  waterBlockImage = loadImage('./tileset/1Tiles/singleWater.png');
  waterLeftEdgeImage = loadImage('./tileset/1Tiles/water-left-edge.png');
  waterRightEdgeImage = loadImage('./tileset/1Tiles/water-right-edge.png');
  waterContinuousImage = loadImage('./tileset/1Tiles/water-continuous.png');

  ///ground
  grassImage =  loadImage('./tileset/1Tiles/groundTile.png');
  soilImage = loadImage('./tileset/1Tiles/soil.png');

  //coins
  coinsImage = loadImage('./tileset/3Animated Objects/coinss.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeParticles();
  world.gravity.y = 10;
  allSprites.pixelPerfect = true;

  //ground tiles dimensions
  grassImage.width = 100;
  grassImage.height = 100;

  soilImage.width = 100;
  soilImage.height = 100;

  // water tiles dimensions
  waterBlockImage.width = 100;
  waterBlockImage.height = 100;

  waterLeftEdgeImage.width = 100;
  waterLeftEdgeImage.height = 100;

  waterRightEdgeImage.width = 100;
  waterRightEdgeImage.height = 100;

  waterContinuousImage.width = 100;
  waterContinuousImage.height = 100;

  //coins dimensions
  coinsImage.width = 200;
  coinsImage.height = 50;

  //groups 

  //grass
  ground = new Group();
  ground.layer = 0;
  ground.collider = "static";
  ground.img = grassImage;
  ground.tile = 'g';

  //ground + water  + ground block
  water = new Group();
  water.layer = 0;
  water.collider = 'static';
  water.img = waterBlockImage;
  water.tile = 'w';

  //ground + water (left)
  waterLeft = new Group();
  waterLeft.layer = 0;
  waterLeft.collider = 'static';
  waterLeft.img = waterLeftEdgeImage;
  waterLeft.tile = 'l';

  //ground + water (right)
  waterRight = new Group();
  waterRight.layer = 0;
  waterRight.collider = 'static';
  waterRight.img = waterRightEdgeImage;
  waterRight.tile = 'r';

  //only water
  waterCont = new Group();
  waterCont.layer = 0;
  waterCont.collider = 'static';
  waterCont.img = waterContinuousImage;
  waterCont.tile = 'c';

  //just soil
  soil = new Group();
  soil.layer = 0;
  soil.collider = 'static';
  soil.img = soilImage;
  soil.tile = 's';

  //coins
  coins = new Group();
  coins.collider = 'static';
  coins.spriteSheet = coinsImage;
  coins.addAni({h:50, w:50, row: 0, frames: 4});
  coins.tile = 'C';
  

  imageMode(CORNER); 

  tilemap = new Tiles([
    '............................',
    '............................',
    '............g..............',
    '........ggg.................',
    '...........................',
    '............................'
  ],grassImage.width / 2,height - grassImage.height / 2 * 16,grassImage.width, grassImage.height * 1.5);
 
  tilemap2 = new Tiles([
    '.............................',
    '........CCC....................',
    '.............................',
    '.CCCC........................',
    'gwglccrglcr..................',
    'sssssssssss..................'
  ],grassImage.width / 2,height - grassImage.height / 2 * 11,grassImage.width, grassImage.height);

}

function draw() {
  background(mainBackground);
  fill(0, 120);
  rect(0, 0, width * 2, height * 2);
  //background(menuBackground);
  //for(let particle of particles){
    //particle.update();
    //particle.display();
  //}
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
