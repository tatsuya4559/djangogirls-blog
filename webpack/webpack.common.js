const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
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
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName:
                  process.env.NODE_ENV === 'production'
                    ? '[hash:base64]'
                    : '[path][name]__[local]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [autoprefixer],
            },
          },
        ],
      },
      {
        test: /\.pcss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [tailwindcss, autoprefixer],
            },
          },
        ],
      },
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
