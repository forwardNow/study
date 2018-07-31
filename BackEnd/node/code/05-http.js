// 1. 加载 http 核心模块
var http = require('http');

// 2. 创建一个web服务器（实例）
var server = http.createServer();

// 3. 处理请求：当接收到客户端的请求，就进行处理
server.on('request', function() {
    console.log( '收到客户端的请求了！' );
});

// 4. 启动服务器：绑定端口号
server.listen(3000, function() {
    console.log('服务器已启动，请访问 http://127.0.0.1:3000/');
});

