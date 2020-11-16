const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const prefix = "./../";


const base = merge(common, {
	mode: "development",
	module: {
		rules: [{
			test: /\.module\.s(a|c)ss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						modules: true,
						/*localIdentName: '[name]__[local]___[hash:base64:5]',
						camelCase: true,*/
						sourceMap: true
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}
			]
		},{
			test: /\.s(a|c)ss$/,
			exclude: /\.module.(s(a|c)ss)$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						minimize: false
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
						postcssOptions: {
							syntax: 'postcss-scss',
							plugins: [
								require('autoprefixer')
							]
						}
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}
			]
		}]
	},

	plugins: [
		new webpack.DefinePlugin({
			"BUILD_TARGET": JSON.stringify("package"),
			"BUILD_MODE": JSON.stringify("development")
		})
	]
});

const es5 = merge(base, {
	target: "es5",
	output: {
		filename: "argueview.js",
		libraryTarget: 'commonjs'
	},
	"module": {
		"rules": [{
			test: /\.(ts|js)x?$/,
			loader: "ts-loader",
			options: {
				configFile: 'tsconfig.json'
			},
			include: [
				path.resolve(__dirname, prefix+"src")
			]
		}]
	}
});


module.exports = [es5];