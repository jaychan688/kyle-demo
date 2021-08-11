// Logic
export const TITLE_STATUS = {
  HIDDEN: 'hidden',
  MINE: 'mine',
  NUMBER: 'number',
  MARKED: 'marked',
}

// 1.populate a board with tiles/miles
export function createBoard(boardSize, numberOfMines) {
  const board = []
  // get the random array location for mines
  const minePositions = getMinePositions(boardSize, numberOfMines)

  // x direction
  for (let x = 0; x < boardSize; x++) {
    const row = []
    // y direction
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement('div')
      // Default, status are hidden
      element.dataset.status = TITLE_STATUS.HIDDEN

      const tile = {
        element,
        x,
        y,
        // check the coordinate of tile position and mine position are match?
        // if matches, some() will return true
        mine: minePositions.some(positionMatch.bind(null, { x, y })),
        get status() {
          return this.element.dataset.status
        },
        set status(value) {
          this.element.dataset.status = value
        },
      }
      row.push(tile)
    }
    board.push(row)
  }

  return board
}

// Base numberOfMines, return the random mine location
function getMinePositions(boardSize, numberOfMines) {
  const positions = []

  while (positions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    }
    // check does position already exists, if not duplicate, push to array
    // if(!positions.some(positionMatch.bind(null, position)))
    if (!positions.some(p => positionMatch(p, position))) {
      positions.push(position)
    }
  }

  return positions
}

function positionMatch(positionA, positionB) {
  return positionA.x === positionB.x && positionA.y === positionB.y
}

function randomNumber(size) {
  // generate random number between 0 and size
  return Math.floor(Math.random() * size)
}

// Mark tiles
export function markTitle(tile) {
  // Means tile status are either reveal or number, escape
  if (
    tile.status !== TITLE_STATUS.HIDDEN &&
    tile.status !== TITLE_STATUS.MARKED
  ) {
    return
  }

  if (tile.status === TITLE_STATUS.MARKED) {
    tile.status = TITLE_STATUS.HIDDEN
  } else {
    tile.status = TITLE_STATUS.MARKED
  }
}

// Reveal tiles
export function revealTile(board, tile) {
  if (tile.status !== TITLE_STATUS.HIDDEN) {
    return
  }
  // check if tile is mine or not
  if (tile.mine) {
    tile.status = TITLE_STATUS.MINE
    return
  }

  tile.status = TITLE_STATUS.NUMBER
  const adjacentTiles = nearbyTiles(board, tile)
  const mines = adjacentTiles.filter(t => t.mine)

  if (mines.length === 0) {
    // recursive call the revealTiles
    adjacentTiles.forEach(revealTile.bind(null, board))
  } else {
    tile.element.textContent = mines.length
  }
}

function nearbyTiles(board, { x, y }) {
  const tiles = []

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      // optional chaining: if have x , then get the y
      const tile = board[x + xOffset]?.[y + yOffset]
      // check if have tile or not
      if (tile) tiles.push(tile)
    }
  }
  return tiles
}
// 4. check for win/lose
export function checkWin(board) {
  return board.every(row => {
    return row.every(tile => {
      return (
        tile.status === TITLE_STATUS.NUMBER ||
        (tile.mine &&
          (tile.status === TITLE_STATUS.HIDDEN ||
            tile.status === TITLE_STATUS.MARKED))
      )
    })
  })
}

export function checkLose(board) {
  return board.some(row => {
    return row.some(tile => {
      return tile.status === TITLE_STATUS.MINE
    })
  })
}
