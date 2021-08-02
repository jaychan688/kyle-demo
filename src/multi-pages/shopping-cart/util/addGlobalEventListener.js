export default function addGLobalEventListener(type, selector, callback) {
	document.addEventListener(type, e => {
		if (e.target.matches(selector)) {
			callback(e)
		}
	})
}
