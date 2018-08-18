var http = require('http');
var fs = require('fs');

var server = http.createServer();

var wwwDir = '/Users/forwardNow/develop/work/study/BackEnd/node/code2/www';

server.on('request', function(req, res) {
    var url = req.url;
    var filePath;

    if (url === '/') {
        filePath = wwwDir + '/index.html';
    } else {
        filePath = wwwDir + url;
    }
    fs.readFile(filePath, function(error, data) {
        if (error) {
            res.end('404 not found');
            return;
        }
        res.end(data);
    });
});

server.listen(3000, function() {
    console.log('http://localhost:3000');
});