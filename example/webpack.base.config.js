const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {AssetAttributesPlugin} = require('..')

const assetAttributesPlugin = new AssetAttributesPlugin({
	scriptAttribs: {onload: 'console.log("JS Asset loaded", this)', defer: true},
	styleAttribs: {onload: 'console.log("CSS Asset loaded", this)', disabled: true},
})

module.exports = {
	entry: {
		example: path.join(__dirname, 'src', 'example.js'),
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
	},
	target: 'web',
	plugins: [new HTMLPlugin(), new MiniCssExtractPlugin({filename: '[name].css'}), assetAttributesPlugin],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
}
