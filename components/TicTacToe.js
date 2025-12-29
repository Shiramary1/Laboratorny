// components/TicTacToe.js
export const TicTacToe = (function() {
    let boardState = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    let isCrossTurn = true;
    let gameActive = false;
    let gameElement = null;
    let moveCallback = null;
    const WINNING_COMBOS = [
        // горизонтали
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        // вертикали
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        // диагонали
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]]
    ];

    function handleCellClick(event) {
        if (!gameActive) return;
        
        const clickedCell = event.target;
        const rowIndex = parseInt(clickedCell.getAttribute('data-row')) - 1;
        const colIndex = parseInt(clickedCell.getAttribute('data-col')) - 1;

        if (boardState[rowIndex][colIndex] !== '') return;

        const currentSymbol = isCrossTurn ? 'X' : 'O';
        boardState[rowIndex][colIndex] = currentSymbol;
        clickedCell.textContent = currentSymbol;
        
        if (checkWin()) {
            gameActive = false;
            setTimeout(() => alert(`${currentSymbol} победил!`), 10);
            return;
        }
        
        if (checkDraw()) {
            gameActive = false;
            setTimeout(() => alert('Ничья!'), 10);
            return;
        }
        
        isCrossTurn = !isCrossTurn;
        if (moveCallback) moveCallback(isCrossTurn);
    }

    function checkWin() {
        const currentSymbol = isCrossTurn ? 'X' : 'O';
        
        return WINNING_COMBOS.some(combo => {
            return combo.every(([row, col]) => {
                return boardState[row][col] === currentSymbol;
            });
        });
    }

    function checkDraw() {
        return boardState.every(row => {
            return row.every(cell => cell !== '');
        });
    }

    function resetBoard() {
        boardState = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        
        const cells = gameElement.querySelectorAll('.tic-tac-toe__ceil');
        cells.forEach(cell => {
            cell.textContent = '';
        });
        
        isCrossTurn = true;
        gameActive = true;
        if (moveCallback) moveCallback(isCrossTurn);
    }

    function attachEventListeners() {
        const cells = gameElement.querySelectorAll('.tic-tac-toe__ceil');
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });
    }

    return {
        init: function(config) {
            gameElement = config.el;
            moveCallback = config.onMove;
            attachEventListeners();
            return this;
        },
        
        startGame: function() {
            gameActive = true;
            if (moveCallback) moveCallback(isCrossTurn);
        },
        
        restartGame: function() {
            resetBoard();
        },
        
        getGameState: function() {
            return {
                board: [...boardState],
                currentPlayer: isCrossTurn ? 'X' : 'O',
                isActive: gameActive
            };
        }
    };
})();