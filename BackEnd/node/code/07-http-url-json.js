var http = require('http');

var server = http.createServer();

server.on('request', function(request, response) {
    var url = request.url;

    if (url === '/') {
        response.end('index page');
    } else if (url === '/login') {
        response.end('login page');
    } else if (url === '/json') {
        response.end(JSON.stringify({
            name: '吴钦飞',
            gender: '男'
        }));
    } else {
        response.end('404 not found');
    }
});

server.listen(3000, function() {
    console.log('服务器已启动，请访问 http://127.0.0.1:3000/');
});

