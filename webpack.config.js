'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/index.jsx',
    output: {
        devtoolLineToLine: true,
        // sourceMapFilename: "./js/app.js.map",
        pathinfo: true,
        path: __dirname,
        // publicPath: 'http://localhost:8080/source',
        filename: './dist/js/main.js'
    },
    module: {
        loaders: [
            { 
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer-loader?browsers=last 10 versions!sass-loader!postcss-loader')
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)+/,
                loader: 'file-loader?name=../fonts/[name].[ext]'
            },
            {
                test: /\.(jpg|png|svg)$/,
                loaders: [
                    'file-loader?name=dist/images/[name].[ext]'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('dist/css/[name].css', {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }),
        new webpack.DefinePlugin({
          "process.env": { 
             NODE_ENV: JSON.stringify("development") 
           }
        })
    ]
};
