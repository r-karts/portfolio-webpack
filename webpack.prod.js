const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const common = require('./webpack.common.js');


module.exports = merge(common, {
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.html$/,
            use: {
                loader: "html-loader",
                options: {
                    minimize: true,
                    removeComments: true,
                    collapseWhitespace: true
                }
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new ImageminPlugin({
            jpegtran: {
                progressive: true
            },
            optipng: {
                optimizationLevel: 6
            },
            gifscale: {
                optimizationLevel: 3
            }
        })
    ]
});
