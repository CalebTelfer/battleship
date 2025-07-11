import {Ship, Gameboard, Player} from "./shipBoardPlayer.js";
import "./styles.css";
import { initBoardSquares, numberToLetter } from "./functions.js";

// Main event listener file. drive the game from here.

//GAME STATES
export const gameState = {
    gameStarted: false,

    playerMove: false,
    cpuMove: false,

    playerPlacingShip: false,
    cpuPlacingShip: false,

    playerFiring: false,
    cpuFiring: false
}

initBoardSquares();

const startButton = document.querySelector("#start-button");

startButton.addEventListener("click", (e) => {
    //Logic to begin user input for placement.
    //DOM manipulation: remove this button -> append select / place buttons.
})