let player;
let obstacles = [];
let exit;

function setup() {
  createCanvas(600, 400);
  createPlayer();
  createObstacles();
  createExit();
}

function draw() {
  background(240);
  drawBorders();
  movePlayer();
  drawPlayer();
  moveObstacles();
  drawObstacles();
  drawExit();
  checkWin();
}

function createPlayer() {
  player = {
    x: 50,
    y: height / 2,
    size: 30,
    speed: 3
  };
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.y += player.speed;
}

function drawPlayer() {
//mouse
  fill(150);
  ellipse(player.x, player.y, player.size); // Head
  fill(180);
  ellipse(player.x - 10, player.y - 10, 10);
  ellipse(player.x + 10, player.y - 10, 10);
  fill(0);
  ellipse(player.x - 5, player.y - 5, 3);
  ellipse(player.x + 5, player.y - 5, 3);
  fill(255, 105, 180);
  ellipse(player.x, player.y + 5, 4);
}

function mousePressed() {
  let cat = {
    x: mouseX,
    y: mouseY,
    size: random(30, 50),
    color: color(random(255), random(255), random(255)),
    speedX: random(-2, 2),
    speedY: random(-2, 2)
  };
  obstacles.push(cat);
}

function createObstacles() {
  for (let i = 0; i < 5; i++) {
    obstacles.push({
      x: random(width),
      y: random(height),
      size: random(30, 50),
      color: color(random(255), random(100), random(100)),
      speedX: random(-2, 2),
      speedY: random(-2, 2)
    });
  }
}

function moveObstacles() {
  for (let obs of obstacles) {
    obs.x += obs.speedX;
    obs.y += obs.speedY;


    if (obs.x > width) obs.x = 0;
    if (obs.x < 0) obs.x = width;
    if (obs.y > height) obs.y = 0;
    if (obs.y < 0) obs.y = height;
  }
}

function drawObstacles() {
  for (let obs of obstacles) {
    fill(obs.color);
//cat
    ellipse(obs.x, obs.y, obs.size); // Face
    triangle(
      obs.x - obs.size / 3, obs.y - obs.size / 3,
      obs.x - obs.size / 6, obs.y - obs.size / 1.8,
      obs.x - obs.size / 6, obs.y - obs.size / 3
    ); 
    triangle(
      obs.x + obs.size / 3, obs.y - obs.size / 3,
      obs.x + obs.size / 6, obs.y - obs.size / 1.8,
      obs.x + obs.size / 6, obs.y - obs.size / 3
    ); 
    fill(0);
    ellipse(obs.x - 5, obs.y - 5, 4); // Eyes
    ellipse(obs.x + 5, obs.y - 5, 4);
    fill(255, 150, 150);
    triangle(obs.x, obs.y + 2, obs.x - 3, obs.y + 8, obs.x + 3, obs.y + 8); // Nose
  }
}

function drawBorders() {
  stroke(0);
  noFill();
  rect(0, 0, width, height);
}

function createExit() {
  exit = {
    x: width - 60,
    y: height / 2 - 20,
    size: 40
  };
}

function drawExit() {
//cheese
  fill(255, 220, 0);
  triangle(
    exit.x, exit.y + exit.size,
    exit.x + exit.size, exit.y + exit.size,
    exit.x + exit.size / 2, exit.y
  );
 
  fill(255, 200, 50);
  ellipse(exit.x + 10, exit.y + exit.size - 10, 5);
  ellipse(exit.x + 25, exit.y + exit.size - 5, 4);
  ellipse(exit.x + 20, exit.y + exit.size - 20, 3);
}

function checkWin() {
  if (
    player.x > exit.x &&
    player.x < exit.x + exit.size &&
    player.y > exit.y &&
    player.y < exit.y + exit.size
  ) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
    noLoop();
  }
}