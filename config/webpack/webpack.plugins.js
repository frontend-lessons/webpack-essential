const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
    new CopyPlugin(
    [
        {
          from:'./src/css',
          to:'css/[name].[hash].[ext]'
        }
    ])
]