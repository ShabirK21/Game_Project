/* eslint-disable no-undef */
function game_setup() {
  // game character variable initialization
  gameChar_x = width / 2 - 400;
  gameChar_y = floorPos_y;
  gameChar_width = 50;
  gameChar_world_x = gameChar_x;
  // character movement check initialization
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;
  onPlatform = false;

  gameMode = 1;
  game_score = 0;

  scrollPos = 0;

  canyons = [
    { x_pos: 250, width: 100 },
    { x_pos: 1250, width: 100 },
    { x_pos: width + 1300, width: 100 },
  ];

  trees = [
    { trunkX: -50, trunkY: floorPos_y - 100, trunkWidth: 50, trunkHeight: 100 },
    {
      trunkX: 500,
      trunkY: floorPos_y - 100,
      trunkWidth: 50,
      trunkHeight: 100,
    },
    {
      trunkX: width + 500,
      trunkY: floorPos_y - 100,
      trunkWidth: 50,
      trunkHeight: 100,
    },
  ];

  mountain = [
    {
      x1: width / 2 + 240 - width + 100,
      y1: height / 2 - 200,
      x2: width / 2 + 20 - width + 100,
      y2: floorPos_y,
      x3: width / 2 + 460 - width + 100,
      y3: floorPos_y,
      color: (192, 192, 192),
      snowcapX1: 834 - width + 100,
      snowcapY1: 216,
      snowcapX2: 763 - width + 100,
      snowcapY2: 170,
      snowcapX3: 753 - width + 100,
      snowcapY3: 220,
      snowcapX4: 723 - width + 100,
      snowcapY4: 187,
      snowcapX5: 665 - width + 100,
      snowcapY5: 225,
    },
    {
      x1: width / 2 + 100 - width,
      y1: height / 2 - 100,
      x2: width / 2 - 90 - width,
      y2: floorPos_y,
      x3: width / 2 + 300 - width,
      y3: floorPos_y,
      color: (105, 105, 105),
      snowcapX1: 718 - width,
      snowcapY1: 316,
      snowcapX2: 643 - width,
      snowcapY2: 270,
      snowcapX3: 613 - width,
      snowcapY3: 320,
      snowcapX4: 573 - width,
      snowcapY4: 287,
      snowcapX5: 505 - width,
      snowcapY5: 325,
    },
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
    {
      x1: width / 2 + 240 + width,
      y1: height / 2 - 200,
      x2: width / 2 + 20 + width,
      y2: floorPos_y,
      x3: width / 2 + 460 + width,
      y3: floorPos_y,
      color: (192, 192, 192),
      snowcapX1: 834 + width,
      snowcapY1: 216,
      snowcapX2: 763 + width,
      snowcapY2: 170,
      snowcapX3: 753 + width,
      snowcapY3: 220,
      snowcapX4: 723 + width,
      snowcapY4: 187,
      snowcapX5: 665 + width,
      snowcapY5: 225,
    },
    {
      x1: width / 2 + 100 + width,
      y1: height / 2 - 100,
      x2: width / 2 - 90 + width,
      y2: floorPos_y,
      x3: width / 2 + 300 + width,
      y3: floorPos_y,
      color: (105, 105, 105),
      snowcapX1: 718 + width,
      snowcapY1: 316,
      snowcapX2: 643 + width,
      snowcapY2: 270,
      snowcapX3: 613 + width,
      snowcapY3: 320,
      snowcapX4: 573 + width,
      snowcapY4: 287,
      snowcapX5: 505 + width,
      snowcapY5: 325,
    },
  ];

  snowflakes = [];
  clouds = [];
  Clouds.createClouds();

  collectables = [];
  Collectables.initCollectables();

  flagpole = { x_pos: width + 1500, height: 300, speed: 0.2, isReached: false };
  snowman = [
    { x_pos: 150, y_pos: floorPos_y - 50, width: 100, height: 100 },
    { x_pos: 1050, y_pos: floorPos_y - 50, width: 100, height: 100 },
    { x_pos: width + 1100, y_pos: floorPos_y - 50, width: 100, height: 100 },
  ];

  platforms = [];
  platforms.push(
    Platforms.createPlatforms(canyons[0].x_pos, floorPos_y - 80, 100)
  );
  platforms.push(
    Platforms.createPlatforms(canyons[0].x_pos + 300, floorPos_y - 100, 100)
  );
  platforms.push(
    Platforms.createPlatforms(canyons[0].x_pos + 700, floorPos_y - 300, 100)
  );
  platforms.push(
    Platforms.createPlatforms(canyons[0].x_pos + 1500, floorPos_y - 100, 100)
  );

  enemies = [];
  enemies.push(new Enemies.Enemy(500, floorPos_y - 5, 100));
  enemies.push(new Enemies.Enemy(800, floorPos_y - 5, 100));
  enemies.push(new Enemies.Enemy(1500, floorPos_y - 5, 100));
  particles = [];
}
