import {Ship, Gameboard, Player} from "./shipBoardPlayer.js";

// Main event listener file. drive the game from here.

//create a module that helps amanage actions that should happen in the dom.

//populate grid w javascript. not making 100 squares manually
const playerBoard = document.querySelector(".player-board");
const cpuBoard = document.querySelector(".cpu-board");

for (let i = 0; i < 100; i++) {
    let playerSquare = document.createElement("div");
    let cpuSquare = document.createElement("div");

    playerBoard.appendChild(playerSquare);
    cpuBoard.appendChild(cpuSquare);
}