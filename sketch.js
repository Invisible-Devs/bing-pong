/*
  BING PONG:
  1. You have 3 live
  2. As you successfully hit a ball, the difficulty increases by .5
  3. Once you lose the 3 lives, you can reset game with reset button
*/

//X postition of the paddles
let playerPaddleX = 10;
let oppPaddleX = 640;

//Paddle Thickness
let LeftPaddle = 10;
let RightPaddle = 10;

//the length of the paddles
let LeftPaddleHeight = 75;
let RightPaddleHeight = 75;

let life = 3;
let score = 0;

//Canvas dimensions
const canvasX = 670;
const canvasY = 450;

//ball x/y, speed x/y and radius
let ball = {
  x: 350 / 2,
  y: 480 / 2,
  r: 20,
  dx: 6,
  dy: 6,
};

function setup() {
  let canvas = createCanvas(canvasX, canvasY);
  canvas.parent("bing-pong");
}

function draw() {
  if (life > 0) {
    gameOn();
  } else {
    gameOver();
  }
}

const gameOn = () => {
  //Displays
  background(180, 202, 217);
  lives();
  level();
  divider();

  //Mechanics
  maintainPaddle();
  move();

  //Paddle
  playerPaddle();
  oppPaddle();

  function playerPaddle() {
    fill(250, 250, 250);
    stroke(44, 62, 80);
    strokeWeight(2);
    paddle1Y = mouseY; //assigns mouse cursor to left paddle
    rect(playerPaddleX, paddle1Y, LeftPaddle, LeftPaddleHeight);
  }

  function oppPaddle() {
    fill(250, 250, 250);
    stroke(0, 0, 0);
    let oppPaddleY = ball.y - RightPaddleHeight / 2;
    rect(oppPaddleX, oppPaddleY, RightPaddle, RightPaddleHeight);
  }

  //Keep paddle within canvas
  function maintainPaddle() {
    if (mouseY + LeftPaddleHeight > height) {
      mouseY = height - LeftPaddleHeight;
    }
    if (mouseY < 0) {
      mouseY = 0;
    }
  }

  //Reset ball when hot red line
  function resetBall() {
    ball.x = width / 2 + 100;
    ball.y = height / 2 + 200;
    ball.dx = 6;
    ball.dy = 6;
  }

  //Divider
  function divider() {
    for (i = 0; i < 480; i += 10) {
      let y = 0;
      fill(250, 250, 250);
      stroke(0);
      strokeWeight(0);
      rect(width / 2, y + i, 10, 480);
      fill(250, 0, 0);
      rect(0, 0, 5, 550);
    }
  }

  //Display lives
  function lives() {
    textAlign(CENTER);
    textSize(24);
    fill(250, 250, 250);
    stroke(0, 0, 0);
    text("Lives: " + life, 500, 50);
  }

  //Display level
  function level() {
    textAlign(CENTER);
    textSize(24);
    fill(250, 250, 250);
    stroke(0, 0, 0);
    text("Level: " + abs(ball.dx), 100, 50);
  }

  //Display score
  function level() {
    textAlign(CENTER);
    textSize(24);
    fill(250, 250, 250);
    stroke(0, 0, 0);
    text("Level: " + abs(ball.dx), 200, 50);
  }

  //Creates the ball, moves the ball, and makes the ball bouncy.
  function move() {
    fill(250, 250, 250);
    stroke(255, 250, 250);
    strokeWeight(0.5);
    ellipse(ball.x, ball.y, ball.r, 20);
    ball.x = ball.x + ball.dx;
    ball.y = ball.y + ball.dy;
    if (ball.x + ball.r > width - ball.r / 2) {
      ball.dx = -ball.dx - 0.5;
      score++
    }

    //Makes sure to bounce off paddle and not get stuck in paddle
    if (ball.x - (6.5 * ball.r) / 3 < 0) {
      if (ball.y >= paddle1Y && ball.y <= paddle1Y + LeftPaddleHeight) {
        ball.dx = -ball.dx + 0.5;
      } else {
        life--;
        resetBall();
        navigator.vibrate(100);
      }
    }

    // Moves opp paddle
    if (ball.y + ball.r > height || ball.y - ball.r < 0) {
      ball.dy = -ball.dy;
    }
  }
};

const gameOver = () => {
  fill(0, 0, 0);
  stroke(0);
  rect(0, 0, width, height - 1);
  fill(250, 250, 250);
  stroke(250, 250, 250);
  textSize(30);
  text("Game Over", width / 2, height / 2 - 30);
  textSize(20);
  text("Continue ?", width / 2, height / 2);
  text("Final Score: " + score, 150, 50);
};

const resetGame = () => {
  LeftPaddle = 10;
  RightPaddle = 10;
  playerPaddleX = 10;
  oppPaddleX = 640;
  LeftPaddleHeight = 75;
  RightPaddleHeight = 75;
  life = 3;
};
