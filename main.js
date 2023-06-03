
/*--- state variables ---*/
// 1: player, -1: computer
let turn;
let winner;

// playerGuesses compares to computerBoard
// 0: no ship, 1: ship
let playerBoard;
let computerBoard;

// 0: not guessed, 1: hit, -1: miss
let playerGuesses;
let computerGuesses;

let playerShips;
let computerShips;

/*--- cached elements ---*/
const playerBoardEl = document.querySelector('#playerBoard');
const computerBoardEl = document.querySelector('#computerBoard');
const playerCellEls = [...playerBoardEl.querySelectorAll('.cell')];
const computerCellEls = [...computerBoardEl.querySelectorAll('.cell')];

/*--- event listeners ---*/
computerBoardEl.addEventListener('click', onGuess);

/*--- main ---*/
init();

/*--- functions ---*/

// start/restart game
function init() {
    turn = -1;
    winner = null;

    playerBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    computerBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    // 0: not guessed, 1: hit, -1: miss
    playerGuesses = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    // 0: not guessed, 1: hit, -1: miss
    computerGuesses = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    playerShips = [
        {
            name: 'carrier',
            size: 5,
            coords: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
            hits: [false, false, false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'battleship',
            size: 4,
            coords: [[1, 0], [1, 1], [1, 2], [1, 3]],
            hits: [false, false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'cruiser',
            size: 3,
            coords: [[2, 0], [2, 1], [2, 2]],
            hits: [false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'submarine',
            size: 3,
            coords: [[3, 0], [3, 1], [3, 2]],
            hits: [false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'destroyer',
            size: 2,
            coords: [[4, 0], [4, 1]],
            hits: [false, false],
            isSunk: false,
            isVertical: false,
        }
    ]

    computerShips = [
        {
            name: 'carrier',
            size: 5,
            coords: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
            hits: [false, false, false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'battleship',
            size: 4,
            coords: [[1, 0], [1, 1], [1, 2], [1, 3]],
            hits: [false, false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'cruiser',
            size: 3,
            coords: [[2, 0], [2, 1], [2, 2]],
            hits: [false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'submarine',
            size: 3,
            coords: [[3, 0], [3, 1], [3, 2]],
            hits: [false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'destroyer',
            size: 2,
            coords: [[4, 0], [4, 1]],
            hits: [false, false],
            isSunk: false,
            isVertical: false,
        }
    ]
    // if using as both initial setup and reset game, need a few extras. fix this by creating seperate playAgain function
    // will need to hide play again button
    // need to clear classes from all cells, and scoreboard

    // place player ships into playerBoard for right now, should move to after ship placements are picked
    placeShipsOntoBoard();

    // render player's ships, done per ship so later allowing for single placement
    playerShips.forEach(ship => {
        renderShip(ship, 'p');
    })

    // currently doing nothing, may eliminate since each action triggers different renders
    render();
}

function placeShipsOntoBoard() {
    for (let ship of playerShips) {
        for (let coord of ship.coords) {
            playerBoard[coord[0]][coord[1]] = 1;
        }
    };

    for (let ship of computerShips) {
        for (let coord of ship.coords) {
            computerBoard[coord[0]][coord[1]] = 1;
        }
    };
}

function extractCoords(cellEl) {
    // takes cell div element, returns coordinates of that cell in the board as arr ['c', 0, 1] or ['p', 0, 1]
    return cellEl.id.split('-');
}

// taking turn
function onGuess(evt) {
    // get cell clicked
    const target = evt.target

    // check if actual cell
    if (!(target.classList.contains('cell'))) return;

    // get cell coords ['p?t', 0, 0] 
    const coords = extractCoords(target);
    const [cellBoard, cellRow, cellCol] = [...coords];

    // check legal guess (in guesses object not classes)
    if (cellBoard === 'p') {
        if (computerGuesses[cellRow][cellCol]) {
            // cell has already been guessed
            return;
        };
    } else {
        if (playerGuesses[cellRow][cellCol]) {
            // cell has already been guessed
            return;
        }
    };

    // check if hit or miss, isHit = getHitOrMiss()
    let isHit = getHitOrMiss(coords);

    // handle hit or miss
    isHit ? handleHit(coords) : handleMiss(coords);

    // if not winner: change turns
    if (winner) {
        renderWinner();
    } else {
        turn *= -1;
    };
}

function getHitOrMiss(coords) {
    // take cell, returns 1 for hit, 0 for miss

    const [board, row, col] = [...coords];

    if (board === 'p') {
        return playerBoard[row][col];
    } else {
        return computerBoard[row][col];
    };
}

// takes coordinate ['p', 0, 0] returns ship and index of location hit
function getShipAtCoord(coords) {
    const [board, row, col] = [...coords];
    ships = (board === 'p') ? playerShips : computerShips;
    for (let ship of ships) {
        for (let i = 0; i < ship.size; i++) {
            if (ship.coords[i][0] == row && ship.coords[i][1] == col) {
                return [ship, i]
            }
        }
    }
}

function handleHit(coords) {
    // update playerGuesses or computerGuesses
    const [board, row, col] = [...coords];
    if (board === 'p') {
        computerGuesses[row][col] = 1;
    } else {
        playerGuesses[row][col] = 1;
    };
    // get ship that was hit
    const [ship, idx] = getShipAtCoord(coords);

    // update ship hit to true
    ship.hits[idx] = true;

    renderCell(coords, 'hit');

    // check if ship now sunk
    ship.isSunk = ship.hits.every(hit => hit === true);

    // if player is hit, renderScoreboardHit()

    // if ship sinks, renderScoreboardSunk()

    // if ship sinks, checkWinner(), then set winner to current turn or null
    if (ship.isSunk) {
        winner = checkWinner(coords) ? turn : null;
    };
}

function handleMiss(coords) {
    // update playerGuesses or computerGuesses
    const [board, row, col] = [...coords];
    if (board === 'p') {
        computerGuesses[row][col] = -1;
    } else {
        playerGuesses[row][col] = -1;
    };

    renderCell(coords, 'miss');

}

function checkWinner(cell) {
    // checks if all ships of a player are destroyed
    const [board, row, col] = [...cell];

    // returns 1 or -1 for winner, else null
    if (board === 'p') {
        for (ship of playerShips) {
            if (!ship.isSunk) {
                return false;
            }
        }
    } else {
        for (ship of computerShips) {
            if (!ship.isSunk) {
                return false;
            }
        }
    };
    return true;
}

// rendering
function render() {
    // for each cell, renderCell();

    // render scoreboard

}

function renderCell(cell, change) {
    // change classes on cell
    if (change === 'hit') {
        console.log('render hit now');
    } else if (change === 'miss') {
        console.log('render miss now');
    } else if (change === 'ship') {
        console.log('render ship now');
    }
}

function renderShip(ship, player) {
    let cellEls = (player === 'p') ? playerCellEls : computerCellEls;
    for (let coord of ship.coords) {
        let i = coord[0] * 10 + coord[1]
        cellEls[i].classList.add('ship');
    }
}

function renderScoreboard() {
    // show hits/sunk ships below the board
    console.log('update scoreboard now');
}

function renderWinner() {
    // show winner/loser message
    console.log('winner is ', turn);
    // reveal computer ships

    // display play again button
}
