// 1: Select all elements needed
const form = document.querySelector('#quiz-form')
const answers = Array.from(document.querySelectorAll('.answer'))
const questionItems = document.querySelectorAll('.question-item')
const alert = document.querySelector('#alert')

// 2: Create a submit event listener for the form that does the following.
form.addEventListener('submit', e => {
	// 2-1. Prevent the default behaviour
	e.preventDefault()

	// 2-6. BONUS: Make sure unanswered questions show up as incorrect. The easiest way to do this is to add the incorrect class and removing the correct class from all question items before checking the correct answers
	questionItems.forEach(questionItem => {
		questionItem.classList.add('incorrect')
		questionItem.classList.add('correct')
	})

	// 2-2. Get all selected answers (use the `checked` property on the input to determine if it is selected or not)
	const checkedAnswers = answers.filter(answer => answer.checked)
	// console.log(checkedAnswers)

	// 2-3. Loop through the selected answer to see if they are correct or not (Check the value of the answer to see if it is the string "true")
	checkedAnswers.forEach(answer => {
		const isCorrect = answer.value === 'true'
		// console.log(isCorrect)
		const questionItem = answer.closest('.question-item')

		// 2-4. For each correct answer add the class `correct` to the parent with the class `question-item` and remove the class `incorrect`.
		if (isCorrect) {
			questionItem.classList.add('correct')
			questionItem.classList.remove('incorrect')
		} else {
			// 2-5. For each incorrect answer add the class `incorrect` to the parent with the class `question-item` and remove the class `correct`.
			questionItem.classList.add('incorrect')
			questionItem.classList.remove('correct')
		}

		// 2-7. BONUS: If all answers are correct show the element with the id `alert` and hide it after one second (look into setTimeout) (use the class active to show the alert and remove the class to hide it)
		const allTrue = checkedAnswers.every(answer => answer.value === 'true')

		// check both array are same answer
		const allAnswered = checkedAnswers.length === questionItems.length
		if (allTrue && allAnswered) {
			alert.classList.add('active')
			setTimeout(() => alert.classList.remove('active'), 1000)
		}
	})
})
