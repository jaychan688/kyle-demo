const path = require('path')
// Extracts CSS into separate files.
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { entries, plugins } = require('./hwp-config')

const isProduction = process.env.NODE_ENV || false
const devtool = isProduction ? false : 'source-map'
const mode = isProduction || 'development'

/*********** COMMON  ************/
const cssConfig = {
	test: /\.css$/i,
	use: ['css-loader', 'postcss-loader'],
}

const config = {
	entry: entries,
	plugins,
	mode,

	devtool,
	module: {
		rules: [
			cssConfig,
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: ['babel-loader'],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
		],
	},

	resolve: {
		// 省略副檔名
		extensions: ['.js', '.jsx'],
	},
}

/*********** DEVELOPMENT  ************/
if (!isProduction) {
	// dev模式用 style-loader，這樣在看 source-map 時才能找到正確的原始黨位置
	cssConfig.use.unshift('style-loader')

	config.output = {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[chunkhash].js',
	}

	config.devServer = {
		watchFiles: ['./src/**/*.html'],
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		hot: true,
		port: 3000,
		historyApiFallback: true,
		host: '0.0.0.0',
	}
	config.devtool = 'source-map'
}

/*********** PRODUCTION  ************/
if (isProduction) {
	cssConfig.use.unshift(MiniCssExtractPlugin.loader)

	config.output = {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[chunkhash].js',
	}

	config.optimization = {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\/]node_modules[\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	}

	config.plugins.push(
		new MiniCssExtractPlugin({ filename: '[name].[chunkhash].css' })
	)
}

module.exports = config
