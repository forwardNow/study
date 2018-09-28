const path = require('path');

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
};
