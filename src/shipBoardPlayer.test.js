const {Gameboard, Ship, Player} = require('./shipBoardPlayer.js');

test('One ship can be placed', () => {
    const board = new Gameboard();
    const ship = board.placeShip(["A1","B1","C1"]);
    const squares = [board.board.get("A1"), board.board.get("B1"), board.board.get("C1")];
    squares.forEach(pos => expect(pos.ship).toBe(ship));
})


test('If receive Attack has found a ship', () => {
    const board = new Gameboard();
    const ship = board.placeShip(["A1","B1","C1"]);

    expect(board.receiveAttack("A1")).toBe(true);
    expect(ship.timesHit).toBe(1);
})

test('If receive Attack has not found a ship', () => {
    const board = new Gameboard();
    const ship = board.placeShip(["A1","B1","C1"]);

    expect(board.receiveAttack("C4")).toBe(false);
    expect(ship.timesHit).toBe(0);
})