let gameOver = false;
let isGameStarted = false;

const canvas = document.getElementById('flappyBird');
const ctx = canvas.getContext('2d');

let score = 0;

const bird = new Image();
bird.src = '/images/Flappy-Bird.png';

const bg = '#70c5ce';

let pipes = [];
let pipeGap = 200;         // Smaller vertical gap between pipes
let pipeWidth = 50;
let pipeSpeed = 1.2;
let initialPipeSpeed = 1.2;
let passedPipes = 0;

let pipeSpacing = 170;     // Horizontal spacing between pipes
let distanceSinceLastPipe = 0;

let birdX = 50;
let birdY = 150;
let birdVelocity = 0;

function drawBird() {
    ctx.drawImage(bird, birdX, birdY, 32, 32);
}

function drawPipes() {
    ctx.fillStyle = 'green';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
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
    birdVelocity += gravity;
    birdY += birdVelocity;

    distanceSinceLastPipe += pipeSpeed;

    if (distanceSinceLastPipe >= pipeSpacing) {
        const top = Math.random() * (canvas.height / 2);
        pipes.push({ x: canvas.width, top: top, scored: false });
        distanceSinceLastPipe = 0;
    }

    pipes.forEach((pipe, i) => {
        pipe.x -= pipeSpeed;

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

            if (passedPipes % 5 === 0) {
                pipeSpeed += 0.2;
            }
        }

        if (pipe.x + pipeWidth < 0) {
            pipes.splice(i, 1);
        }
    });

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

function startGame() {
    // Change the bird image based on the selected skin
    const skinSelector = document.getElementById('birdSkinSelector');
    bird.src = skinSelector.value;
  
    document.getElementById('startScreen').style.display = 'none';
    isGameStarted = true;
    loop();
  }

function restartGame() {
    gameOver = false;
    score = 0;
    passedPipes = 0;
    pipes = [];
    birdX = 50;
    birdY = 150;
    birdVelocity = 0;
    pipeSpeed = initialPipeSpeed;
    distanceSinceLastPipe = 0;

    const popup = document.getElementById('gameOverPopup');
    popup.style.display = 'none';

    isGameStarted = true;
    loop();
}

function goBackToStart() {
    gameOver = false;
    isGameStarted = false;
    score = 0;
    passedPipes = 0;
    pipes = [];
    birdX = 50;
    birdY = 150;
    birdVelocity = 0;
    pipeSpeed = initialPipeSpeed;
    distanceSinceLastPipe = 0;

    // Clear canvas and redraw the blue background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.getElementById('gameOverPopup').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
}


function goToDashboard() {
    window.location.href = '/dashboard'; // <-- Update this path if your dashboard route is different
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && isGameStarted) {
        birdVelocity = -6.5; // Stronger flap
    }
});
document.addEventListener('click', function () {
    if (isGameStarted) {
        birdVelocity = -6.5; // Stronger flap
    }
});

bird.onload = () => {
    // Wait for user to press Start
};

window.startGame = startGame;
window.restartGame = restartGame;