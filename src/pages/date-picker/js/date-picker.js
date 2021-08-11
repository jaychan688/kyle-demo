import {
  format,
  getUnixTime,
  fromUnixTime,
  addMonths,
  subMonths,
  endOfWeek,
  endOfMonth,
  startOfWeek,
  startOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns'
const datePickerButton = document.querySelector('.date-picker-button')
const datePicker = document.querySelector('.date-picker')
const datePickerHeaderText = document.querySelector('.current-month')
const previousMonthButton = document.querySelector('.prev-month-button')
const nextMonthButton = document.querySelector('.next-month-button')
const dateGrid = document.querySelector('.date-picker__grid-dates')
let currentDate = new Date()

datePickerButton.addEventListener('click', () => {
  datePicker.classList.toggle('show')

  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  // after click pre and next button to navigate month.
  // click the datePickButton and restore datePickerHeaderText to now
  currentDate = selectedDate
  setupDatePicker(selectedDate)
})

setDate(new Date())

function setDate(date) {
  datePickerButton.innerText = format(date, 'yyy年 M月 d日')
  // Set  the seconds timestamp on Button data attributes
  datePickerButton.dataset.selectedDate = getUnixTime(date)
}

function setupDatePicker(selectedDate) {
  datePickerHeaderText.innerText = format(currentDate, 'yyy年M月')
  setupDates(selectedDate)
}

function setupDates(selectedDate) {
  const firstWeekStart = startOfWeek(startOfMonth(currentDate))
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate))
  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd })
  dateGrid.innerHTML = ''

  dates.forEach(date => {
    const dateElement = document.createElement('button')
    dateElement.classList.add('date')
    dateElement.innerText = date.getDate()

    if (!isSameMonth(date, currentDate)) {
      dateElement.classList.add('date-picker-other-month-date')
    }

    if (isSameDay(date, selectedDate)) {
      dateElement.classList.add('selected')
    }

    dateElement.addEventListener('click', () => {
      setDate(date)
      datePicker.classList.remove('show')
    })

    dateGrid.appendChild(dateElement)
  })
}

nextMonthButton.addEventListener('click', () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  // Update currentDate(global variable), and call setupDatePicker()
  currentDate = addMonths(currentDate, 1)
  // global variable can be accessed inside function
  setupDatePicker(selectedDate)
})

previousMonthButton.addEventListener('click', () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = subMonths(currentDate, 1)
  setupDatePicker(selectedDate)
})
