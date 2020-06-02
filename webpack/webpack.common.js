const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const entrypoints = require('./entrypoints.js');

module.exports = {
  entry: entrypoints,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [ 'babel-loader', 'ts-loader']
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new HardSourceWebpackPlugin()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    symlinks: false,
  },
};
