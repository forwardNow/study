var http = require('http');

var server = http.createServer();

server.on( 'request', function(req, res) {
    let url = req.url;

    if ( url === '/') {
        res.end( 'hello' );
    }
    else if ( url === '/plain' ) {
        res.setHeader( 'Content-Type', 'text/plain;charset=utf-8' );
        res.end( '吴钦飞' );
    } 
    else if ( url === '/html' ) {
        res.setHeader( 'Content-Type', 'text/html;charset=utf-8' );
        res.end( '<a href="#">点我</a>' );
    }
} );

server.listen(3000, function() {
    console.log('服务器已启动，访问：http://localhost:3000');
});