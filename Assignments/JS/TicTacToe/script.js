const gridItems = document.querySelectorAll(".grid-items");
const resetBtn = document.getElementById("resetBtn");
let statusMsg = document.getElementById("decision-text");
let currentPlayer = "O"; //actually X
let gridArray = Array.from(gridItems);
let gameOver = false;
let filledSquares = 0;
startGame();

function addEffect(e) {
    if (e.target.textContent == "") {
        if (currentPlayer == "X") {
            currentPlayer = "O";
        }
        else {
            currentPlayer = "X";
        }
    }
    e.target.textContent = currentPlayer;
    gameOver = true;
    if (gridArray[1].textContent == gridArray[4].textContent && gridArray[4].textContent == gridArray[7].textContent) {
        if (gridArray[1].textContent == "X") {
            statusMsg.textContent = "X Wins!";
        }
        else if (gridArray[1].textContent == "O") {
            statusMsg.textContent = "O Wins!";
        }
    }

    else if (gridArray[0].textContent == gridArray[3].textContent && gridArray[3].textContent == gridArray[6].textContent) {
        if (gridArray[0].textContent == "X") {
            statusMsg.textContent = "X Wins!";
        }
        else if (gridArray[0].textContent == "O") {
            statusMsg.textContent = "O Wins!";
        }
    }

    else if (gridArray[2].textContent == gridArray[5].textContent && gridArray[5].textContent == gridArray[8].textContent) {
        if (gridArray[2].textContent == "X") {
            statusMsg.textContent = "X Wins!";
        }
        else if (gridArray[2].textContent == "O") {
            statusMsg.textContent = "O Wins!";
        }
    }



    else if (gridArray[0].textContent == gridArray[1].textContent && gridArray[1].textContent == gridArray[2].textContent) {
        if (gridArray[0].textContent == "X") {
            statusMsg.textContent = "X Wins!";
        }
        else if (gridArray[0].textContent == "O") {
            statusMsg.textContent = "O Wins!";
        }
    }

    else if (gridArray[3].textContent == gridArray[4].textContent && gridArray[4].textContent == gridArray[5].textContent) {
        if (gridArray[3].textContent == "X") {
            statusMsg.textContent = "X Wins!";
        }
        else if (gridArray[3].textContent == "O") {
            statusMsg.textContent = "O Wins!";
        }
    }

    else if (gridArray[6].textContent == gridArray[7].textContent && gridArray[7].textContent == gridArray[8].textContent) {
        if (gridArray[6].textContent == "X") {
            statusMsg.textContent = "X Wins!";
        }
        else if (gridArray[6].textContent == "O") {
            statusMsg.textContent = "O Wins!";
        }
    }
    ////

    else if (gridArray[0].textContent == gridArray[4].textContent && gridArray[4].textContent == gridArray[8].textContent) {
        if (gridArray[0].textContent == "X") {
            statusMsg.textContent = "X Wins!";
        }
        else if (gridArray[0].textContent == "O") {
            statusMsg.textContent = "O Wins!";
        }
    }

    else if (gridArray[2].textContent == gridArray[4].textContent && gridArray[4].textContent == gridArray[5].textContent) {
        if (gridArray[2].textContent == "X") {
            statusMsg.textContent = "X Wins!";
        }
        else if (gridArray[2].textContent == "O") {
            statusMsg.textContent = "O Wins!";
        }
    }

    else {
        gameOver = false;
    }
    gridItems.forEach (
        items => {

            if (items.textContent == "X" || items.textContent == "O") {
                filledSquares++;
            }

            if (filledSquares == 9) {
                gameOver = true;
            }
        }
    )


}

function resetGame() {
    gridItems.forEach (
        items => {
            if (items.textContent == "X" || items.textContent == "O") {
                items.textContent = "";
            }
        }
    )
}

// function threeInARow() {
//     gridItems.forEach(
//         items => {
//             items.
//         }
//     )
// }

function addEventListeners() {
    gridItems.forEach (
        items => items.addEventListener("click", addEffect)
    )

    resetBtn.addEventListener("click", resetGame);
}

function removeEventListeners() {
    gridItems.forEach(
        items => items.removeEventListener("click", addEffect)
    )
    resetBtn.removeEventListener("click", resetGame);
}

function startGame() {
    currentPlayer = "O";
    addEventListeners();
    if (gameOver) {
        removeEventListeners();
        resetGame();
        startGame();
    }
}

