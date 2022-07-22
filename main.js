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

    const placeSign = (sign, row, col) => {

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

    return { placeSign, checkWin };
})();

const displayController = (() => {
    const setupBoard = () => {

    };

    const placeSign = () => {

    };

    const cleanBoard = () => {

    };
})();

const Player = (name, sign) => {
    const getPlayerName = () => name;
};

console.log(gameBoard.checkWin());