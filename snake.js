// Canvas responsive
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d", { alpha: false });

function fitCanvas() {
    const side = Math.max(
        320,
        Math.min(
            720,
            Math.min(
                Math.floor(canvas.getBoundingClientRect().width),
                Math.floor(window.innerHeight * 0.7)
            )
        )
    );
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    canvas.style.width = side + "px";
    canvas.style.height = side + "px";
    canvas.width = Math.floor(side * dpr);
    canvas.height = Math.floor(side * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
}

// gọi khi load và khi thay đổi kích thước
fitCanvas();
window.addEventListener("resize", fitCanvas);
canvas.tabIndex = 0;

// ngăn trang cuộn khi nhấn phím mũi tên
window.addEventListener(
    "keydown",
    (e) => {
        if (e.key.startsWith("Arrow")) {
            if (document.activeElement !== canvas) e.preventDefault();
        }
    },
    { passive: false }
);

canvas.addEventListener("blur", () => {
    canvas.focus({ preventScroll: true });
});

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

    // Show game over screen
    if (gameOver) {
        ctx.fillStyle = "lightblue";
        ctx.font = "50px Arial";
        ctx.fillText("Game over!", canvas.width / 6, canvas.height / 2);
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
