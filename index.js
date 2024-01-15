let playWin = document.querySelector('.playWin');
let gameBoard = document.querySelector('#gameboard')
let boxes = Array.from(document.querySelectorAll('.box'))
let gameOver = document.querySelector('.gameOver')
let restartButton = document.querySelector('#restartButton')

let winnerIndicator = getComputedStyle(document.body).getPropertyPriority('--winning-blocks')


//parameters
let O_TEXT = 'o'
let X_TEXT = 'x'
let currentPlayer = X_TEXT;
let space = Array(9).fill(null);



//clickable box
const startGame =() => {
    boxes.forEach(box => box.addEventListener('click', boxClick ))
} 
//display winner of game
function boxClick(e){
    const id = e.target.id;

    if(!space[id]){
        space[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerHasWon() !== false){
            playWin.innerText = `${currentPlayer} has Won!`
            gameOver.innerText = 'Game Over!';
            let winning_blocks = playerASWon();

            winning_blocks.map( box => boxes[box].style.color = winnerIndicator);
      return;
        } 
        else if(playerHasWon() !== true){
            playWin.innerText = "It is a Tie!"
        }
        
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT: X_TEXT;
    }
}


//gets winner combo
const winningCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
]

function playerHasWon(){
    for(const condition of winningCombo){
        let [a,b,c] = condition
        if(space[a] && (space[a] == space[b] && space[a] == space[c])){
            return [a,b,c]
        }
    }
    return false
}


//restart button
restartButton.addEventListener('click', ()=>{
    space.fill(null)
    boxes.forEach(box =>{
        box.innerText=''
    })
    playWin.innerText = ''
    gameOver.innerText = ''
    currentPlayer= X_TEXT
})
startGame()