/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Scenery Functions

// Clouds Initialization & Drawing
const Clouds = {
  // Create Clouds & Push to Array
  createClouds: function () {
    for (let i = 0; i < 10; i++) {
      const x = random(-300, width - 10);
      const y = random(20, 80);
      const w = random(40, 70);
      const s = random(0.5, 2);
      const cloud = { x_pos: x, y_pos: y, width: w, height: w, speed: s };
      clouds.push(cloud);
    }
  },
  // Draw Clouds
  drawClouds: function () {
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
      clouds[i].x_pos += clouds[i].speed;
      if (clouds[i].x_pos > width + gameChar_world_x) {
        clouds[i].x_pos = -clouds[i].width;
      }
    }
  },
};

// Tree Drawing
function drawTree() {
  for (let i = 0; i < trees.length; i++) {
    fill(139, 69, 19);
    noStroke();
    rect(
      trees[i].trunkX,
      trees[i].trunkY,
      trees[i].trunkWidth,
      trees[i].trunkHeight
    );
    fill(0, 100, 0);
    triangle(
      trees[i].trunkX - 50,
      trees[i].trunkY + 50,
      trees[i].trunkX + trees[i].trunkWidth / 2,
      trees[i].trunkY - 100,
      trees[i].trunkX + trees[i].trunkWidth + 50,
      trees[i].trunkY + 50
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
const Snow = {
  drawSnow: function () {
    const t = frameCount / 60; // update time

    // create a random number of snowflakes each frame
    for (let i = 0; i < random(5); i++) {
      snowflakes.push(new this.snowflake()); // append snowflake object
    }

    // loop through snowflakes with a for..of loop
    for (const flake of snowflakes) {
      flake.update(t); // update snowflake position
      flake.display(); // draw snowflake
    }
  },
  snowflake: function () {
    fill(255, 250, 250);
    noStroke();
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-100, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 10);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = sqrt(random(pow(width + 2000, 2)));

    this.update = function (time) {
      // x position follows a circle
      let w = 0.1; // angular speed
      let gamescore = 0;
      if (game_score > gamescore) {
        w += 0.05;
        this.size += 0.02;
        gamescore++;
      }
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
  },
};

function drawSnowman() {
  for (var i = 0; i < snowman.length; i++) {
    // snowman
    fill(255);
    noStroke();
    ellipse(
      snowman[i].x_pos,
      snowman[i].y_pos,
      snowman[i].width,
      snowman[i].height
    );
    ellipse(
      snowman[i].x_pos,
      snowman[i].y_pos - 50,
      snowman[i].width - 30,
      snowman[i].height - 30
    );
    ellipse(
      snowman[i].x_pos,
      snowman[i].y_pos - 100,
      snowman[i].width - 40,
      snowman[i].height - 40
    );

    fill(0);
    // eyes
    ellipse(snowman[i].x_pos - 10, snowman[i].y_pos - 105, 5, 5);
    ellipse(snowman[i].x_pos + 10, snowman[i].y_pos - 105, 5, 5);

    // carrot
    fill(255, 165, 0);
    triangle(
      snowman[i].x_pos,
      snowman[i].y_pos - 100,
      snowman[i].x_pos,
      snowman[i].y_pos - 90,
      snowman[i].x_pos + 40,
      snowman[i].y_pos - 85
    );

    // hands
    stroke(160, 82, 45);
    strokeWeight(5);
    line(
      snowman[i].x_pos - 80,
      snowman[i].y_pos - 100,
      snowman[i].x_pos - 30,
      snowman[i].y_pos - 50
    );
    line(
      snowman[i].x_pos + 80,
      snowman[i].y_pos - 100,
      snowman[i].x_pos + 30,
      snowman[i].y_pos - 50
    );

    // buttons
    fill(0);
    noStroke();
    ellipse(snowman[i].x_pos, snowman[i].y_pos - 60, 7, 7);
    ellipse(snowman[i].x_pos, snowman[i].y_pos - 40, 7, 7);
    ellipse(snowman[i].x_pos, snowman[i].y_pos - 20, 7, 7);
  }
}

const Enemies = {
  Enemy: function (x, y, range) {
    this.x = x;
    this.y = y;
    this.range = range;
    this.current_x = x;
    this.inc = 1;
    this.points = [];
    this.size = 10;

    this.update = function () {
      this.current_x += this.inc;

      if (this.current_x >= this.x + this.range) {
        this.inc = -1;
      } else if (this.current_x < this.x) {
        this.inc = 1;
      }
    };
    this.draw = function () {
      this.update();
      drawFire(this.current_x, this.y, this.size);
      fill(0);
      ellipse(this.current_x - 5, this.y - 10, this.size / 2);
      ellipse(this.current_x + 5, this.y - 10, this.size / 2);
    };
    this.checkContact = function (gc_x, gc_y) {
      var d = dist(gc_x, gc_y, this.current_x, this.y);
      if (d < 20) {
        return true;
      }
      return false;
    };
  },
  drawEnemies: function () {
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].draw();

      var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);
      if (isContact) {
        if (char_lives > 0) {
          char_lives--;
          game_setup();
        }
      }
    }
  },
};

class Particle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-0.5, -1);
    this.alpha = 255;
    this.d = size;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 3;
    this.d -= random(0.05, 0.1);
  }

  show() {
    noStroke();
    fill(random(200, 230), random(50, 150), 10, this.alpha);
    ellipse(this.x, this.y, this.d);
    fill(247, 55, 24);
    ellipse(this.x, this.y - 10, this.d);
  }
}

function drawFire(x, y, size) {
  for (let i = 0; i < 5; i++) {
    let p = new Particle(x, y, size);
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}
