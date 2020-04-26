const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const FILE_LOADER = {
  loader: "file-loader",
  options: {
    name: "[contenthash].[ext]",
    outputPath: "/css/img/",
  }
}

const URL_LOADER = {
  loader: "url-loader",
  options:{
    fallback: FILE_LOADER,
    limit: 32768  
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
    {
      test: /\.html/,
      loader: "html-loader"
    },
    {
      test: /\.s?[ac]ss$/,
      use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"],
    },
    {
      test: /\.(png|svg)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[contenthash].[ext]",
            outputPath: "/css/img/",
          }
        }
      ]
    },
  ]
}