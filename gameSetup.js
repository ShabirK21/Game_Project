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
    { x_pos: width + 1300, width: 100 }
  ];

  trees = [];
  trees.push(new Tree.generateTree(500, floorPos_y - 100, 50, 100));
  trees.push(new Tree.generateTree(1400, floorPos_y - 100, 50, 100));

  mountains = [];
  mountains.push(
    new Mountain.generateMountain(
      width / 2 + 240 - width + 100,
      height / 2 - 200,
      width / 2 + 20 - width + 100,
      width / 2 + 460 - width + 100,
      (192, 192, 192),
      834 - width + 100,
      216,
      763 - width + 100,
      170,
      753 - width + 100,
      220,
      723 - width + 100,
      187,
      665 - width + 100,
      225
    )
  );
  mountains.push(
    new Mountain.generateMountain(
      width / 2 + 100 - width,
      height / 2 - 100,
      width / 2 - 90 - width,
      width / 2 + 300 - width,
      (105, 105, 105),
      718 - width,
      316,
      643 - width,
      270,
      613 - width,
      320,
      573 - width,
      287,
      505 - width,
      325
    )
  );
  mountains.push(
    new Mountain.generateMountain(
      width / 2 + 240,
      height / 2 - 200,
      width / 2 + 20,
      width / 2 + 460,
      (192, 192, 192),
      834,
      216,
      763,
      170,
      753,
      220,
      723,
      187,
      665,
      225
    )
  );
  mountains.push(
    new Mountain.generateMountain(
      width / 2 + 100,
      height / 2 - 100,
      width / 2 - 90,
      width / 2 + 300,
      (105, 105, 105),
      718,
      316,
      643,
      270,
      613,
      320,
      573,
      287,
      505,
      325
    )
  );
  mountains.push(
    new Mountain.generateMountain(
      width / 2 + 240 + width,
      height / 2 - 200,
      width / 2 + 20 + width,
      width / 2 + 460 + width,
      (192, 192, 192),
      834 + width,
      216,
      763 + width,
      170,
      753 + width,
      220,
      723 + width,
      187,
      665 + width,
      225
    )
  );
  mountains.push(
    new Mountain.generateMountain(
      width / 2 + 100 + width,
      height / 2 - 100,
      width / 2 - 90 + width,
      width / 2 + 300 + width,
      (105, 105, 105),
      718 + width,
      316,
      643 + width,
      270,
      613 + width,
      320,
      573 + width,
      287,
      505 + width,
      325
    )
  );

  snowflakes = [];
  clouds = [];
  Clouds.generateClouds();

  collectables = [];
  Collectables.initCollectables();

  flagpole = { x_pos: width + 1500, height: 300, speed: 0.2, isReached: false };

  snowmen = [];
  snowmen.push(new Snowman.generateSnowman(150, 100, 100));
  snowmen.push(new Snowman.generateSnowman(1050, 100, 100));
  snowmen.push(new Snowman.generateSnowman(width + 1100, 100, 100));

  // Create platforms and push to array
  platforms = [];
  platforms.push(
    Platforms.createPlatforms(canyons[0].x_pos, floorPos_y - 80, 100)
  );
  platforms.push(
    Platforms.createPlatforms(canyons[0].x_pos + 400, floorPos_y - 100, 100)
  );
  platforms.push(
    Platforms.createPlatforms(canyons[0].x_pos + 550, floorPos_y - 150, 100)
  );
  platforms.push(
    Platforms.createPlatforms(canyons[1].x_pos + 300, floorPos_y - 100, 100)
  );
  platforms.push(
    Platforms.createPlatforms(canyons[1].x_pos + 600, floorPos_y - 130, 100)
  );
  platforms.push(
    Platforms.createPlatforms(canyons[1].x_pos + 970, floorPos_y - 150, 100)
  );
  // Create enemies and push to array
  enemies = [];
  enemies.push(new Enemies.Enemy(500, floorPos_y - 5, 100));
  enemies.push(new Enemies.Enemy(800, floorPos_y - 5, 100));
  enemies.push(new Enemies.Enemy(1500, floorPos_y - 5, 100));
  enemies.push(new Enemies.Enemy(1700, floorPos_y - 5, 100));
  enemies.push(new Enemies.Enemy(2000, floorPos_y - 5, 100));
  particles = [];
}
