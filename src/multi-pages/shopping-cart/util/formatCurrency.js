// Internationalization API
const formatter = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'TWD',
})

export default function formatCurrency(amount) {
	return formatter.format(amount)
}
