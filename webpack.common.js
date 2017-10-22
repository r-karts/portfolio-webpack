const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/js/index.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader", exclude: /node_modules/,
            query: {
                presets: ["es2015"]
            }
        }, {
            test: /\.(png|jpg|gif)$/,
            use:
                [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
        }]
    },
    plugins:
        [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            })
        ],
    output:
        {
            filename: '[name].bundle.js',
            path:
                path.resolve(__dirname, 'dist')
        }
};
