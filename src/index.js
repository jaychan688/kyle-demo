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

const multiPages = ['shopping-cart', 'form-validation']

const pagesLinks = pages
	.map(
		page =>
			`<li><a class="list__item" target="_blank" href="${page}/index.html">${page}</a></li>`
	)
	.join('')

const multiPageLinks = multiPages
	.map(
		page =>
			`<li><a class="list__item" target="_blank" href="${page}/index.html">${page}</a></li>`
	)
	.join('')

document.querySelector('#root').insertAdjacentHTML(
	'beforeend',
	`<ul class="list list--green">${pagesLinks}</ul>
	<ul class="list list--pink">${multiPageLinks}</ul>`
)
