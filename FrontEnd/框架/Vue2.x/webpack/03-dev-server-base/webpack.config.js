const path = require('path');

// 启用热更新:第 2 步
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

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

    // 启动页
    new HtmlWebpackPlugin({
      // 指定模板页面：将此模板编译到内存中
      template: path.join(__dirname, './src/index.html'),

      // 指定编译后的文件名称
      filename: 'index.html',
    }),
  ],

  // 配置第三方模块加载器
  module: {

    /*
     * 文件的匹配规则和对应处理器
     * webpack 要处理的文件不是 JS 文件时，会在这里匹配相应的 loader 进行处理，
     * 处理的结果直接交给 webpack 进行打包合并，最终输出到 bundle.js
     */
    rules: [
      {
        // 匹配规则
        test: /\.css$/,

        /*
         * 匹配到了使用哪些 loader 来处理
         * loader 从右到左调用，以管道的方式
         */
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,

        /*
         * url-loader 依赖 file-loader
         * 默认转 base64，可通过设置 limit 参数，当小于该值时才转 base64
         */
        use: [
          {
            loader: 'url-loader',
            options: {
              // 单位 KB
              limit: 1024 * 2,

              /*
               * 设置打包后的文件名称，默认为 hash 值名称
               * [hash:8] 取前 8 位 hash 值
               */
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
      // 处理字体文件
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 单位 KB
              limit: 1024 * 2,

              /*
               * 设置打包后的文件名称，默认为 hash 值名称
               * [hash:8] 取前 8 位 hash 值
               */
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
