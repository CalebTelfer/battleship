class Ship {
    constructor() {
        this.length = 0;
        this.timesHit = 0;
        this.sunk = false;
    }

    hit() {
        //increases num of hits
        // should check for isSunk() after.
    }

    isSunk() {
        // true or false based on timesHit compared to ship length.
    }
}

class Gameboard {
    constructor() {

    }

    placeShip() {
        //calls ship class to place a ship
    }

    receiveAttack(coords) {
        // has it hit a ship? if so, call ship.hit() on correct ship.
        // if not, record the coords so it can be crossed off of already shot at positions.
    }

    allShipsSunk() {
        //check if all ships are sunken.
    }

}

class Player {
    constructor() {
        this.board = new Gameboard();
    }
}