import { Server } from 'ws';

const wsServer = new Server( {
    port: 8001
} );

// 当有客户端连接时
wsServer.on( 'connection', websocket => {
    // 推送消息到客户端
    websocket.send( '服务器：欢迎连接我。' );

    websocket.on( 'message', message => {
        console.log( '服务器：已接收到消息——' + message );
    } )
} );

setInterval( () => {
    if ( wsServer.clients ) {
        wsServer.clients.forEach( client => {
            client.send('服务器：主动推送的消息')
        } );
    }
}, 2000 );