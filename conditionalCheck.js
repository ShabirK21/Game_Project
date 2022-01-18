//Interactivity Functions

//Collectable Functions
function checkIfGameCharInCollectablesRange() {
  for (var i = 0; i < collectables.length; i++) {
    var collectable = collectables[i];
    checkIfGameCharInCollectableRange(collectable);
  }
}

function checkIfGameCharInCollectableRange(collectable) {
  for (var i = 0; i < collectables.length; i++) {
    if (collectables[i].isFound == false) {
      if (
        dist(
          gameChar_world_x,
          gameChar_y,
          collectables[i].x_pos + 15,
          collectables[i].y_pos
        ) < 20
      ) {
        collectables[i].isFound = true;
        game_score++;
        console.log(game_score);
      }
    }
  }
}

function drawGameScore() {
  fill(0);
  textSize(32);
  text("Score: " + game_score, 30, 30);
}

function drawCollectables() {
  for (var i = 0; i < collectables.length; i++) {
    var collectable = collectables[i];
    drawCollectable(collectable);
  }
}

function drawCollectable(collectable) {
  if (collectable.isFound == false) {
    fill(255, 215, 0);
    stroke(0);
    strokeWeight(1);
    ellipse(collectable.x_pos, collectable.y_pos - 20, 20, 30);
    ellipse(collectable.x_pos, collectable.y_pos - 20, 10, 20);
  }
}

function initCollectables() {
  for (var i = 0; i < 100; i++) {
    var x = random(-2000, 2000);
    var collectable = {
      x_pos: x,
      y_pos: floorPos_y,
      size: 40,
      isFound: false,
    };
    if (!checkIfCollectableOverCanyon(collectable)) {
      collectables.push(collectable);
    }
  }
}

function checkIfCollectableOverCanyon(collectable) {
  var onCanyon = false;
  for (i in canyons) {
    var x1_limit = canyons[i].x_pos - collectable.size;
    var x2_limit = canyons[i].x_pos + canyons[i].width;
    if (collectable.x_pos > x1_limit && collectable.x_pos < x2_limit) {
      onCanyon = true;
      break;
    }
  }
  return onCanyon;
}
// End Of Collectable Functions

//Canon Functions
function drawCanyons() {
  for (var i = 0; i < canyons.length; i++) {
    var canyon = canyons[i];
    drawCanyon(canyon);
  }
}

function drawCanyon(canyon) {
  fill(100, 155, 255);
  rect(canyon.x_pos, floorPos_y, canyon.width, height - floorPos_y);
}

function checkIfGameCharIsOverCanyons() {
  for (var i = 0; i < canyons.length; i++) {
    var canyon = canyons[i];
    checkIfGameCharIsOverCanyon(canyon);
  }
}

function checkIfGameCharIsOverCanyon(canyon) {
  var cond1 = gameChar_y == floorPos_y; //gameChar is on the floor
  var cond2 = gameChar_world_x - gameChar_width / 2 > canyon.x_pos; //gameChar is to the right of the canyon
  var cond3 =
    gameChar_world_x + gameChar_width / 2 < canyon.x_pos + canyon.width; //gameChar is to the left of the canyon

  if (cond1 && cond2 && cond3) {
    isPlummeting = true;
    char_lives--;
  }
}
//End of Canyon Functions

//Drawing character lives
function drawLives() {
  fill(255, 0, 0);
  for (var i = 0; i < char_lives; i++) {
    text("♥", 900 + i * 50, 30);
  }
}

//Check if character dead and re-spawn when lives are greater than 0
function checkIfCharacterDead() {
  if (gameChar_y > height) {
    if (char_lives > 0) {
      game_setup();
      gameMode = 2;
      text("You have " + char_lives + " lives left", width / 2, height / 2);
    }
  }
}

//Draw flagpole and flag and end game if flagpole is reached

function drawFlagpole() {
  fill(0);
  noStroke();
  rect(flagpole.x_pos, floorPos_y - flagpole.height, 15, flagpole.height);
  fill(255);
  if (
    gameChar_world_x > flagpole.x_pos &&
    gameChar_world_x < flagpole.x_pos + 100 &&
    game_score > 3
  ) {
    flagpole.isReached = true;
  }

  if (flagpole.isReached) {
    rect(flagpole.x_pos, floorPos_y - flagpole.height, 100, 50);
  } else {
    rect(flagpole.x_pos, floorPos_y - 50, 100, 50);
  }
}

//Check if character has reached flagpole or lost all lives
function checkIsGameOver() {
  var gameOver = false;

  if (flagpole.isReached == true || char_lives < 1) {
    gameOver = true;
  }

  return gameOver;
}

//Print game over message
function drawGameOver() {
  fill(0);
  textSize(30);
  text("Game Over", width / 2 - 100, height / 2);

  if (char_lives > 0) {
    text("You Win!", width / 2 - 100, height / 2 + 50);
  } else {
    gameChar_y += 2;
    text("You Lose!", width / 2 - 100, height / 2 + 50);
  }
}
