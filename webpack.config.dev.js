const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
    return {
        devServer: {
            contentBase: path.join(__dirname, 'src'),
            compress: true,
            host: 'localhost',
            open: env.open,
            port: 8080,
            watchContentBase: true,
            watchOptions: {
                ignored: /node_modules/
            }
        },
        entry: {
            index: './src/js/index.js'
        },
        output: {
            filename: 'js/[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader'
            }]
        },
        plugins: [
            new CleanWebpackPlugin([
                './dist'
            ]),
            new HtmlWebpackPlugin({

                template: './src/index.html'
            })
        ]
    }
};