const Player = (name, sign) => {
    const getPlayerName = () => name;
    const getPlayerSign = () => sign;

    return { getPlayerName, getPlayerSign };
};

const gameBoard = (() => {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let gameState = ['', '', '',
                     '', '', '', 
                     '', '', '' ];
                     
    const getGameState = () => gameState;
    const getWinningConditions = () => winningConditions;
                     
    const placeSign = (sign, cellIndex) => {
        gameState[cellIndex] = sign;
    };

    const checkWin = () => {
        for(const condition of winningConditions) {
            const cellOne = gameState[condition[0]];
            const cellTwo = gameState[condition[1]];
            const cellThree = gameState[condition[2]];

            if(cellOne === '' || cellTwo === '' || cellThree === '') continue;
            else if(cellOne === cellTwo && cellTwo === cellThree) return true;
        }

        return false;
    };

    const isCellEmpty = (index) => gameState[index] === '' ? true : false;

    const checkTie = () => {
        for(const cell of gameState) {
            if(cell === '') return false;
        }

        return true;
    };

    const clearBoard = () => {
        for(let i = 0; i < gameState.length; i++) {
            gameState[i] = '';
        }
    };

    return { getGameState, getWinningConditions, placeSign, isCellEmpty, checkWin, checkTie, clearBoard };
})();

const displayController = (() => {
    const playerOne = Player('Player1', 'X');
    const playerTwo = Player('Player2', 'O');
    let currentPlayer = {};
    
    const startGame = () => {
        const startButton = document.querySelector('#btn-start');
        startButton.disabled = false;

        startButton.addEventListener('click', () => {
            startButton.disabled = true;
            setupBoard();
        });
    };

    const setupBoard = () => {
        const display = document.querySelector('.game-status-container > h2');
        const cells = document.querySelectorAll('.cell');
        
        display.innerText = 'X starts the game!';
        
        gameBoard.clearBoard();
        clearBoard();

        currentPlayer = playerOne;

        cells.forEach((cell) => {
            cell.addEventListener('click', handleCellClick);
        });
    };

    const clearBoard = () => {
        const cells = document.querySelectorAll('.cell');

        cells.forEach((cell) => {
            cell.innerText = '';
            cell.classList.remove('winning-cell');
        });
    };

    const handleCellClick = (event) => {
        placeSign(event);
        const display = document.querySelector('.game-status-container > h2');
        const hasPlayerWon = gameBoard.checkWin();
        const isTie = gameBoard.checkTie();

        if(!hasPlayerWon) {
            switchTurns(playerOne, playerTwo);
            display.innerText = `${currentPlayer.getPlayerSign()}'s turn`
        } else {
            display.innerText = `${currentPlayer.getPlayerSign()} won the game!`;
            colorWinningCells();
            removeCellListeners();
            showPlayAgainModal();
            return;
        }

        if(isTie) {
            display.innerText = `It's a tie!`;
            removeCellListeners();
            showPlayAgainModal();
        }
    };

    const placeSign = (e) => {
        const cellIndex = e.target.dataset.cellId;
        const sign = currentPlayer.getPlayerSign();
        const isValidCell = gameBoard.isCellEmpty(cellIndex);

        if(!isValidCell) return;

        e.target.innerText = sign;
        gameBoard.placeSign(sign, cellIndex);
    };

    const switchTurns = (p1, p2) => {
        if(currentPlayer.getPlayerName() === p1.getPlayerName()) currentPlayer = p2;
        else currentPlayer = p1;
    };

    const removeCellListeners = () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.removeEventListener('click', handleCellClick);
        })
    };

    const colorWinningCells = () => {
        const cells = document.querySelectorAll('.cell');
        const winningConditions = gameBoard.getWinningConditions();
        const board = gameBoard.getGameState();
        
        for(const condition of winningConditions) {
            const cellOne = board[condition[0]];
            const cellTwo = board[condition[1]];
            const cellThree = board[condition[2]];

            if(cellOne === cellTwo && cellTwo === cellThree) {
                cells[condition[0]].classList.add('winning-cell');
                cells[condition[1]].classList.add('winning-cell');
                cells[condition[2]].classList.add('winning-cell');
                return;
            }
        }
    };

    const showPlayAgainModal = () => {
        const againButton = document.querySelector('#btn-again');
        againButton.disabled = false;
        againButton.addEventListener('click', () => {
            setupBoard();
            againButton.disabled = true;
        });
    };

    return { startGame };
})();

displayController.startGame();