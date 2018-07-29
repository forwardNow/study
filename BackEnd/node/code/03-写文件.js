var fs = require('fs');

var filePath = './04.writeData.txt';
var content = '大家好，我叫 吴钦飞！';
var callback = function ( err ) {
    if ( err === null ) {
        console.log( '写入成功' );
    } else {
        console.log( '写入失败', err );
    }
}
fs.writeFile( filePath, content, callback );