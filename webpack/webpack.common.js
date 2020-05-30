const merge = require('webpack-merge');
const entry = require('./webpack.entrypoint.js')

module.exports = merge(entry, {
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
});
