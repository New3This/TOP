const gridItems = document.querySelectorAll(".grid-items");
const resetBtn = document.getElementById("resetBtn");
let statusMsg = document.getElementById("decision-text");
let currentPlayer = "O"; //actually X
let gridArray = Array.from(gridItems);
let gameOver = false;
let filledSquares = 0;
startGame();

function checkWinCondition() {
    filledSquares = 0;

    if (gameOver) {
        removeEventListeners();
    }

    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    gridItems.forEach (
        items => {
            if (items.textContent == "X" || items.textContent == "O") {
                filledSquares++;
                if (filledSquares == 9) {
                    gameOver = true;
                    statusMsg.textContent = "Draw";
                }
            }
        }
    )

    for (let oneWinCondition of winConditions) {
        let [firstPos, secondPos, thirdPos] = oneWinCondition;
        if (gridArray[firstPos].textContent == gridArray[secondPos].textContent && gridArray[thirdPos].textContent == gridArray[secondPos].textContent && (gridArray[secondPos].textContent == "X" || gridArray[secondPos].textContent == "O")) {
            statusMsg.textContent = `${currentPlayer} wins`;
            gameOver = true;
        }
    }

    if (gameOver) {
        removeEventListeners();
    }
}
function addEffect(e) {
    if (e.target.textContent == "") {
        e.target.textContent = currentPlayer;
        checkWinCondition();

        if (currentPlayer == "X") {
            currentPlayer = "O";
        }
        else {
            currentPlayer = "X";
        }
    }
   
}

function resetGame() {
    gridItems.forEach (
        items => {
            if (items.textContent == "X" || items.textContent == "O") {
                items.textContent = "";
            }
        }
    )
    statusMsg.textContent = "";
    startGame();
}

// function threeInARow() {
//     gridItems.forEach(
//         items => {
//             items.
//         }
//     )
// }
resetBtn.addEventListener("click", resetGame);

function addEventListeners() {
    gridItems.forEach (
        items => items.addEventListener("click", addEffect)
    )
}

function removeEventListeners() {
    gridItems.forEach(
        items => items.removeEventListener("click", addEffect)
    )
}

function startGame() {
    currentPlayer = "O";
    gameOver = false;
    addEventListeners();
}

