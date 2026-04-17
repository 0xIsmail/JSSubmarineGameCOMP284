const board = document.getElementById("game-board");

//GlobalVar
let gridData = new Array(100).fill("");
let currentStage = "setup";
let selectedCellNumber = null;

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

  board.appendChild(cell); // Add it to the board

//Keyboard key listener
  document.addEventListener('keydown', function(event) {

    let key = event.key.toLowerCase();
    if (currentStage === "setup") {
        if (selectedCellNumber !== null) {
            if (key === '5') {
                console.log("Placing a value 5 fuel cell at cell " + selectedCellNumber);
                gridData[selectedCellNumber] = "5";
            }
            else if (key === '6') {
                console.log("Placing a value 6 fuel cell at cell " + selectedCellNumber);
                gridData[selectedCellNumber] = "6";
            }
            else if (key === '7') {
                console.log("Placing a value 7 fuel cell at cell " + selectedCellNumber);
                gridData[selectedCellNumber] = "7";
            }
            else if (key === '8') {
                console.log("Placing a value 8 fuel cell at cell " + selectedCellNumber);
                gridData[selectedCellNumber] = "8";
            }
            else if (key === '9') {
                console.log("Placing a value 9 fuel cell at cell " + selectedCellNumber);
                gridData[selectedCellNumber] = "9";
            }
            else if (key === 'o') {
                console.log("Placing an obstacle at cell " + selectedCellNumber);
                gridData[selectedCellNumber] = "o";
            }
            else if (key === 'u') {
                if (gridData.includes("u") !== True); {
                    console.log("Placing user submarine at cell " + selectedCellNumber);
                    gridData[selectedCellNumber] = "u";
                } 
                else { 
                    console.log("Already a user submarine placed at " + selectedCellNumber);
                }
                
            }
            else if (key === 'k') {
                console.log("Placing robotic killer submarine at cell " + selectedCellNumber);
            }
        }
    }

  }
}

