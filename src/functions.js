import { gameState, player } from ".";

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
    let row = Math.floor(i/11);
    let col = i % 11;

    if (row > 0 && col > 0) {
      const rowClass = numberToLetter(row); // A–J
      const colClass = col.toString();      // 1–10
  
      playerSquare.classList.add(rowClass, colClass, "gameSquare", i);
      cpuSquare.classList.add(rowClass, colClass, "gameSquare", i);

    }

    playerSquare.addEventListener("click", (e) => {
        if (!gameState.gameStarted) {
          return;
        }

        if (!gameState.playerMove) {
          if(gameState.cpuPlacingShip) {
            //cpu trying to place ship on wrong board.
            return;
          }

          if(gameState.cpuFiring) {
            //CPU firing at this square.
          }
        }


        if (gameState.playerMove) {
          if (gameState.playerPlacingShip) {
            //place player ship
            placeShip(e.target);
          } else {
            return; // else firing at own board
          }
        }
    });

    cpuSquare.addEventListener("click", (e) => {
      if (!gameState.gameStarted) {
        return;
      }

      if (!gameState.cpuMove) {
        if(gameState.playerPlacingShip) {
          //player trying to place ship on wrong board.
          return;
        }

        if(gameState.playerFiring) {
          //player firing at this square.
        }
      }


      if (gameState.cpuMove) {
        if (gameState.cpuPlacingShip) {
          //place cpu ship
        } else {
          return; // else firing at own board
        }
      }
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

  const button = document.createElement("button");
  button.textContent = "Place Ship"
  container.appendChild(button);
}

function placeShip(square) {
  const squareCoords = square.classList;
  let squareColumn = letterToNumber(squareCoords[0]);
  let coords = [squareCoords[0] + squareCoords[1]]; // eg ["A1"]

  const playersBoard = player.board;

  let shipLength = 0;
  switch (playersBoard.totalShips) {
    case 0: shipLength = 5; break;
    case 1: shipLength = 4; break;
    case 2: shipLength = 3; break;
    case 3: shipLength = 3; break;
    case 4: shipLength = 2; break;
  }

  for(let i = 0; i < shipLength-1; i++) {
    squareColumn = squareColumn + 1;
    let squareColumnLetter = numberToLetter(squareColumn);
    let nextSquare = document.querySelector(".a.currentthing+11")
    if(document.querySelector)
  }
}