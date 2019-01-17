const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 创建一个插件的实例
const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'), // 源文件
  filename: 'index.html', // 生成到内存中首页的名称
});

module.exports = {
  // 'development' | 'production'
  mode: 'development',

  plugins: [
    htmlPlugin,
  ],

  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path]_[name]_[local]_[hash:8]',
            },
          },
          'sass-loader',
        ],
      },
      { test: /\.css/, use: ['style-loader', 'css-loader'] },
      { test: /\.ttf|woff|woff2|eot|svg$/, use: 'url-loader' },
    ],
  },

  resolve: {
    // 表示这些后缀名可以省略不写，会自动补全
    extensions: ['.js', '.jsx', '.json'],

    // 别名
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
};
