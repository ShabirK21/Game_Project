/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// game character variables
let gameChar_x;
let gameChar_y;
let floorPos_y;
let gameChar_width;
let gameChar_world_x;
// character movement variables
let isLeft;
let isRight;
let isFalling;
let isPlummeting;
// game scrolling variable
let scrollPos;
// scenery variables
let clouds;
let mountain;
let snow;
let tree;
let trees_x;
let canyons;
let collectables;
let snowflakes;
let canyon_icicle;
let currentScale;
// other variables
let game_score;
let char_lives;
let gameMode;
let jumpSound;
let platforms;
let onPlatform;
let enemies;
let char;
let fire;
let particles;
let startButton;
let rulesButton;
let backButton;
// Main Functions

// setup function calling game setup
function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;

  char_lives = 3;

  game_setup();
}

// Preload splash screen image
function preload() {
  soundFormats("mp3", "wav");
  jumpSound = loadSound("./Assets/jump.wav");
  jumpSound.setVolume(0.1);
  arcadeFont = loadFont("./Assets/ARCADECLASSIC.TTF");
  arrowKeys = loadImage("./Assets/ArrowKeys.png");
  startButtonImg = loadImage("./Assets/start.png");
  rulesButtonImg = loadImage("./Assets/rules.png");
  backButtonImg = loadImage("./Assets/back.png");
}

// Call all splashscreen and main game functions
function draw() {
  if (gameMode == 1) {
    splashScreen();
  } else if (gameMode == 2) {
    gamePlay();
  } else if (gameMode == 3) {
    rules();
  }
}

// Splash screen
function splashScreen() {
  background("#B1E8FF");
  textFont(arcadeFont);
  textSize(100);
  textAlign(CENTER, TOP);
  text("Snow Runner", 0, 12, width);
  textSize(50);
  text("Controls", width / 2 + 380, height / 2 + 120);
  image(arrowKeys, width / 2 + 50, height / 2 + 50, 200, 200);
  image(startButtonImg, width / 2 - 400, height / 2 + 50, 200, 100);
  image(rulesButtonImg, width / 2 - 385, height / 2 + 150, 170, 75);
  createButtons();
}

// Main game function, calling all other functions
function gamePlay() {
  background("#B1E8FF");
  textFont("calibri");
  noStroke();
  fill(255, 250, 250);
  rect(0, floorPos_y, width, height - floorPos_y);
  fill("#684132");
  rect(0, floorPos_y + 50, width, height - floorPos_y);

  push();
  translate(scrollPos, 0);

  // Draw the scenery
  Clouds.drawClouds();
  drawMountain();
  drawTree();
  Canyons.drawCanyons();
  drawSnowman();
  Snow.drawSnow();
  Collectables.drawCollectables();
  drawFlagpole();
  Platforms.drawPlatforms();
  Enemies.drawEnemies();
  pop();
  drawGameScore();
  drawLives();

  // Draw the Game Character
  if (isLeft && isFalling) {
    drawJumpLeft();
  } else if (isRight && isFalling) {
    drawJumpRight();
  } else if (isLeft) {
    drawWalkLeft();
  } else if (isRight) {
    drawWalkRight();
  } else if (isFalling || isPlummeting) {
    drawJumpUp();
  } else {
    drawFacingFront();
  }

  // Interaction
  var IsGameOver = checkIsGameOver();
  if (IsGameOver == true) {
    drawGameOver();
    return;
  }

  if (isPlummeting == true) {
    gameChar_y += 5;
    checkIfCharacterDead();
    return;
  }

  if (gameChar_y < floorPos_y) {
    isFalling = true;
  } else {
    isFalling = false;
  }

  if (isLeft) {
    if (gameChar_x > width * 0.2) {
      gameChar_x -= 5;
    } else {
      scrollPos += 5;
    }
  } else if (isRight) {
    if (gameChar_x < width * 0.8) {
      gameChar_x += 5;
    } else {
      scrollPos -= 5;
    }
  }
  gameChar_world_x = gameChar_x - scrollPos;
  Collectables.checkIfGameCharInCollectablesRange();
  Canyons.checkIfGameCharIsOverCanyons();
  Platforms.checkIfCharacterIsOnPlatform();
}

// Move Character Functions
function keyPressed() {
  if (keyCode == 37) {
    isLeft = true;
  } else if (keyCode == 39) {
    isRight = true;
  } else if (keyCode == 38) {
    if (gameChar_y >= floorPos_y || onPlatform) {
      gameChar_y -= 100;
      jumpSound.play();
    }
  }
  ``;
  if (keyCode == 13 || keyCode == 32) {
    removeElements();
    gameMode = 2;
  }
}
function keyReleased() {
  if (keyCode == 37) {
    isLeft = false;
  } else if (keyCode == 39) {
    isRight = false;
  }
}

function createButtons() {
  var startButton;
  var rulesButton;
  startButton = createImg("./Assets/start.png");
  startButton.size(200, 100);
  startButton.position(width / 2 - 400, height / 2 + 50);
  rulesButton = createImg("./Assets/rules.png");
  rulesButton.size(170, 75);
  rulesButton.position(width / 2 - 385, height / 2 + 150);
  rulesButton.mousePressed(function () {
    gameMode = 3;
    removeElements();
  });
  startButton.mousePressed(function () {
    gameMode = 2;
    removeElements();
  });
}

function rules() {
  removeElements();
  background("#B1E8FF");
  textSize(100);
  textAlign(CENTER, TOP);
  text("Rules", 0, 12, width);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Collect 5 or more coins", width / 2, height / 2);
  text("and reach the flag to win!", width / 2, height / 2 + 50);
  image(backButtonImg, width / 2 - 110, height / 2 + 150, 200, 100);
  backButton = createImg("./Assets/back.png");
  backButton.size(200, 100);
  backButton.position(width / 2 - 110, height / 2 + 150);
  backButton.mousePressed(function () {
    removeElements();
    gameMode = 1;
  });
}
