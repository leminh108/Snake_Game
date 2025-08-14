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

//Constants và trạng thái
const tileCount = 21;
const tileSize = () => Math.floor(canvas.clientWidth / tileCount);

let headX = 10;
let headY = 10;
let xVelocity = 0;
let yVelocity = 0;
let appleX = 5;
let appleY = 5;
let snakeParts = [];
let tailLength = 2;
let speed = 9;
let score = 0;

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const sfxEat = document.getElementById("sfxEat");
const sfxDie = document.getElementById("sfxDie");

//thêm chức năng light mode
function isLight() {
    return document.documentElement.classList.contains("light");
}

function theme(key) {
    const dark = {
        board: "#111316",
        checker: "rgba(255,255,255,.02)",
        snake: "#3bd26c",
        snakeShadow: "rgba(0,0,0,.4)",
        text: "#f9fafb",
    };

    const light = {
        board: "#f1f3f6",
        checker: "rgba(0,0,0,.04)",
        snake: "#16a34a",
        snakeShadow: "rgba(0,0,0,.18)",
        text: "#111",
    };

    return (isLight() ? light : dark)[key];
}

// hàm vẽ bảng và trái táo
function randomApple() {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);

    if (
        (appleX === headX && appleY === headY) ||
        snakeParts.some((p) => p.x === appleX && p.y === appleY)
    ) {
        randomApple();
    }
}

function drawBoard() {
    const Size = tileSize();
    ctx.fillStyle = theme("board");
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    for (let y = 0; y < tileCount; y++) {
        for (let x = 0; x < tileCount; x++) {
            if ((x + y) % 2 === 0) {
                ctx.fillStyle = theme("checker");
                const size2 = size;
                ctx.fillRect(x * size2, y * size2, size2, size2);
            }
        }
    }
}

function drawApple() {
    const size = tileSize();
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(
        appleX * size + size / 2,
        appleY * size + size / 2,
        size / 2.6,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

function drawSnake() {
    const size = tileSize();
    ctx.shadowColor = theme("snakeShadow");
    ctx.shadowBlur = 6;
    ctx.fillStyle = theme("snake");
    for (const p of snakeParts) {
        ctx.fillRect(p.x * size + 1, p.y * size + 1, size - 2, size - 2);
    }
    ctx.fillRect(headX * size, headY * size, size, size);
    ctx.shadowBlur = 0;
}

function drawScore() {
    document.getElementById("score").textContent = String(score);
}

function isGameOver() {
    if (xVelocity === 0 && yVelocity === 0) return false;

    if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount)
        return true;

    for (const p of snakeParts) {
        if (p.x === headX && p.y === headY) return true;
    }

    return false;
}

// // key to control the snake
// // Up, Down, Left, Right
// function keyDown(event) {
//     // Up
//     if (event.keyCode == 38) {
//         if (yVelocity == 1) return; // Prevent reverse
//         yVelocity = -1;
//         xVelocity = 0;
//     }
//     // Down
//     if (event.keyCode == 40) {
//         if (yVelocity == -1) return; // Prevent reverse
//         yVelocity = 1;
//         xVelocity = 0;
//     }
//     // Left
//     if (event.keyCode == 37) {
//         if (xVelocity == 1) return; // Prevent reverse
//         xVelocity = -1;
//         yVelocity = 0;
//     }
//     // Right
//     if (event.keyCode == 39) {
//         if (xVelocity == -1) return; // Prevent reverse
//         xVelocity = 1;
//         yVelocity = 0;
//     }
//     // Enter to restart
//     if (event.keyCode == 13) {
//         location.reload();
//     }
// }

// function drawApple() {
//     ctx.fillStyle = "red";
//     ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
// }

// // Update drawGame
// function drawGame() {
//     changeSnakePosition();

//     let result = isGameOver();
//     if (result) {
//         return;
//     }

//     clearScreen();
//     drawApple();
//     drawSnake();

//     setTimeout(drawGame, 100);
// }
