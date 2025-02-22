// 2d platformer game 
// Angadveer Chahal
// All needs-to-have have been accomplished
//I'm listing the nice to have that have been implemented
// - **Advanced Movement**: like sprinting, sliding, wall jumping(dashing), picking up objects, etc.
// - **Dynamic Platforms**: with rotation, horizontal and vertical movement to make the game more challenging.
// - **Parallax effect**: to create more depth in the game 
// - **Abilities**: Actual abilities like fire, ice and flying using power-ups apart from the basic health increasing one.


//Some things that you might not  instantly notice 
// used animation in every single element of the game, except blocks obviously
// Sound is relative/responsive to the player's location. What I mean is that the fireball shooting sound diminishes as you move away from the shooting enemy

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------- VARIABLES AND CONSTANTS --------------------------------------- //


//game mechanics
//game state
let gameState = "startScreen";

//still backgrounds
let mainBackground;
let mainBackgroundBlur;

//parallax layers
let layer2X = 0;
let layer3X = 0;
let layer4X = 0;
let layer5X = 0;

let myFont;

//booleans
let game = true;
let gameComplete = false;

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
let coinsImage, flagImage, orbImage, jumperImage;

//Character images
let characterIdle, characterRun, characterJump, characterAttack1;

//tile dimensions 
let grassW, grassH, waterW, waterH;

//groups 
let ground, soil, water, waterLeft, waterRight, waterCont, coins, checkpoint, flags, orbs, jumper, enemySpawnPointImage, pointer;
let pointerImage;

//Characters
let mainCharacter;
let cyborg;

//animations
let playerRun, playerJump, playerAttack1, enemyIdle, enemyRun, shootingEnemyIdle, shootingEnemyAttack, shootingEnemyDeath;

//cyborg
let cyborgRun, cyborgJump, cyborgIdle;

//tilemaps
let tilemap, tilemap2;

//heart
let heartImage;

//stats
let score = 0;
let lives = 3;
let heartImages = [];

//health
let health = 100; // Player's current health
let maxHealth = 100;  

//orb timer
let powerUp;
let orbTime = 25;
let orbLastTimeUpdate = 0;
let orbTimerDelay = 1000;

//jumper power-up
let jumperPowerUp = false;
let jumpTime = 45;
let jumpLastTimeUpdate = 0;
let jumpTimerDelay = 1000;

//parallax
let moving = false;
let layer1;
let layer2;
let layer3;
let layer4;
let layer5;

//enemies
let enemies;
let enemySpeed = 2;
let enemyGroup;
let lastDamageTime = 0;


//shooting enemy
let shootingEnemy;
let fireballGroup;
let direction;
let fireballAni;
let shooting = true;
let fireball;

//dynamic platforms 
let platforms;
let platform;
let platformImage;
let toggleTime = 4000; // Time limit in milliseconds (2 seconds)
let lastToggle = 0; 

//final platform
let centerPlatform;
let leftPlatform;
let rightPlatform;

let centerPlatformImage;
let rightPlatformImage;
let leftPlatformImage;

let finalFlag;
let finalFlagImage;



//fireball
let fireballImage1, fireballImage2, fireballImage3, fireballImage4, fireballImage5;



let enemySpawnPoint;


let allGroups;

let corner;

//music
let bgMusic;
let coinMusic;
let jumpMusic;
let powerUpMusic;
let explosionMusic;
let hurt;
let cheer;
let gameOver;
let button;
let timerTick;

let soundPlaying = false;
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------- PRELOADING IMAGES AND FONTS --------------------------------------


// PRELOADING
function preload(){

  //music
  bgMusic = loadSound('./Music/chiptuneBgMusic.mp3');
  coinMusic = loadSound('./Music/coin.wav');
  jumpMusic = loadSound('./Music/jump.wav');
  powerUpMusic = loadSound('./Music/power_up.wav');
  explosionMusic = loadSound('./Music/fireball.mp3');
  hurt = loadSound('./Music/hurt.wav');
  cheer = loadSound('./Music/woo.mp3');
  gameOver = loadSound('./Music/game-over.mp3');
  button = loadSound('./Music/button.mp3');
  timerTick = loadSound('./Music/clock-ticking.mp3');

  //backdrops
  mainBackground = loadImage('./tileset/2Background/Background.png');
  mainBackgroundBlur = loadImage('./tileset/2Background/Background.png');
  
  ///parallax backgrounds
  layer1 = loadImage('./tileset/2Background/Layers/1.png');
  layer2 = loadImage('./tileset/2Background/Layers/2.png');
  layer3 = loadImage('./tileset/2Background/Layers/3.png');
  layer4 = loadImage('./tileset/2Background/Layers/4.png');
  layer5 = loadImage('./tileset/2Background/Layers/5.png');


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
  jumperImage = loadImage('./tileset/3Animated objects/Rune.png');

  //character
  characterIdle = loadImage('./characters/1 Biker/Biker_idle.png');
  characterRun = loadImage('./characters/1 Biker/Biker_run.png');
  characterJump = loadImage('./characters/1 Biker/Biker_jump.png');
  characterAttack1 = loadImage('./characters/1 Biker/Biker_attack1.png');

  //cyborg
  cyborgIdle = loadImage('./characters/3 Cyborg/Cyborg_idle.png');
  cyborgRun = loadImage('./characters/3 Cyborg/Cyborg_run.png');
  cyborgJump = loadImage('./characters/3 Cyborg/Cyborg_jump.png');



  //enemies
  enemyIdle = loadImage('./Enemies/Mushroom/Idle.png');
  enemyRun = loadImage('./Enemies/Mushroom/Run.png');

  //shooting enemy
  shootingEnemyIdle = loadImage('./Enemies/Flying eye/Flight.png');
  shootingEnemyAttack = loadImage('./Enemies/Flying eye/Attack.png');
  shootingEnemyDeath = loadImage('./Enemies/Flying eye/Death.png');

  //Flag
  flagImage = loadImage('./tileset/3Animated objects/Flag.png');
  finalFlagImage = loadImage('./tileset/3Animated objects/Flag.png');
 
  //font
  myFont = loadFont('./PolygonPartyFont.ttf');

  pointerImage = loadImage('./tileset/4Objects/Pointers/1.png');

  //final platform
  centerPlatformImage = loadImage('./tileset/1Tiles/Tile_33.png');
  leftPlatformImage = loadImage('./tileset/1Tiles/Tile_32.png');
  rightPlatformImage = loadImage('./tileset/1Tiles/Tile_34.png');

  //heart image
  heartImage = loadImage('./Images/heart.png');
  heartImage.width = 500;

  //Load heart images
  for (let i = 0; i < 3; i++) {
    heartImages.push(heartImage); 
  }

  //platform 
  platformImage = loadImage('./tileset/1Tiles/platform.png');

  //fireballs
  fireballImage1 = loadImage('./fireball/FB500-1.png');
  fireballImage2 = loadImage('./fireball/FB500-2.png');
  fireballImage3 = loadImage('./fireball/FB500-3.png');
  fireballImage4 = loadImage('./fireball/FB500-4.png');
  fireballImage5 = loadImage('./fireball/FB500-5.png');

  //
  enemySpawnPointImage = loadImage('./tileset/1Tiles/enemySpawn.png');
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------- SETUP FUNCTION ------------------------------------------------- //


//SETUP
function setup() {
  createCanvas(windowWidth, windowHeight, "pixelated x10");


  

  world.gravity.y = 10;
  allSprites.pixelPerfect = true;
  allSprites.autoCull = false;

  //final platforms
  centerPlatformImage.width = 100; centerPlatformImage.height = 100;
  leftPlatformImage.width = 100; leftPlatformImage.height = 100;
  rightPlatformImage.width = 100; rightPlatformImage.height = 100;

  pointerImage.width = 84; pointerImage.height = 104;

  //tile dimensions
  grassImage.width = 100;
  grassImage.height = 100;

  platformImage.width = 100;
  platformImage.height = 100;

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

  //jumper power up gem dimensions
  jumperImage.width = 192;
  jumperImage.height = 48;

  //Background layers dimensions
  mainBackground.width = windowWidth;
  mainBackground.height = windowHeight;

  layer2.width = windowWidth;
  layer2.height = windowHeight;

  layer3.width = windowWidth;
  layer3.height = windowHeight;

  layer4.width =windowWidth;
  layer4.height = windowHeight;

  layer5.width = windowWidth;
  layer5.height = windowHeight;


  //character dimensions;
  characterIdle.width = 768; characterIdle.height = 192;
  characterRun.width = 1152; characterRun.height = 192;
  characterJump.width = 768; characterJump.height = 192;
  characterAttack1.width = 1152; characterAttack1.height = 192;

  //enemy dimensions
  enemyIdle.width = 1200;
  enemyIdle.height = 300;

  enemyRun.width = 2400;
  enemyRun.height = 300;

  //shooting enemy 
  shootingEnemyIdle.width = 3600;
  shootingEnemyIdle.height = 450;

  shootingEnemyAttack.width = 3600;
  shootingEnemyAttack.height = 450;

  shootingEnemyDeath.width = 1800;
  shootingEnemyDeath.height = 450;


  //fireball attack
  fireballImage1.width = 40; fireballImage1.height = 40;
  fireballImage2.width = 40; fireballImage2.height = 40;
  fireballImage3.width = 40; fireballImage3.height = 40;
  fireballImage4.width = 40; fireballImage4.height = 40;
  fireballImage5.width = 40; fireballImage5.height = 40;

  //spawn point 
  enemySpawnPointImage.width = 100;
  enemySpawnPointImage.height = 100;

  mainBackgroundBlur.filter(BLUR, 3);




  //groups 
  //grass
  if(game === true){
    ground = new Group();
    ground.layer = 0;
    ground.collider = "static";
    ground.img = grassImage;
    ground.tile = 'g';

    centerPlatform = new Group();
    centerPlatform.layer = 0;
    centerPlatform.collider = 'static';
    centerPlatform.img = centerPlatformImage;
    centerPlatform.tile = 'F';

    rightPlatform = new Group();
    rightPlatform.layer = 0;
    rightPlatform.collider = 'static';
    rightPlatform.img = rightPlatformImage;
    rightPlatform.tile = 'R';

    leftPlatform = new Group();
    leftPlatform.layer = 0;
    leftPlatform.collider = 'static';
    leftPlatform.img = leftPlatformImage;
    leftPlatform.tile = 'L';


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

    finalFlag=  new Group();
    finalFlag.layer = 2;
    finalFlag.collider = 'none';
    finalFlag.spriteSheet = flagImage;
    finalFlag.addAni({h: 96, w:96, row: 0, frames: 4, frameDelay: 8 });
    finalFlag.tile = 'E';


    //coins
    coins = new Group();
    coins.collider = 'none';
    coins.spriteSheet = coinsImage;
    coins.addAni({h:58, w:48, row: 0, frames: 4, frameDelay: 8});
    coins.tile = 'C';

    //pointer
    pointer = new Group();
    pointer.collider = 'none';
    pointer.layer = 2;
    pointer.image = pointerImage;
    pointer.tile = 'P';
    pointer.debug = false;
    pointer.y = -20;

    //orbs (power-up)
    orbs = new Group();
    orbs.collider = 'none';
    orbs.spriteSheet = orbImage;
    orbs.addAni({h: 32, w: 32, row: 0, frames: 6, frameDelay: 8});
    orbs.tile = 'o';

    //jumper power-up
    jumper = new Group();
    jumper.colldier = 'none';
    jumper.spriteSheet = jumperImage;
    jumper.addAni({h: 48, w: 48, row: 0, frames:4, frameDelay: 8});
    jumper.tile = 'j';
    jumper.h = 80;

    //platform
    platforms = new Group();
    platforms.collider = 'kinematic';
    platforms.layer = 1;
    
    platforms.image = platformImage;

    platform = new platforms.Sprite();
    platform.velocity.x = 2;

    

   

    platform.tile = 'p';


    //console.log(platform.x);

    // for(let p of platform){
    //   if(p.x >= 400){
    //     p.velocity.x = 0;
    //     console.log(p.x);
    //   }
    // }


    //enemy spawn point (not used anymore, but can be useful in the future, for further improvements in the game)
    enemySpawnPoint = new Group();
    enemySpawnPoint.collider = 'static';
    enemySpawnPoint.image = enemySpawnPointImage;
    enemySpawnPoint.tile = 'e';


    //player
    mainCharacter = new Sprite();  
    mainCharacter.layer = 1;
    mainCharacter.collider = 'dynamic';
    //collider's shape, offset, and size to adjust hitbox 
    mainCharacter.w = 90;
    mainCharacter.h = 140; 
    // hitbox center offset
    mainCharacter.anis.offset.x = 45;
    mainCharacter.anis.offset.y = -25;
    mainCharacter.friction = 10;
    mainCharacter.bounciness = 0;
    // for visible hitbox
    mainCharacter.debug = false; 
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

    enemyGroup = new Group();


    //enemies
    enemy = new Sprite();
    enemy.layer = 1;
    enemy.collider = 'dynamic';
    enemy.startX = 1000; // Left boundary
    enemy.endX = 0; // Right boundary
    enemy.velocity.x = 2; // Initial velocity
    
    //hitbox adjustments
    enemy.debug = false;
    enemy.w = 50;
    enemy.h = 70;
    enemy.anis.offset.y = -10;

    //initial location
    enemy.x = 1500;
    enemy.y = height - 300;

    enemy.addAnimation('idle', enemyIdle,{h:enemyIdle.height, w:enemyIdle.height, row:0, frames:4, frameDelay:8}); //Standing/Idle
    enemy.addAnimation('running', enemyRun,{h:enemyRun.height, w:enemyRun.height, row:0, frames:8, frameDelay:6}); //Running
    enemyGroup.add(enemy);

    //shooting enemies
    shootingEnemy = new Sprite();
    shootingEnemy.layer = 1;
    shootingEnemy.collider = 'none'; 

    shootingEnemy.debug = false;
    shootingEnemy.friction = 10000000000000;   
    shootingEnemy.w = 130;
    shootingEnemy.h = 90;

    shootingEnemy.anis.offset.y = -20;
    shootingEnemy.anis.offset.x = -5;

    shootingEnemy.x = windowWidth;
    shootingEnemy.y = height/4;
    

    shootingEnemy.addAnimation('idle', shootingEnemyIdle, { h: shootingEnemyIdle.height, w: shootingEnemyIdle.height, row: 0, frames: 8, frameDelay: 8 });
    shootingEnemy.addAnimation('attack', shootingEnemyAttack, { h: shootingEnemyAttack.height, w: shootingEnemyAttack.height, row: 0, frames: 8, frameDelay: 8 });
    shootingEnemy.addAnimation('death', shootingEnemyDeath, {h: shootingEnemyDeath.height, w: shootingEnemyDeath.height, row: 0, frames: 4, frameDelay: 10});

    shootingEnemy.ani = 'attack';
    // Shooting interval setup
    shootingEnemy.shootInterval = 60; 
    shootingEnemy.timer = 0; 


    // Create Fireball Group
    fireballGroup = new Group();


    imageMode(CORNER); 

  
    //tilemap with no vertical spacing between tiles 
    tilemap2 = new Tiles([
      '..........................................................................................................................................',
      '..........................................................................................................................................',
      '..........................................................................................................................................',
      '..........................................................................................................................................',
      '..........................................................................................................................................',
      '..........................................................................................................................................',
      '..........................................................................................................................................',
      '..........CCCCCCCCCCCCCCCCC...............................................................................................................',
      '..........geggggggggggggggg.......................C..C....................................................................................',
      '..................................CCCCCCCCC.................gggg..........................................................................',
      '..................................gggggggg....g........gg...............................................................CC................',
      '...............................g..............sgggg..............................................................CCC...C..C...............',
      '.....CCCo...CCCC..jf.........g................sssss..................CCCCCCCC................p..................C...CCCP...C....E..........',
      'gggggggwglccrglcrgggzg...ggggsggglcccccrgg....sssssggggggggggggggglccccccccccrglcrglcccccrggg.....gggggglcccccrggggggggg...LFFFFR..........',
      //'ssssssssssssssssssssss...sssssssssssssssss....sssssssssssssssssssssssssssssssssssssssssssssss.........ssssssssssssssssss....', 
    ],grassImage.width / 2,height - grassImage.height / 2 * 27,grassImage.width, grassImage.height);
   

    //array of all groups
    allGroups = [ground, soil, water, waterLeft, waterRight, waterCont, coins, checkpoint, flags, orbs, jumper, enemySpawnPoint, platform, fireballGroup, leftPlatform, rightPlatform, centerPlatform, pointer, finalFlag];

  
    //coin collection
    mainCharacter.overlaps(coins,(p,C) =>{
      coinMusic.setVolume(0.1);
      coinMusic.play();
      C.remove();
      score++;
    });

    //orbs collection
    mainCharacter.overlaps(orbs,(p,o) =>{
      powerUpMusic.setVolume(0.2);
      powerUpMusic.play();
      health+= 10;
      o.remove();
      powerUp = true;
    });

    //jumper collection
    mainCharacter.overlaps(jumper,(p,j) =>{
      powerUpMusic.setVolume(0.2);
      powerUpMusic.play();
      j.remove();
      jumperPowerUp = true;
    });

    mainCharacter.overlaps(finalFlag,(p,E) =>{
      gameComplete = true;
      gameState = 'endScreen';
    });

  }
}

//DRAW FUNCTION

function draw() {
  if(gameState === 'startScreen'){
    startScreen();
  }

  if(gameState === 'instructions'){
    instructions();
  }

  if(gameState === 'startGame'){
    allGroups.forEach(group => {
      group.visible = true; // Hide each group.
    });

    //hide sprites
    mainCharacter.visible = true;
    enemy.visible = true;
    shootingEnemy.visible = true;
    startGame();
    
  }

  if(gameState === 'endScreen'){
    endScreen();
  }
}

function startScreen(){

  allGroups.forEach(group => {
    group.visible = false; // Hide each group.
  });
  mainCharacter.visible = false;
  enemy.visible = false;
  shootingEnemy.visible = false;

  let buttonX = width/2; //x-coordinate of button
  let buttonY = 3/5 * height; //y-coordinate of button
  background(mainBackgroundBlur);
 

  let fontSize = map(width, 0, 700, 10, 65); // calculating responsive font size

  //Title text
  fill(255);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  text("Swamp Mania", width / 2, height / 2 - 100); 
  text("Swamp Mania", width / 2, height / 2 - 100); 

  //button hovered
  if(mouseX < buttonX + 225 && mouseX > buttonX - 225 && mouseY > buttonY - 55 && mouseY < buttonY + 55){
    fill(255);
    rectMode(CENTER); 
    rect(buttonX, buttonY ,450 ,110 ,80);
    fill(0);
    textSize(30);
    text("Play", buttonX, buttonY);  

    if(mouseIsPressed){
      button.play();
      gameState = "startGame";
      bgMusic.loop();
      bgMusic.setVolume(0.1);
    }
  }

  //button normal
  else{
    //button
    fill("black");
    rectMode(CENTER);
    rect(buttonX,buttonY ,450 ,100 ,80); //draw button 
    
    //button text
    fill("white");
    textSize(30);
    text("Play", buttonX, buttonY);
  }


  //2nd button hovered
  if(mouseX < buttonX + 150 && mouseX > buttonX - 150 && mouseY > buttonY + 150 - 35 && mouseY < buttonY + 150 + 35){
    fill(255);
    rectMode(CENTER); 
    rect(buttonX, buttonY + 150 ,300 ,70 ,50);
    fill(0);
    textSize(20);
    text("How to play?", buttonX, buttonY + 150);  

    if(mouseIsPressed){
      button.play();
      gameState = "instructions";
    }
  }

  //2nd button normal
  else{
    //button
    fill("black");
    rectMode(CENTER);
    rect(buttonX,buttonY + 150 ,300 ,70 ,50); //draw button 
    
    //button text
    fill("white");
    textSize(20);
    text("How to play?", buttonX, buttonY + 150);
  }

  rectMode(CORNER);
  textAlign(LEFT);
}

function startGame(){

  //setting limits for dynamic platform
  if (millis() - lastToggle > toggleTime) {
    platform.vel.x *= -1; 
    lastToggle = millis(); 
  }

  
  //PARALLAX BACKGROUND
  //layer 1
  background(layer1);

  //layer 2
  image(layer2, layer2X, 0 );
  image(layer2, layer2X + width, 0);
  if(moving){
    layer2X-= 1;
  }
  if(layer2X < -width){
    layer2X = 0;
  }

  //layer 3
  image(layer3, layer3X, 0 );
  image(layer3, layer3X + width, 0);
  if(moving){
    layer3X-= 2;
  }
  if(layer3X < -width){
    layer3X = 0;
  }

  //layer 4
  image(layer4, layer4X, 0 );
  image(layer4, layer4X + width, 0);
  if(moving){
    layer4X-= 3;
  }
  if(layer4X < -width){
    layer4X = 0;
  }

  //layer 5
  image(layer5, layer5X, 0 );
  image(layer5, layer5X + width, 0);
  if(moving){
    layer5X-=2;
  }
  if(layer5X < -width){
    layer5X = 0;
  }



  //STATS BAR

  textFont(myFont);
  fill('white');
  textSize(30);

  text('Coins collected: ' + score, width - 350, 50); // coins stat
  text('Time:' + time, 50, 50); //timer 
  
  //hearts
  for (let i = 0; i < lives; i++) {
    image(heartImages[i], width/2 - 100 + i * 70, -10, 70, 95); // Draw hearts spaced apart
  }

  //HEALTH BAR
  let barWidth = 200; 
  let barHeight = 20; 
  let x = width/2 + 5;
  let y = 80;
  //Bar Background 
  fill(200);
  
  rect(x - barWidth/2, y, barWidth, barHeight);
  // Current health (green)
  fill(0, 255, 0);

  if(health > 100){
    fill('purple');
  }

  if(health < 70){
    fill('yellow');
  }

  if(health < 50){
    fill('orange');
  }

  if(health < 20){
    fill('red');
  }

  if(health <= 0){
    health = 0;
    lives--;
    mainCharacter.x = respawnX;
    mainCharacter.y = respawnY;
    health = 100;

  }

  rect(x - barWidth/2, y, map(health, 0, maxHealth, 0, barWidth), barHeight);
  // Border
  noFill();
  stroke(0);
  
  rect(x - barWidth/2, y, barWidth, barHeight);


  //orb timer
  if(powerUp){
    if(millis() - orbLastTimeUpdate >= orbTimerDelay){
      orbTime--;
      orbLastTimeUpdate = millis();
    }

    if(orbTime < 6){
      timerTick.setVolume(1);
      timerTick.play();
      fill('red');
    }
    else{
      timerTick.stop();
      fill('white');

    }
    text('Speed pearl:' + orbTime, 400, 50); //timer

    if(orbTime < 0){
      powerUp = false;
    }

  }


  //jump timer
  if(jumperPowerUp){
    if(millis() - jumpLastTimeUpdate >= jumpTimerDelay){
      jumpTime--;
      jumpLastTimeUpdate = millis();
    }

    if(jumpTime < 11){
      if(soundPlaying === false){
        timerTick.setVolume(1);
        timerTick.play();
        soundPlaying = true;
      }
      fill('red');
    }
    else{
      timerTick.stop();
      fill('white');

    }
    text('Jump gem:' + jumpTime, 400, 100); //timer

    if(jumpTime < 0){
      jumperPowerUp = false;
    }

  }

  
  //timer count
  if(millis() - LastTimeUpdate >= timerDelay){
    time++;
    LastTimeUpdate = millis();
  }

  // if player is touching any of the ground blocks, only then will he able to jump
  if(mainCharacter.colliding(water) || mainCharacter.colliding(waterLeft) || mainCharacter.colliding(waterRight) || mainCharacter.colliding(ground) || mainCharacter.colliding(waterCont) || mainCharacter.colliding(platform) || mainCharacter.colliding(shootingEnemy) || mainCharacter.colliding(enemy)){
    if(kb.presses('up')){
      jumpMusic.setVolume(0.2);
      jumpMusic.play();
      let random = Math.random();
      if(random < 0.4){
        cheer.setVolume(0.1);
        cheer.play();
      }
      mainCharacter.ani = 'jumping';

      if(jumperPowerUp){
        mainCharacter.vel.y = -12;
      }

      else{
        mainCharacter.vel.y = -7;
      }
    }
  }

  //setting checkpoint
  if(mainCharacter.collides(checkpoint)){
    respawnX = mainCharacter.x;
    respawnY = mainCharacter.y;
  }

  if(mainCharacter.collides(enemy)){
   
    let currentTime = millis(); // Get the current time in milliseconds
  
    // Check if 1 second (1000 ms) has passed since the last damage
    if (currentTime - lastDamageTime > 1000) {
      hurt.play();
      health -= 20; // Deduct health
      lastDamageTime = currentTime; // Reset the timer
      console.log(`Player health: ${health}`);
    }
  }

  // if(mainCharacter.overlaps(shootingEnemy)){
  //   shootingEnemy.ani = 'death';
  //   shooting = false;
  //   shootingEnemy.visible = false;
  // }

  //resetting spawnpoint after death
  if(lives === 1){
    respawnX = 100;
    respawnY = 200;
  }

  enemy.velocity.x = -1;
  enemy.mirror.x = true;


  //projectile shooting enemy logic
  if(shooting){
    enemyShootingLogic(shootingEnemy, mainCharacter);
  }

  // Update fireball positions and check collisions
  for (let fireball of fireballGroup) {
    // Check collision with player
    if (fireball.overlaps(mainCharacter)) {
      hurt.play();
      health -= 30;
      fireball.remove(); // Remove the fireball on collision
    }
  }


  
  ///left arrow & 'A' (left side movement)
  if(kb.pressing('left')){
    moving = true;
    mainCharacter.ani = 'running';
    mainCharacter.mirror.x = true;

    // SHIFT FOR SPRINT
    if(kb.pressing('shift')){
      mainCharacter.vel.x = -4.5;
      playerRun.frameDelay = 4;

      //slower and sinked in water (with shift)
      if(mainCharacter.colliding(water) || mainCharacter.colliding(waterCont)){
        mainCharacter.anis.offset.y = -15;

        //faster with power-up regardless of water
        if(powerUp){
          mainCharacter.vel.x = -6;
          mainCharacter.frameDelay = 2;
          //mainCharacter.friction = 7;
        }

        //no power-up
        else{
          mainCharacter.vel.x = -1.5;
        }
      }

      //no water with shift
      else{
        mainCharacter.anis.offset.y = -25;

        //higher speed during power-up
        if(powerUp){
          mainCharacter.vel.x = -6;
          mainCharacter.frameDelay = 2;
          //mainCharacter.friction = 7;
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
        mainCharacter.anis.offset.y = -15;
        if(powerUp){
          mainCharacter.vel.x = -6;
          mainCharacter.frameDelay = 2;
          //mainCharacter.friction = 7;
        }

        //no power-up in water
        else{
          mainCharacter.vel.x = -1.5;
        }
      }

      //no water
      else{
        mainCharacter.anis.offset.y = -25;
        if(powerUp){
          mainCharacter.vel.x = -6;
          mainCharacter.frameDelay = 2;
          //mainCharacter.friction = 7;
        }
        else{
          mainCharacter.vel.x = -2.5;
        }
      }
    }
  }

  //right arrow & 'D' (Right side movement)
  else if(kb.pressing('right')){
    moving = true;
    mainCharacter.ani = 'running';
    mainCharacter.mirror.x = false;
    //shift for sprint
    if(kb.pressing('shift')){

      //power-up while sprinting (same as not sprinting)
      if(powerUp){
        mainCharacter.vel.x = 6;
        mainCharacter.frameDelay = 2;
      }

      //no power-up
      else{
        mainCharacter.vel.x = 4.5;
      }
      playerRun.frameDelay = 4;

      //water while sprinting
      if(mainCharacter.colliding(water) || mainCharacter.colliding(waterCont)){
        mainCharacter.anis.offset.y = -15;

        //water with power-up
        if(powerUp){
          mainCharacter.vel.x = 6;
          mainCharacter.frameDelay = 2;
          //mainCharacter.friction = 7  ;
        }

        //water without power-up
        else{
          mainCharacter.vel.x = 1.5;
        }
      }

      //no water while sprinting
      else{
        mainCharacter.anis.offset.y = -25;

        //power-up
        if(powerUp){
          mainCharacter.vel.x = 6;
          mainCharacter.frameDelay = 2;
          //mainCharacter.friction = 7;
        }

        //no power-up
        else{
          mainCharacter.vel.x = 4.5;
        }
      }
    }

    //no shift no sprint
    else{
      mainCharacter.vel.x = 2.5;
      playerRun.frameDelay = 6;

      //water without sprint
      if(mainCharacter.colliding(water) || mainCharacter.colliding(waterCont)){
        mainCharacter.anis.offset.y = -15;
        //power up in water
        if(powerUp){
          mainCharacter.vel.x = 6;
          mainCharacter.frameDelay = 2;
          //mainCharacter.friction = 7;
        }

        //no power-up in water without sprint
        else{
          mainCharacter.vel.x = 1.5;
        }
      }

      ///no water without sprint
      else{
        mainCharacter.anis.offset.y = -25;
        //power-up
        if(powerUp){
          mainCharacter.vel.x = 6;
          mainCharacter.frameDelay = 2;
          //mainCharacter.friction = 7;
        }

        //no power-up on ground without sprint
        else{
          mainCharacter.vel.x = 2.5;
        }
      }
    }
  }


  //idle 
  else{
    mainCharacter.ani = 'idle';
  }

  //to optimize parallax
  if(mainCharacter.velocity.x === 0){
    moving = false;
  }

  // if character falls down, then respawn and decrease 1 life
  if(mainCharacter.y > height){
    mainCharacter.x  = respawnX;
    mainCharacter.y = respawnY;
    lives--;
    if(health < 60){
      health += 30;
    }
  }
  
  
  if(lives === 0){
    
    allGroups.forEach(group => {
      group.visible = false; // Hide each group.
    });
    gameOver.setVolume(0.1);
    gameOver.play();
    gameState = 'endScreen';
  }

  camera.x = mainCharacter.x + 150;   

  fill(0, 120);
 
}


function shootFireball(enemy, target) {

  //tracking location/direction
  if(enemy.x > target.x){
    direction = -1;
    shootingEnemy.mirror.x = true;
  }
  else{
    direction = 1;
    shootingEnemy.mirror.x = false;
  }

  //calculation loudness/softness of fireball sound depending on distance from the enemy
  let distance = dist(target.x, target.y, enemy.x, enemy.y);
  let maxRange = 3000;
  let volume = map(distance, 0, maxRange, 1, 0);
  volume = constrain(volume, 0, 1); 
  
  // Create a new fireball
  fireball = new Sprite(enemy.x, enemy.y, 20, 20); 
  explosionMusic.setVolume(volume);
  explosionMusic.play();
  
  
  fireball.velocity.x = 10 * direction ; 
  fireball.life = 300; 
  fireball.bounciness = 0.3;


  fireball.addAnimation(
    fireballImage1,
    fireballImage2,
    fireballImage3,
    fireballImage4,
    fireballImage5,
  );

  
  fireballGroup.add(fireball); // Add to the group
  fireball.friction = 0;

}


function enemyShootingLogic(enemy, target) {
  enemy.timer++;
  if (enemy.timer >= enemy.shootInterval) {
    shootFireball(enemy, target); // Shoot a fireball towards the player
    enemy.timer = 0; // Reset timer
  }
}


//ENDSCREEN
function endScreen(){
  bgMusic.stop();
  
  background(0);
  

  mainCharacter.visible = false;
  fireball.visible = false;
  enemy.visible = false;
  shootingEnemy.visible = false;  

  for (let group of allGroups) {
    group.visible = false;
  }

  textFont(myFont);
  
  
  textAlign(CENTER, CENTER);
  textSize(90);
  if(gameComplete){
    fill('white');
    text("Game Completed!" , width / 2, height / 2 - 300);
  }
  else{
    fill('red');
    text("Game Over" , width / 2, height / 2 - 300); 
  }
  textSize(55);
  fill('white');
  text("You collected " + score + " coins \n \n Timed Played: " + time + "seconds" , width / 2, height / 2 - 100); 
  
  let buttonX = width/2; //x-coordinate of button
  let buttonY = 3/5 * height + 150; //y-coordinate of button


  //hovered
  if(mouseX < buttonX + 200 && mouseX > buttonX - 200 && mouseY > buttonY - 50 && mouseY < buttonY + 50){
    stroke(255);
    //strokeWeight(5);  
    fill(86, 176, 16);
    rect(buttonX, buttonY ,300 ,70 ,50);
    fill(0);
    textSize(20);
    //strokeWeight(1);
    text("Back to Home", buttonX, buttonY);  

    if(mouseIsPressed){
      button.play();
      location.reload();
    }
  }

  //button normal
  else{
    //button
    stroke(255);
    //strokeWeight(5);
    fill(116,238,21);
    rectMode(CENTER);
    rect(buttonX,buttonY ,300 ,70 ,50); //draw button 
    
    //button text
    fill(0);
    textSize(20);
    //strokeWeight(1);
    text("Back to Home", buttonX, buttonY);
  }


}


//INSTRUCTIONS
function instructions(){
  background(mainBackgroundBlur);
  textSize(55);
  fill('White');
  textFont(myFont);
  textAlign(LEFT);
  text('Controls: \n W for jump \n A for moving left \n D for moving right \n Hold shift to sprint', 100, 100);
  text('2 power ups: Jump(45s) & Speed(25s) \n 2 enemies: patrolling mushroom & fireball shooting bat \n 3 lives/hearts with a \n health bar below the hearts for each life', 100, height/2);

  let buttonX = width/2; //x-coordinate of button
  let buttonY = 4/5 * height; //y-coordinate of button

  
  textAlign(CENTER);

  //button hovered
  if(mouseX < buttonX + 150 && mouseX > buttonX - 150 && mouseY > buttonY + 150 - 35 && mouseY < buttonY + 150 + 35){
    fill(255);
    rectMode(CENTER); 
    rect(buttonX, buttonY + 150 ,300 ,70 ,50);
    fill(0);
    textSize(20);
    
    text("Back", buttonX, buttonY + 150);  

    if(mouseIsPressed){
      gameState = 'startScreen';
    }
  }

  //button normal
  else{
    //button
    fill("black");
    rectMode(CENTER);
    rect(buttonX,buttonY + 150 ,300 ,70 ,50); //draw button 
    
    //button text
    fill("white");
    textSize(20);
    text("Back", buttonX, buttonY + 150);
  }

}