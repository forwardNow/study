/**
 * require() 加载 操作文件的核心模块 fs（file system）
 */
var fs = require('fs');

/**
 * fs.readFile( filePath, callback )
 */
fs.readFile('./02-data.txt', function(err, buffer) {

    // 读取成功则，err 为 null，否则为错误对象
    console.log( err );
    //=> null

    console.log( '缓存：', buffer );
    //=> 缓存： <Buffer 68 65 6c 6c 6f>

    console.log( '文本：', buffer.toString());
    //=> 文本： hello
});

