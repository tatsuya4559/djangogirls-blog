const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const entrypoints = require('./entrypoints.js');

module.exports = {
  entry: entrypoints,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      // {
      //   test: /^(?!.*module).*\.css$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader'],
      // },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HardSourceWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css',
      chunkFilename: 'css/[id].css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    symlinks: false,
  },
};
