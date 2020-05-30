const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    // prodはPJ直下のstaticに配置する
    path: path.resolve(__dirname, '../static/dist/js'),
    filename: '[name].js',
    // [name].bundle.js
    // [id].chunk.js
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
            reportFilename: path.join(__dirname, './stats/report.html'),
            defaultSizes: 'gzip',
            generateStatsFile: true,
            statsFilename: path.join(__dirname, './stats/stats.json'),
          }),
        ]
      : []
  ),
});
