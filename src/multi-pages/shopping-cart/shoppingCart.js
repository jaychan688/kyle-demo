import items from './items.json'
import addGLobalEventListener from './util/addGlobalEventListener'
import formatCurrency from './util/formatCurrency'

const cartIteTemplate = document.querySelector('#cart-item-template')
const cartButton = document.querySelector('[data-cart-button]')
const cartItemsWrapper = document.querySelector('[data-cart-items-wrapper]')
const cartItemContainer = document.querySelector('[data-cart-items]')
const cartItemAmount = document.querySelector('[data-cart-item-amount]')
const cartTotal = document.querySelector('[data-cart-total]')
const cart = document.querySelector('[data-cart]')

const SESSION_STORAGE_KEY = 'SHOPPING_CART-cart'
const IMAGE_URL = 'https://fakeimg.pl/210x130/'
let shoppingCart = loadCart()

export function setupShoppingCart() {
	addGLobalEventListener('click', '[data-remove-from-cart-button]', e => {
		const id = e.target.closest('[data-item]').dataset.itemId
		removeFromCart(parseInt(id))
	})

	renderCart()
}

// 1. Show/Hide the card when clicked
cartButton.addEventListener('click', () => {
	cartItemsWrapper.classList.toggle('invisible')
})

// 2. Add items to cart
// 2.1 handle click event for adding (store - setupStore())
export function addToCart(id) {
	// 2.2 Handle multiple of the same item in the cart
	const existingItem = shoppingCart.find(entry => entry.id === id)

	if (existingItem) {
		existingItem.quantity++
	} else {
		shoppingCart.push({ id, quantity: 1 })
	}
	renderCart()
	saveCart()
}

function removeFromCart(id) {
	// 2.4 Remove items from cart
	const existingItem = shoppingCart.find(entry => entry.id === id)

	if (existingItem === null) return
	shoppingCart = shoppingCart.filter(entry => entry.id !== id)
	renderCart()
	saveCart()
}

function renderCart() {
	// 2.3 SHow/Hide the cart button when it has no items
	// or when it goes from 0 to 1 item
	if (shoppingCart.length === 0) {
		hideCart()
	} else {
		showCart()
		renderCartItems()
	}
}

function showCart() {
	cart.classList.remove('invisible')
}

function hideCart() {
	cart.classList.add('invisible')
	cartItemsWrapper.classList.add('invisible')
}

function renderCartItems() {
	// little red circle - show the number of items
	cartItemAmount.innerText = shoppingCart.length

	// 2.3 Calculate an accurate total
	const totalCents = shoppingCart.reduce((sum, entry) => {
		const item = items.find(i => entry.id === i.id)
		return sum + item.priceCents * entry.quantity
	}, 0)

	cartTotal.innerText = formatCurrency(totalCents)

	// ! clear out the cart, if there have any thing in it.
	// ! prevent little flicker, move it before shoppingCart looping
	cartItemContainer.innerHTML = ''

	shoppingCart.forEach(entry => {
		const item = items.find(i => entry.id === i.id)

		const cartItem = cartIteTemplate.content.cloneNode(true)

		const container = cartItem.querySelector('[data-item]')
		// Put the id of the item in container, link between the data and the html.
		container.dataset.itemId = item.id

		const name = cartItem.querySelector('[data-name]')
		name.innerText = item.name

		const image = cartItem.querySelector('[data-image]')
		image.src = `${IMAGE_URL}/${item.imageColor}`
		// at least 2 items, show quantity
		if (entry.quantity > 1) {
			const quantity = cartItem.querySelector('[data-quantity]')
			quantity.innerText = `x${entry.quantity}`
		}

		const price = cartItem.querySelector('[data-price]')
		price.innerText = formatCurrency((item.priceCents * entry.quantity) / 100)

		cartItemContainer.appendChild(cartItem)
	})
}

function saveCart() {
	// 2.5 Persist across mutlipage
	sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart))
}

function loadCart() {
	const cart = sessionStorage.getItem(SESSION_STORAGE_KEY)
	return JSON.parse(cart) || []
}
