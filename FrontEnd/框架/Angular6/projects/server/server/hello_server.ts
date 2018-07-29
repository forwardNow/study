import * as http from 'http';

const server = http.createServer( ( request, response ) => {
    return response.end( 'hello' );
} );

server.listen( 8000 );
