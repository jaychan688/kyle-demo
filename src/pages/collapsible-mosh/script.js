import './style.css'

const collapsibles = document.querySelectorAll('.collapsible')

collapsibles.forEach(item =>
	// item call the event listener, this refer to item
	item.addEventListener('click', function () {
		this.classList.toggle('collapsible--expanded')
	})
)
