import './style.css'

const collapsible = document.querySelectorAll('.collapsible')

collapsible.forEach(item =>
  // item call the event listener, this refer to item
  item.addEventListener('click', function () {
    this.classList.toggle('collapsible--expanded')
  })
)
