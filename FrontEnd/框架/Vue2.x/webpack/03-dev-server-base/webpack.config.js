const path = require('path');

// 启用热更新:第 2 步
const webpack = require('webpack');

module.exports = {
  // 入口。指定要打包文件的位置
  entry: path.join(__dirname, './src/main.js'),

  // 出口。输出文件相关的配置
  output: {
    // 指定打包好的文件，输出的位置
    path: path.join(__dirname, './dist'),

    // 指定输出文件的名称
    filename: 'bundle.js',
  },

  // 配置 webpack-dev-server
  devServer: {
    // 自动打开浏览器
    open: true,

    // 端口号
    port: 8000,

    // 设置根目录
    contentBase: 'src',

    // 启用热更新:第 1 步
    hot: true,
  },

  // 配置插件
  plugins: [
    // 启用热更新:第 3 步
    new webpack.HotModuleReplacementPlugin(),
  ],
};
