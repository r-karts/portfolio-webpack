const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV !== "production"
});

module.exports = {
    entry: ["./src/js/app.js"],
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }, {
            test: /\.js$/,
            loader: "babel-loader", exclude: /node_modules/,
            query: {
                presets: ["es2015"]
            }
        }]
    },
    plugins: [
        extractSass
    ]
};
