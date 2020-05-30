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
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // これのおかげで、importに拡張子を書かなくてすむ
  },
};
