const path = require("path");

const isEnvProduction = env.production;
const mode = isEnvProduction ? "production" : "development";
// それよりもファイルを分けたほうがわかりやすいね
// https://webpack.js.org/guides/production/

module.exports = {
  mode: mode,
  entry: {
    postList: "./assets/blog/js/post_list.js",
    // あとはこのエントリポイントに追加してくだけ
  },
  output: {
    path: path.resolve(__dirname, "static/dist/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ['react', 'es2015']
        }
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    // これのおかげで、importに拡張子を書かなくてすむ
  },
};
