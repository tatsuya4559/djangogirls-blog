const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const merge = require('webpack-merge');
const entrypoints = require('./entrypoints.js');

module.exports = {
  entry: entrypoints,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        exclude: /node_modules/,
        // include: path.resolve(__dirname, '../assets'),
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new HardSourceWebpackPlugin()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    symlinks: false,
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
};
