const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry: {
        "moon-sugar": "./index.js",
        "moon-sugar.min": "./index.js",
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        library: 'moonSugar',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                plugins: [
                    "transform-object-rest-spread",
                    "add-module-exports"
                ]
            }
        }]
    },
    plugins: [
        new UglifyJsPlugin({
            include: /\.min/
        })
    ]
};

const compiler = webpack(config);

compiler.run(function (err, stats) {});
