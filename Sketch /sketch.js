var gameChar_x;
var gameChar_y;
var floorPos_y;
var gameChar_width;

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
var canyon;
var collectable;

var gameMode;

var i = 0;

//Main Functions

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;
  gameChar_width = 50;

  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;

  gameMode = 1;

  scrollPos = 0;

  collectable = {
    x_pos: 10,
    y_pos: floorPos_y - 20,
    size: 40,
    isFound: false,
  };
  canyon = { x_pos: 50, width: 100 };

  trees_x = [300, 500, 800, 1100];
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
      x1: 1024 / 2 - 200,
      y1: 576 / 2 - 100,
      x2: 1024 / 2 - 300,
      y2: floorPos_y,
      x3: 1024 / 2 - 100,
      y3: floorPos_y,
    },
    {
      x1: 1024 / 2 - 100,
      y1: 576 / 2 - 100,
      x2: 1024 / 2 - 200,
      y2: floorPos_y,
      x3: 1024 / 2,
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
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y);

  push();
  translate(scrollPos, 0);

  //Draw the scenery
  drawClouds();
  drawMountain();
  drawTree();
  drawSnow();
  drawCanyon();
  drawCollectable();

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

  checkIfGameCharInCollectableRange();

  checkIfGameCharIsOverCanyon();
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

  if (keyCode == 13) {
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

//Scenery Functions
function drawClouds() {
  for (var i = 0; i < clouds.length; i++) {
    fill(255, 255, 255);
    noStroke();
    ellipse(clouds[i].x1, clouds[i].y1, clouds[i].w, clouds[i].h);
    ellipse(clouds[i].x1 - 20, clouds[i].y1, clouds[i].w - 5, clouds[i].h - 30);
    ellipse(clouds[i].x1 + 20, clouds[i].y1, clouds[i].w - 5, clouds[i].h - 30);
    clouds[i].x1 -= 1;
  }
}

function drawTree() {
  for (var i = 0; i < trees_x.length; i++) {
    fill(139, 69, 19);
    noStroke();
    rect(trees_x[i], tree.trunkY, tree.trunkW, tree.trunkH);
    fill(34, 139, 34);
    ellipse(trees_x[i], tree.leafY, tree.leafW, tree.leafH);
    ellipse(trees_x[i] + 30, tree.leafY, tree.leafW, tree.leafH);
    ellipse(trees_x[i] + 15, tree.leafY - 15, tree.leafW, tree.leafH);
  }
}

function drawSnow() {
  for (var i = 0; i < snow.length; i++) {
    fill(255, 255, 255);
    noStroke();
    ellipse(snow[i].x, snow[i].y, snow[i].w, snow[i].h);
    snow[i].y += 1;
  }
}

function drawMountain() {
  fill(119, 136, 153);
  noStroke();
  for (var i = 0; i < mountain.length; i++) {
    triangle(
      mountain[i].x1,
      mountain[i].y1,
      mountain[i].x2,
      mountain[i].y2,
      mountain[i].x3,
      mountain[i].y3
    );
  }
}

//Game Character Functions
function drawFacingFront() {
  fill(0);
  rect(gameChar_x - 10, gameChar_y - 50, 20, 10);
  fill(200, 150, 150);
  rect(gameChar_x - 10, gameChar_y - 45, 20, 15);
  fill(0);
  ellipse(gameChar_x - 5, gameChar_y - 40, 5, 5);
  ellipse(gameChar_x + 5, gameChar_y - 40, 5, 5);
  stroke(2);
  ellipse(gameChar_x, gameChar_y - 30, 5, 5);
  noStroke();
  fill(255, 0, 0);
  rect(gameChar_x - 10, gameChar_y - 30, 20, 25);
  fill(0);
  rect(gameChar_x + 3, gameChar_y - 10, 7, 13);
  rect(gameChar_x - 10, gameChar_y - 10, 7, 13);
  fill(0);
  rect(gameChar_x + 10, gameChar_y - 25, 5, 10);
  rect(gameChar_x - 15, gameChar_y - 25, 5, 10);
}

function drawWalkRight() {
  //Hair
  fill(0);
  rect(gameChar_x - 10, gameChar_y - 50, 20, 10);
  //Head
  fill(200, 150, 150);
  rect(gameChar_x - 10, gameChar_y - 45, 20, 15);
  //ellipse(gameChar_x, gameChar_y-50, 25);
  //Face
  fill(0);
  ellipse(gameChar_x - 2, gameChar_y - 40, 5, 5);
  ellipse(gameChar_x + 7, gameChar_y - 40, 5, 5);
  stroke(2);
  ellipse(gameChar_x + 3, gameChar_y - 30, 5, 5);
  noStroke();
  //Body
  fill(255, 0, 0);
  rect(gameChar_x - 10, gameChar_y - 30, 20, 25);
  //Legs
  fill(0);
  rect(gameChar_x + 4, gameChar_y - 10, 7, 13);
  rect(gameChar_x - 9, gameChar_y - 10, 7, 13);
  //Hands
  fill(0);
  rect(gameChar_x + 10, gameChar_y - 25, 5, 10);
  rect(gameChar_x - 10, gameChar_y - 25, 5, 10);
}

function drawWalkLeft() {
  //Hair
  fill(0);
  rect(gameChar_x - 10, gameChar_y - 50, 20, 10);
  //Head
  fill(200, 150, 150);
  rect(gameChar_x - 10, gameChar_y - 45, 20, 15);
  //Face
  fill(0);
  ellipse(gameChar_x - 7, gameChar_y - 40, 5, 5);
  ellipse(gameChar_x + 3, gameChar_y - 40, 5, 5);
  stroke(2);
  ellipse(gameChar_x - 3, gameChar_y - 30, 5, 5);
  noStroke();
  //Body
  fill(255, 0, 0);
  rect(gameChar_x - 10, gameChar_y - 30, 20, 25);
  //Legs
  fill(0);
  rect(gameChar_x + 2, gameChar_y - 10, 7, 13);
  rect(gameChar_x - 11, gameChar_y - 10, 7, 13);
  //Hands
  fill(0);
  rect(gameChar_x + 5, gameChar_y - 25, 5, 10);
  rect(gameChar_x - 15, gameChar_y - 25, 5, 10);
}

function drawJumpUp() {
  //Hair
  fill(0);
  rect(gameChar_x - 10, gameChar_y - 50, 20, 10);
  //Head
  fill(200, 150, 150);
  rect(gameChar_x - 10, gameChar_y - 45, 20, 15);
  //ellipse(gameChar_x, gameChar_y-50, 25);
  //Face
  fill(0);
  ellipse(gameChar_x - 5, gameChar_y - 40, 5, 5);
  ellipse(gameChar_x + 5, gameChar_y - 40, 5, 5);
  stroke(2);
  ellipse(gameChar_x, gameChar_y - 30, 5, 5);
  noStroke();
  //Body
  fill(255, 0, 0);
  rect(gameChar_x - 10, gameChar_y - 30, 20, 25);
  //Legs
  fill(0);
  rect(gameChar_x + 3, gameChar_y - 15, 7, 13);
  rect(gameChar_x - 10, gameChar_y - 15, 7, 13);
  //Hands
  fill(0);
  rect(gameChar_x + 10, gameChar_y - 30, 5, 10);
  rect(gameChar_x - 15, gameChar_y - 30, 5, 10);
}

function drawJumpRight() {
  //Hair
  fill(0);
  rect(gameChar_x - 10, gameChar_y - 50, 20, 10);
  //Head
  fill(200, 150, 150);
  rect(gameChar_x - 10, gameChar_y - 45, 20, 15);
  //ellipse(gameChar_x, gameChar_y-50, 25);
  //Face
  fill(0);
  ellipse(gameChar_x - 3, gameChar_y - 40, 5, 5);
  ellipse(gameChar_x + 7, gameChar_y - 40, 5, 5);
  stroke(2);
  ellipse(gameChar_x + 2, gameChar_y - 30, 5, 5);
  noStroke();
  //Body
  fill(255, 0, 0);
  rect(gameChar_x - 10, gameChar_y - 30, 20, 25);
  //Legs
  fill(0);
  rect(gameChar_x + 4, gameChar_y - 15, 7, 13);
  rect(gameChar_x - 9, gameChar_y - 15, 7, 13);
  //Hands
  fill(0);
  rect(gameChar_x + 10, gameChar_y - 30, 5, 10);
  rect(gameChar_x - 10, gameChar_y - 30, 5, 10);
}

function drawJumpLeft() {
  //Hair
  fill(0);
  rect(gameChar_x - 10, gameChar_y - 50, 20, 10);
  //Head
  fill(200, 150, 150);
  rect(gameChar_x - 10, gameChar_y - 45, 20, 15);
  //ellipse(gameChar_x, gameChar_y-50, 25);
  //Face
  fill(0);
  ellipse(gameChar_x - 7, gameChar_y - 40, 5, 5);
  ellipse(gameChar_x + 3, gameChar_y - 40, 5, 5);
  stroke(2);
  ellipse(gameChar_x - 2, gameChar_y - 30, 5, 5);
  noStroke();
  //Body
  fill(255, 0, 0);
  rect(gameChar_x - 10, gameChar_y - 30, 20, 25);
  //Legs
  fill(0);
  rect(gameChar_x + 2, gameChar_y - 15, 7, 13);
  rect(gameChar_x - 11, gameChar_y - 15, 7, 13);
  //Hands
  fill(0);
  rect(gameChar_x + 5, gameChar_y - 30, 5, 10);
  rect(gameChar_x - 15, gameChar_y - 30, 5, 10);
}

//Interactivity Functions
function checkIfGameCharInCollectableRange() {
  var d = dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos);
  if (d < 20) {
    collectable.isFound = true;
  }
}

function drawCollectable() {
  if (collectable.isFound == false) {
    fill(255, 215, 0);
    stroke(0);
    ellipse(collectable.x_pos, collectable.y_pos, 20, 30);
    ellipse(collectable.x_pos, collectable.y_pos, 10, 20);
  }
}

function drawCanyon() {
  fill(0, 0, 0);
  rect(canyon.x_pos, floorPos_y, canyon.width, height - floorPos_y);
}

function checkIfGameCharIsOverCanyon() {
  var cond1 = gameChar_y == floorPos_y;
  var cond2 = gameChar_x - gameChar_width / 2 > canyon.x_pos;
  var cond3 = gameChar_x + gameChar_width / 2 < canyon.x_pos + canyon.width;

  if (cond1 && cond2 && cond3) {
    isPlummeting = true;
  }
}
