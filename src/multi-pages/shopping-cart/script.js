import { setupShoppingCart } from './shoppingCart'
import { setupStore } from './store'

setupStore()
setupShoppingCart()

if (module.hot) {
	module.hot.accept()
}
