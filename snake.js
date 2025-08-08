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

function drawSnake() {
    // Draw body parts
    ctx.fillStyle = 'blue';
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    
    // Add new head position
    snakeParts.push(new SnakePart(headX, headY));
    
    // Remove tail if too long
    if(snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    
    // Draw head
    ctx.fillStyle = 'tomato';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
//command 

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, canvas.width - 80, 20);
}

// Update drawGame
function drawGame() {
    changeSnakePosition();
    
    let result = isGameOver();
    if(result) {
        return;
    }
    
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    
    setTimeout(drawGame, 100);
}

