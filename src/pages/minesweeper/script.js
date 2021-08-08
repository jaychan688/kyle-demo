import './style.css'
// Display UI
import { createBoard } from './js/minesweeper'

const BOARD_SIZE = 2
const NUMBER_OF_MINES = 2
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
console.log(board)

const boardElement = document.querySelector('.board')
boardElement.style.setProperty('--size', BOARD_SIZE)

board.forEach(row => {
	row.forEach(tile => {
		boardElement.append(tile.element)
	})
})
// 1.populate a board with tiles/miles
// 2. left click on tiles
// 2.1 reveal tiles
// 3. right click on tiles
// 3.1 reveal tiles
// 4. check for win/lose
