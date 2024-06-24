document.addEventListener('DOMContentLoaded', () => {
    const car = document.getElementById('car');
    const obstacle = document.getElementById('obstacle');
    const gameArea = document.getElementById('gameArea');

    let carPosition = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    let obstaclePosition = -100;
    let obstacleLeft = Math.random() * (gameArea.offsetWidth - obstacle.offsetWidth);
    let speed = 5;
    let isGameOver = false;
    let keys = {};

    document.addEventListener('keydown', (e) => {
        if (isGameOver) return;
        keys[e.key] = true;
    });

    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    function moveCar() {
        if (keys['ArrowLeft']) {
            carPosition -= 5;
        }
        if (keys['ArrowRight']) {
            carPosition += 5;
        }

        carPosition = Math.max(0, Math.min(gameArea.offsetWidth - car.offsetWidth, carPosition));
        car.style.left = `${carPosition}px`;
    }

    function handleTouchMove(event) {
        if (isGameOver) return;
        
        const touch = event.touches[0];
        const touchX = touch.clientX - gameArea.getBoundingClientRect().left;
        carPosition = Math.max(0, Math.min(gameArea.offsetWidth - car.offsetWidth, touchX - car.offsetWidth / 2));
        car.style.left = `${carPosition}px`;
    }

    gameArea.addEventListener('touchstart', handleTouchMove);
    gameArea.addEventListener('touchmove', handleTouchMove);

    function updateObstacle() {
        if (isGameOver) return;

        obstaclePosition += speed;
        if (obstaclePosition > gameArea.offsetHeight) {
            obstaclePosition = -100;
            obstacleLeft = Math.random() * (gameArea.offsetWidth - obstacle.offsetWidth);
            speed += 0.5; // Increase speed
        }

        obstacle.style.top = `${obstaclePosition}px`;
        obstacle.style.left = `${obstacleLeft}px`;

        // Check for collision
        if (
            obstaclePosition + obstacle.offsetHeight > car.offsetTop &&
            obstacleLeft < carPosition + car.offsetWidth &&
            obstacleLeft + obstacle.offsetWidth > carPosition
        ) {
            alert('Game Over!');
            isGameOver = true;
            document.getElementById('restartButton').style.display = 'block';
        }

        requestAnimationFrame(updateObstacle);
    }

    function gameLoop() {
        if (!isGameOver) {
            moveCar();
        }
        requestAnimationFrame(gameLoop);
    }

    updateObstacle();
    gameLoop();

    window.restartGame = function() {
        carPosition = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
        obstaclePosition = -100;
        obstacleLeft = Math.random() * (gameArea.offsetWidth - obstacle.offsetWidth);
        speed = 5;
        isGameOver = false;
        document.getElementById('restartButton').style.display = 'none';

        car.style.left = `${carPosition}px`;
        obstacle.style.top = `${obstaclePosition}px`;
        obstacle.style.left = `${obstacleLeft}px`;

        updateObstacle();
    }
});
