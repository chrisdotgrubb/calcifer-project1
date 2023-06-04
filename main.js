
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

// gets ship coordinates from objects and adds them to the playing board
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

// takes cell element, returns coordinates of that cell in the board as arr. ['c', 0, 1] or ['p', 0, 1]
// (div element)
function extractCoords(cellEl) {
    return cellEl.id.split('-');
}

// handles player turn, activated onClick of computer's grid
// (click event)
function onGuess(evt) {
    // get cell clicked
    const target = evt.target

    // check if actual cell
    if (!(target.classList.contains('cell'))) return;

    // get cell coords ['p?t', 0, 0] 
    const coords = extractCoords(target);
    const [cellBoard, cellRow, cellCol] = [...coords];

    // check legal guess (check guesses array not element's classes)
    // I may not need this, as only the player will be clicking, computer will likely be handled differently
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

    // check if hit or miss
    let isHit = getHitOrMiss(coords);

    // handle hit or miss
    isHit ? handleHit(coords) : handleMiss(coords);

    // handle win or change turns
    if (winner) {
        renderWinner();
    } else {
        turn *= -1;
    };
}

// takes coordinate, returns 1 for hit, 0 for miss
// (['p', 0, 0])
function getHitOrMiss(coords) {

    const [board, row, col] = [...coords];

    if (board === 'p') {
        return playerBoard[row][col];
    } else {
        return computerBoard[row][col];
    };
}

// takes coordinate returns ship and index of location hit.
// (['p', 0, 0])
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

// takes coordinate of hit and handles all hit logic, no return
// (['p', 0, 0])
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

    // render the hit
    renderCell(coords, 'hit');

    // if player is hit, renderScoreboardHit()

    // check if ship now sunk
    ship.isSunk = ship.hits.every(hit => hit);

    // if ship sinks, renderScoreboardSunk()

    // if ship sinks, checkWinner(), then set winner to current turn or null
    if (ship.isSunk) {
        winner = checkWinner(board);
    };
}

// takes coordinate of miss and handles all miss logic, no return
// (['p', 0, 0])
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

// takes player that was hit as string. on win returns the opposing player, or null
// ('p')
function checkWinner(player) {
    // checks if all ships of a player are destroyed
    if (player === 'p') {
        for (ship of playerShips) {
            if (!ship.isSunk) {
                return false;
            }
        }
        return -1;
    } else {
        for (ship of computerShips) {
            if (!ship.isSunk) {
                return false;
            }
        }
        return 1;
    };
}

// rendering, this is unused for now. probably uneeded.
function render() {
    // for each cell, renderCell();

    // render scoreboard
}

// takes cell and the change happening and applies the appropriate class to the element
// (['p', 0 , 1], 'hit')
function renderCell(cell, change) {
    // get element to change
    const [player, row, col] = [...cell];

    // get player or computer cells array
    const cellEls = (player === 'p') ? playerCellEls : computerCellEls;

    // get index of array from id of element
    const idx = parseInt(row) * 10 + parseInt(col);

    // get inner span
    const span = cellEls[idx].querySelector('span');

    // add appropriate class
    span.classList.add(change);
}

// takes ship object and the player as string, then renders that ship
// (playerShips[0], 'p')
function renderShip(ship, player) {
    let cellEls = (player === 'p') ? playerCellEls : computerCellEls;
    for (let coord of ship.coords) {
        let i = coord[0] * 10 + coord[1]
        cellEls[i].classList.add('ship');
    }
}

// not used yet
// takes player's ship that was hit and index, render's hit on the player's scoreboard.
// not used for computer hits. no return
// use return values from getShipAtCoord()
// (playerShips[0], 0)
function renderScoreboardHit(ship, idx) {
    // show hits/sunk ships below the board
    console.log('update scoreboard with hit');
}

// not used yet
// takes ship hit, and player as string. render's ship as sunk on scoreboard. no return
// (playerShips[0], 'p')
function renderScoreboardSunk(ship, player) {
    console.log('update scoreboard with sunk ship');
}

// renders when game is won. no return
function renderWinner() {
    // show winner/loser message
    console.log('winner is ', winner);

    // reveal computer ships
    console.log('render all computer ships');

    // display play again button
    console.log('reveal play again button');
}
