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
let img;
let gameMode;
let jumpSound;

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
  jumpSound = loadSound("./jump.wav");
  jumpSound.setVolume(0.1);
}

// Call all splashscreen and main game functions
function draw() {
  if (gameMode == 1) {
    splashScreen();
  } else if (gameMode == 2) {
    gamePlay();
  }
}

// Splash screen
function splashScreen() {
  background("#B1E8FF");
  Snow.drawSnow();
  fill(255, 0, 0);
  textFont("Comic Sans MS");
  textSize(50);
  if (frameCount % 60 < 30) {
    text(
      "Collect 5 or more coins and reach the flag to win!",
      10,
      height / 2 - 100
    );
    text("Press Space or Enter to Start", 150, height / 2);
  }
}

// Main game function, calling all other functions
function gamePlay() {
  background("#B1E8FF");
  noStroke();
  fill(255, 250, 250);
  rect(0, floorPos_y, width, height - floorPos_y);

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
    gameChar_y += 1;
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
}

// Move Character Functions
function keyPressed() {
  if (keyCode == 37) {
    isLeft = true;
  } else if (keyCode == 39) {
    isRight = true;
  } else if (keyCode == 38) {
    if (gameChar_y >= floorPos_y) {
      gameChar_y -= 100;
      jumpSound.play();
    }
  }

  if (keyCode == 13 || keyCode == 32) {
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
