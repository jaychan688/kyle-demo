import './index.css'

const components = [
	'simple-list',
	'advanced-todo-list',
	'modal',
	'midi-piano',
	'quiz',
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
