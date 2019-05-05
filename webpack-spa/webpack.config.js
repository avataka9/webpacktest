const path = require('path');
const fs = require("fs");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MinifyPlugin = require("babel-minify-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const webpack = require('webpack');


module.exports = function (env, argv) {
	const isDev = argv.mode === 'development';
	return {
		entry: {
			app: './src/js/index.js',
		}
		,
		output: {
			filename: './js/[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/'
		}
		,
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						'babel-loader'
					]
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: [
						MiniCssExtractPlugin.loader,
						{loader: 'css-loader', options: {importLoaders: 1, sourceMap: true}},
						'postcss-loader'
					]
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: './img'
							}
						}
					]
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: './fonts'
							}
						}
					]
				},
				{
					test: /\.(csv|tsv)$/,
					use: [
						'csv-loader'
					]
				},
				{
					test: /\.xml$/,
					use: [
						'xml-loader'
					]
				}
			]
		}
		,
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
			}),
			new ImageminPlugin({
				disable: isDev,
				test: /\.(jpe?g|png|gif|svg)$/i,
				optipng: {
					optimizationLevel: 2
				},
				gifsicle: {
					optimizationLevel: 1
				},
				jpegtran: {
					progressive: true
				},
				//svgo: {},
			}),
			new FaviconsWebpackPlugin({
				logo: './src/favicon/favicon.png',
				prefix: 'favicons/',
			}),
			new HtmlWebpackPlugin({
				title: 'title',
			}),
			new CleanWebpackPlugin(),
			//new webpack.HotModuleReplacementPlugin(),
		],
		devtool: isDev ? 'source-map' : false,
		devServer: {
			contentBase: '.dist'
			//hot: true
		}
	}
};