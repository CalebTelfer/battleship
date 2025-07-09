export class Ship {
    constructor() {
        this.length = 0;
        this.timesHit = 0;
        this.board = undefined;
        this.sunk = false;
    }

    hit() {
        this.timesHit += 1;
    }

    isSunk() {
        if (this.timesHit >= this.length) {
            this.board.aliveShips -= 1;
            return true;
        } else {
            return false;
        }
    }
}

export class Gameboard {
    constructor() {
        this.board = new Map();
        this.aliveShips = 0;
    }

    placeShip(coords) {
        const ship = new Ship();
        ship.board = this;
        ship.length = coords.length;

        coords.forEach(coord => {
            this.board.set(coord, {ship: ship, isHit: false});
        });
        return ship;
    }

    receiveAttack(coord) {
        const square = this.board.get(coord);

        if (square && square.ship) {
            square.isHit = true;
            square.ship.hit();
            return true;

        } else { // if no ship there
            this.board.set(coord, {ship: undefined, isHit: true});
            return false;
        }
    }

    allShipsSunk() {
        if(this.aliveShips == 0) {
            return true;
        } else {
            return false;
        }
    }

}

export class Player {
    constructor() {
        this.board = new Gameboard();
    }
}