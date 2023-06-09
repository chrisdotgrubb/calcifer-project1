/*--- const ---*/
const setupMsg = 'Click a ship to place';
const rotateMsg = '[Space] to rotate';
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
let hoverTarget;
let computerKnowledge;

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

/*--- main ---*/
init();

/*--- functions ---*/

// start/restart game
function init() {
    winner = null;

    // 0: no ship, 1: ship
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

    // 0: no ship, 1: ship
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
            finalHit: null,
            isResolved: null
        },
        {
            name: 'battleship',
            size: 4,
            coords: [],
            hits: [false, false, false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
            finalHit: null,
            isResolved: null
        },
        {
            name: 'cruiser',
            size: 3,
            coords: [],
            hits: [false, false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
            finalHit: null,
            isResolved: null
        },
        {
            name: 'submarine',
            size: 3,
            coords: [],
            hits: [false, false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
            finalHit: null,
            isResolved: null
        },
        {
            name: 'destroyer',
            size: 2,
            coords: [],
            hits: [false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false,
            finalHit: null,
            isResolved: null
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
            isVertical: false
        },
        {
            name: 'battleship',
            size: 4,
            coords: [],
            hits: [false, false, false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false
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
            isVertical: false
        },
        {
            name: 'destroyer',
            size: 2,
            coords: [],
            hits: [false, false],
            scoreboards: [],
            isSunk: false,
            isVertical: false
        }
    ];

    // set initital computer knowledge
    computerKnowledge = {
        // stores hits that may have a ship next to it
        unresolvedHits: []
    };
    // stores scoreboard elements in ship.scoreboards array. needs done after ship objects created.
    getScoreboardElements();

    // allow for placing ships
    playerScoreboardEl.addEventListener('click', getShipToBePlaced);

    // place your ships message
    turnEl.innerText = setupMsg;
}

// clears classes to prepare for new game, then restart
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
// (computerShips[0], 'c')
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

    // one more than limit for Math.floor
    if (ship.isVertical) {
        maxStartingRow = 11 - ship.size;
        maxStartingCol = 10;
    } else {
        maxStartingRow = 10;
        maxStartingCol = 11 - ship.size;
    };
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
            for (let i = 0; i < ship.size; i++) {
                potential.push([row + i, col]);
            }
        } else {
            for (let i = 0; i < ship.size; i++) {
                potential.push([row, col + i]);
            }
        };

        isValid = true;

        // compare current positions to potential new ones
        potential.forEach(item => {
            currentCoords.forEach(coord => {
                if (item[0] === coord[0] && item[1] === coord[1]) {
                    isValid = false;
                };
            });
        });
    };

    // if valid, asign to ship. else find new starting position
    potential.forEach(coord => ship.coords.push(coord));
}

// gets ship to be placed, from player scoreboard
// (click event)
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

    // change display message
    turnEl.innerText = rotateMsg;

    // add event listener to change isVertical
    window.addEventListener('keydown', changeIsVertical);

    // display ship on hover of player board
    playerBoardEl.addEventListener('mouseover', mouseoverPendingPlacement);
    playerBoardEl.addEventListener('mouseout', mouseoutPendingPlacement);

    // remove ship from scoreboard
    unrenderScoreboardShip(shipToBePlaced);

    // add event listener on player board div
    playerBoardEl.addEventListener('click', handlePlacingShip);
}

// places shipToBePlaced onto player board
// (click event)
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

        // place coords in ship obj
        newLocations.forEach(coord => shipToBePlaced.coords.push(coord));

        // place new ship onto board
        for (let coord of shipToBePlaced.coords) {
            playerBoard[coord[0]][coord[1]] = 1;
        };

        // render new ship
        renderShip(shipToBePlaced, 'p');

        // remove pending from all cells
        playerCellEls.forEach(cell => cell.classList.remove('pending'));

        // remove rotate ability
        window.removeEventListener('keydown', changeIsVertical);

        hoverTarget = null;

        // check if all ships have been placed
        if (playerShips.every(ship => ship.coords.length > 0)) {
            // move on with game
            setupComputerBoard();
        } else {
            // reset display message
            turnEl.innerText = setupMsg;

            // allow for placing other ships
            playerScoreboardEl.addEventListener('click', getShipToBePlaced);
        };
    };
}

// tries to place ship at location clicked
// takes ship, row, and col. returns array of ship's new coordinates if valid, else null
// (playerShips[0], 0, 0)
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
        maxStartingRow = 10 - ship.size;
        maxStartingCol = 9;
    } else {
        maxStartingRow = 9;
        maxStartingCol = 10 - ship.size;
    };

    if (row > maxStartingRow || col > maxStartingCol) {
        return null;
    };

    let isValid = true;
    let potential = [];

    // get potential coordinates based off of starting position, ship size, and isVertical
    // v [0,0], [1,0]
    // h [0,0], [0,1]
    if (ship.isVertical) {
        // row, col - row col + 1
        for (let i = 0; i < ship.size; i++) {
            potential.push([row + i, col]);
        };
    } else {
        for (let i = 0; i < ship.size; i++) {
            potential.push([row, col + i]);
        };
    };

    // compare current positions to potential new ones
    potential.forEach(item => {
        currentCoords.forEach(coord => {
            if (item[0] === coord[0] && item[1] === coord[1]) {
                isValid = false;
            };
        });
    });
    return isValid ? potential : null;
}

// sets up computer and starts play, called after player setup
function setupComputerBoard() {
    // set computer ships locations
    computerShips.forEach(ship => setShipLocationRandomly(ship, 'c'));

    // place computer ships onto computerBoard
    placeShipsOntoBoard();

    // add ships back to player's scoreboard
    playerShips.forEach(ship => renderScoreboardShip(ship));

    // diplay player's turn
    turnEl.innerText = playerMsg;

    // add event listener to start game
    computerBoardEl.addEventListener('click', onGuess)
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
    let parsed = [strs[0], parseInt(strs[1]), parseInt(strs[2])];
    return parsed;
}

// handles player turn, activated onClick of computer's grid
// (click event)
function onGuess(evt) {
    // get cell clicked
    const target = evt.target;

    // check if actual cell
    if (!(target.classList.contains('cell'))) return;

    // get cell coords ['p?t', 0, 0] 
    const coords = extractCoords(target);
    const [_, cellRow, cellCol] = [...coords];

    // check legal guess
    if (playerGuesses[cellRow][cellCol]) {
        // cell has already been guessed
        return;
    };

    // remove event listener to prepare for win or computer's turn
    computerBoardEl.removeEventListener('click', onGuess);

    // check if hit or miss
    const isHit = getHitOrMiss(coords);

    // handle hit or miss
    isHit ? handleHit(coords) : handleMiss(coords);

    // handle win or change turns
    if (winner) {
        renderWinner();
    } else {
        // add setTimeout before computer takes turn, and change display message
        turnEl.innerText = computerMsg;
        setTimeout(computerTurn, Math.floor(Math.random() * 500) + 1000);
    };
}

// handle computer's turn
// triggered after player's turn, but could be called first if computer gets first turn
function computerTurn() {
    // pick cell
    let coords;

    // check if unresolved hits
    // if true check around hits for empty space
    if (computerKnowledge.unresolvedHits.length > 0) {
        let potentialCells = [];
        let newChoices = [];

        computerKnowledge.unresolvedHits.forEach(hit => {
            let cells = getPontentialGuessCells(hit[0], hit[1]);
            potentialCells = potentialCells.concat(cells);
        });

        if (computerKnowledge.unresolvedHits.length > 1) {
            let tempRowIdxs = [];
            let tempColIdxs = [];
            let rowIdxs = [];
            let colIdxs = [];
            let isRow;
            let commonIdx;
            let finalHits = [];

            // get all unresolved hits
            computerKnowledge.unresolvedHits.forEach(cell => {
                tempRowIdxs.push(cell[0]);
                tempColIdxs.push(cell[1]);
            });
            // get all final hits
            playerShips.forEach(ship => {
                if (ship.finalHit) {
                    finalHits.push([ship.finalHit[0], ship.finalHit[1]]);
                };
            });

            // check if coord is a final hit and exclude from search for indexes
            for (let i = 0; i < tempRowIdxs.length; i++) {
                let check = true;
                finalHits.forEach(hit => {
                    // check each pair to see if they are a final hit on a ship
                    if (tempRowIdxs[i] === hit[0] && tempColIdxs[i] === hit[1]) {
                        check = false;
                    };
                });
                if (check) {
                    rowIdxs.push(tempRowIdxs[i]);
                    colIdxs.push(tempColIdxs[i]);
                };
            };

            // check if cells all have row in common to determin if rows or cols is better guess
            isRow = rowIdxs.every(r => r === rowIdxs[0]);

            if (isRow) {
                commonIdx = rowIdxs[0];
                potentialCells.forEach(cell => {
                    if (cell[0] === commonIdx) {
                        newChoices.push(cell);
                    };
                });
            } else {
                commonIdx = colIdxs[0];
                potentialCells.forEach(cell => {
                    if (cell[1] === commonIdx) {
                        newChoices.push(cell);
                    };
                });
            };
        };

        if (newChoices.length > 0) {
            potentialCells = newChoices;
        };

        let cellChoice = potentialCells[Math.floor(Math.random() * potentialCells.length)];

        coords = ['p', cellChoice[0], cellChoice[1]];

    } else {
        coords = getBetterRandomGuess();
    };

    // check if hit or miss
    const isHit = getHitOrMiss(coords);

    // handle hit or miss
    isHit ? handleHit(coords) : handleMiss(coords);

    // handle win or change turns
    if (winner) {
        renderWinner();
    } else {
        // change display message
        turnEl.innerText = playerMsg;
        computerBoardEl.addEventListener('click', onGuess);
    };
}

// only called if no unresolved hits to follow-up
// gets all potential guesses, then eleminates "bad" guesses, until small enough to pick from
// returns cell for computer's guess
function getBetterRandomGuess() {
    let availableCellsOne = [];
    let availableCellsTwo = [];
    let guessedCells = [];
    let adjacendToGuessed = new Set();

    // get all potential cells and all guessed cells
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (computerGuesses[i][j] === 0) {
                availableCellsOne.push([i, j]);
            } else {
                guessedCells.push([i, j]);
            };
        };
    };

    // get cells next to guessed cells
    guessedCells.forEach(cell => {
        let [row, col] = [...cell];

        // get cell above
        if (row > 0) {
            adjacendToGuessed.add([row - 1, col]);
        };

        // get cell below
        if (row < 9) {
            adjacendToGuessed.add([row + 1, col]);
        };

        // get cell left
        if (col > 0) {
            adjacendToGuessed.add([row, col - 1]);
        };

        // get cell right
        if (col < 9) {
            adjacendToGuessed.add([row, col + 1]);
        };
    });

    // remove "worst" guesses
    availableCellsOne.forEach(cell => {
        let [row, col] = [...cell];
        let isAdjacent = [...adjacendToGuessed].some(item => {
            return item[0] === row && item[1] === col;
        });
        if (!isAdjacent) {
            availableCellsTwo.push(cell);
        };
    });

    // check if availableCellsTow still has items, else use the previous list
    let remainingCells = (availableCellsTwo.length > 0) ? availableCellsTwo : availableCellsOne;

    // get random guess from remaining available cells
    let guessToTry = remainingCells[Math.floor(Math.random() * remainingCells.length)];
    return ['p', guessToTry[0], guessToTry[1]];
}

// gets cells next to a hit, that haven't been guessed
function getPontentialGuessCells(row, col) {
    let adjacentCells = [null, null, null, null];

    // see if already guessed
    let adjacentGuesses = [0, 0, 0, 0];

    // get cell above
    if (row > 0) {
        adjacentCells[0] = [row - 1, col];
        adjacentGuesses[0] = computerGuesses[row - 1][col];
    }
    // get cell below
    if (row < 9) {
        adjacentCells[1] = [row + 1, col];
        adjacentGuesses[1] = computerGuesses[row + 1][col];
    }
    // get cell left
    if (col > 0) {
        adjacentCells[2] = [row, col - 1];
        adjacentGuesses[2] = computerGuesses[row][col - 1];
    }
    // get cell right
    if (col < 9) {
        adjacentCells[3] = [row, col + 1];
        adjacentGuesses[3] = computerGuesses[row][col + 1];
    };

    let cells = [];
    adjacentCells.forEach((cell, i) => {
        if (cell) {
            if (adjacentGuesses[i] === 0) {
                cells.push(cell);
            };
        };
    });

    return cells;
}

// updates computer's knowledge after hit
function updateKnowledge(ship, row, col) {
    let hits = computerKnowledge.unresolvedHits;
    let ships = playerShips.filter(item => item.isResolved === false);

    if (ship.isSunk) {
        // check if hits.length is same as ship.size
        let sunkShipLength = ship.size;
        ships.forEach(item => sunkShipLength += item.size);

        // if all hits are accounted for by sunk ships, resolve both hits and ships
        if (hits.length + 1 === sunkShipLength) {
            computerKnowledge.unresolvedHits = [];
            ship.isResolved = true;

            // ship is sunk, but there are more unresolved hits, than the ship's size
            // check if the hit has more than one adjacent hits
            // if not, ship can be resolved
            // can only make it to this point if there is at least hit on a floating ship
        } else if (hits.length + 1 > sunkShipLength) {
            // check if final hit is next to more than one hit first
            let hitCounter = {
                hit: 0,
                miss: 0
            };

            computerKnowledge.unresolvedHits.forEach(item => {

                // check how many unresolved hits around the hit
                if (row > 0) {
                    if (item[0] === row - 1 && item[1] === col) {
                        hitCounter.hit++;
                    } else {
                        hitCounter.miss++;
                    };
                }
                // check if hit below
                if (row < 9) {
                    if (item[0] === row + 1 && item[1] === col) {
                        hitCounter.hit++;
                    } else {
                        hitCounter.miss++;
                    };
                }
                // check if hit left
                if (col > 0) {
                    if (item[0] === row && item[1] === col - 1) {
                        hitCounter.hit++;
                    } else {
                        hitCounter.miss++;
                    };
                }
                // check if hit right
                if (col < 9) {
                    if (item[0] === row && item[1] === col + 1) {
                        hitCounter.hit++;
                    } else {
                        hitCounter.miss++;
                    };
                };
            });
            if (hitCounter.hit === 1) {

                // if so.. else, push and set resolved to false
                // remove ship's coords from unresolved
                let remainingUnresolvedHits = [];
                computerKnowledge.unresolvedHits.forEach(item => {
                    let check = true;
                    ship.coords.forEach(coord => {
                        if (item[0] === coord[0] && item[1] === coord[1]) {
                            check = false;
                        };
                    });
                    if (check) {
                        remainingUnresolvedHits.push(item);
                    };
                });
                computerKnowledge.unresolvedHits = remainingUnresolvedHits;

                // resolve ship
                ship.isResolved = true;

                //more than one hit around final hit means the exact position may not be able to be determined
            } else {
                hits.push([row, col]);
                ship.isResolved = false;
            }

        } else {
            // else add hit and ship to unresolved
            hits.push([row, col]);
            ship.isResolved = false;
        };

        // either way, add final hit to object
        ship.finalHit = [row, col];

    } else {
        hits.push([row, col]);
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


// takes coordinate of hit and handles all hit logic, no return
// (['p', 0, 0])
function handleHit(coords) {
    const [board, row, col] = [...coords];

    // update playerGuesses or computerGuesses
    const guesses = (board === 'p') ? computerGuesses : playerGuesses;
    guesses[row][col] = 1;

    // get ship that was hit
    const [ship, idx] = getShipAtCoord(coords);

    // update ship hit to true
    ship.hits[idx] = true;

    // render the hit
    renderCell(coords, 'hit');

    // check if ship now sunk
    ship.isSunk = ship.hits.every(hit => hit);

    // if player is hit, renderScoreboardHit(), and update computer knowledge
    if (board === 'p') {
        renderScoreboardHit(ship, idx);
        updateKnowledge(ship, row, col);
    };

    // if ship sinks, renderScoreboardSunk(), and checkWinner(), then set winner to 1, -1, or null
    if (ship.isSunk) {
        renderScoreboardSunk(ship, board);
        winner = checkWinner(board);
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
                return [ship, i];
            };
        };
    };
}

// takes coordinate of miss and handles all miss logic, no return
// (['p', 0, 0])
function handleMiss(coords) {
    const [board, row, col] = [...coords];
    const guesses = (board === 'p') ? computerGuesses : playerGuesses;

    // update playerGuesses or computerGuesses
    guesses[row][col] = -1;

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
            };
        };
        return -1;
    } else {
        for (ship of computerShips) {
            if (!ship.isSunk) {
                return null;
            };
        };
        return 1;
    };
}

/*--- Rendering Functions  ---*/

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
// (playerShips[0])
function unrenderScoreboardShip(ship) {
    for (let cell of ship.scoreboards) {
        cell.classList.remove(`p-${ship.name}`);
    };
}

// re-renders scoreboard ship on game start
// (playerShips[0])
function renderScoreboardShip(ship) {
    for (let cell of ship.scoreboards) {
        cell.classList.add(`p-${ship.name}`);
    };
}

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

// renders potential ship location on hover of ship placement
// (mouseover event)
function mouseoverPendingPlacement(evt) {
    if (evt.target.classList.contains('cell')) {
        // get target cell
        const coords = extractCoords(evt.target);
        const [_, row, col] = [...coords];
        hoverTarget = [row, col];

        // get pending cells
        const cells = [];
        const idx = row * 10 + col;
        const adder = (shipToBePlaced.isVertical) ? 10 : 1;

        // prevent out of index and visual wrapping
        for (let i = 0; i < shipToBePlaced.size; i++) {
            let newIdx = i * adder + idx;
            // checks to see if vertical ship is too close to bottom
            if (newIdx > 99) {
                continue;
            };

            // checks to see if horizontal ship is too close to edge
            if (!shipToBePlaced.isVertical && cells.length > 0) {
                if (newIdx > row * 10 + 9) {
                    continue;
                };
            };
            cells.push(playerCellEls[newIdx]);
        };

        // apply class to the cells
        cells.forEach(cell => cell.classList.add('pending'));
    };
}

// clears potential ship location when ship is placed
// (mouseout event)
function mouseoutPendingPlacement(evt) {
    if (evt.target.classList.contains('cell')) {
        playerCellEls.forEach(cell => cell.classList.remove('pending'));
    };
}

// toggles vertical and horizontal placement of new ship
// (keydown event)
function changeIsVertical(evt) {
    if (evt.key === ' ' && hoverTarget) {
        // toggle true/false
        shipToBePlaced.isVertical = !shipToBePlaced.isVertical;

        // remove pending
        playerCellEls.forEach(cell => cell.classList.remove('pending'));

        // reset pending with new direction
        let [row, col] = [...hoverTarget];
        // get pending cells
        const cells = [];
        const idx = row * 10 + col;
        const adder = (shipToBePlaced.isVertical) ? 10 : 1;

        // prevent out of index and visual wrapping
        for (let i = 0; i < shipToBePlaced.size; i++) {
            let newIdx = i * adder + idx;
            // checks to see if vertical ship is too close to bottom
            if (newIdx > 99) {
                continue;
            };

            // checks to see if horizontal ship is too close to edge
            if (!shipToBePlaced.isVertical && cells.length > 0) {
                if (newIdx > row * 10 + 9) {
                    continue;
                };
            };
            cells.push(playerCellEls[newIdx]);
        };

        // apply class to the cells
        cells.forEach(cell => cell.classList.add('pending'));
    };
}