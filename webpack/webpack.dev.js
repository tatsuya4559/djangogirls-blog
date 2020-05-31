const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    // developmentなのでdjangoの各アプリの下のstaticに配置する
    path: path.resolve(__dirname, '../blog/static/dist/js'),
    filename: '[name].js',
    pathinfo: false,
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
                localIdentName: '[path][name]__[local]',
              },
            },
          },
        ],
      },
    ],
  },
});
