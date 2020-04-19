const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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