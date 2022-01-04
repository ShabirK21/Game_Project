//Game Character Functions
function drawFacingFront() {
    fill(0);
    rect(gameChar_x - 10, gameChar_y - 50, 20, 10);
    fill(200, 150, 150);
    rect(gameChar_x - 10, gameChar_y - 45, 20, 15);
    fill(0);
    ellipse(gameChar_x - 5, gameChar_y - 40, 5, 5);
    ellipse(gameChar_x + 5, gameChar_y - 40, 5, 5);
    stroke(2);
    ellipse(gameChar_x, gameChar_y - 30, 5, 5);
    noStroke();
    fill(255, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 30, 20, 25);
    fill(0);
    rect(gameChar_x + 3, gameChar_y - 10, 7, 13);
    rect(gameChar_x - 10, gameChar_y - 10, 7, 13);
    fill(0);
    rect(gameChar_x + 10, gameChar_y - 25, 5, 10);
    rect(gameChar_x - 15, gameChar_y - 25, 5, 10);
  }
  
  function drawWalkRight() {
    //Hair
    fill(0);
    rect(gameChar_x - 10, gameChar_y - 50, 20, 10);
    //Head
    fill(200, 150, 150);
    rect(gameChar_x - 10, gameChar_y - 45, 20, 15);
    //ellipse(gameChar_x, gameChar_y-50, 25);
    //Face
    fill(0);
    ellipse(gameChar_x - 2, gameChar_y - 40, 5, 5);
    ellipse(gameChar_x + 7, gameChar_y - 40, 5, 5);
    stroke(2);
    ellipse(gameChar_x + 3, gameChar_y - 30, 5, 5);
    noStroke();
    //Body
    fill(255, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 30, 20, 25);
    //Legs
    fill(0);
    rect(gameChar_x + 4, gameChar_y - 10, 7, 13);
    rect(gameChar_x - 9, gameChar_y - 10, 7, 13);
    //Hands
    fill(0);
    rect(gameChar_x + 10, gameChar_y - 25, 5, 10);
    rect(gameChar_x - 10, gameChar_y - 25, 5, 10);
  }
  
  function drawWalkLeft() {
    //Hair
    fill(0);
    rect(gameChar_x - 10, gameChar_y - 50, 20, 10);
    //Head
    fill(200, 150, 150);
    rect(gameChar_x - 10, gameChar_y - 45, 20, 15);
    //Face
    fill(0);
    ellipse(gameChar_x - 7, gameChar_y - 40, 5, 5);
    ellipse(gameChar_x + 3, gameChar_y - 40, 5, 5);
    stroke(2);
    ellipse(gameChar_x - 3, gameChar_y - 30, 5, 5);
    noStroke();
    //Body
    fill(255, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 30, 20, 25);
    //Legs
    fill(0);
    rect(gameChar_x + 2, gameChar_y - 10, 7, 13);
    rect(gameChar_x - 11, gameChar_y - 10, 7, 13);
    //Hands
    fill(0);
    rect(gameChar_x + 5, gameChar_y - 25, 5, 10);
    rect(gameChar_x - 15, gameChar_y - 25, 5, 10);
  }
  
  function drawJumpUp() {
    //Hair
    fill(0);
    rect(gameChar_x - 10, gameChar_y - 50, 20, 10);
    //Head
    fill(200, 150, 150);
    rect(gameChar_x - 10, gameChar_y - 45, 20, 15);
    //ellipse(gameChar_x, gameChar_y-50, 25);
    //Face
    fill(0);
    ellipse(gameChar_x - 5, gameChar_y - 40, 5, 5);
    ellipse(gameChar_x + 5, gameChar_y - 40, 5, 5);
    stroke(2);
    ellipse(gameChar_x, gameChar_y - 30, 5, 5);
    noStroke();
    //Body
    fill(255, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 30, 20, 25);
    //Legs
    fill(0);
    rect(gameChar_x + 3, gameChar_y - 15, 7, 13);
    rect(gameChar_x - 10, gameChar_y - 15, 7, 13);
    //Hands
    fill(0);
    rect(gameChar_x + 10, gameChar_y - 30, 5, 10);
    rect(gameChar_x - 15, gameChar_y - 30, 5, 10);
  }
  
  function drawJumpRight() {
    //Hair
    fill(0);
    rect(gameChar_x - 10, gameChar_y - 50, 20, 10);
    //Head
    fill(200, 150, 150);
    rect(gameChar_x - 10, gameChar_y - 45, 20, 15);
    //ellipse(gameChar_x, gameChar_y-50, 25);
    //Face
    fill(0);
    ellipse(gameChar_x - 3, gameChar_y - 40, 5, 5);
    ellipse(gameChar_x + 7, gameChar_y - 40, 5, 5);
    stroke(2);
    ellipse(gameChar_x + 2, gameChar_y - 30, 5, 5);
    noStroke();
    //Body
    fill(255, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 30, 20, 25);
    //Legs
    fill(0);
    rect(gameChar_x + 4, gameChar_y - 15, 7, 13);
    rect(gameChar_x - 9, gameChar_y - 15, 7, 13);
    //Hands
    fill(0);
    rect(gameChar_x + 10, gameChar_y - 30, 5, 10);
    rect(gameChar_x - 10, gameChar_y - 30, 5, 10);
  }
  
  function drawJumpLeft() {
    //Hair
    fill(0);
    rect(gameChar_x - 10, gameChar_y - 50, 20, 10);
    //Head
    fill(200, 150, 150);
    rect(gameChar_x - 10, gameChar_y - 45, 20, 15);
    //ellipse(gameChar_x, gameChar_y-50, 25);
    //Face
    fill(0);
    ellipse(gameChar_x - 7, gameChar_y - 40, 5, 5);
    ellipse(gameChar_x + 3, gameChar_y - 40, 5, 5);
    stroke(2);
    ellipse(gameChar_x - 2, gameChar_y - 30, 5, 5);
    noStroke();
    //Body
    fill(255, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 30, 20, 25);
    //Legs
    fill(0);
    rect(gameChar_x + 2, gameChar_y - 15, 7, 13);
    rect(gameChar_x - 11, gameChar_y - 15, 7, 13);
    //Hands
    fill(0);
    rect(gameChar_x + 5, gameChar_y - 30, 5, 10);
    rect(gameChar_x - 15, gameChar_y - 30, 5, 10);
  }