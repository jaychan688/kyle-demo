const HtmlWebpackPlugin = require('html-webpack-plugin')

const mapEntries = { 'shopping-cart/index': './src/shopping-cart/index' }

const mapPlugins = [
	new HtmlWebpackPlugin({
		filename: 'shopping-cart/index.html',
		template: './src/shopping-cart/index.html',
		inject: true,
		chunks: ['shopping-cart/index'],
	}),
	new HtmlWebpackPlugin({
		filename: 'shopping-cart/store.html',
		template: './src/shopping-cart/store.html',
		inject: true,
	}),
	new HtmlWebpackPlugin({
		filename: 'shopping-cart/team.html',
		template: './src/shopping-cart/team.html',
		inject: true,
	}),
]

module.exports = {
	mapEntries,
	mapPlugins,
}
