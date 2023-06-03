
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
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
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
            coords: [],
            hits: [false, false, false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'battleship',
            size: 4,
            coords: [],
            hits: [false, false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'cruiser',
            size: 3,
            coords: [],
            hits: [false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'submarine',
            size: 3,
            coords: [],
            hits: [false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'destroyer',
            size: 2,
            coords: [],
            hits: [false, false],
            isSunk: false,
            isVertical: false,
        }
    ]

    computerShips = [
        {
            name: 'carrier',
            size: 5,
            coords: [[0,0], [0,1], [0,2], [0,3], [0,4]],
            hits: [false, false, false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'battleship',
            size: 4,
            coords: [],
            hits: [false, false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'cruiser',
            size: 3,
            coords: [],
            hits: [false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'submarine',
            size: 3,
            coords: [],
            hits: [false, false, false],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'destroyer',
            size: 2,
            coords: [],
            hits: [false, false],
            isSunk: false,
            isVertical: false,
        }
    ]
    // if using as both initial setup and reset game, need a few extras. fix this by creating seperate playAgain function
    // will need to hide play again button
    // need to clear classes from all cells, and scoreboard

    render();
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
    isHit? handleHit(coords): handleMiss(coords);

    // if not winner: change turns
    if (!winner) turn *= -1;
}

function getHitOrMiss(coords) {
    // take cell, returns 1 for hit, 0 for miss

    const [board, row, col] = [...coords];

    if (board === 'p') {
        return playerBoard[row][col];
    } else {
        return computerBoard[row][col];
    }
}

// takes coordinate ['p', 0, 0] returns ship and index of location hit
function getShipAtCoord(coords) {
    const [board, row, col] = [...coords];
    ships = (board === 'p')? playerShips: computerShips;
    for (let ship of ships) {
        for (let i=0; i < ship.size; i++) {
            if (ship.coords[i][0] == row && ship.coords[i][1] == col) {
                return [ship, i]
            }
        }
    }
}

function handleHit(coords) {
    // update playerGuesses or computerGuesses
    console.log('hit', coords);
    // get ship that was hit
    const [ship, idx] = getShipAtCoord(coords);
    console.log(ship, idx);

    // update ship hit to true
    ship.hits[idx] = true;

    // renderCell(cell, 'hit')

    // check if ship now sunk, isSunk = checkShipSunk()

    // if player is hit, renderScoreboardHit()

    // if ship sinks, renderScoreboardSunk()

    // if ship sinks, checkWinner()

}

function handleMiss(cell) {
    // update playerGuesses or computerGuesses
    console.log('miss');
    // renderCell(cell, 'miss')

}

function checkShipSunk(cell) {
    // takes cell, returns ship object or null
}

function checkWinner() {
    // checks if all ships of a player are destroyed

    // returns 1 or -1 for winner, else null
}

// rendering
function render() {
    // for each cell, renderCell();

    // render scoreboard

    // render winner?
}

function renderCell(cell, change) {
    // change classes on cell
}

function renderScoreboard() {
    // show hits/sunk ships below the board
}

function renderWinner() {
    // show winner/loser message

    // reveal computer ships

    // display play again button
}
