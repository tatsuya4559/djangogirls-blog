const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    // developmentなのでdjangoの各アプリの下のstaticに配置する
    path: path.resolve(__dirname, '../src/blog/static/dist'),
    filename: 'js/[name].bundle.js',
    pathinfo: false,
  },
});
