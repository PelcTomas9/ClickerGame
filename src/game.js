let kills = 0;
let enemyHP = 10;
let timeLeft = 10;
let isGameRunning = true;
let isPaused = false;
let playerDamage = 1;

const enemyImages = [
    'img/enemy1.png',
    'img/enemy2.png',
    'img/enemy3.png',
];

const enemyImageElem = document.getElementById('enemy-image');
const enemyHPElem = document.getElementById('enemy-hp');
const resultElem = document.getElementById('result');
const killsElement = document.getElementById('kills-value');
const restartBtn = document.getElementById('restart-btn');

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        if (isGameRunning) {
            isPaused = !isPaused;
            if (isPaused) {
                resultElem.textContent = 'Game Paused';
            } else {
                resultElem.textContent = '';
                resumeGame();
            }
        }
    } else if (event.key === 'x') {
        playerDamage = playerDamage === 1 ? 5 : 1;
        resultElem.textContent = `Player damage set to: ${playerDamage}`;
    }
});

enemyImageElem.addEventListener('click', handleClick);

function handleClick() {
    if (isGameRunning && !isPaused) {
        enemyHP -= playerDamage;

        enemyHP = Math.max(0, enemyHP);

        enemyHPElem.textContent = enemyHP;

        if (enemyHP === 0) {
            resultElem.textContent = `You defeated the enemy with ${playerDamage} damage!`;
            kills++;

            killsElement.textContent = kills;

            const enemyImage = getRandomEnemyImage();
            enemyImageElem.src = enemyImage;

            setTimeout(function () {
                nextEnemy();
            }, 1000);
        }
    }
}

function getRandomEnemyImage() {
    const randomIndex = Math.floor(Math.random() * enemyImages.length);
    return enemyImages[randomIndex];
}

function nextEnemy() {
    const firstEnemyImage = getRandomEnemyImage();
    enemyImageElem.src = firstEnemyImage;

    const minHealth = 5;
    const maxHealth = 20;
    enemyHP = Math.max(Math.floor(Math.random() * (maxHealth - minHealth + 1)) + minHealth, minHealth);

    const minTime = 10;
    const maxTime = 25;
    timeLeft = Math.max(Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime, minTime);

    resultElem.textContent = '';
    isGameRunning = true;

    enemyHPElem.textContent = enemyHP;

    startTimer();
}

function startTimer() {
    const timerInterval = setInterval(function () {
        if (!isPaused) {
            timeLeft--;

            if (timeLeft >= 0) {
                resultElem.textContent = `Time left: ${timeLeft} seconds`;
            } else {
                resultElem.textContent = 'Time is up! You lost.';
                isGameRunning = false;

                restartBtn.style.display = 'inline';

                clearInterval(timerInterval);
            }
        }
    }, 1000);
}

function resetGame() {
    kills = 0;
    enemyHP = 10;
    timeLeft = 10;
    resultElem.textContent = '';
    isGameRunning = true;
    isPaused = false;
    restartBtn.style.display = 'none';
    killsElement.textContent = kills;

    nextEnemy();
}

function resumeGame() {
    resultElem.textContent = '';
    startTimer();
}

nextEnemy();
