module.exports = {
  entry: {
    postList: "./assets/blog/js/post_list.tsx",
    // あとはこのエントリポイントに追加してくだけ
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
      {
        test: /\.module\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    // これのおかげで、importに拡張子を書かなくてすむ
  },
};
