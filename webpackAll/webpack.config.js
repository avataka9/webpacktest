const path = require('path');
const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpack = require('webpack');


function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split(".");
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            //inject: false
        });
    });
}

const htmlPlugins = generateHtmlPlugins("./src/html/views");


module.exports = {
    mode: 'development',
    /*entry: {
        app: './src/js/index.js',
    },*/
    entry: ["./src/js/index.js", "./src/scss/style.scss"],
    output: {
        filename: './js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            /*{
             test: /\.m?js$/,
             exclude: /(node_modules|bower_components)/,
             use: {
             loader: 'babel-loader',
             options: {
             presets: ['@babel/preset-env']
             }
             }
             },*/
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    //'style-loader',
                    {loader: 'css-loader', options: {importLoaders: 1}},
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
                            outputPath: '[folder]',
                        },
                    },
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
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
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, "src/html/includes"),
                use: ["raw-loader"]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
            //chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin([
            {
                from: "./src/fonts",
                to: "./fonts"
            },
            {
                from: "./src/favicon",
                to: "./favicon"
            },
            /*{
             from: "./src/img",
             to: "./img"
             },
             {
             from: "./src/uploads",
             to: "./uploads"
             }*/
        ]),
        /*new ImageminPlugin({
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
         }),*/
        /*new HtmlWebpackPlugin({
         title: 'title'
         }),*/
        /*new webpack.ProvidePlugin({
         '$':          'jquery',
         '_':          'lodash',
         'ReactDOM':   'react-dom',
         'cssModule':  'react-css-modules',
         'Promise':    'bluebird'
         }),*/
        //new webpack.HotModuleReplacementPlugin(),
    ].concat(htmlPlugins),
    //devtool: 'inline-source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                extractComments: true,
            }),
            new TerserPlugin({
                sourceMap: true,
                extractComments: true
            }),
        ]
    },
    devServer: {
        contentBase: '.dist',
        //hot: true
    },
};