import {Ship, Gameboard, Player} from "./shipBoardPlayer.js";

// Main event listener file. drive the game from here.

//GAME STATES
// 0 - not started, 1- placing Ship, 2- firing at board
let gameState = 0;

//populate grid w javascript. not making 100 squares manually
const playerBoard = document.querySelector(".player-board");
const cpuBoard = document.querySelector(".cpu-board");

for (let i = 0; i < 100; i++) {
    let playerSquare = document.createElement("div");
    let cpuSquare = document.createElement("div");

    playerSquare.addEventListener("click", (e) => {
        switch (gameState) {
            case 0: // game not started
                break;

            case 1: // awaiting ship placement

                break;

            case 2: //firing at board.
                
                break;
        
            default:
                break;
        }
    });

    playerBoard.appendChild(playerSquare);
    cpuBoard.appendChild(cpuSquare);
}


const startButton = document.querySelector("#start-button");

startButton.addEventListener("click", (e) => {
    //Logic to begin user input for placement.
    //DOM manipulation: remove this button -> append select / place buttons.
})