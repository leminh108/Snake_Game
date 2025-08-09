// key to control the snake
// Up, Down, Left, Right
function keyDown(event) {
    // Up
    if(event.keyCode == 38) {
        if(yVelocity == 1) return; // Prevent reverse
        yVelocity = -1;
        xVelocity = 0;
    }
    // Down  
    if(event.keyCode == 40) {
        if(yVelocity == -1) return; // Prevent reverse
        yVelocity = 1;
        xVelocity = 0;
    }
    // Left
    if(event.keyCode == 37) {
        if(xVelocity == 1) return; // Prevent reverse
        xVelocity = -1;
        yVelocity = 0;
    }
    // Right
    if(event.keyCode == 39) {
        if(xVelocity == -1) return; // Prevent reverse
        xVelocity = 1;
        yVelocity = 0;
    }
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

// Update drawGame
function drawGame() {
    changeSnakePosition();
    
    let result = isGameOver();
    if(result) {
        return;
    }
    
    clearScreen();
    drawApple();
    drawSnake();
    
    setTimeout(drawGame, 100);
}