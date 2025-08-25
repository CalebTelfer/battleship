import {Ship, Gameboard, Player} from "./shipBoardPlayer.js";
import "./styles.css";
import { gameStartDOM, initBoardSquares, numberToLetter } from "./functions.js";

// Main event listener file. drive the game from here.

//GAME STATES
export const gameState = {
    gameStarted: false,

    playerPlacingShip: false,

    playerFiring: false
}

export const player = new Player();
export const cpu = new Player();

initBoardSquares();

const startButton = document.querySelector("#start-button");

startButton.addEventListener("click", (e) => {
    gameState.gameStarted = true;
    gameState.playerPlacingShip = true;

    gameStartDOM();
})