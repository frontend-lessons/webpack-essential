const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = { 
    unknownContextRequest: '.',
    unknownContextRecursive: true,
    unknownContextCritical: true,
    exprContextRequest: '.',
    exprContextRecursive: true,
    exprContextCritical: true,
    wrappedContextRegExp: /.*/,
    wrappedContextRecursive: true,
    rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader,'css-loader'],
        },
        {
          test: /\.s(a|c)ss$/,
          use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader'],
        },
    ]
}