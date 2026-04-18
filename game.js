//Element "getters"
const board = document.getElementById("game-board");
const messageBox = document.getElementById("message-box");
const buttonEndSetup = document.getElementById("button-end-setup");
const buttonEndPlay = document.getElementById("button-end-play");

//Global Variables
let gridData = new Array(100).fill("");
let currentStage = "setup";
let selectedCellNumber = null;
let userSubmarineLocation = null;
let playerFuel = 10;
let playerScore = 0;

// Creating the 100 cells here
for (let i = 0; i < 100; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  // Give each cell a unique ID
  cell.id = "cell-" + i;

  cell.onclick = function () {
    if (currentStage === "setup") {
      selectedCellNumber = i;
      console.log("Clicked Cell Number: " + i);
    }
  };

  board.appendChild(cell);
}

//Render images of the pieces
function renderBoard() {
  for (let i = 0; i < 100; i++) {
    // Grab the specific cell
    let cell = document.getElementById("cell-" + i);

    //For now, we put text in the cell, change to image later!
    cell.innerText = gridData[i];

    //Text allignment
    cell.style.textAlign = "center";
    cell.style.fontFamily = "sans-serif";
    cell.style.lineHeight = "40px";
    cell.style.fontSize = "20px";
    cell.style.fontWeight = "bold";
  }
}

buttonEndSetup.onclick = function () {
  if (gridData.includes("u") !== true) {
    messageBox.innerText =
      "Woah there! Can't start the game without placing your submarine. Place one and try again! (press U on any chosen spot to place user submarine!)";
  } else {
    currentStage = "play";
    selectedCellNumber = null;
    messageBox.innerText = "";
    buttonEndSetup.style.display = "none";
    buttonEndPlay.style.display = "inline";
    console.log("Game has started!");
  }
};

//Keyboard key listener
document.addEventListener("keydown", function (event) {
  let key = event.key.toLowerCase();
  //During Setup Phase
  if (currentStage === "setup") {
    if (selectedCellNumber !== null) {
      if (key === "5") {
        console.log(
          "Placing a value 5 fuel cell at cell " + selectedCellNumber,
        );
        gridData[selectedCellNumber] = "5";
        messageBox.innerText = "";
      } else if (key === "6") {
        console.log(
          "Placing a value 6 fuel cell at cell " + selectedCellNumber,
        );
        gridData[selectedCellNumber] = "6";
        messageBox.innerText = "";
      } else if (key === "7") {
        console.log(
          "Placing a value 7 fuel cell at cell " + selectedCellNumber,
        );
        gridData[selectedCellNumber] = "7";
        messageBox.innerText = "";
      } else if (key === "8") {
        console.log(
          "Placing a value 8 fuel cell at cell " + selectedCellNumber,
        );
        gridData[selectedCellNumber] = "8";
        messageBox.innerText = "";
      } else if (key === "9") {
        console.log(
          "Placing a value 9 fuel cell at cell " + selectedCellNumber,
        );
        gridData[selectedCellNumber] = "9";
        messageBox.innerText = "";
      } else if (key === "o") {
        console.log("Placing an obstacle at cell " + selectedCellNumber);
        gridData[selectedCellNumber] = "o";
        messageBox.innerText = "";
      } else if (key === "u") {
        if (gridData.includes("u") !== true) {
          console.log("Placing user submarine at cell " + selectedCellNumber);
          gridData[selectedCellNumber] = "u";
          userSubmarineLocation = selectedCellNumber;
          messageBox.innerText = "";
        } else {
          console.log(
            "Already a user submarine placed at cell number: " +
              userSubmarineLocation,
          );
          messageBox.innerText = "You already placed a user submarine!";
        }
      } else if (key === "k") {
        console.log(
          "Placing robotic killer submarine at cell " + selectedCellNumber,
        );
        gridData[selectedCellNumber] = "k";
        messageBox.innerText = "";
      } else {
        messageBox.innerText =
          "Invalid key! You can only use the letters 'O', 'U', 'K' and the numbers 5 to 9!";
      }
    }
    //During playing phase
  } else if (currentStage === "play") {
        
        if (playerFuel <= 0) {
        messageBox.innerText = "Out of fuel! You cannot move anymore.";
        return;
        }

        let targetCell = null;

        if (key === "w") {
        let targetCell = userSubmarineLocation - 10;
        if (userSubmarineLocation < 10) {
            messageBox.innerText = "Can't go further up!";
        } 
        } else if (key === "a") {
        let targetCell = userSubmarineLocation - 1;
        if (userSubmarineLocation % 10 === 0) {
            messageBox.innerText = "Can't go further left!";
        } 
        } else if (key === "s") {
        let targetCell = userSubmarineLocation + 10;
        if (userSubmarineLocation >= 90) {
            messageBox.innerText = "Can't go further down!";
        } 
        } else if (key === "d") {
        let targetCell = userSubmarineLocation + 1;
        if (userSubmarineLocation % 10 === 9) {
            messageBox.innerText = "Can't go further right!";
        } 
        }

        if (targetCell !== null){
            let objectInCell = gridData[targetCell]
            if (objectInCell === "o") {
                messageBox.innerText = "Obstacle ahead!";
        } else if (objectInCell === "k") {
            messageBox.innerText = "You collided with a killer robot! Game Over!";
            currentStage = "end"; 
        } else {
            messageBox.innerText = "";
            playerFuel -= 1;

            if (["5", "6", "7", "8", "9"].includes(objectInCell)) {
                let fuelValue = parseInt(objectInCell);
                playerFuel += fuelValue;
                playerScore += fuelValue;
                console.log("Ate fuel worth " + fuelValue + "!");
            }

            gridData[userSubmarineLocation] = ""; // Delete old 'u'
            userSubmarineLocation = targetCell;   // Update tracker
            gridData[userSubmarineLocation] = "u"; // Put new 'u'
        }

        
    }

  document.getElementById("fuel-text").innerText = playerFuel;
  document.getElementById("player-score").innerText = playerScore;

  renderBoard();
});
