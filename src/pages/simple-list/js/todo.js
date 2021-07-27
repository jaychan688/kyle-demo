// 1. select all elements
const form = document.querySelector('#new-item-form')
const list = document.querySelector('#todo-list')
const input = document.querySelector('#item-input')

// 2. when submit the form add a new element
form.addEventListener('submit', e => {
	e.preventDefault()

	// 2-1 create a new item
	const item = document.createElement('li')
	item.innerHTML = `<span>${input.value}</span>`
	item.classList.add('todo__list-item')

	// 2-2 add that item to the list
	list.appendChild(item)

	// 2-3 clear input and input focus
	input.value = ''
	input.focus()

	// 2-4 setup event listener to delete item when clicked
	item.addEventListener('click', () => {
		// Both are do the same thing, remove the item itself
		// item.remove()
		list.removeChild(item)
	})
})
