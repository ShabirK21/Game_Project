/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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

var gameMode;
//Main Functions

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;
  gameChar_width = 50;
  gameChar_world_x = gameChar_x;

  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;

  gameMode = 1;

  scrollPos = 0;

  collectables = [
    { x_pos: 200, y_pos: floorPos_y, size: 40, isFound: false },
    { x_pos: 100, y_pos: floorPos_y, size: 40, isFound: false },
    { x_pos: 0, y_pos: floorPos_y, size: 40, isFound: false },
  ];
  canyons = [
    { x_pos: 200, width: 100 },
    { x_pos: 10, width: 100 },
    { x_pos: 10, width: 100 },
  ];

  trees_x = [500, 800, 1000, 1300];
  tree = {
    trunkX: trees_x - 100,
    trunkY: floorPos_y - 100,
    trunkW: 30,
    trunkH: 100,
    leafX: trees_x + 100,
    leafY: floorPos_y - 100,
    leafW: 50,
    leafH: 50,
  };

  clouds = [
    {
      x1: 100,
      y1: 100,
      w: 80,
      h: 80,
    },
    {
      x1: 400,
      y1: 100,
      w: 80,
      h: 80,
    },
    {
      x1: 1000,
      y1: 100,
      w: 80,
      h: 80,
    },
  ];
  mountain = [
    {
      x1: width / 2 + 100,
      y1: height / 2 - 100,
      x2: width / 2 - 50,
      y2: floorPos_y,
      x3: width / 2 + 300,
      y3: floorPos_y,
    },
    {
      x1: width / 2 + 200,
      y1: height / 2 - 200,
      x2: width / 2,
      y2: floorPos_y,
      x3: width / 2 + 400,
      y3: floorPos_y,
    },
    {
      x1: width / 2 + 150,
      y1: height / 2 - 150,
      x2: width / 2,
      y2: floorPos_y,
      x3: width / 2 + 350,
      y3: floorPos_y,
    },
  ];
  snow = [
    {
      x: 100,
      y: 100,
      w: 20,
      h: 20,
    },
    {
      x: 300,
      y: 100,
      w: 20,
      h: 20,
    },
    {
      x: 500,
      y: 100,
      w: 20,
      h: 20,
    },
    {
      x: 700,
      y: 100,
      w: 20,
      h: 20,
    },
    {
      x: 800,
      y: 100,
      w: 20,
      h: 20,
    },
  ];
}

function draw() {
  if (gameMode == 1) {
    splashScreen();
  } else if (gameMode == 2) {
    gamePlay();
  }
}

function splashScreen() {
  background(255, 0, 0);
  if (frameCount % 60 < 30) {
    textFont("Helvetica");
    textSize(100);
    text("Start", 300, 300);
  }
}

function gamePlay() {
  background(100, 155, 255);
  noStroke();
  fill(255, 250, 250);
  rect(0, floorPos_y, width, height - floorPos_y);

  push();
  translate(scrollPos, 0);

  //Draw the scenery
  drawClouds();
  drawMountain();
  drawTree();
  drawSnow();
  drawCanyons();
  drawCollectables();
  pop();

  //Draw the Game Character
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

  //Interaction
  if (isPlummeting == true) {
    gameChar_y += 5;
    textSize(50);
    text("You Died", 500, 300);
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

//Move Character Functions
function keyPressed() {
  if (keyCode == 37) {
    isLeft = true;
  } else if (keyCode == 39) {
    isRight = true;
  } else if (keyCode == 38) {
    if (gameChar_y >= floorPos_y) {
      gameChar_y -= 50;
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
