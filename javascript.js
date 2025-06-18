class Ship {
    constructor() {
        this.length = 0;
        this.timesHit = 0;
        this.sunk = false;
    }

    hit() {
        this.timesHit += 1;
    }

    isSunk() {
        if (this.timesHit >= this.length) {
            return true;
        } else {
            return false;
        }
    }
}

class Gameboard {
    constructor() {
        this.board = new Map();
        //perhaps every grid is a key
        // which will either reference a
        // ship or null if empty grid.

        //grid is A:1-10 , J:1-10
        //key could be ex. A1 or C3.
    }

    placeShip(coords) {
        const ship = new Ship();
        ship.length = coords.length;

        coords.forEach(coord => {
            // may have to string literal here.
            // as coord may be a reference in memory, not the actual hashmap key string we want assigned.
            this.board.set(coord, ship);
        });
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