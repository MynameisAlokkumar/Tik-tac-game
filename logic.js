const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".Game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let GameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // row 3
    [0, 3, 6],   // column 1
    [1, 4, 7],   // column 2
    [2, 5, 8]     // column 3
    [0, 4, 8],
    [2, 4, 6]
];

//Let's initiate the game  with an empty grid and X player starting first
function initGame(){
    currentPlayer = "X";
    GameGrid = ["", "", "", "", "", "", "", "", ""];

    //UI pe bhi empty update krna hoga
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    })
//One more thing is missing
    newGameBtn.classList.remove("active");
   gameInfo.innerText=`currentPlayer -${currentPlayer}`
}


initGame();


function swapTurn() {
    if (currentPlayer === "X") {
         currentPlayer="O"
    }
    else {
        currentPlayer = "X";
    }
    // UI Updated
    gameInfo.innerText=`currentPlayer -${currentPlayer}`
}
 

function  CheckGameOver() {

    // Main logic of who will be winner
    let answer = "";

    winningPosition.forEach((position) => {
        //All 3 boxes should be non-empty and exactly same in the value
        if ((GameGrid[position[0]] !== "" || GameGrid[position[1]] !== "" ||
            GameGrid[position[2]] !== "") && (GameGrid[position[0]] ===
                GameGrid[position[1]]) && (GameGrid[position[1]]) ===
            GameGrid[position[2]]) {
            
            //Check if winner is X
            if (GameGrid[position[0]] === "X") 
                answer = "X";
            
            else
                answer = "O";

            //Disable after  the game over
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })


             boxes[position[0]].classList.add("win");
             boxes[position[1]].classList.add("win");
             boxes[position[2]].classList.add("win");
        } 
       // Now we check X/O is winner
       
        
    });
    // it means we have winner
    if (answer !== "") {
        gameInfo.innerText = `currentPlayer -${currentPlayer}`;
        newGameBtn.classList.add("active");
         return;
    }

    //Let's check wheather game is tie

    let fillCount = 0;
    GameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    });
    
    if (fillCount === 9) 
        gameInfo.innerText = "It's a Tie!";
        newGameBtn.classList.add("active");
    
  
}

function handleClick(index) {
    if (GameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        GameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";


        //Swap karo turn ko
        swapTurn();

        //Check kro ki koi jeet gya kya
        CheckGameOver();
    }
}


boxes.forEach((box, index) => {
    box.addEventListener("click",() => {
        handleClick(index);
    })
});

 newGameBtn.addEventListener("click", initGame)