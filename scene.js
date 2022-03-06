/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Scenery Functions

// Clouds Initialization & Drawing
const Clouds = {
  // Create Clouds & Push to Array
  generateClouds: function () {
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
const Tree = {
  generateTree: function (trunkX, trunkY, trunkWidth, trunkHeight) {
    this.trunkX = trunkX;
    this.trunkY = trunkY;
    this.trunkWidth = trunkWidth;
    this.trunkHeight = trunkHeight;

    this.draw = function () {
      fill(139, 69, 19);
      noStroke();
      rect(this.trunkX, this.trunkY, this.trunkWidth, this.trunkHeight);
      fill(0, 100, 0);
      triangle(
        this.trunkX - 50,
        this.trunkY + 50,
        this.trunkX + this.trunkWidth / 2,
        this.trunkY - 100,
        this.trunkX + this.trunkWidth + 50,
        this.trunkY + 50
      );
    };
  },
  drawTree: function () {
    for (let i = 0; i < trees.length; i++) {
      trees[i].draw();
    }
  },
};

// Mountain Drawing
const Mountain = {
  generateMountain: function (
    x1,
    y1,
    x2,
    x3,
    color,
    snowcapX1,
    snowcapY1,
    snowcapX2,
    snowcapY2,
    snowcapX3,
    snowcapY3,
    snowcapX4,
    snowcapY4,
    snowcapX5,
    snowcapY5
  ) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = floorPos_y;
    this.x3 = x3;
    this.y3 = floorPos_y;
    this.color = color;
    this.snowcapX1 = snowcapX1;
    this.snowcapY1 = snowcapY1;
    this.snowcapX2 = snowcapX2;
    this.snowcapY2 = snowcapY2;
    this.snowcapX3 = snowcapX3;
    this.snowcapY3 = snowcapY3;
    this.snowcapX4 = snowcapX4;
    this.snowcapY4 = snowcapY4;
    this.snowcapX5 = snowcapX5;
    this.snowcapY5 = snowcapY5;

    this.draw = function () {
      fill(this.color);
      triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
      fill(213, 212, 255);
      strokeWeight(0);
      beginShape();
      vertex(this.x1, this.y1);
      vertex(this.snowcapX1, this.snowcapY1);
      vertex(this.snowcapX2, this.snowcapY2);
      vertex(this.snowcapX3, this.snowcapY3);
      vertex(this.snowcapX4, this.snowcapY4);
      vertex(this.snowcapX5, this.snowcapY5);
      endShape(CLOSE);
    };
  },
  drawMountain: function () {
    for (let i = 0; i < mountains.length; i++) {
      mountains[i].draw();
    }
  },
};

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

const Snowman = {
  generateSnowman: function (x_pos, width, height) {
    this.x_pos = x_pos;
    this.y_pos = floorPos_y - 50;
    this.width = width;
    this.height = height;

    this.draw = function () {
      // snowman
      fill(255);
      noStroke();
      ellipse(this.x_pos, this.y_pos, this.width, this.height);
      ellipse(this.x_pos, this.y_pos - 50, this.width - 30, this.height - 30);
      ellipse(this.x_pos, this.y_pos - 100, this.width - 40, this.height - 40);

      fill(0);
      // eyes
      ellipse(this.x_pos - 10, this.y_pos - 105, 5, 5);
      ellipse(this.x_pos + 10, this.y_pos - 105, 5, 5);

      // carrot
      fill(255, 165, 0);
      triangle(
        this.x_pos,
        this.y_pos - 100,
        this.x_pos,
        this.y_pos - 90,
        this.x_pos + 40,
        this.y_pos - 85
      );

      // hands
      stroke(160, 82, 45);
      strokeWeight(5);
      line(this.x_pos - 80, this.y_pos - 100, this.x_pos - 30, this.y_pos - 50);
      line(this.x_pos + 80, this.y_pos - 100, this.x_pos + 30, this.y_pos - 50);

      // buttons
      fill(0);
      noStroke();
      ellipse(this.x_pos, this.y_pos - 60, 7, 7);
      ellipse(this.x_pos, this.y_pos - 40, 7, 7);
      ellipse(this.x_pos, this.y_pos - 20, 7, 7);
    };
  },
  drawSnowman: function () {
    for (let i = 0; i < snowmen.length; i++) {
      snowmen[i].draw();
    }
  },
};

const Enemies = {
  Enemy: function (x, y, range) {
    this.x = x;
    this.y = y;
    this.range = range;
    this.current_x = x;
    this.inc = 1;
    this.points = [];
    this.size = 30;

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
      fill("#C6DCF5");
      circle(this.current_x, this.y, this.size);
      fill(0);
      ellipse(this.current_x - 7, this.y - 5, this.size - 25);
      ellipse(this.current_x + 7, this.y - 5, this.size - 25);
      circle(this.current_x, this.y + 5, this.size - 20);
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

const Oil = {
  generateOil: function (x, y, size) {
    this.x = x;
    this.y = y;
    this.vx = random(-0.5, 0.5);
    this.vy = random(-2, -1);
    this.alpha = 255;
    this.d = size;

    this.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 3;
      this.d -= random(0.05, 0.1);
    };

    this.show = function () {
      noStroke();
      fill(random(0, 50), random(0, 50), 255, this.alpha);
      //triangle(this.x, this.y, this.x + 10, this.y - 20, this.x + 15, this.y);
      fill(0);
      ellipse(this.x, this.y, this.d);
    };

    this.finished = function () {
      return this.alpha < 0;
    };
  },
  drawOil: function (x, y, size) {
    for (let i = 0; i < 5; i++) {
      let p = new Oil.generateOil(x, y, size);
      particles.push(p);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show();
      if (particles[i].finished()) {
        particles.splice(i, 1);
      }
    }
  },
};
