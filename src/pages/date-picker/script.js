import { format, getUnixTime, fromUnixTime, addMonths } from 'date-fns'
const datePickerButton = document.querySelector('.date-picker-button')
const datePicker = document.querySelector('.date-picker')
const datePickerHeaderText = document.querySelector('.current-month')
const previousMonthButton = document.querySelector('.prev-month-button')
const nextMonthBoutton = document.querySelector('.next-month-button')
import './style.css'

datePickerButton.addEventListener('click', () => {
	datePicker.classList.toggle('show')
	const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
	setupDatePicker(selectedDate)
})

function setDate(date) {
	datePickerButton.innerText = format(date, 'yyy年 M月 d日')
	datePickerButton.dataset.selectedDate = getUnixTime(date)
}

function setupDatePicker(selectedDate) {
	datePickerHeaderText.innerText = format(selectedDate, 'yyy年M月')
	setupMonthButtons(selectedDate)
}

function setupMonthButtons(selectedDate) {
	nextMonthBoutton.addEventListener(
		'click',
		() => {
			setupDatePicker(addMonths(selectedDate, 1))
		},
		{ once: true }
	)

	previousMonthButton.addEventListener(
		'click',
		() => {
			setupDatePicker(addMonths(selectedDate, 1))
		},
		{ once: true }
	)
}

setDate(new Date())
