const HtmlWebpackPlugin = require('html-webpack-plugin')

// ? 要全部都有entry，呈現出的網頁才不會變形
const shopCartEntries = {
	// key: 輸出 - dist/ 下資料夾/檔名
	// value: 來源 - js 檔當作進入點
	'shopping-cart/index': './src/multi-pages/shopping-cart/script',
	'shopping-cart/store': './src/multi-pages/shopping-cart/script',
	'shopping-cart/team': './src/multi-pages/shopping-cart/script',
}

const shopCartPlugins = [
	new HtmlWebpackPlugin({
		filename: 'shopping-cart/index.html',
		template: './src/multi-pages/shopping-cart/index.html',
		inject: true,
		// 單純搬移html,不需要注入js檔, 保持chunks為空陣列
		// 若沒有chunks，webpack會自動注入其他檔案的 js 及 css
		chunks: ['shopping-cart/index'],
	}),
	new HtmlWebpackPlugin({
		filename: 'shopping-cart/store.html',
		template: './src/multi-pages/shopping-cart/store.html',
		inject: true,
		// match entry key, 才能將 js檔自動注入html中
		chunks: ['shopping-cart/store'],
	}),
	new HtmlWebpackPlugin({
		filename: 'shopping-cart/team.html',
		template: './src/multi-pages/shopping-cart/team.html',
		inject: true,
		chunks: ['shopping-cart/team'],
	}),
]

module.exports = {
	shopCartEntries,
	shopCartPlugins,
}
