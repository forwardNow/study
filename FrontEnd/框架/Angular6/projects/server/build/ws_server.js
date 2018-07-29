"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var wsServer = new ws_1.Server({
    port: 8001
});
// 当有客户端连接时
wsServer.on('connection', function (websocket) {
    // 推送消息到客户端
    websocket.send('服务器：欢迎连接我。');
    websocket.on('message', function (message) {
        console.log('服务器：已接收到消息——' + message);
    });
});
setInterval(function () {
    if (wsServer.clients) {
        wsServer.clients.forEach(function (client) {
            client.send('服务器：主动推送的消息');
        });
    }
}, 2000);
