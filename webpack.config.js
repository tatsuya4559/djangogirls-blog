const path = require("path");

// ファイルを分けたほうがわかりやすいね
// https://webpack.js.org/guides/production/

module.exports = {
  mode: "development",
  devtool: "inline=source-map",
  entry: {
    postList: "./assets/blog/js/post_list.tsx",
    // あとはこのエントリポイントに追加してくだけ
  },
  output: {
    // developmentなのでdjangoの各アプリの下のstaticに配置する
    // prodはPJ直下のstaticに配置する
    path: path.resolve(__dirname, "blog/static/dist/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    // これのおかげで、importに拡張子を書かなくてすむ
  },
};
