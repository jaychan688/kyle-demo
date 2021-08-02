import items from './items.json'
import { addToCart } from './shoppingCart'
import addGLobalEventListener from './util/addGlobalEventListener'
import formatCurrency from './util/formatCurrency'

const storeItemTemplate = document.querySelector('#store-item-template')
const storeItemContainer = document.querySelector('[data-store-container]')
const IMAGE_URL = 'https://fakeimg.pl/420x260/'

export function setupStore() {
	if (storeItemContainer == null) return

	// handle click event for adding
	addGLobalEventListener('click', '[data-add-to-cart-button]', e => {
		const id = e.target.closest('[data-store-item]').dataset.itemId
		addToCart(parseInt(id))
	})

	// Populate data(item.json) into html
	items.forEach(renderStoreItem)
}

function renderStoreItem(item) {
	const storeItem = storeItemTemplate.content.cloneNode(true)

	const container = storeItem.querySelector('[data-store-item]')
	// Put the id of the item in container, link between the data and the html.
	container.dataset.itemId = item.id

	const name = storeItem.querySelector('[data-name]')
	name.innerText = item.name

	const category = storeItem.querySelector('[data-category]')
	category.innerText = item.category

	const image = storeItem.querySelector('[data-image]')
	image.src = `${IMAGE_URL}/${item.imageColor}`

	const price = storeItem.querySelector('[data-price]')

	price.innerText = formatCurrency(item.priceCents / 100)

	storeItemContainer.appendChild(storeItem)
}
