import { cpu, gameState, player } from ".";

export function numberToLetter(n) {
    if (n >= 0 && n < 26) {
      return String.fromCharCode(97 + n); // 97 is 'a'
    }
}

export function letterToNumber(letter) {
  const lower = letter.toLowerCase();
  const code = lower.charCodeAt(0);
  if (code >= 97 && code <= 122) {
    return code - 97; // 'a' = 0, 'b' = 1, ..., 'z' = 25
  }
  return null; // invalid input
}

export function initBoardSquares() {
  //populate grid w javascript. not making 100 squares manually
const playerBoard = document.querySelector(".player-board");
const cpuBoard = document.querySelector(".cpu-board");

for (let i = 0; i < 121; i++) {
    let playerSquare = document.createElement("div");
    let cpuSquare = document.createElement("div");

    if (i % 11 == 0 && i != 0) { // Letter axis
        cpuSquare.style.backgroundColor = "blue";
        let letter = numberToLetter((i/11) - 1); // each letter square is a multiple of 11. so the 3rd one is 33/11. = 3.
        let letterText = document.createElement("h3");
        letterText.textContent = letter;
        cpuSquare.appendChild(letterText);

        playerSquare.style.backgroundColor = "blue";
        let playerletter = numberToLetter((i/11) - 1); // each letter square is a multiple of 11. so the 3rd one is 33/11. = 3.
        let playerletterText = document.createElement("h3");
        playerletterText.textContent = playerletter;
        playerSquare.appendChild(playerletterText);
    }

    if (i < 11 && i!= 0) {  // number axis
        cpuSquare.style.backgroundColor = "blue";
        let numberText = document.createElement("h3");
        numberText.textContent = i;
        cpuSquare.appendChild(numberText);


        playerSquare.style.backgroundColor = "blue";
        let playernumberText = document.createElement("h3");
        playernumberText.textContent = i;
        playerSquare.appendChild(playernumberText);
    }



    // if is a clickable square not row or column
    let row = Math.floor(i/11) - 1;
    let col = i % 11;

    if (row >= 0 && col > 0) {
      const rowClass = numberToLetter(row); // A–J
      const colClass = col.toString();      // 1–10
  
      playerSquare.classList.add("playerGameSquare");
      playerSquare.setAttribute("data-row", rowClass);
      playerSquare.setAttribute("data-column", colClass);

      cpuSquare.style.backgroundColor = "blue";
      cpuSquare.setAttribute("data-row", rowClass);
      cpuSquare.setAttribute("data-column", colClass);
      cpuSquare.classList.add("cpuGameSquare");

    }

    playerSquare.addEventListener("click", (e) => {
        if (!gameState.gameStarted) {
          return;
        }

        if (gameState.playerPlacingShip) {
          //place player ship
          placeShip(e.target);
        } else {
          return; // else firing at own board
        }
    });

    cpuSquare.addEventListener("click", (e) => {
      if (!gameState.gameStarted) {
        return;
      }

      if(gameState.playerFiring) {
        playerFire(e.target);
    });

    playerBoard.appendChild(playerSquare);
    cpuBoard.appendChild(cpuSquare);
}
}


export function gameStartDOM() {
  document.querySelector("#start-button").remove();

  const container = document.querySelector(".buttons-container");
  const instructions = document.createElement("h2");
  instructions.textContent = "Click a square to place ship!";
  container.appendChild(instructions);
}





/////////////////////
//PC GENERATE SHIPS
/////////////////////
function placeShip(square) {
  const board = player.board;
  let shipLength;

  let squareRow = square.dataset.row;
  let squareColumn = square.dataset.column;
  let coord = (squareRow + squareColumn);

  if (!board) {return;}
  if (board.totalShips >=5) {return;}
  if(board.board.get(coord)) {return;} //existing ship on square


  switch (board.totalShips) {
    case 0: shipLength = 5; break;
    case 1: shipLength = 4; break;
    case 2: shipLength = 3; break;
    case 3: shipLength = 3; break;
    case 4: shipLength = 2; break;
  }

  //init with starting clicked square
  let squares = [square];
  let coords = [coord];

  for (let i = 0; i < shipLength-1; i++) {
    let nextColumn = squares[i].dataset.column;
    let nextRow = numberToLetter(letterToNumber(squares[i].dataset.row) + 1);
    let nextCoord = nextRow + nextColumn;

    let nextSquare = document.querySelector(`.playerGameSquare[data-row="${nextRow}"][data-column="${nextColumn}"]`);

    if (nextSquare && !board.board.get(nextCoord)) {
      squares.push(nextSquare);
      coords.push(nextRow+nextColumn);
    } else {
      // There is no valid squares down the y axis. Restart
      return;
    }
  }

  squares.forEach(square => {
    square.style.backgroundColor = "green"; //temporary for visual testing
  })

  board.placeShip(coords);

  if (board.totalShips == 5) {populateCPUBoard();}
}

//////////////////////
//PC FIRE AT SQUARE
//////////////////////

function playerFire(square) {
  //player firing at this square.
  let board = cpu.board;
  let row = e.target.dataset.row;
  let column = e.target.dataset.column;

  let coord = row+column;

  if (board.receiveAttack(coord)) {
    //successfull hit
    e.target.style.backgroundColor = "red"; //temp for visual

    if (board.allShipsSunk()) {
      //Player has sunk all CPU ships
      endGame();
    }

  } else {
    gameState.playerFiring = false;
    cpuFire();
  }
}




/////////////////////
//CPU GENERATE SHIPS
/////////////////////
function populateCPUBoard() {
  const cpuBoard = cpu.board;
  let shipLength;

  if (!cpuBoard) {return;}
  if (cpuBoard.totalShips >=5) {return;}

  switch (cpuBoard.totalShips) {
    case 0: shipLength = 5; break;
    case 1: shipLength = 4; break;
    case 2: shipLength = 3; break;
    case 3: shipLength = 3; break;
    case 4: shipLength = 2; break;
  }

  console.log(cpu.board.totalShips)
  let coord = generateCoord();

  while(cpu.board.board.get(coord)) { // keep generating till we get something not in use.
    coord = generateCoord();
  }

  let coordRow = coord.slice(0,1);
  let coordCol = coord.slice(1);
  let coordSquare = document.querySelector(`.cpuGameSquare[data-row="${coordRow}"][data-column="${coordCol}"]`);

  let squares = [coordSquare];
  let coords = [coord];
  console.log(coord);
  for (let i = 0; i < shipLength-1; i++) {
    let nextColumn = squares[i].dataset.column;
    let nextRow = numberToLetter(letterToNumber(squares[i].dataset.row) + 1);
    let nextCoord = nextRow + nextColumn;

    let nextSquare = document.querySelector(`.cpuGameSquare[data-row="${nextRow}"][data-column="${nextColumn}"]`);

    if (nextSquare && !cpu.board.board.get(nextCoord)) {
      squares.push(nextSquare);
      coords.push(nextRow+nextColumn);
    } else {
      console.log("no squares")
      // There is no valid squares down the y axis. Restart
      populateCPUBoard();
      return;
    }
  }

  // Ship creation a success!
  squares.forEach(square => {
    square.style.backgroundColor = "green"; //temporary for visual testing
  })

  cpu.board.placeShip(coords);
  populateCPUBoard(); //begin creating the next ships
}


//////////////
// CPU FIRE
/////////////
function cpuFire() {

  let board = player.board;

  let coord = generateCoord();

  let row = coord.slice(0,1);
  let column = coord.slice(1);

  if(board.receiveAttack(coord)) {
    let square = document.querySelector(`.playerGameSquare[data-row="${row}"][data-column="${column}"]`);
    square.style.backgroundColor = "red"; //temp for visuals

    if (board.allShipsSunk()) {
      endGame();
      return;
    }

    cpuFire(); // fire again since successfull hit.
  } else {
    gameState.playerFiring = true;
  }
}

///////////////
//UTILITY/////
//////////////

// GENERATE COORD FOR CPU
function generateCoord() {
  let ranLetter = numberToLetter(Math.floor(Math.random() * 10));
  let ranNum = Math.floor(Math.random() * 10) + 1;

  let coord = ranLetter + ranNum;

  return coord; // ex: "A1"
}


//////////////////
// DOM STUFF ////
/////////////////
function endGame() {
  //change DOM to default. Maybe new method here.


}