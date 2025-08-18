const btn = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.add("light");
}
btn.textContent = document.documentElement.classList.contains("light")
    ? "☀️"
    : "🌙";
btn.addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
    const light = document.documentElement.classList.contains("light");
    btn.textContent = light ? "☀️" : "🌙";
    localStorage.setItem("theme", light ? "light" : "dark");
});

// ===== Canvas responsive =====
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
    canvas.width = side * dpr;
    canvas.height = side * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
fitCanvas();
addEventListener("resize", fitCanvas);

// ===== Ngăn trang cuộn theo phím mũi tên =====
const blockedKeys = new Set([
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "PageUp",
    "PageDown",
    "Home",
    "End",
    " ",
]);
window.addEventListener(
    "keydown",
    (e) => {
        if (blockedKeys.has(e.key)) e.preventDefault();
    },
    { passive: false }
);
// ==== Focus canvas ====
canvas.addEventListener("click", () => canvas.focus());
window.addEventListener("load", () => canvas.focus());

// ===== Game constants & state =====
const tileCount = 20;
const tileSize = () => Math.floor(canvas.clientWidth / tileCount);

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let headX = 10,
    headY = 10;
let xVelocity = 0,
    yVelocity = 0;
let snakeParts = [];
let tailLength = 2;

let appleX = 5,
    appleY = 5;
let score = 0;
let speed = 9;

const sfxEat = document.getElementById("sfxEat");
const sfxLose = document.getElementById("sfxLose");

// ===== Theme helpers =====
function isLight() {
    return document.documentElement.classList.contains("light");
}
function theme(key) {
    const dark = {
        board: "#0f1113",
        checker: "rgba(255,255,255,.035)",
        snake: "#79e8b6",
        snakeShadow: "rgba(0,0,0,.35)",
        text: "#fff",
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

// ===== Game utils & draw =====
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
    const size = tileSize();
    ctx.fillStyle = theme("board");
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    for (let y = 0; y < tileCount; y++) {
        for (let x = 0; x < tileCount; x++) {
            if ((x + y) % 2 === 0) {
                ctx.fillStyle = theme("checker");
                ctx.fillRect(x * size, y * size, size, size);
            }
        }
    }
}

function drawApple() {
    const size = tileSize();
    const cx = appleX * size + size / 2,
        cy = appleY * size + size / 2;
    const g = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size * 0.52);
    g.addColorStop(0, "#ffe08a");
    g.addColorStop(1, "#ff6a4b");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.42, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.20)";
    ctx.beginPath();
    ctx.arc(cx - size * 0.16, cy - size * 0.18, size * 0.12, 0, Math.PI * 2);
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
    document.getElementById("score").textContent = score;
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

function gameOver() {
    const size = tileSize();
    ctx.fillStyle = "rgba(0,0,0,.45)";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillStyle = theme("text");
    ctx.font = `bold ${Math.floor(size * 1.1)}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.clientWidth / 2, canvas.clientHeight / 2);
    try {
        sfxLose.currentTime = 0;
        sfxLose.play();
    } catch {}
}

// ===== Loop =====
let lastTime = 0;
function loop(t) {
    const dt = (t - lastTime) / 1000;
    if (dt < 1 / speed) {
        requestAnimationFrame(loop);
        return;
    }
    lastTime = t;

    headX += xVelocity;
    headY += yVelocity;

    if (isGameOver()) {
        gameOver();
        return;
    }

    if (headX === appleX && headY === appleY) {
        appleX = -1;
        appleY = -1;
        tailLength++;
        score++;
        if ([2, 5, 10, 20].includes(score)) speed += 1;
        drawScore();
        try {
            sfxEat.currentTime = 0;
            sfxEat.play();
        } catch {}
        setTimeout(randomApple, 80);
    }

    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength) snakeParts.shift();

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    drawBoard();
    drawApple();
    drawSnake();

    requestAnimationFrame(loop);
}

// ===== Controls =====
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (yVelocity === 1) break;
            yVelocity = -1;
            xVelocity = 0;
            break;
        case "ArrowDown":
            if (yVelocity === -1) break;
            yVelocity = 1;
            xVelocity = 0;
            break;
        case "ArrowLeft":
            if (xVelocity === 1) break;
            xVelocity = -1;
            yVelocity = 0;
            break;
        case "ArrowRight":
            if (xVelocity === -1) break;
            xVelocity = 1;
            yVelocity = 0;
            break;
        case "Enter":
            reset();
            break;
    }
});

document.getElementById("restart").addEventListener("click", reset);

function reset() {
    headX = 10;
    headY = 10;
    xVelocity = 0;
    yVelocity = 0;
    snakeParts = [];
    tailLength = 2;
    score = 0;
    speed = 9;
    drawScore();
    randomApple();
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    requestAnimationFrame(loop);
}

// ===== Start =====
randomApple();
drawScore();
requestAnimationFrame(loop);
