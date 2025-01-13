// 2d platformer game 
// 
// Date:
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------- VARIABLES AND CONSTANTS --------------------------------------- //

//home menu
let PARTICLE_SIZE = 15;
let menuBackground;
let p;
let particles = [];

/////////////////////////////////////////////////////////////////////////////////////////////////////////

//game mechanics

//game state
let GameState = "startGame";
let mainBackground;
let myFont;

///spawn point
respawnX = 100;
respawnY = 200;

//timer
let time = 0;
let LastTimeUpdate = 0;
let timerDelay = 1000;

// Tile images 
let grassImage, soilImage, checkpointImage; // grass tiles
let waterBlockImage, waterContinuousImage, waterLeftEdgeImage, waterRightEdgeImage; // water tiles
let coinsImage, flagImage, orbImage;

//Character images
let characterIdle, characterRun, characterJump, characterAttack1;

//tile dimensions 
let grassW, grassH, waterW, waterH;

//groups 
let ground, soil, water, waterLeft, waterRight, waterCont, coins, checkpoint, flags, orbs;

//Characters
let mainCharacter;

//animations
let playerRun, playerJump, playerAttack1;

//tilemaps
let tilemap, tilemap2;

//heart
let heartImage;

//stats
let score = 0;
let lives = 3;
let heartImages = [];
let powerUp;

let health = 100; // Player's current health
const maxHealth = 100; // Maximum health


////////////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------- CLASSES --------------------------------------------------------- //


//CLASSES
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


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------- PRELOADING IMAGES AND FONTS --------------------------------------


// PRELOADING
function preload(){

  //backdrops
  menuBackground = loadImage('./pictures/menu-background.jpeg');
  mainBackground = loadImage('./tileset/2Background/Background.png');

  //water tiles
  waterBlockImage = loadImage('./tileset/1Tiles/singleWater.png');
  waterLeftEdgeImage = loadImage('./tileset/1Tiles/water-left-edge.png');
  waterRightEdgeImage = loadImage('./tileset/1Tiles/water-right-edge.png');
  waterContinuousImage = loadImage('./tileset/1Tiles/Tile_40.png');

  ///ground tiles
  grassImage =  loadImage('./tileset/1Tiles/ground-tile.png');
  soilImage = loadImage('./tileset/1Tiles/soil.png');
  checkpointImage = loadImage('./tileset/1Tiles/ground-tile.png');

  //coins and power-ups
  coinsImage = loadImage('./tileset/3Animated objects/goldCoins.png');
  orbImage = loadImage('./tileset/3Animated objects/orb-power-up.png');

  //character
  characterIdle = loadImage('./characters/1 Biker/Biker_idle.png');
  characterRun = loadImage('./characters/1 Biker/Biker_run.png');
  characterJump = loadImage('./characters/1 Biker/Biker_jump.png');
  characterAttack1 = loadImage('./characters/1 Biker/Biker_attack1.png');

  //Flag
  flagImage = loadImage('./tileset/3Animated objects/Flag.png');
 
  //font
  myFont = loadFont('./PolygonPartyFont.ttf');

  //heart image
  heartImage = loadImage('./Images/heart.png');
  heartImage.width = 500;

  //Load heart images
  for (let i = 0; i < 3; i++) {
    heartImages.push(heartImage); 
  }

}



/////////////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------- SETUP FUNCTION ------------------------------------------------- //


//SETUP
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

  checkpointImage.width = 100;
  checkpointImage.height = 100;

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

  //flag dimensions
  flagImage.width = 384;
  flagImage.height = 96;

  //orb dimensions
  orbImage.width = 192;
  orbImage.height = 32;

  //heart dimensions

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

  //checkpoint block
  checkpoint = new Group();
  checkpoint.layer = 0;
  checkpoint.collider = "static";
  checkpoint.img = checkpointImage;
  checkpoint.tile = 'z';

  //ground + water  + ground block
  water = new Group();
  water.layer = 2;
  water.collider = 'static';
  water.img = waterBlockImage;
  water.tile = 'w';

  //ground + water (left)
  waterLeft = new Group();
  waterLeft.layer = 2;
  waterLeft.collider = 'static';
  waterLeft.img = waterLeftEdgeImage;
  waterLeft.tile = 'l';

  //ground + water (right)
  waterRight = new Group();
  waterRight.layer = 2;
  waterRight.collider = 'static';
  waterRight.img = waterRightEdgeImage;
  waterRight.tile = 'r';

  //only water
  waterCont = new Group();
  waterCont.layer = 2;
  waterCont.collider = 'static';
  waterCont.img = waterContinuousImage;
  waterCont.tile = 'c';

  //just soil
  soil = new Group();
  soil.layer = 0;
  soil.collider = 'static';
  soil.img = soilImage;
  soil.tile = 's';

  //checkpoint flags
  flags =  new Group();
  flags.layer = 2;
  flags.collider = 'none';
  flags.spriteSheet = flagImage;
  flags.addAni({h: 96, w:96, row: 0, frames: 4, frameDelay: 8 });
  flags.tile = 'f';

  //coins
  coins = new Group();
  coins.collider = 'static';
  coins.spriteSheet = coinsImage;
  coins.addAni({h:58, w:48, row: 0, frames: 4, frameDelay: 8});
  coins.tile = 'C';

  //orbs (power-up)
  orbs = new Group();
  orbs.collider = 'static';
  orbs.spriteSheet = orbImage;
  orbs.addAni({h: 32, w: 32, row: 0, frames: 6, frameDelay: 8});
  orbs.tile = 'o';

  //player
  mainCharacter = new Sprite();
  mainCharacter.layer = 1;
  mainCharacter.collider = 'dynamic';

  //collider's shape, offset, and size to adjust hitbox 
  //hitbox size
  mainCharacter.w = 90;
  mainCharacter.h = 140; 
  // hitbox center offset
  mainCharacter.anis.offset.x = 45;
  mainCharacter.anis.offset.y = -25;

  mainCharacter.friction = 10;
  //mainCharacter.drag.x = 20;

  mainCharacter.debug = false; // for visible hitbox

  //initial location
  mainCharacter.x = 100;
  mainCharacter.y = 200;

  //animations 
  mainCharacter.addAnimation('idle', characterIdle,{h:characterIdle.height, w:characterIdle.height, row:0, frames:4, frameDelay:8}); //Standing/Idle
  playerRun = mainCharacter.addAnimation('running', characterRun,{h:characterRun.height, w:characterRun.height, row:0, frames:6, frameDelay:6}); //Running
  playerJump = mainCharacter.addAnimation('jumping', characterJump,{h:characterJump.height, w:characterJump.height, row:0, frames:4, frameDelay:8}); //Jumping
  playerAttack1 = mainCharacter.addAnimation('attacking1', characterAttack1, {h:characterAttack1.height, w:characterAttack1.height, row: 0, frames: 6, frameDelay: 6}); //Basic Attack

  mainCharacter.ani = 'idle';
  mainCharacter.rotationLock = true;
  
  imageMode(CORNER); 

  // //tilemap with 1.5x tileset vertical spacing 
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
    '.....................................................................................................',
    '.....................................................................................................',
    '.....................................................................................................',
    '.....................................................................................................',
    '.....................................................................................................',
    '.....................................................................................................',
    '.....................................................................................................',
    '.....................................................................................................',
    '..................................CCCCCCCCC.................g........................................',
    '..................................ggggggggg............gg............................................',
    '...............................g..............ggggg..................................................',
    '.....CCC............f.....o..g..........o............................CCCCCCCC........................',
    'gggggggwglccrglcrgggzg...gggggggglcccccrgg....gggggggggggggggggggglccccccccccrglcrglcccccrggg........',
    'ssssssssssssssssssssss...sssssssssssssssss....ssssssssssssss.........................................', 
  ],grassImage.width / 2,height - grassImage.height / 2 * 27,grassImage.width, grassImage.height);


  //coin collection
  mainCharacter.overlaps(coins,(p,C) =>{
    C.remove();
    score++;
  });

  //orbs collection
  mainCharacter.overlaps(orbs,(p,o) =>{
    o.remove();
    powerUp = true;
  });

  // groundSensor = new Sprite();
  // groundSensor.visible = false; 
  // groundSensor.mass = 0.01;
}




//DRAW FUNCTION

function draw() {
  if(GameState === 'startScreen'){
    startScreen();
  }
  if(GameState === 'startGame'){
    startGame();
  }
}

function startScreen(){
  // rect(0, 0, width * 2, height * 2);
  
  // background(menuBackground);
  // for(let particle of particles){
  //   particle.update();
  //   particle.display();
  // }
}

function startGame(){
  background(mainBackground);

  textFont(myFont);
  fill('white');
  textSize(30);
  text('Coins collected: ' + score, width - 350, 50); // coins stat
  text('Time:' + time, 50, 50); //timer

  //hearts
  for (let i = 0; i < lives; i++) {
    image(heartImages[i], (width/2 - 100) + i * 70, -10, 70, 95); // Draw hearts spaced apart
  }

  //HEALTH BAR
  let barWidth = 200; 
  let barHeight = 20; 
  let x = width/2 + 5;
  let y = 80;
  //Bar Background 
  fill(200);
  rectMode(CENTER);
  rect(x, y, barWidth, barHeight);
  // Current health (green)
  fill(0, 255, 0);
  rect(x, y, map(health, 0, maxHealth, 0, barWidth), barHeight);
  // Border
  noFill();
  stroke(0);
  
  rect(x, y, barWidth, barHeight);
  rectMode(CORNER);

  //timer count
  if(millis() - LastTimeUpdate >= timerDelay){
    time++;
    LastTimeUpdate = millis();
  }

  // if player is touching any of the ground blocks, only then will he able to jump
  if(mainCharacter.colliding(water) || mainCharacter.colliding(waterLeft) || mainCharacter.colliding(waterRight) || mainCharacter.colliding(ground) || mainCharacter.colliding(waterCont)){
    if(kb.presses('up')){
      mainCharacter.ani = 'jumping';
      mainCharacter.vel.y = -7;
    }
  }

  //setting checkpoint
  if(mainCharacter.collides(checkpoint)){
    respawnX = mainCharacter.x;
    respawnY = mainCharacter.y;
  }

  //resetting spawnpoint after death
  if(lives === 1){
    respawnX = 100;
    respawnY = 200;
  }

  //resetting stats after death
  if(lives === 0){
    lives = 3;
    score = 0;
    time = 0;
  }


  
  ///left arrow & 'A' (left side movement)
  if(kb.pressing('left')){
    mainCharacter.ani = 'running';
    mainCharacter.mirror.x = true;

    // SHIFT FOR SPRINT
    if(kb.pressing('shift')){
      mainCharacter.vel.x = -4.5;
      playerRun.frameDelay = 4;

      //slower and sinked in water (with shift)
      if(mainCharacter.colliding(water) || mainCharacter.colliding(waterCont)){
        mainCharacter.anis.offset.y = 10;

        //faster with power-up regardless of water
        if(powerUp){
          mainCharacter.vel.x = -6;
          mainCharacter.frameDelay = 2;
          mainCharacter.friction = 7;
        }
        //no power-up
        else{
          mainCharacter.vel.x = -1.5;
        }
      }

      //no water with shift
      else{
        mainCharacter.anis.offset.y = 5;

        //higher speed during power-up
        if(powerUp){
          mainCharacter.vel.x = -6;
          mainCharacter.frameDelay = 2;
          mainCharacter.friction = 7;
        }

        //no power-up
        else{
          mainCharacter.vel.x = -4.5;
        }
      }
    }

    //NO SHIFT NO SPRINT
    else{
      mainCharacter.vel.x = -2.5;
      playerRun.frameDelay = 6;

      //water without sprint (same as water with sprint)
      if(mainCharacter.colliding(water) || mainCharacter.colliding(waterCont)){
        //power-up in water
        if(powerUp){
          mainCharacter.vel.x = -6;
          mainCharacter.frameDelay = 2;
          mainCharacter.friction = 7;
        }

        //no power-up in water
        else{
          mainCharacter.vel.x = -1.5;
        }
      }

      //no water
      else{
        if(powerUp){
          mainCharacter.vel.x = -6;
          mainCharacter.frameDelay = 2;
          mainCharacter.friction = 7;
        }
        else{
          mainCharacter.vel.x = -2.5;
        }
      }
    }
  }

  //right arrow & 'D' (Right side movement)
  else if(kb.pressing('right')){
    mainCharacter.ani = 'running';
    mainCharacter.mirror.x = false;
    if(kb.pressing('shift')){
      if(powerUp){
        mainCharacter.vel.x = 6;
        mainCharacter.frameDelay = 2;
      }
      else{
        mainCharacter.vel.x = 4.5;
      }
      playerRun.frameDelay = 4;
      if(mainCharacter.colliding(water) || mainCharacter.colliding(waterCont)){
        mainCharacter.anis.offset.y = -15;
        if(powerUp){
          mainCharacter.vel.x = 6;
          mainCharacter.frameDelay = 2;
          mainCharacter.friction = 7;
        }
        else{
          mainCharacter.vel.x = 1.5;
        }
      }
      else{
        mainCharacter.anis.offset.y = -25;
        if(powerUp){
          mainCharacter.vel.x = 6;
          mainCharacter.frameDelay = 2;
          mainCharacter.friction = 7;
        }
        else{
          mainCharacter.vel.x = 4.5;
        }
      }
    }
    else{
      mainCharacter.vel.x = 2.5;
      playerRun.frameDelay = 6;
      if(mainCharacter.colliding(water) || mainCharacter.colliding(waterCont)){
        if(powerUp){
          mainCharacter.vel.x = 6;
          mainCharacter.frameDelay = 2;
          mainCharacter.friction = 7;
        }
        else{
          mainCharacter.vel.x = 1.5;
        }
      }
      else{
        if(powerUp){
          mainCharacter.vel.x = 6;
          mainCharacter.frameDelay = 2;
          mainCharacter.friction = 7;
        }
        else{
          mainCharacter.vel.x = 2.5;
        }
      }
    }
  }


  //attack 1
  else if(kb.pressing('k')){
    mainCharacter.ani = 'attacking1';
  }

  
  else{
    mainCharacter.ani = 'idle';
  }

  // if character falls down, then respawn and decrease 1 life
  if(mainCharacter.y > height){
    mainCharacter.x  = respawnX;
    mainCharacter.y = respawnY;
    lives--;
  }
  
  
  if(lives === 0){
    lives = 3;
    score = 0;
    time = 0;
  }

  camera.x = mainCharacter.x + 150;   

  fill(0, 120);
 
}

function makeParticles(){
  for(let i = 0; i < height*15; i+=15){
    for(let j = 0; j < width*15; j+=15){
      let color = menuBackground.get(i,j);
      particles.push(new Particle(i + 10, j - 150, color));
    }
  }
}
