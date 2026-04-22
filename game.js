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
let computerScore = 0;

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
      renderBoard();
    }
  };

  board.appendChild(cell);
}
/**
 * Calculates the valid adjacent grid cells for a given index.
 * Used to help the computer AI find safe movement options around boundaries.
 * (Logic developed with the assistance of an AI Coding Assistant, see below).
 *
 * Code from the following getValidNeighbors and moveRobots functions has been adapted from Gemini 3.1 Pro model responses,
 * utilising the prompt: "The killer robot AI is the last thing I need to implement, right? How complex would it be to implement? Could you show me an example
 * of what to do, as I genuinely cannot figure it out"
 * Google LLC, Mountain View, CA, USA, 2026.
 * https://gemini.google.com [accessed 22 April 2026].
 *
 * @param {number} index - The current position of the robot in the array (0 to 99).
 * @returns {Array} An array of integers representing valid surrounding cell index numbers.
 */
function getValidNeighbors(index) {
  let neighbors = [];
  let canGoUp = index >= 10;
  let canGoDown = index < 90;
  let canGoLeft = index % 10 !== 0;
  let canGoRight = index % 10 !== 9;
  if (canGoUp) neighbors.push(index - 10);
  if (canGoDown) neighbors.push(index + 10);
  if (canGoLeft) neighbors.push(index - 1);
  if (canGoRight) neighbors.push(index + 1);

  if (canGoUp && canGoLeft) neighbors.push(index - 11);
  if (canGoUp && canGoRight) neighbors.push(index - 9);
  if (canGoDown && canGoLeft) neighbors.push(index + 9);
  if (canGoDown && canGoRight) neighbors.push(index + 11);
  return neighbors;
  //End of AI
}

/**
 * Wipes the visual HTML grid clean and redraws all elements (Player, Robots,
 * Obstacles, and Fuel) based on the current state of the gridData array.
 *
 * @returns {void}
 */

function renderBoard() {
  for (let i = 0; i < 100; i++) {
    // Grab the specific cell
    let cell = document.getElementById("cell-" + i);
    let item = gridData[i];

    //Text allignment
    cell.style.textAlign = "center";
    cell.style.fontFamily = "sans-serif";
    cell.style.lineHeight = "40px";
    cell.style.fontSize = "20px";
    cell.style.fontWeight = "bold";

    cell.innerHTML = "";
    if (item === "u") {
      cell.innerHTML =
        "<img src='player.png' style='width: 100%; height: 100%;'>";
    } else if (item === "k") {
      cell.innerHTML =
        "<img src='robot.png' style='width: 100%; height: 100%;'>";
    } else if (item === "o") {
      cell.innerHTML =
        "<img src='obstacle.png' style='width: 100%; height: 100%;'>";
    } else if (["5", "6", "7", "8", "9"].includes(item)) {
      cell.innerText = item;
    }

    if (currentStage === "setup" && selectedCellNumber === i) {
      cell.style.backgroundColor = "yellow";
      cell.style.outline = "3px solid orange";
    } else {
      cell.style.backgroundColor = "lightblue";
      cell.style.outline = "none";
    }
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
    checkIfGameEnded();
    renderBoard();
  }
};

buttonEndPlay.onclick = function () {
  currentStage = "end";
  checkIfGameEnded();
  renderBoard();
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
      messageBox.innerText = "Out of fuel! You cannot move anymore!";
      moveRobots();
      checkIfGameEnded();
      renderBoard();
      return;
    }

    let targetCell = null;
    let errorMsg = "";

    if (key === "w") {
      if (userSubmarineLocation < 10) {
        errorMsg = "Can't go further up!";
      } else {
        targetCell = userSubmarineLocation - 10;
      }
    } else if (key === "a") {
      if (userSubmarineLocation % 10 === 0) {
        errorMsg = "Can't go further left!";
      } else {
        targetCell = userSubmarineLocation - 1;
      }
    } else if (key === "s") {
      if (userSubmarineLocation >= 90) {
        errorMsg = "Can't go further down!";
      } else {
        targetCell = userSubmarineLocation + 10;
      }
    } else if (key === "d") {
      if (userSubmarineLocation % 10 === 9) {
        errorMsg = "Can't go further right!";
      } else {
        targetCell = userSubmarineLocation + 1;
      }
    }

    // Handling our target cell move
    if (errorMsg !== "") {
      messageBox.innerText = errorMsg;
    } else if (targetCell !== null) {
      let objectInCell = gridData[targetCell];

      if (objectInCell === "o") {
        messageBox.innerText =
          "Obstacle ahead! Cannot continue in that direction!";
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
        gridData[userSubmarineLocation] = "";
        userSubmarineLocation = targetCell;
        gridData[userSubmarineLocation] = "u";

        moveRobots();
        checkIfGameEnded();
      }
    }
  }

  document.getElementById("fuel-text").innerText = playerFuel;
  document.getElementById("player-score").innerText = playerScore;

  /**
   * Loops through the board to calculate and execute movements for all Robotic Killer
   * Submarines. Uses a 3-priority system: 1. Destroy the Player, 2. Eat adjacent fuel,
   * or 3. Randomly patrol an empty adjacent square.
   * (Logic developed with the assistance of an AI Coding Assistant, see below).
   *
   * Code from the following getValidNeighbors and moveRobots functions has been adapted from Gemini 3.1 Pro model responses,
   * utilising the prompt: "The killer robot AI is the last thing I need to implement, right? How complex would it be to implement? Could you show me an example
   * of what to do, as I genuinely cannot figure it out"
   * Google LLC, Mountain View, CA, USA, 2026.
   * https://gemini.google.com [accessed 22 April 2026].
   *
   * @returns {void}
   */

  function moveRobots() {
    let hasRobotMoved = new Array(100).fill(false);
    for (let i = 0; i < 100; i++) {
      if (gridData[i] === "k" && hasRobotMoved[i] === false) {
        let neighbors = getValidNeighbors(i);
        let robotAlreadyMoved = false;

        // ============================================
        // PRIORITY 1: Is the User adjacent? KILL THEM!
        // ============================================
        for (let j = 0; j < neighbors.length; j++) {
          let targetCell = neighbors[j];
          if (gridData[targetCell] === "u") {
            gridData[i] = ""; // Robot leaves old spot
            gridData[targetCell] = "k"; // Robot squashes player
            hasRobotMoved[targetCell] = true;

            messageBox.innerText = "A killer robot caught you! GAME OVER!";
            currentStage = "end"; // End the game

            robotAlreadyMoved = true;
            break; // Stop checking surrounding tiles
          }
        }
        if (robotAlreadyMoved) continue; // AI finished early, skip to next robot!
        // ============================================
        // PRIORITY 2: Is there Fuel adjacent? EAT IT!
        // ============================================
        for (let j = 0; j < neighbors.length; j++) {
          let targetCell = neighbors[j];
          let item = gridData[targetCell];

          if (["5", "6", "7", "8", "9"].includes(item)) {
            let fuelValue = parseInt(item);
            computerScore += fuelValue; // Add to computer's score!

            gridData[i] = ""; // Robot leaves old spot
            gridData[targetCell] = "k"; // Robot eats fuel
            hasRobotMoved[targetCell] = true;

            robotAlreadyMoved = true;
            break;
          }
        }
        if (robotAlreadyMoved) continue;
        // ============================================
        // PRIORITY 3: Just move to an empty spot!
        // ============================================
        let emptyNeighbors = [];
        for (let j = 0; j < neighbors.length; j++) {
          let targetCell = neighbors[j];
          if (gridData[targetCell] === "") {
            emptyNeighbors.push(targetCell); // Save safe empty tiles
          }
        }
        if (emptyNeighbors.length > 0) {
          let randomIndex = Math.floor(Math.random() * emptyNeighbors.length);
          let chosenTile = emptyNeighbors[randomIndex];

          gridData[i] = "";
          gridData[chosenTile] = "k";
          hasRobotMoved[chosenTile] = true;
        }
      }
    } // End of AI

    document.getElementById("cpu-score").innerText = computerScore;
  }

  /**
   * Checks for mandatory end-game scenarios (zero robots left or zero fuel cells left).
   * If the Play Stage is over, it compares scores and updates the message box
   * to declare the User Win, Computer Win, or Draw outcome.
   *
   * @returns {void}
   */

  function checkIfGameEnded() {
    let robotsLeft = gridData.includes("k");
    let fuelLeft = gridData.some((item) =>
      ["5", "6", "7", "8", "9"].includes(item),
    );

    if (robotsLeft === false || fuelLeft === false) {
      currentStage = "end";
    }

    if (currentStage === "end") {
      if (robotsLeft === false || playerScore > computerScore) {
        messageBox.innerText = "GAME OVER: YOU WIN!";
      } else if (computerScore > playerScore) {
        messageBox.innerText = "GAME OVER: COMPUTER WINS!";
      } else {
        messageBox.innerText = "GAME OVER: IT'S A DRAW!";
      }
    }
  }

  // Redraw the board
  renderBoard();
});
