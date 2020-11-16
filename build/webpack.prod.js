const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const prefix = "./../";


const base = merge(common, {
	mode: "production",
	module: {
		rules: [{
			test: /\.module\.s(a|c)ss$/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						modules: true,
						sourceMap: false
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: false
					}
				}
			]
		},
		{
			test: /\.s(a|c)ss$/,
			exclude: /\.module.(s(a|c)ss)$/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						sourceMap: false,
						minimize: true
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: false,
						postcssOptions: {
							syntax: 'postcss-scss',
							plugins: [
								require('autoprefixer')
							]
						}
					},
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: false
					}
				}
			]
		},{
			test: /\.(ts|js)x?$/,
			include: [
				path.resolve(__dirname, prefix+"src")
			],
			use: [{
				loader: "babel-loader",
				options: {
					"presets": [
						["@babel/preset-env", {
							"targets": "> 0.25%, not dead"
						}],
						"@babel/preset-typescript",
						"@babel/preset-react",
						["minify", {
							"builtIns": false //temporary fix
						}]
					],
					"plugins": [
						"babel-plugin-transform-typescript-metadata",
						["@babel/plugin-proposal-decorators", {"legacy": true}],
						["@babel/proposal-class-properties", { "loose": true }],
						"@babel/proposal-object-rest-spread"
					],
					cacheDirectory: true,
				}
			}]
		}]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css'
		}),
		new webpack.DefinePlugin({
			"BUILD_TARGET": JSON.stringify("package"),
			"BUILD_MODE": JSON.stringify("production")
		})
	],

	optimization: {
		minimize: true,
		//noEmitOnErrors: true
	}
});

const es5 = merge(base, {
	target: "es5",
	output: {
		filename: "argueview.min.js",
		libraryTarget: 'commonjs'
	},
	"module": {
		"rules": [{
			test: /\.(ts|js)x?$/,
			loader: 'ts-loader',
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