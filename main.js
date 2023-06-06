/*--- const ---*/
const setupMsg = 'Place your ships';
const playerMsg = 'Your turn';
const computerMsg = 'Computer\'s turn';
const winningMsg = 'Congrats, you won!';
const losingMsg = 'You lost!';

/*--- state variables ---*/
// 1: player, -1: computer
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

let shipToBePlaced;

/*--- cached elements ---*/
const playerBoardEl = document.querySelector('#playerBoard');
const computerBoardEl = document.querySelector('#computerBoard');
const playerCellEls = [...playerBoardEl.querySelectorAll('.cell')];
const computerCellEls = [...computerBoardEl.querySelectorAll('.cell')];
const turnEl = document.querySelector('#turn');
const playAgainEl = document.querySelector('#playAgain');
const playerScoreboardEl = document.querySelector('#playerScoreboard');

/*--- event listeners ---*/
playAgainEl.addEventListener('click', playAgain);

// this will need to be added after ships are placed
// computerBoardEl.addEventListener('click', onGuess);

/*--- main ---*/
init();

/*--- functions ---*/

// start/restart game
function init() {
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
            coords: [],
            hits: [false, false, false, false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'battleship',
            size: 4,
            coords: [],
            hits: [false, false, false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'cruiser',
            size: 3,
            coords: [],
            hits: [false, false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'submarine',
            size: 3,
            coords: [],
            hits: [false, false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'destroyer',
            size: 2,
            coords: [],
            hits: [false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
        }
    ];

    computerShips = [
        {
            name: 'carrier',
            size: 5,
            coords: [],
            hits: [false, false, false, false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'battleship',
            size: 4,
            coords: [],
            hits: [false, false, false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'cruiser',
            size: 3,
            coords: [],
            hits: [false, false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'submarine',
            size: 3,
            coords: [],
            hits: [false, false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
        },
        {
            name: 'destroyer',
            size: 2,
            coords: [],
            hits: [false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
        }
    ];

    // stores scoreboard elements in ship.scoreboards array. needs done after ship objects created.
    getScoreboardElements();

    // allow for placing ships
    playerScoreboardEl.addEventListener('click', getShipToBePlaced);

    // place your ships message
    turnEl.innerText = setupMsg;
}

// clear stuff to prepare for new game, then restart
function playAgain() {
    // hide play again button
    playAgainEl.classList.add('hidden');

    // clear classes from all cells and scoreboard
    playerCellEls.forEach(el => {
        el.classList = ['cell'];
        el.firstChild.classList = [];
    });
    computerCellEls.forEach(el => {
        el.classList = ['cell'];
        el.firstChild.classList = [];
    });
    playerShips.forEach(ship => {
        ship.scoreboards.forEach(cell => {
            cell.firstChild.classList.remove('hit');
            cell.classList.remove('sunk');
        });
    });
    computerShips.forEach(ship => {
        ship.scoreboards.forEach(cell => cell.classList.remove('sunk'));
    });

    init();
}

// gets scoreboard elements and appends them to ship.scoreboards
function getScoreboardElements() {
    for (let ship of playerShips) {
        const scoreboardEls = document.querySelectorAll(`.p-${ship.name}`);
        for (let el of scoreboardEls) {
            ship.scoreboards.push(el)
        };
    };

    for (let ship of computerShips) {
        const scoreboardEls = document.querySelectorAll(`.c-${ship.name}`);
        for (let el of scoreboardEls) {
            ship.scoreboards.push(el)
        };
    };
}

// sets ship location, using for just computer
function setShipLocationRandomly(ship, player) {
    // get player or computer ships
    const ships = (player === 'p') ? playerShips : computerShips;

    // randomly set vertical or horizontal
    ship.isVertical = Math.random() < 0.5;

    // get locations of current ships
    const currentCoords = [];
    ships.forEach(item => {
        item.coords.forEach(coord => currentCoords.push(coord));
    });

    // figure out valid starting locations. left-most position for horizontal ship, top for vertical
    let maxStartingRow;
    let maxStartingCol;

    if (ship.isVertical) {
        maxStartingRow = 9;
        maxStartingCol = 10 - ship.size;
    } else {
        maxStartingRow = 10 - ship.size;
        maxStartingCol = 9;
    }
    let isValid = false;
    let potential = [];

    while (!isValid) {
        potential = [];

        // try starting position
        const row = Math.floor(Math.random() * maxStartingRow);
        const col = Math.floor(Math.random() * maxStartingCol);

        // get potential coordinates based off of starting position, ship size, and isVertical
        // v [0,0], [1,0]
        // h [0,0], [0,1]
        if (ship.isVertical) {
            // row, col - row col + 1
            for (let i = 0; i < ship.size; i++) {
                potential.push([row, col + i]);
            }
        } else {
            for (let i = 0; i < ship.size; i++) {
                potential.push([row + i, col]);
            }
        };
        isValid = true;

        // compare current positions to potential new ones
        potential.forEach(item => {
            currentCoords.forEach(coord => {
                if (item[0] === coord[0] && item[1] === coord[1]) {
                    isValid = false;
                }
            });
        });
    };

    // if valid, asign to ship. else find new starting position
    potential.forEach(coord => ship.coords.push(coord));
}

// gets ship to be placed, from player scoreboard
function getShipToBePlaced(evt) {
    // get ship clicked on scoreboard display
    const target = evt.target;

    // check that a ship was clicked
    if (!target.classList.contains('ship')) {
        return;
    };

    // select ship to be placed, only player ships will use this function
    // loop over ships to see which ship's scoreboard element was clicked
    playerShips.forEach(ship => {
        ship.scoreboards.forEach(el => {
            if (el === target) {
                shipToBePlaced = ship;
            };
        });
    });

    // checks to see if clicked ship has already been placed
    if (shipToBePlaced.coords.length > 0) {
        return;
    }

    // remove ship event listeners
    playerScoreboardEl.removeEventListener('click', getShipToBePlaced);

    // determine isVertical

    // display ship on hover of player board
    playerBoardEl.addEventListener('mouseover', mouseoverPendingPlacement);
    playerBoardEl.addEventListener('mouseout', mouseoutPendingPlacement);

    // remove ship from scoreboard
    unrenderScoreboardShip(shipToBePlaced);

    // add event listener on player board div
    playerBoardEl.addEventListener('click', handlePlacingShip);
}

// places shipToBePlaced onto player board
function handlePlacingShip(evt) {
    // get cell clicked on player board
    const target = evt.target;

    // check that a cell was clicked
    if (!target.classList.contains('cell')) {
        return;
    };

    // get row and col clicked
    const [_, row, col] = [...extractCoords(target)];

    // attempt to place
    let newLocations = attemptToPlaceShip(shipToBePlaced, row, col);

    // if valid, asign to ship. else wait for new starting position
    if (newLocations) {
        // ship will be placed, remove this event listener
        playerBoardEl.removeEventListener('click', handlePlacingShip);
        playerBoardEl.removeEventListener('mouseover', mouseoverPendingPlacement);
        playerBoardEl.removeEventListener('mouseout', mouseoutPendingPlacement);

        // mouseoutPendingPlacement never triggers, so remove pending class from target
        target.classList.remove('pending');

        // place coords in ship obj
        newLocations.forEach(coord => shipToBePlaced.coords.push(coord));
        
        // place new ship onto board
        for (let coord of shipToBePlaced.coords) {
            playerBoard[coord[0]][coord[1]] = 1;
        };
        
        // make ship disapear in scoreboard
        // maybe move to previous listener
        // unrenderScoreboardShip(shipToBePlaced);

        // render new ship
        renderShip(shipToBePlaced, 'p');

        // remove pending from all cells
        playerCellEls.forEach(cell => cell.classList.remove('pending'));

        // check if all ships have been placed
        if (playerShips.every(ship => ship.coords.length > 0)) {
            // move on with game
            setupComputerBoard();
        } else {
            // or allow for placing other ships
            playerScoreboardEl.addEventListener('click', getShipToBePlaced);
        };
    };
}

function attemptToPlaceShip(ship, row, col) {
    // get player ships
    const ships = playerShips;

    // get locations of current ships
    const currentCoords = [];
    ships.forEach(item => {
        item.coords.forEach(coord => currentCoords.push(coord));
    });

    // find potential starting locations
    let maxStartingRow;
    let maxStartingCol;

    if (ship.isVertical) {
        maxStartingRow = 9;
        maxStartingCol = 10 - ship.size;
    } else {
        maxStartingRow = 10 - ship.size;
        maxStartingCol = 9;
    }
    if (row > maxStartingRow || col > maxStartingCol) {
        return null;
    }

    let isValid = false;
    let potential = [];

    // get potential coordinates based off of starting position, ship size, and isVertical
    // v [0,0], [1,0]
    // h [0,0], [0,1]
    if (ship.isVertical) {
        // row, col - row col + 1
        for (let i = 0; i < ship.size; i++) {
            potential.push([row, col + i]);
        }
    } else {
        for (let i = 0; i < ship.size; i++) {
            potential.push([row + i, col]);
        }
    };
    isValid = true;

    // compare current positions to potential new ones
    potential.forEach(item => {
        currentCoords.forEach(coord => {
            if (item[0] === coord[0] && item[1] === coord[1]) {
                isValid = false;
            }
        });
    });
    return isValid ? potential : null;
}

function mouseoverPendingPlacement(evt) {
    if (evt.target.classList.contains('cell')) {
        // get target cell
        let coords = extractCoords(evt.target);
        const [_, row, col] = [...coords];
        // get pending cells
        let cells = [];
        let idx = row * 10 + col;
        let adder = 10; // change when adding in isVertical / horizontal logic

        for (let i=0; i < shipToBePlaced.size; i++){
            let newIdx = i * adder + idx;
            if (newIdx > 99) {
                continue;
            }
            cells.push(playerCellEls[newIdx]);
        }

        // apply class to the cells
        cells.forEach(cell => cell.classList.add('pending'));
    };
}

function mouseoutPendingPlacement(evt) {
    if (evt.target.classList.contains('cell')) {
        playerCellEls.forEach(cell => cell.classList.remove('pending'));
        // evt.target.classList.remove('pending');
    };
}

// sets up computer and starts play, called after player setup
function setupComputerBoard() {
    // set computer ships locations
    computerShips.forEach(ship => setShipLocationRandomly(ship, 'c'));

    // place computer ships onto computerBoard
    // this is doing both players, may change since player's will already be done
    placeShipsOntoBoard();

    // add ships back to player's scoreboard
    playerShips.forEach(ship => renderScoreboardShip(ship));

    // add event listener to start game
    computerBoardEl.addEventListener('click', onGuess)

    // diplay player's turn
    turnEl.innerText = playerMsg;
}

// gets ship coordinates from objects and adds them to the playing board
function placeShipsOntoBoard() {
    for (let ship of playerShips) {
        for (let coord of ship.coords) {
            playerBoard[coord[0]][coord[1]] = 1;
        };
    };

    for (let ship of computerShips) {
        for (let coord of ship.coords) {
            computerBoard[coord[0]][coord[1]] = 1;
        };
    };
}

// takes cell element, returns coordinates of that cell in the board as arr. ['c', 0, 1] or ['p', 0, 1]
// (div element)
function extractCoords(cellEl) {
    let strs = cellEl.id.split('-');
    let parsed = [strs[0], parseInt(strs[1]), parseInt(strs[2])]
    return parsed;
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
    if (playerGuesses[cellRow][cellCol]) {
        // cell has already been guessed
        return;
    };

    // check if hit or miss
    const isHit = getHitOrMiss(coords);

    // handle hit or miss
    isHit ? handleHit(coords) : handleMiss(coords);

    // remove event listener to prepare for win or computer's turn
    computerBoardEl.removeEventListener('click', onGuess);

    // handle win or change turns
    if (winner) {
        renderWinner();
    } else {
        // add setTimeout before computer takes turn, and change display message
        computerTurn();
    };
}

// handle computer's turn
// triggered after player's turn, but could be called first if computer gets first turn
function computerTurn() {
    // pick cell
    const coords = getComputerGuess();

    // check if hit or miss
    const isHit = getHitOrMiss(coords);

    // handle hit or miss
    isHit ? handleHit(coords) : handleMiss(coords);

    // handle win or change turns
    if (winner) {
        renderWinner();
    } else {
        // change display message
        computerBoardEl.addEventListener('click', onGuess);
    }
}

// returns cell for computer's guess
function getComputerGuess() {
    while (true) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        if (!computerGuesses[row][col]) {
            return ['p', row, col];
        };
    };

    // choose randomly if there are no hits that are on floating ships

    // if there is a hit on a floating ship, chose cell next to that hit

    // if there are 2 such hits, guess in same row/col

    // don't guess in space that a remaining ship could not occupy
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

// takes coordinate, returns ship and index of location hit.
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
    };
}

// takes coordinate of hit and handles all hit logic, no return
// (['p', 0, 0])
function handleHit(coords) {
    const [board, row, col] = [...coords];

    // update playerGuesses or computerGuesses
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
    if (board === 'p') {
        renderScoreboardHit(ship, idx);
    };

    // check if ship now sunk
    ship.isSunk = ship.hits.every(hit => hit);

    // if ship sinks, renderScoreboardSunk()
    if (ship.isSunk) {
        renderScoreboardSunk(ship, board);
    };

    // if ship sinks, checkWinner(), then set winner to 1, -1, or null
    if (ship.isSunk) {
        winner = checkWinner(board);
    };
}

// takes coordinate of miss and handles all miss logic, no return
// (['p', 0, 0])
function handleMiss(coords) {
    const [board, row, col] = [...coords];
    const guesses = (board === 'p') ? computerGuesses : playerGuesses;

    // update playerGuesses or computerGuesses
    guesses[row][col] = -1

    renderCell(coords, 'miss');
}

// takes player that was hit as string. on win returns the opposing player, or null
// ('p')
function checkWinner(player) {
    // checks if all ships of a player are destroyed
    if (player === 'p') {
        for (ship of playerShips) {
            if (!ship.isSunk) {
                return null;
            }
        };
        return -1;
    } else {
        for (ship of computerShips) {
            if (!ship.isSunk) {
                return null;
            }
        };
        return 1;
    };
}

/*--- Rendering Functions  ---*/

// takes cell and the change happening and applies the appropriate class to the element
// (['p', 0 , 1], 'hit')
function renderCell(cell, change) {
    const [player, row, col] = [...cell];

    // get player or computer cells array
    const cellEls = (player === 'p') ? playerCellEls : computerCellEls;

    // get index of array from id of element
    const idx = row * 10 + col;

    // add class to inner <span>
    cellEls[idx].firstChild.classList.add(change);
}

// takes ship object and the player as string, then renders that ship
// (playerShips[0], 'p')
function renderShip(ship, player) {
    const cellEls = (player === 'p') ? playerCellEls : computerCellEls;
    for (let coord of ship.coords) {
        const i = coord[0] * 10 + coord[1]
        cellEls[i].classList.add('ship');
        cellEls[i].classList.add(ship.name);
    };
}
// this is called after manual ship placement of each ship
function unrenderScoreboardShip(ship) {
    for (let cell of ship.scoreboards) {
        cell.classList.remove(`p-${ship.name}`);
    };
}

// re-renders scoreboard ship on game start
function renderScoreboardShip(ship) {
    for (let cell of ship.scoreboards) {
        cell.classList.add(`p-${ship.name}`);
    };
}

// takes player's ship that was hit and index, render's hit on the player's scoreboard.
// not used for computer hits
// use return values from getShipAtCoord(). no return
// (playerShips[0], 0)
function renderScoreboardHit(ship, idx) {
    // apply hit class to <span> inside ship on scoreboard
    ship.scoreboards[idx].firstChild.classList.add('hit');
}

// takes ship sunk, render's ship as sunk on scoreboard. no return
// (playerShips[0])
function renderScoreboardSunk(ship) {
    ship.scoreboards.forEach(el => el.classList.add('sunk'));
}

// renders when game is won. no return
function renderWinner() {
    // show winner/loser message
    turnEl.innerText = winner === 1 ? winningMsg : losingMsg;

    // reveal computer ships
    computerShips.forEach(ship => renderShip(ship, 'c'));

    // display play again button
    playAgainEl.classList.remove('hidden');
}
