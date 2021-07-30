// 1: Select the elements with the following IDs
const modal = document.querySelector('#modal')
const openModalButton = document.querySelector('#open-modal-btn')
const closeModalButton = document.querySelector('#close-modal-btn')
const overlay = document.querySelector('#overlay')

// 2: Create a click event listener for the open-modal-btn that adds the class "open" to the modal, Also add the class "open" to the overlay
openModalButton.addEventListener('click', () => {
	modal.classList.add('open')
	overlay.classList.add('open')
})

// 3: Create a click event listener for the close-modal-btn that remove the class "open" to the modal, Also remove the class "close" from the overlay
closeModalButton.addEventListener('click', closeModal)

// 4: Add a click listener to the overlay that removes the class 'open fom the modal and the overlay
overlay.addEventListener('click', closeModal)

// Wrap the duplicate code into function
function closeModal() {
	modal.classList.remove('open')
	overlay.classList.remove('open')
}
