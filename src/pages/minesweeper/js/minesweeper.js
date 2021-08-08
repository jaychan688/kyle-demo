// Logic
const TITLE_STATUS = {
	HIDDEN: 'hidden',
	MINE: 'mine',
	NUMBER: 'number',
	MARKED: 'marked',
}
// 1.populate a board with tiles/miles
export function createBoard(boardSize, numberOfMines) {
	const board = []

	for (let x = 0; x < boardSize; x++) {
		const row = []
		for (let y = 0; y < boardSize; y++) {
			const element = document.createElement('div')
			element.dataset.status = TITLE_STATUS.HIDDEN

			const tile = { element, x, y }
			row.push(tile)
		}
		board.push(row)
	}

	return board
}

// 2. left click on tiles
// 2.1 reveal tiles
// 3. right click on tiles
// 3.1 reveal tiles
// 4. check for win/lose
