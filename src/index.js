import './index.css'

const components = [
	'simple-list',
	'advanced-todo-list',
	'modal',
	'midi-piano',
	'quiz',
	'collapse-expand',
	'collapsible-mosh',
	'shopping-cart',
	'date-picker',
]

const componentsLinks = components
	.map(
		components =>
			`<li><a class="list__item" target="_blank" href="${components}/index.html">${components}</a></li>`
	)
	.join('')

document
	.querySelector('#root')
	.insertAdjacentHTML(
		'beforeend',
		`<ul class="list list--green">${componentsLinks}</ul>`
	)
