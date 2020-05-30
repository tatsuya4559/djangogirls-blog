const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    // prodはPJ直下のstaticに配置する
    path: path.resolve(__dirname, "static/dist/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.module\.css$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64]' ,
              },
            },
          },
        ],
      },
    ],
  },
});
