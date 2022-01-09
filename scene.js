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
    triangle(
      480,
      floorPos_y - tree.trunkH + 20,
      515,
      300,
      520 + tree.trunkW,
      floorPos_y - tree.trunkH + 20
    );
    triangle(
      480,
      floorPos_y - tree.trunkH,
      515,
      280,
      520 + tree.trunkW,
      floorPos_y - tree.trunkH
    );
    triangle(
      480,
      floorPos_y - tree.trunkH - 20,
      515,
      260,
      520 + tree.trunkW,
      floorPos_y - tree.trunkH - 20
    );
  }
}

/*function drawMountain() {
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
}*/

function drawMountain() {
  noStroke();
  for (var i = 0; i < mountain.length; i++) {
    fill(mountain[i].color);
    triangle(
      mountain[i].x1,
      mountain[i].y1,
      mountain[i].x2,
      mountain[i].y2,
      mountain[i].x3,
      mountain[i].y3
    );
    fill(213, 212, 255);
    strokeWeight(0);
    beginShape();
    vertex(mountain[i].x1, mountain[i].y1);
    vertex(mountain[i].snowcapX1, mountain[i].snowcapY1);
    vertex(mountain[i].snowcapX2, mountain[i].snowcapY2);
    vertex(mountain[i].snowcapX3, mountain[i].snowcapY3);
    vertex(mountain[i].snowcapX4, mountain[i].snowcapY4);
    vertex(mountain[i].snowcapX5, mountain[i].snowcapY5);
    endShape(CLOSE);
  }
}

function drawSnow() {
  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

/// snowflake class
function snowflake() {
  fill(255, 250, 250);
  noStroke();
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-100, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  if (isLeft) {
    this.radius = sqrt(random(pow(width - gameChar_world_x, 2)));
  } else {
    this.radius = sqrt(random(pow(width + gameChar_world_x, 2)));
  }

  this.update = function (time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function () {
    ellipse(this.posX, this.posY, this.size);
  };
}
