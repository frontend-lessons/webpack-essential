const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = [
    new CleanWebpackPlugin(),
    new CopyPlugin(
    [
        {
          from:'./src/css',
          to:'css/[name].[hash].[ext]'
        }
    ]),
    new HtmlWebpackPlugin()
]