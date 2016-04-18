// var BrowserConsoleBuildErrorPlugin = require('browser-console-build-error-webpack-plugin');
 
module.exports = {
    entry: "./src/Jaspi.js",
    output: {
        path: __dirname,
        filename: "./dist/js/script.js",
    },
    devtool: 'source-map',
    module: {
      loaders: [
        { test: "\.html$", loader: "html" },
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        { test: /\.json$/, loader: "json-loader"}
      ]
    },
    node: {
      fs: "empty",
      child_process: "empty",
    },
    "target": "atom",
    resolveLoader: {
      root: 'test'
    },
    plugins: [
        // new BrowserConsoleBuildErrorPlugin()
    ]
};