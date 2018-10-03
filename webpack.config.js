const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  
  module: {
    rules: [ { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader', options: {
          presets: ['react']
        }}, 
    { test: /\.css$/, use: ['style-loader','css-loader'] }, 
    { test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' } ]
    
  }
};
