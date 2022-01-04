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
