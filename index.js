let playWin = document.querySelector('.playWin');
let gameBoard = document.querySelector('#gameboard');
let boxes = Array.from(document.querySelectorAll('.box'));
let gameOver = document.querySelector('.gameOver');
let restartButton = document.querySelector('#restartButton');
let playAnotherButton = document.querySelector('#playAnotherButton');
let turnIndicator = document.querySelector('#turn');

// Scoreboard
let playerScore = document.querySelector('#player-score');
let cpuScore = document.querySelector('#cpu-score');
let tieScore = document.querySelector('#tie-score');

let O_TEXT = 'O';
let X_TEXT = 'X';
let currentPlayer = X_TEXT;
let space = Array(9).fill(null);
let scores = { player: 0, cpu: 0, ties: 0 };

// Start the game
const startGame = () => {
    boxes.forEach((box) => box.addEventListener('click', boxClick));
};

// Box click logic
function boxClick(e) {
    const id = e.target.id;

    if (!space[id]) {
        space[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon()) {
            const winningBlocks = playerHasWon();
            playWin.innerText = `${currentPlayer} Wins!`;
            gameOver.innerText = 'Game Over!';

            // Highlight winning blocks
            winningBlocks.forEach((index) => {
                boxes[index].style.backgroundColor = 'var(--winning-blocks)';
            });

            if (currentPlayer === X_TEXT) {
                scores.player++;
                playerScore.innerText = scores.player;
            } else {
                scores.cpu++;
                cpuScore.innerText = scores.cpu;
            }

            boxes.forEach((box) => box.removeEventListener('click', boxClick));
            return;
        }

        if (space.every((box) => box !== null)) {
            playWin.innerText = 'It\'s a Tie!';
            gameOver.innerText = 'Game Over!';
            scores.ties++;
            tieScore.innerText = scores.ties;
            return;
        }

        // Switch player
        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
        turnIndicator.innerText = `${currentPlayer} TURN`;
    }
}

// Winning combinations
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Check if a player has won
function playerHasWon() {
    for (const condition of winningCombo) {
        let [a, b, c] = condition;
        if (space[a] && space[a] === space[b] && space[a] === space[c]) {
            return [a, b, c];
        }
    }
    return null;
}

// Restart game (resets everything)
restartButton.addEventListener('click', () => {
    space.fill(null);
    boxes.forEach((box) => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });
    playWin.innerText = '';
    gameOver.innerText = '';
    currentPlayer = X_TEXT;
    turnIndicator.innerText = `${currentPlayer} TURN`;

    // Reset scores
    scores = { player: 0, cpu: 0, ties: 0 };
    playerScore.innerText = 0;
    cpuScore.innerText = 0;
    tieScore.innerText = 0;

    startGame();
});

// Play another game (keeps scores intact)
playAnotherButton.addEventListener('click', () => {
    space.fill(null);
    boxes.forEach((box) => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });
    playWin.innerText = '';
    gameOver.innerText = '';
    currentPlayer = X_TEXT;
    turnIndicator.innerText = `${currentPlayer} TURN`;

    startGame();
});

startGame();
