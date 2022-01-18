/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
// Scenery Functions

// Clouds Initialization & Drawing
// eslint-disable-next-line require-jsdoc
function drawClouds() {
  for (let i = 0; i < clouds.length; i++) {
    fill(255, 255, 255);
    noStroke();
    ellipse(
      clouds[i].x_pos,
      clouds[i].y_pos,
      clouds[i].width,
      clouds[i].height
    );
    ellipse(
      clouds[i].x_pos + 10,
      clouds[i].y_pos + 10,
      clouds[i].width,
      clouds[i].height
    );
    ellipse(
      clouds[i].x_pos - 20,
      clouds[i].y_pos + 10,
      clouds[i].width,
      clouds[i].height
    );
    clouds[i].x_pos -= clouds[i].speed;
    if (clouds[i].x_pos < 0 - scrollPos) {
      clouds[i].x_pos = width;
    }
  }
}

function initClouds() {
  for (let i = 0; i < 10; i++) {
    const x = random(10, width - 10);
    const y = random(20, 80);
    const w = random(40, 70);
    const s = random(0.5, 2);
    const cloud = { x_pos: x, y_pos: y, width: w, height: w, speed: s };
    clouds.push(cloud);
  }
}

// Tree Drawing
function drawTree() {
  for (let i = 0; i < trees_x.length; i++) {
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

// Mountain Drawing
function drawMountain() {
  noStroke();
  for (let i = 0; i < mountain.length; i++) {
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

// Snowflake Initialization & Drawing
function drawSnow() {
  const t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (const flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

// / snowflake class
function snowflake() {
  fill(255, 250, 250);
  noStroke();
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-100, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 10);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  if (isLeft) {
    this.radius = sqrt(random(pow(width - gameChar_world_x, 2)));
  } else {
    this.radius = sqrt(random(pow(width + gameChar_world_x, 2)));
  }

  this.update = function (time) {
    // x position follows a circle
    const w = 0.1; // angular speed
    const angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      const index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function () {
    ellipse(this.posX, this.posY, this.size);
  };
}

// Icicle Initialization & Drawing
function drawIcicle() {
  for (let i = 0; i < 8; i++) {
    icicles.push(new icicle());
  }

  for (const icicle of icicles) {
    icicle.update();
    icicle.show();
  }
}

class icicle {
  constructor() {
    this.x = random(0, width);
    this.y = random(30, 200);
    this.scaler = 1 - this.y / 100;
    this.timer = round(random(10, 300));
  }
  update() {
    if (this.timer >= 0) {
      this.timer -= 1;
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    scale(this.scaler);
    currentScale = this.scaler;
    for (let i = 0; i > -10; i -= 5) {
      fill(0, 200 + i);
      ellipse(0 - i / 10, i, i * 0.5, 2 - i / 5);
    }
    pop();
  }
}
