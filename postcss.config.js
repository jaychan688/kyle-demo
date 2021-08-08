// postcss 執行順序應該是由上往下
const postcssConfig = {
	plugins: [
		require('postcss-import'),
		require('postcss-simple-vars')({
			variables: require('./src/css/_base/variables.json'),
		}),
		require('postcss-color-function'),
		require('postcss-hexrgba'),
		require('postcss-mixins'),
		require('postcss-nested'),
		require('postcss-preset-env')({
			browsers: 'last 2 versions',
			stage: 3,
			features: {
				'nesting-rules': true,
			},
		}),
	],
}

if (process.env.NODE_ENV === 'production')
	postcssConfig.plugins.push(require('cssnano'))

module.exports = postcssConfig
