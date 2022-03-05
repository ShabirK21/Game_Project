// Interactivity Functions

// Collectable
const Collectables = {
  drawCollectables: function () {
    for (let i = 0; i < collectables.length; i++) {
      const collectable = collectables[i];
      this.drawCollectable(collectable);
    }
  },
  drawCollectable: function (collectable) {
    if (collectable.isFound == false) {
      fill(255, 215, 0);
      stroke(0);
      strokeWeight(1);
      ellipse(collectable.x_pos, collectable.y_pos - 20, 20, 30);
      ellipse(collectable.x_pos, collectable.y_pos - 20, 10, 20);
    }
  },
  initCollectables: function () {
    for (let i = 0; i < 10; i++) {
      const x = random(0, width + 1100);
      const collectable = {
        x_pos: x,
        y_pos: floorPos_y,
        size: 40,
        isFound: false,
      };
      if (!this.checkIfCollectableOverCanyon(collectable)) {
        collectables.push(collectable);
      }
    }
  },
  checkIfCollectableOverCanyon: function (collectable) {
    let onCanyon = false;
    for (i in canyons) {
      const x1_limit = canyons[i].x_pos - collectable.size;
      const x2_limit = canyons[i].x_pos + canyons[i].width;
      if (collectable.x_pos > x1_limit && collectable.x_pos < x2_limit) {
        onCanyon = true;
        break;
      }
    }
    return onCanyon;
  },
  checkIfGameCharInCollectablesRange: function () {
    for (let i = 0; i < collectables.length; i++) {
      const collectable = collectables[i];
      this.checkIfGameCharInCollectableRange(collectable);
    }
  },
  checkIfGameCharInCollectableRange: function (collectable) {
    for (let i = 0; i < collectables.length; i++) {
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
        }
      }
    }
  },
};

// End Of Collectable Functions

// Canyon Functions

const Canyons = {
  drawCanyons: function () {
    for (let i = 0; i < canyons.length; i++) {
      const canyon = canyons[i];
      this.drawCanyon(canyon);
    }
  },
  drawCanyon: function (canyon) {
    fill("#B1E8FF");
    rect(canyon.x_pos, floorPos_y, canyon.width, height - floorPos_y);
    drawOil(canyon.x_pos + canyon.width / 2, floorPos_y + 150, 10);
  },
  checkIfGameCharIsOverCanyons: function () {
    for (let i = 0; i < canyons.length; i++) {
      const canyon = canyons[i];
      this.checkIfGameCharIsOverCanyon(canyon);
    }
  },
  checkIfGameCharIsOverCanyon: function (canyon) {
    const cond1 = gameChar_y == floorPos_y; // gameChar is on the floor
    const cond2 = gameChar_world_x - gameChar_width / 2 > canyon.x_pos; // gameChar is to the right of the canyon
    const cond3 =
      gameChar_world_x + gameChar_width / 2 < canyon.x_pos + canyon.width; // gameChar is to the left of the canyon

    if (cond1 && cond2 && cond3) {
      isPlummeting = true;
      char_lives--;
    }
  },
};

// End of Canyon Functions

// Drawing character health
function drawLives() {
  fill(255, 0, 0);
  textAlign(RIGHT);
  for (let i = 0; i < char_lives; i++) {
    text("♥", 900 + i * 50, 30);
  }
}

function drawGameScore() {
  fill(0);
  textSize(32);
  textAlign(LEFT);
  text(`Coins: ${game_score}`, 30, 30);
}

// Check if character is dead and re-spawn when lives are greater than 0
function checkIfCharacterDead() {
  if (gameChar_y > height) {
    if (char_lives > 0) {
      game_setup();
      gameMode = 2;
      text(`You have ${char_lives} lives left`, width / 2, height / 2);
    }
  }
}

// Draw flagpole and flag and end game if flagpole is reached
function drawFlagpole() {
  fill(0);
  noStroke();
  rect(flagpole.x_pos, floorPos_y - flagpole.height, 15, flagpole.height);
  fill(255);
  if (
    gameChar_world_x > flagpole.x_pos &&
    gameChar_world_x < flagpole.x_pos + 100 &&
    game_score >= 5
  ) {
    flagpole.isReached = true;
  }

  if (flagpole.isReached) {
    fill(46, 139, 87);
    rect(flagpole.x_pos, floorPos_y - flagpole.height, 100, 50);
  } else {
    fill(220, 20, 60);
    rect(flagpole.x_pos, floorPos_y - 50, 100, 50);
  }
}

// Check if character has reached flagpole or lost all lives
function checkIsGameOver() {
  let gameOver = false;

  if (flagpole.isReached == true || char_lives < 1) {
    gameOver = true;
  }

  return gameOver;
}

// Print game over message
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

const Platforms = {
  createPlatforms: function (x, y, length) {
    var p = {
      x: x,
      y: y,
      length: length,
      generate: function () {
        fill(0);
        rect(this.x, this.y, this.length, 20);
      },
      checkContact: function (gc_x, gc_y) {
        if (
          gc_x > this.x &&
          gc_x < this.x + this.length &&
          gc_y > this.y &&
          gc_y < this.y + 20
        ) {
          return true;
        } else {
          return false;
        }
      },
    };

    return p;
  },
  drawPlatforms: function () {
    for (var i = 0; i < platforms.length; i++) {
      platforms[i].generate();
    }
  },
  checkIfCharacterIsOnPlatform: function () {
    if (isFalling) {
      var isContact = false;
      onPlatform = false;
      for (var i = 0; i < platforms.length; i++) {
        isContact = platforms[i].checkContact(gameChar_world_x, gameChar_y);
        if (isContact) {
          onPlatform = true;
          break;
        }
      }
      if (!isContact) {
        gameChar_y += 1;
      }
    }
  },
};
