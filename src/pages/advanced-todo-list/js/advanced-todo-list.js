const form = document.querySelector('#new-todo-form')
const todoInput = document.querySelector('#todo-input')
const list = document.querySelector('#list')
const template = document.querySelector('#list-item-template')
// When working with storage, create a global variable save prefix
const LOCAL_STORAGE_PREFIX = 'ADVANCED_TODO_LIST'
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
// when page load, after get todo data then render todo to the page
let todos = loadTodos()
todos.forEach(renderTodo)

// Event Delegation
list.addEventListener('change', e => {
	// check if not match the target, return early, looks cleaner
	if (!e.target.matches('[data-list-item-checkbox]')) return

	// get the todo that is clicked on
	const parent = e.target.closest('.list-item')
	const todoId = parent.dataset.todoId
	const todo = todos.find(todo => todo.id === todoId)
	// toggle the complete property to be equal to the checkbox value
	todo.complete = e.target.checked
	// save updated todo
	saveTodos()
})

// ~4: Delete Todos
list.addEventListener('click', e => {
	if (!e.target.matches('[data-button-delete]')) return

	// get the todo that is clicked on
	const parent = e.target.closest('.list-item')
	const todoId = parent.dataset.todoId
	// remove the todo from screen
	parent.remove()
	// remove the todo from the list
	// todo.id not equal to todoId, return true, save it
	todos = todos.filter(todo => todo.id !== todoId)
	// save updated todo
	saveTodos()
})

// ~1: Add Todos
// User will type in todo and click add todo button,
form.addEventListener('submit', e => {
	e.preventDefault()

	const todoName = todoInput.value
	// edge cases: bugs that are uncommon for users to encounter.
	if (todoName === '') return

	// track todo status, complete or not
	const newTodo = {
		name: todoName,
		complete: false,
		// string of million second since certain day in the past
		id: new Date().valueOf().toString(),
	}

	todos.push(newTodo)
	renderTodo(newTodo)
	saveTodos()
	// clear input box
	todoInput.value = ''
})

// This should then add the todo to the list
function renderTodo(todo) {
	const templateClone = template.content.cloneNode(true)
	// save id to the .list-item dataset
	const listItem = templateClone.querySelector('.list-item')
	listItem.dataset.todoId = todo.id

	const textElement = templateClone.querySelector('[data-list-item-text]')
	textElement.innerText = todo.name

	const checkbox = templateClone.querySelector('[data-list-item-checkbox]')
	checkbox.checked = todo.complete

	list.appendChild(templateClone)
}

// ~2: Save Todos
function saveTodos() {
	// localStorage only save string
	localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

// ~3: Load Todos
function loadTodos() {
	const todoString = localStorage.getItem(TODOS_STORAGE_KEY)
	// Page load, either load data from storage or give a empty array(first time)
	return JSON.parse(todoString) || []
}
