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
}