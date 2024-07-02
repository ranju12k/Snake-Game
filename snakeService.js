angular.module('snakeGame').service('snakeService', ['$interval', function($interval) {
    let canvas, ctx;
    let snake, food;
    let direction;
    let gameLoop;
    let score = 0;

    this.startGame = function() {
        canvas = document.getElementById('gameCanvas');
        ctx = canvas.getContext('2d');
        direction = 'right';
        snake = [{ x: 40, y: 40 }, { x: 30, y: 40 }, { x: 20, y: 40 }];
        food = generateFood();
        score = 0;

        if (gameLoop) {
            $interval.cancel(gameLoop);
        }
        gameLoop = $interval(gameTick, 100);
    };

    this.resetGame = function() {
        if (gameLoop) {
            $interval.cancel(gameLoop);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        score = 0;
    };

    this.getScore = function() {
        return score;
    };

    function gameTick() {
        moveSnake();
        if (checkCollision()) {
            $interval.cancel(gameLoop);
            alert('Game Over');
        } else {
            if (eatFood()) {
                score += 10;
                food = generateFood();
            }
            draw();
        }
    }

    function moveSnake() {
        let head = { ...snake[0] };

        switch (direction) {
            case 'right':
                head.x += 10;
                break;
            case 'left':
                head.x -= 10;
                break;
            case 'up':
                head.y -= 10;
                break;
            case 'down':
                head.y += 10;
                break;
        }

        snake.unshift(head);
        snake.pop();
    }

    function checkCollision() {
        let head = snake[0];
        if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
            return true;
        }
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        return false;
    }

    function eatFood() {
        let head = snake[0];
        if (head.x === food.x && head.y === food.y) {
            snake.push({});
            return true;
        }
        return false;
    }

    function generateFood() {
        return {
            x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
            y: Math.floor(Math.random() * (canvas.height / 10)) * 10
        };
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'green';
        snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, 10, 10);
    }

    window.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
        }
    });
}]);
