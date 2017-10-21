const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    module: {
        rules: [ {
            test: /\.html$/,
            use: {
                loader: "html-loader",
                options: {
                    minimize: false,
                    removeComments: false,
                    collapseWhitespace: false
                }
            }
        }]
    },
    devServer: {
        contentBase: './dist'
    }
});