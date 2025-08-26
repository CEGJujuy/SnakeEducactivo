// Variables globales del juego
let canvas, ctx;
let gameState = 'menu'; // menu, playing, paused, question, gameOver
let currentLevel = 1;
let score = 0;
let gameTime = 0;
let gameTimer;

// Variables de la serpiente
let snake = [];
let direction = { x: 0, y: 0 };
let nextDirection = { x: 0, y: 0 };

// Variables del juego
let food = {};
let gridSize = 20;
let tileCount;

// Variables de preguntas
let currentQuestions = [];
let currentQuestionIndex = 0;
let currentQuestion = null;
let questionTimer;
let questionTimeLeft = 10;

// Variables de estadísticas
let correctAnswers = 0;
let wrongAnswers = 0;
let totalQuestions = 0;

// Inicialización del juego
document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    // Configurar el canvas
    tileCount = canvas.width / gridSize;
    
    // Event listeners
    setupEventListeners();
    
    // Mostrar pantalla de inicio
    showScreen('start-screen');
});

function setupEventListeners() {
    // Botones de nivel
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            currentLevel = parseInt(this.dataset.level);
        });
    });
    
    // Botón de inicio
    document.getElementById('start-game').addEventListener('click', startGame);
    
    // Controles táctiles
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const dir = this.dataset.direction;
            changeDirection(dir);
        });
    });
    
    // Controles de teclado
    document.addEventListener('keydown', handleKeyPress);
    
    // Botones de pausa
    document.getElementById('pause-btn').addEventListener('click', pauseGame);
    document.getElementById('resume-btn').addEventListener('click', resumeGame);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.getElementById('menu-btn').addEventListener('click', goToMenu);
    
    // Botones de estadísticas
    document.getElementById('play-again').addEventListener('click', restartGame);
    document.getElementById('back-to-menu').addEventListener('click', goToMenu);
    
    // Prevenir zoom en dispositivos móviles
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

function startGame() {
    // Resetear variables
    score = 0;
    gameTime = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    totalQuestions = 0;
    currentQuestionIndex = 0;
    
    // Obtener preguntas para el nivel seleccionado
    currentQuestions = getRandomQuestions(currentLevel, 15);
    
    // Inicializar serpiente
    snake = [
        { x: 10, y: 10 }
    ];
    direction = { x: 0, y: 0 };
    nextDirection = { x: 0, y: 0 };
    
    // Generar primera comida
    generateFood();
    
    // Cambiar estado y pantalla
    gameState = 'playing';
    showScreen('game-screen');
    
    // Actualizar UI
    updateGameUI();
    
    // Iniciar timers
    startGameTimer();
    gameLoop();
}

function gameLoop() {
    if (gameState !== 'playing') return;
    
    update();
    draw();
    
    setTimeout(gameLoop, 150 - (currentLevel * 20)); // Velocidad aumenta con el nivel
}

function update() {
    if (gameState !== 'playing') return;
    
    // Actualizar dirección
    direction = { ...nextDirection };
    
    // Mover serpiente solo si hay dirección
    if (direction.x !== 0 || direction.y !== 0) {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        
        // Verificar colisiones con paredes
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            gameOver();
            return;
        }
        
        // Verificar colisiones con el cuerpo
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
            return;
        }
        
        snake.unshift(head);
        
        // Verificar si comió la comida
        if (head.x === food.x && head.y === food.y) {
            // Mostrar pregunta
            showQuestion();
        } else {
            snake.pop();
        }
    }
}

function draw() {
    // Limpiar canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar serpiente
    ctx.fillStyle = '#4ecdc4';
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Cabeza de la serpiente
            ctx.fillStyle = '#ff6b6b';
        } else {
            ctx.fillStyle = '#4ecdc4';
        }
        
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        
        // Ojos de la serpiente (solo en la cabeza)
        if (index === 0) {
            ctx.fillStyle = '#fff';
            ctx.fillRect(segment.x * gridSize + 4, segment.y * gridSize + 4, 3, 3);
            ctx.fillRect(segment.x * gridSize + 13, segment.y * gridSize + 4, 3, 3);
        }
    });
    
    // Dibujar comida
    ctx.fillStyle = '#feca57';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    
    // Dibujar símbolo de pregunta en la comida
    ctx.fillStyle = '#2c3e50';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('?', food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2 + 4);
}

function generateFood() {
    do {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

function showQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        // No hay más preguntas, terminar juego
        gameOver();
        return;
    }
    
    gameState = 'question';
    currentQuestion = currentQuestions[currentQuestionIndex];
    totalQuestions++;
    
    // Mostrar modal de pregunta
    const modal = document.getElementById('question-modal');
    const categoryEl = document.getElementById('question-category');
    const questionNumEl = document.getElementById('question-num');
    const questionTextEl = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    
    categoryEl.textContent = getCategoryName(currentQuestion.category);
    questionNumEl.textContent = totalQuestions;
    questionTextEl.textContent = currentQuestion.question;
    
    // Limpiar respuestas anteriores
    answersContainer.innerHTML = '';
    
    // Crear botones de respuesta
    currentQuestion.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
        btn.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(btn);
    });
    
    modal.classList.add('active');
    
    // Iniciar timer de pregunta
    startQuestionTimer();
}

function selectAnswer(selectedIndex) {
    clearTimeout(questionTimer);
    
    const buttons = document.querySelectorAll('.answer-btn');
    const correctIndex = currentQuestion.correct;
    
    // Mostrar respuesta correcta e incorrecta
    buttons.forEach((btn, index) => {
        if (index === correctIndex) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && index !== correctIndex) {
            btn.classList.add('incorrect');
        }
        btn.disabled = true;
    });
    
    // Procesar respuesta
    if (selectedIndex === correctIndex) {
        correctAnswers++;
        score += 10 * currentLevel;
        // La serpiente crece (no quitar el último segmento)
    } else {
        wrongAnswers++;
        // Reducir serpiente si es incorrecta
        if (snake.length > 1) {
            snake.pop();
            snake.pop(); // Quitar dos segmentos
        }
    }
    
    currentQuestionIndex++;
    
    // Cerrar modal después de 1.5 segundos y continuar el juego
    setTimeout(() => {
        document.getElementById('question-modal').classList.remove('active');
        generateFood();
        gameState = 'playing';
        updateGameUI();
        gameLoop(); // Reanudar el loop del juego
    }, 1500);
}

function startQuestionTimer() {
    questionTimeLeft = 10;
    updateQuestionTimer();
    
    questionTimer = setInterval(() => {
        questionTimeLeft--;
        updateQuestionTimer();
        
        if (questionTimeLeft <= 0) {
            // Tiempo agotado, respuesta incorrecta
            selectAnswer(-1); // Índice inválido para marcar como incorrecta
        }
    }, 1000);
}

function updateQuestionTimer() {
    const timerText = document.getElementById('timer-text');
    const timerBar = document.getElementById('timer-bar');
    
    timerText.textContent = `${questionTimeLeft}s`;
    
    const percentage = (questionTimeLeft / 10) * 100;
    timerBar.style.setProperty('--timer-width', `${percentage}%`);
}

function changeDirection(dir) {
    if (gameState !== 'playing') return;
    
    const directions = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 }
    };
    
    const newDir = directions[dir];
    
    // Prevenir movimiento en dirección opuesta
    if (direction.x !== -newDir.x || direction.y !== -newDir.y) {
        nextDirection = newDir;
    }
}

function handleKeyPress(e) {
    if (gameState === 'playing') {
        switch(e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                changeDirection('up');
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                changeDirection('down');
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                changeDirection('left');
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                changeDirection('right');
                break;
            case ' ':
            case 'Escape':
                pauseGame();
                break;
        }
    } else if (gameState === 'paused') {
        if (e.key === ' ' || e.key === 'Escape') {
            resumeGame();
        }
    }
    
    e.preventDefault();
}

function pauseGame() {
    if (gameState === 'playing') {
        gameState = 'paused';
        showScreen('pause-screen');
        clearInterval(gameTimer);
    }
}

function resumeGame() {
    if (gameState === 'paused') {
        gameState = 'playing';
        showScreen('game-screen');
        startGameTimer();
        gameLoop();
    }
}

function restartGame() {
    clearInterval(gameTimer);
    clearTimeout(questionTimer);
    document.getElementById('question-modal').classList.remove('active');
    startGame();
}

function goToMenu() {
    clearInterval(gameTimer);
    clearTimeout(questionTimer);
    document.getElementById('question-modal').classList.remove('active');
    gameState = 'menu';
    showScreen('start-screen');
}

function gameOver() {
    gameState = 'gameOver';
    clearInterval(gameTimer);
    
    // Calcular estadísticas
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const finalStats = {
        level: currentLevel,
        score: score,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        totalQuestions: totalQuestions,
        accuracy: accuracy,
        timeInSeconds: gameTime
    };
    
    // Guardar estadísticas
    saveStats(finalStats);
    
    // Mostrar pantalla de estadísticas
    showStats(finalStats);
}

function showStats(stats) {
    document.getElementById('final-score').textContent = stats.score;
    document.getElementById('correct-answers').textContent = stats.correctAnswers;
    document.getElementById('wrong-answers').textContent = stats.wrongAnswers;
    document.getElementById('total-time').textContent = formatTime(stats.timeInSeconds);
    document.getElementById('accuracy').textContent = `${stats.accuracy}%`;
    
    showScreen('stats-screen');
}

function startGameTimer() {
    gameTimer = setInterval(() => {
        gameTime++;
        updateGameUI();
    }, 1000);
}

function updateGameUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('current-level').textContent = currentLevel;
    document.getElementById('time').textContent = formatTime(gameTime);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Agregar estilos CSS dinámicos para el timer
const style = document.createElement('style');
style.textContent = `
    .timer-bar::after {
        width: var(--timer-width, 100%);
    }
`;
document.head.appendChild(style);