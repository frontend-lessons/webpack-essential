const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const FILE_LOADER = {
  loader: "file-loader",
  options: {
    name: "[contenthash].[ext]",
    outputPath: "/css/img/",
    esModule: false
  }
}

const URL_LOADER = {
  loader: "url-loader",
  options:{
    fallback: FILE_LOADER,
    limit: 32768  
  }
}

const SVG_URL_LOADER = {
  loader: "svg-url-loader",
  options: {
    stripdeclarations:true,
    limit: 32768,
    ...FILE_LOADER.options
  }
}

const SVG_INLINE_LOADER = {
  loader: "svg-inline-loader",
  options: {
    removeSVGTagAttrs: false,
  }
}

const SVG_LOADER = {
  loader: path.resolve(__dirname,'loaders/svg-loader.js'),
  options: {    
    limit: 3277,
    loader: SVG_INLINE_LOADER,
    fallback:FILE_LOADER,    
  }
}

module.exports = { 
  unknownContextRequest: ".",
  unknownContextRecursive: true,
  unknownContextCritical: true,
  exprContextRequest: ".",
  exprContextRecursive: true,
  exprContextCritical: true,
  wrappedContextRegExp: /.*/,
  wrappedContextRecursive: true,
  rules: [
    /*{
      test: /\.html/,      
      loader: "html-loader",
      options: {
        minimize: {
          removeAttributeQuotes: false
        }
      }
    },*/
    {
      test: /\.s?[ac]ss$/,
      use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"],
    },
    {
      test: /\.(png|svg)$/,
      oneOf: [
        { test:/\.png$/,
          issuer:/index\.js$/,          
          ...URL_LOADER
        },
        { test: /\.svg/,
          issuer:/.*\.html$/,           
          ...SVG_LOADER
        },        
        FILE_LOADER,
      ]
    },
  ]
}



