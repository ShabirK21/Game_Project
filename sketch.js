var gameChar_x;
var gameChar_y;
var floorPos_y;
var gameChar_width;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var scrollPos;

var clouds;
var mountain;
var snow;
var tree;
var trees_x;
var canyons;
var collectables;
var snowflakes;
var icicles;
let currentScale;

var game_score;
var char_lives;
let img;
var gameMode;
// Main Functions

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;

  char_lives = 3;

  game_setup();
}

function game_setup() {
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;
  gameChar_width = 50;
  gameChar_world_x = gameChar_x;

  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;

  gameMode = 1;
  game_score = 0;

  scrollPos = 0;

  canyons = [{ x_pos: 250, width: 100 }];

  trees_x = [500];
  tree = {
    trunkX: trees_x - 100,
    trunkY: floorPos_y - 100,
    trunkW: 30,
    trunkH: 100,
    leafW: 50,
    leafH: 50,
  };

  mountain = [
    {
      x1: width / 2 + 240,
      y1: height / 2 - 200,
      x2: width / 2 + 20,
      y2: floorPos_y,
      x3: width / 2 + 460,
      y3: floorPos_y,
      color: (192, 192, 192),
      snowcapX1: 834,
      snowcapY1: 216,
      snowcapX2: 763,
      snowcapY2: 170,
      snowcapX3: 753,
      snowcapY3: 220,
      snowcapX4: 723,
      snowcapY4: 187,
      snowcapX5: 665,
      snowcapY5: 225,
    },
    {
      x1: width / 2 + 100,
      y1: height / 2 - 100,
      x2: width / 2 - 90,
      y2: floorPos_y,
      x3: width / 2 + 300,
      y3: floorPos_y,
      color: (105, 105, 105),
      snowcapX1: 718,
      snowcapY1: 316,
      snowcapX2: 643,
      snowcapY2: 270,
      snowcapX3: 613,
      snowcapY3: 320,
      snowcapX4: 573,
      snowcapY4: 287,
      snowcapX5: 505,
      snowcapY5: 325,
    },
  ];

  snowflakes = [];
  clouds = [];
  initClouds();

  collectables = [];
  initCollectables();

  icicles = [];

  flagpole = { x_pos: 1100, height: 300, speed: 0.2, isReached: false };
  snowman = { x_pos: 150, y_pos: floorPos_y - 50, width: 100, height: 100 };
}

function preload() {
  img = loadImage("/SplashScreenBG.jpg");
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
    textFont("Comic Sans MS");
    textSize(100);
    text("Start", 400, 500);
    textSize(50);
    text("Press Space or Enter to Start", 150, 550);
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
  //drawIcicle();
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
