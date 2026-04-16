const board = document.getElementById('game-board');

// Creating the 100 cells here
for (let i = 0; i < 100; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell'); 
    
    // Give each cell a unique ID
    cell.id = "cell-" + i;
    
    board.appendChild(cell); // Add it to the board
}
