//Interactivity Functions
//Collectable Functions
function checkIfGameCharInCollectablesRange() {
  for (var i = 0; i < collectables.length; i++) {
    var collectable = collectables[i];
    checkIfGameCharInCollectableRange(collectable);
  }
}

function checkIfGameCharInCollectableRange(collectable) {
  var d = dist(
    gameChar_world_x,
    gameChar_y,
    collectable.x_pos,
    collectable.y_pos
  );
  if (d < 20) {
    collectable.isFound = true;
  }
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
    if(!checkIfCollectableOverCanyon(collectable)){
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
  }
}
//End of Canon Functions