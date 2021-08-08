import './style.css'

const pages = [
	'simple-list',
	'advanced-todo-list',
	'modal',
	'midi-piano',
	'quiz',
	'collapse-expand',
	'collapsible-mosh',
	'date-picker',
]
const advancedPages = ['minesweeper', 'math-solver']
const multiPages = ['shopping-cart', 'form-validation']

function renderList(pages) {
	return pages
		.map(
			page =>
				`<li><a class="list__item" target="_blank" href="${page}/index.html">${page}</a></li>`
		)
		.join('')
}

const pagesLinks = renderList(pages)

const advancedPagesLink = renderList(advancedPages)

const multiPageLinks = renderList(multiPages)

document.querySelector('#root').insertAdjacentHTML(
	'beforeend',
	`<ul class="list list--bg-green">${pagesLinks}</ul>
	<ul class="list list--bg-amber">${advancedPagesLink}</ul>
	<ul class="list list--bg-pink">${multiPageLinks}</ul>`
)
