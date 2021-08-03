const HtmlWebpackPlugin = require('html-webpack-plugin')

// ? 要全部都有entry，呈現出的網頁才不會變形
const formValidationEntries = {
	// key: 輸出 - dist/ 下資料夾/檔名 : value: 來源 - js 檔當作進入點
	'form-validation/index': './src/multi-pages/form-validation/script',
}

const formValidationPlugins = [
	new HtmlWebpackPlugin({
		filename: 'form-validation/index.html',
		template: './src/multi-pages/form-validation/index.html',
		inject: true,
		chunks: ['form-validation/index'],
	}),
	new HtmlWebpackPlugin({
		filename: 'form-validation/thank-you.html',
		template: './src/multi-pages/form-validation/thank-you.html',
		inject: true,
		// 單純搬移html,不需要注入js檔, 保持chunks為空陣列, 不需設 entry
		// 若沒有chunks，webpack會自動注入其他檔案的 js 及 css
		chunks: [''],
	}),
]

module.exports = {
	formValidationEntries,
	formValidationPlugins,
}
