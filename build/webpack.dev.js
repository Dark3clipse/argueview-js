const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const prefix = "./../";


const base = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
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
	target: "web",
	output: {
		filename: "argueview.js"
	},
	"module": {
		"rules": [{
			test: /\.(ts|js)x?$/,
			include: [
				path.resolve(__dirname, prefix+"src")
			],
			loader: "ts-loader"
		}]
	}
});

const es6 = merge(base, {
	target: "es6",
	output: {
		filename: "argueview.mjs"
	},
	"module": {
		"rules": [{
			test: /\.(ts|js)x?$/,
			include: [
				path.resolve(__dirname, prefix+"src")
			],
			use: [{
				loader: "babel-loader",
				options: {
					"presets": [
						["@babel/preset-env", {
							"targets": {
								"esmodules": true
							}
						}],
						"@babel/preset-typescript",
						"@babel/preset-react"
					],
					"plugins": [
						["@babel/plugin-proposal-decorators", {"legacy": true}],
						["@babel/proposal-class-properties", { "loose": true }],
						["@babel/plugin-transform-classes", { "loose": false }],
						"@babel/proposal-object-rest-spread"
					],
					cacheDirectory: true
				}
			}]
		}]
	}
});


module.exports = [es5, es6];