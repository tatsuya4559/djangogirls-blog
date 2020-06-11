const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    // prodはPJ直下のstaticに配置する
    path: path.resolve(__dirname, '../src/static/dist'),
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64]',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [].concat(
    // packageのバンドルサイズは以下のサイトで解析できる
    // https://bundlephobia.com/scan
    process.env.BUILD_STATS
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: path.resolve(__dirname, 'stats/report.html'),
            defaultSizes: 'gzip',
            generateStatsFile: true,
            statsFilename: path.resolve(__dirname, 'stats/stats.json'),
          }),
        ]
      : []
  ),
});
