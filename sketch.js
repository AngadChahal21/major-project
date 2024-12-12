// 2d platformer game 
// Angadveer Chahal
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//home menu
let PARTICLE_SIZE = 15;
let menuBackground;
let p;
let particles = [];

/////////////////////////////////////////////////////////////////////////////////////////////////////////

//main game
let GameState = "startScreen";
let mainBackground;

// Tile images 
let grassImage, soilImage; // grass tiles
let waterBlockImage, waterContinuousImage, waterLeftEdgeImage, waterRightEdgeImage; // water tiles
let coinsImage; //coins tiles

//Character images
let characterIdle, characterRun, characterJump, characterAttack1;

//dimensions 
let grassW, grassH, waterW, waterH;

//groups 
let ground, soil, water, waterLeft, waterRight, waterCont, coins;

//Characters
let mainCharacter;

//
let playerRun, playerJump, playerAttack1;

//tilemaps
let tilemap, tilemap2;


//////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  waterContinuousImage = loadImage('./tileset/1Tiles/Tile_40.png');

  ///ground
  grassImage =  loadImage('./tileset/1Tiles/ground-tile.png');
  soilImage = loadImage('./tileset/1Tiles/soil.png');

  //coins
  coinsImage = loadImage('./tileset/3Animated Objects/goldCoins.png');

  //character
  characterIdle = loadImage('./characters/1 Biker/Biker_idle.png');
  characterRun = loadImage('./characters/1 Biker/Biker_run.png');
  characterJump = loadImage('./characters/1 Biker/Biker_jump.png');
  characterAttack1 = loadImage('./characters/1 Biker/Biker_attack1.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight, "pixelated x10");
  makeParticles();
  world.gravity.y = 10;
  allSprites.pixelPerfect = true;
  allSprites.autoCull = false;

  //tile dimensions
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
  coinsImage.width = 240;
  coinsImage.height = 48;

  //character dimensions;
  characterIdle.width = 768; characterIdle.height = 192;
  characterRun.width = 1152; characterRun.height = 192;
  characterJump.width = 768; characterJump.height = 192;
  characterAttack1.width = 1152; characterAttack1.height = 192;



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
  coins.addAni({h:58, w:48, row: 0, frames: 4, frameDelay: 8});
  coins.tile = 'C';

  //character
  ///////////////////////////////////////////////////////////////////////////////////////
  mainCharacter = new Sprite();
  mainCharacter.layer = 1;
  mainCharacter.collider = 'dynamic';
  mainCharacter.friction = 1;

  //initial location
  mainCharacter.x = 100;
  mainCharacter.y = 200;

  //animations 
  mainCharacter.addAnimation('idle', characterIdle,{h:192, w:192, row:0, frames:4, frameDelay:8}); //Standing/Idle
  playerRun = mainCharacter.addAnimation('running', characterRun,{h:192, w:192, row:0, frames:6, frameDelay:6}); //Running
  playerJump = mainCharacter.addAnimation('jumping', characterJump,{h:192, w:192, row:0, frames:4, frameDelay:8}); //Jumping
  playerAttack1 = mainCharacter.addAnimation('attacking1', characterAttack1, {h:192, w:192, row: 0, frames: 6, frameDelay: 6}); //Basic Attack
  
  mainCharacter.ani = 'idle';
  mainCharacter.rotationLock = true;
  ///////////////////////////////////////////////////////////////////////////////////////

  //mainCharacter.spriteSheet = characterIdle;
  //mainCharacter.addAni({h:192, w:192, row:0, frames: 4, frameDelay: 8});
  

  


  imageMode(CORNER); 

  //tilemap with 1.5x tileset vertical spacing 
  // tilemap = new Tiles([
  //   '............................',
  //   '............................',
  //   '............................',
  //   '............................',
  //   '............................',
  //   '............................'
  // ],grassImage.width / 2,height - grassImage.height / 2 * 16,grassImage.width, grassImage.height * 1.5);
 
  //tilemap with no vertical spacing between tiles 
  tilemap2 = new Tiles([
    '............................................................',
    '............................................................',
    '............................................................',
    '............................................................',
    '............................................................',
    '............................................................',
    '.......................ggggggggg............................',
    '............CCCC......gsssssssss............................',
    '............gggg.....gsssssssssss...........................',
    '....................gssssssssssss...........................',
    '...................gsssssssssssss............................',
    '.....CCC..........gssssssssssssss...........................',
    'gggggggwglccrglcrggsssssssssssssslcccccrgggggggggggggggggggg',
    'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
  ],grassImage.width / 2,height - grassImage.height / 2 * 27,grassImage.width, grassImage.height);

}

function draw() {
  background(mainBackground);

  // if player is touching any of the ground blocks, only then will he able to jump
  if(mainCharacter.colliding(water) || mainCharacter.colliding(waterLeft) || mainCharacter.colliding(waterRight) || mainCharacter.colliding(ground) || mainCharacter.colliding(waterCont)){
    if(kb.presses('up')){
      mainCharacter.ani = 'jumping';
      mainCharacter.vel.y = -7;
    }
  }

  //if player is in contact with water, slow him down
  if(mainCharacter.colliding(water) || mainCharacter.colliding(waterCont)){
   
  }

  // remove the coin if the player touches it
  if(mainCharacter.overlaps(coins)){
    coins.remove();
  }

  //Basic attack
  if(kb.pressing('space')){
    mainCharacter.ani = 'attacking1';
  }

  ///left arrow & 'A'
  if(kb.pressing('left')){
    mainCharacter.ani = 'running';
    mainCharacter.mirror.x = true;
    if(kb.pressing('shift')){
      mainCharacter.vel.x = -4.5;
      playerRun.frameDelay = 4;
      if(mainCharacter.colliding(water) || mainCharacter.colliding(waterCont)){
        mainCharacter.vel.x = -1.5;
      }
      else{
        mainCharacter.vel.x = -4.5;
      }
    }
    else{
      mainCharacter.vel.x = -2.5;
      playerRun.frameDelay = 6;
      if(mainCharacter.colliding(water) || mainCharacter.colliding(waterCont)){
        mainCharacter.vel.x = -1.5;
      }
      else{
        mainCharacter.vel.x = -2.5;
      }
    }
  }

  //right arrow & 'D'
  else if(kb.pressing('right')){
    mainCharacter.ani = 'running';
    mainCharacter.mirror.x = false;
    if(kb.pressing('shift')){
      mainCharacter.vel.x = 4.5;
      playerRun.frameDelay = 4;
      if(mainCharacter.colliding(water) || mainCharacter.colliding(waterCont)){
        mainCharacter.vel.x = 1.5;
      }
      else{
        mainCharacter.vel.x = 4.5;
      }
    }
    else{
      mainCharacter.vel.x = 2.5;
      playerRun.frameDelay = 6;
      if(mainCharacter.colliding(water) || mainCharacter.colliding(waterCont)){
        mainCharacter.vel.x = 1.5;
      }
      else{
        mainCharacter.vel.x = 2.5;
      }
    }
  }

  else{
    mainCharacter.ani = 'idle';
  }

  camera.x = mainCharacter.x + 150;   































  fill(0, 120);
  //rect(0, 0, width * 2, height * 2);
  
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
