var BrowserConsoleBuildErrorPlugin = require('browser-console-build-error-webpack-plugin');
 
module.exports = {
    entry: "./front/src/js/app.js",
    output: {
        path: __dirname,
        filename: "./front/assets/js/script.js",
    },
    devtool: 'source-map',
    module: {
      noParse: [
        /XModule[\\\/]angular-moment\.js$/	
      ],
      loaders: [
        { test: "\.html$", loader: "html" },
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
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
        new BrowserConsoleBuildErrorPlugin()
    ]
};