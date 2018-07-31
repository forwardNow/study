var http = require('http');

var server = http.createServer();

server.on('request', function(request, response) {
    // http://127.0.0.1:3000/ => /
    // http://127.0.0.1:3000/a/b/c => /a/b/c
    console.log( '收到客户端的请求: ' + request.url);

    // write()：往响应流中写数据，可以调用多次
    response.write('hello ');
    response.write('nodejs');
    
    // 结束响应流，
    response.end();
});

server.listen(3000, function() {
    console.log('服务器已启动，请访问 http://127.0.0.1:3000/');
});

