import './style.css'
// Display UI
import {
	TITLE_STATUS,
	createBoard,
	markTitle,
	revealTile,
	checkWin,
	checkLose,
} from './js/minesweeper'

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 2

// 1.populate a board with tiles/miles
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.subtext')

// seting up board
board.forEach(row => {
	row.forEach(tile => {
		boardElement.append(tile.element)

		// 2. left click on tiles
		tile.element.addEventListener('click', e => {
			// 2.1 reveal tiles
			revealTile(board, tile)
			// every time, after call revealTile(), check game end or not
			checkGameEnd()
		})

		// 3. right click on tiles
		tile.element.addEventListener('contextmenu', e => {
			// 3.1 mark tiles
			markTitle(tile)
			listMinesLeft()
			e.preventDefault()
		})
	})
})

// BOARD_SIZE x BOARD_SIZE gird
boardElement.style.setProperty('--size', BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES

function listMinesLeft() {
	const markedTilesCount = board.reduce((count, row) => {
		return (
			count + row.filter(tile => tile.status === TITLE_STATUS.MARKED).length
		)
	}, 0)

	// minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
	minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
}

// 4. check for win/lose
function checkGameEnd() {
	const win = checkWin(board)
	const lose = checkLose(board)
	// either win or lose, stop click tile
	if (win || lose) {
		// catch click event in capture phrase, before bubble phrase, stop propagation
		boardElement.addEventListener('click', stopProp, { capture: true })
		boardElement.addEventListener('contextmenu', stopProp, { capture: true })
	}
	if (win) {
		messageText.textContent = '你贏了!'
	}
	if (lose) {
		messageText.textContent = '你輸了!'
		board.forEach(row => {
			row.forEach(tile => {
				if (tile.status === TITLE_STATUS.MARKED) markTitle(tile)
				if (tile.mine) revealTile(board, tile)
			})
		})
	}
}

function stopProp(e) {
	// stop event going futher down
	e.stopImmediatePropagation()
}
