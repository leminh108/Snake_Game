function isGameOver() {
    let gameOver = false;

    // Check if game started
    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    // Check walls
    if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
        gameOver = true;
    }

    // Check self collision
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    return gameOver;
}

// key to control the snake
// Up, Down, Left, Right
function keyDown(event) {
    // Up
    if (event.keyCode == 38) {
        if (yVelocity == 1) return; // Prevent reverse
        yVelocity = -1;
        xVelocity = 0;
    }
    // Down
    if (event.keyCode == 40) {
        if (yVelocity == -1) return; // Prevent reverse
        yVelocity = 1;
        xVelocity = 0;
    }
    // Left
    if (event.keyCode == 37) {
        if (xVelocity == 1) return; // Prevent reverse
        xVelocity = -1;
        yVelocity = 0;
    }
    // Right
    if (event.keyCode == 39) {
        if (xVelocity == -1) return; // Prevent reverse
        xVelocity = 1;
        yVelocity = 0;
    }
    // Enter to restart
    if (event.keyCode == 13) {
        location.reload();
    }
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

// Update drawGame
function drawGame() {
    changeSnakePosition();

    let result = isGameOver();
    if (result) {
        return;
    }

    clearScreen();
    drawApple();
    drawSnake();

    setTimeout(drawGame, 100);
}
