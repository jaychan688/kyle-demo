import './style.css'
// 1: Select all elements needed
const form = document.querySelector('#form')
const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const passwordComfirmInput = document.querySelector('#password-confirmation')
const termsInput = document.querySelector('#terms')
const errorsContainer = document.querySelector('.errors')
const errorList = document.querySelector('.errors-list')

// 2: Create an event listener for when the form is submitted and do the following inside of it.
form.addEventListener('submit', e => {
	// 2.1: Create an array to store all error messages and clear any old error messages
	const errMessage = []
	clearErrors()
	// 2.2: Define the following validation checks with appropriate error messages
	// 2.2.1. Ensure the username is at least 6 characters long
	if (usernameInput.value.length < 6) {
		errMessage.push('Username must be at least 6 characters')
	}
	// 2.2.2. Ensure the password is at least 10 characters long
	if (passwordInput.value.length < 10) {
		errMessage.push('Password must be at least 10 characters')
	}
	// 2.2.3. Ensure the password and confirmation password match
	if (passwordInput.value !== passwordComfirmInput.value) {
		errMessage.push('passwords must match')
	}
	// 2.2.4. Ensure the terms checkbox is checked
	if (!termsInput.checked) {
		errMessage.push('You must accept the terms')
	}
	// 2.3: If there are any errors then prevent the form from submitting and show the error messages
	if (errMessage.length > 0) {
		showErrors(errMessage)
		e.preventDefault()
	}
})

function clearErrors() {
	// Loop through all the children of the error-list element and remove them
	// IMPORTANT: This cannot be done with a forEach loop or a normal for loop since as you remove children it will modify the list you are looping over which will not work
	// I recommend using a while loop to accomplish this task
	// This is the trickiest part of this exercise so if you get stuck and are unable to progress you can also set the innerHTML property of the error-list to an empty string and that will also clear the children. I recommend trying to accomplish this with a while loop, though, for practice.
	// Also, make sure you remove the show class to the errors container
	while (errorList.children[0] != null) {
		errorList.removeChild(errorList.children[0])
	}
	errorsContainer.classList.remove('show')
	// The next line do the exact same thing
	// errorList.innerHTML = ''
}

function showErrors(errorMessages) {
	// Add each error to the error-list element
	// Make sure to use an li as the element for each error
	// Also, make sure you add the show class to the errors container
	errorMessages.forEach(errorMessage => {
		const li = document.createElement('li')
		li.innerText = errorMessage
		errorList.appendChild(li)
	})

	errorsContainer.classList.add('show')
}
