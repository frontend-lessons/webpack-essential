const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const getIncrementalFileName = function(targetPath,absolutePath){
    getIncrementalFileName.offset++
    let extension = path.extname(targetPath)
    let target_dir = path.dirname(targetPath)
    return path.join(target_dir,getIncrementalFileName.offset.toString()+extension)
}
getIncrementalFileName.offset = 0;

module.exports = [
    new CleanWebpackPlugin(),
    /* new CopyPlugin([
        {
            transformPath: getIncrementalFileName,
            from:'./src/css/img',
            to:'css/img',
            toType:'dir'
        }
    ]), */   
    new MiniCssExtractPlugin({
        filename: 'css/style.[hash].css'
    }), 
    new HtmlWebpackPlugin({
        template: 'src/templates/index.html',
        inject: true,
        minify: false
    }),
    new HtmlWebpackPlugin({
        template: "src/templates/sitemap.html",
        filename: "sitemap.html",
        inject: true,
        minify: false
    }),
]