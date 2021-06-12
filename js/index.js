// Game constants & variables
let inputDir = {
  x: 0,
  y: 0,
};
let lastPaintTime = 0;
let speed = 8;
let score = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = {
  x: 6,
  y: 7,
};

// Game Functions
function main(cTime) {
  window.requestAnimationFrame(main);
  if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = cTime;

  gameEngine();
}

function isCollide(sarr) {
  for (let i = 1; i < sarr.length; i++) {
    if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
      return true;
    }
  }
  if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
    return true;
  }
  return false;
}

function gameEngine() {
  // Part1: update snake array
  if (isCollide(snakeArr)) {
    inputDir = { x: 0, y: 0 };
    alert('Game over. Press any key to play again!');
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    scoreBox.innerHTML = 'Score: ' + 0;
  }
  // If snake eaten the food, inc score and regenerate food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    score += 1;
    scoreBox.innerHTML = 'Score: ' + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  // Move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part2: Display the snake and food
  board.innerHTML = '';

  // Display snake
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index) {
      snakeElement.classList.add('snake');
    } else {
      snakeElement.classList.add('head');
    }
    board.appendChild(snakeElement);
  });

  // Display food
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
}

// Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
  inputDir = { x: 0, y: 1 };
  switch (e.key) {
    case 'ArrowUp':
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case 'ArrowDown':
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case 'ArrowLeft':
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case 'ArrowRight':
      inputDir.x = +1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
