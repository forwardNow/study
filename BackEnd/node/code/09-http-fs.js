var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request', function(req, res) {
    var url = req.url;

    if ( url === '/' ) {
        fs.readFile('./asset/index.html', function( error, data ) {
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.end(data);
        })
    }
    else if ( url === '/img' ) {
        fs.readFile('./asset/icon_loading.gif', function( error, data ) {
            res.setHeader('Content-Type', 'image/gif');
            res.end(data);
        })
    }
});

server.listen(3000, function() {
    console.log('服务已启动，访问 http://localhost:3000');
});