let gameOver = false;
let isGameStarted = false;

const canvas = document.getElementById('flappyBird');
const ctx = canvas.getContext('2d');

// Game variables
let frames = 0;
const gravity = 0.12;
let score = 0;

const bird = new Image();
bird.src = '/images/Flappy-Bird.png';

const bg = 'black';

let pipes = [];
let pipeGap = 200;  // Fixed pipe gap size
let pipeWidth = 50; // Pipe width
let pipeSpeed = 1.2;  // Initial pipe speed
let initialPipeSpeed = 1.2; // Store initial pipe speed for resetting
let passedPipes = 0; // Track number of passed pipes

let birdX = 50;
let birdY = 150;
let birdVelocity = 0;

function drawBird() {
    ctx.drawImage(bird, birdX, birdY, 32, 32);
}

function drawPipes() {
    ctx.fillStyle = 'green';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top); // Top pipe
        ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap); // Bottom pipe
    });
}

function drawScore() {
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 25);
}

function showGameOverPopup() {
    const popup = document.getElementById('gameOverPopup');
    const finalScore = document.getElementById('finalScore');
    finalScore.innerText = `Your Score: ${score}`;
    popup.style.display = 'block';
}

function update() {
    frames++;

    birdVelocity += gravity;
    birdY += birdVelocity;

    // Add a new pipe every 140 frames
    if (frames % 140 === 0) {
        const top = Math.random() * (canvas.height / 2);
        pipes.push({ x: canvas.width, top: top, scored: false });
    }

    // Update pipe movement
    pipes.forEach((pipe, i) => {
        pipe.x -= pipeSpeed;  // Move pipes based on speed

        if (
            birdX + 32 > pipe.x &&
            birdX < pipe.x + pipeWidth &&
            (
                birdY < pipe.top ||
                birdY > pipe.top + pipeGap
            )
        ) {
            if (!gameOver) {
                gameOver = true;
                showGameOverPopup();
            }
        }

        if (!pipe.scored && pipe.x + pipeWidth < birdX) {
            score++;
            pipe.scored = true;
            passedPipes++;

            // Increase pipe speed after every 5 pipes passed
            if (passedPipes % 5 === 0) {
                pipeSpeed += 0.2; // Increase pipe speed by 0.2 after every 5 pipes passed
            }
        }

        if (pipe.x + pipeWidth < 0) {
            pipes.splice(i, 1);
        }
    });

    // Ground collision
    if (birdY + 32 > canvas.height) {
        if (!gameOver) {
            gameOver = true;
            showGameOverPopup();
        }
    }
}

function draw() {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBird();
    drawPipes();
    drawScore();
}

function loop() {
    if (!gameOver && isGameStarted) {
        update();
        draw();
        requestAnimationFrame(loop);
    }
}

// Starts game from first click
function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    isGameStarted = true;
    loop();
}

// Reset game without reloading
function restartGame() {
    gameOver = false;
    frames = 0;
    score = 0;
    passedPipes = 0; // Reset passed pipes counter
    pipes = [];
    birdX = 50;
    birdY = 150;
    birdVelocity = 0;

    // Reset pipe speed to its initial value
    pipeSpeed = initialPipeSpeed;

    const popup = document.getElementById('gameOverPopup');
    popup.style.display = 'none';

    isGameStarted = true;
    loop();
}

function backToStart() {
    gameOver = false;
    isGameStarted = false;
    frames = 0;
    score = 0;
    passedPipes = 0;
    pipes = [];
    birdX = 50;
    birdY = 150;
    birdVelocity = 0;
    pipeSpeed = initialPipeSpeed;

    const popup = document.getElementById('gameOverPopup');
    popup.style.display = 'none';

    document.getElementById('startScreen').style.display = 'block';
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && isGameStarted) {
        birdVelocity = -4.5;
    }
});
document.addEventListener('click', function () {
    if (isGameStarted) {
        birdVelocity = -4.5;
    }
});

bird.onload = () => {
    // Wait for user to press Start
};

window.startGame = startGame;
window.restartGame = restartGame;
