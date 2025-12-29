// Инициализация игры
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameBoard = null;
let resetButton = null;
let statusDisplay = null;
let messageDisplay = null;


const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];


function initializeDOM() {
    gameBoard = document.getElementById('board');
    resetButton = document.getElementById('reset-btn');
    statusDisplay = document.getElementById('current-player');
    messageDisplay = document.getElementById('message');

    if (!gameBoard || !resetButton || !statusDisplay || !messageDisplay) {
        console.error('Не удалось найти элементы DOM');
        return false;
    }

    return true;
}


function createBoard() {
    gameBoard.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}


function updateStatus() {
    statusDisplay.textContent = currentPlayer;
    statusDisplay.className = currentPlayer.toLowerCase();
    messageDisplay.textContent = '';
}


function handleCellClick(event) {
    if (!gameActive) return;

    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (gameState[index] !== '') {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    const winner = checkWinner();
    if (winner) {
        gameActive = false;
        messageDisplay.textContent = `Победитель: ${winner}`;
        highlightWinningCells(winner);
        return;
    }

    if (!gameState.includes('')) {
        gameActive = false;
        messageDisplay.textContent = 'Ничья!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (
            gameState[a] !== '' &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            return gameState[a];
        }
    }
    return null;
}

function highlightWinningCells(winner) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (
            gameState[a] === winner &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            const cells = document.querySelectorAll('.cell');
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            break;
        }
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];

    createBoard();
    updateStatus();
}

function initGame() {
    console.log('Инициализация игры...');

    if (!initializeDOM()) {
        console.error('Ошибка инициализации DOM элементов');
        return;
    }

    createBoard();

    resetButton.addEventListener('click', resetGame);

    updateStatus();

    console.log('Игра готова!');
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}