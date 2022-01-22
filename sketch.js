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

let game_score;
let char_lives;
let img;
let gameMode;
// Main Functions

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;

  char_lives = 3;

  game_setup();
}

function preload() {
  img = loadImage('/SplashScreenBG.jpg');
}

function draw() {
  if (gameMode == 1) {
    splashScreen();
  } else if (gameMode == 2) {
    gamePlay();
  }
}

function splashScreen() {
  image(img, 0, 0, width, height);
  if (frameCount % 60 < 30) {
    fill(255, 0, 0);
    textFont('Comic Sans MS');
    textSize(100);
    text('Start', 400, 500);
    textSize(50);
    text('Press Space or Enter to Start', 150, 550);
  }
}

function gamePlay() {
  background(100, 155, 255);
  noStroke();
  fill(255, 250, 250);
  rect(0, floorPos_y, width, height - floorPos_y);

  push();
  translate(scrollPos, 0);

  // Draw the scenery
  drawMountain();
  drawClouds();
  drawTree();
  drawCanyons();
  drawSnowman();
  drawSnow();
  drawCollectables();
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
  checkIfGameCharInCollectablesRange();
  checkIfGameCharIsOverCanyons();
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
