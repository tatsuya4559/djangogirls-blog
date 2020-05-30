module.exports = {
  entry: {
    postList: './assets/blog/js/post_list.tsx',
    // あとはこのエントリポイントに追加してくだけ
  },
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
      {
        test: /\.module\.css$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]',
                //use '[hash:base64]' for production
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // これのおかげで、importに拡張子を書かなくてすむ
  },
};
