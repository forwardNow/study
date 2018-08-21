 # 介绍

Node 对于前端来讲是进阶高级前端开发工程师必备技能。

Node 比 PHP 更轻量、灵活。

## 1. Node.js 是什么

Node.js 是一个JavaScript运行时环境，也就是说可以解析和执行JavaScript代码的容器。

浏览器中的JavaScript：（做界面）
* EcmaScript
* BOM
* DOM

Node.js中的JavaScript：（做服务端）
* EcmaScript
* 操作node服务器提供的API
    * 文件读写
    * 网络服务的构建
    * 网络通信
    * http服务器
    * 等

特性：
* 事件驱动
* 非阻塞IO模型（异步）

构建于Chrome的V8引擎之上
* 代码之上具有特定格式的文本，引擎认识它并帮你解析和执行
* V8是解析执行JavaScript代码最快的

## 2. Node.js 做什么

* Web服务器后台
* 命令行工具
    * npm（node）
    * git（c语言）
    * webpack
    * gulp
    * hexo（node）
* 游戏服务器

## 3. 安装

下载：https://nodejs.org/en/

安装：

    $ brew install node

确认是否安装成功：

    $ node -v
    => v10.6.0

## 4. hello world

查看：[./code/00-helloworld.js](./code/00-helloworld.js)

代码：

    var foo = 'hello world';
    console.log( foo );

执行：

    $ node 00-helloworld.js
    => hello world

## 5. 读文件

查看：[./code/01-读文件.js](./code/01-读文件.js)

代码：

    // require() 加载 操作文件的核心模块 fs（file system）
    var fs = require('fs');

    // fs.readFile( filePath, callback )
    fs.readFile('./02-data.txt', function(err, buffer) {

        // 读取成功则，err 为 null，否则为错误对象
        console.log( err );
        //=> null

        console.log( '缓存：', buffer );
        //=> 缓存： <Buffer 68 65 6c 6c 6f>

        console.log( '文本：', buffer.toString());
        //=> 文本： hello
    });

## 6. 写文件

查看：[./code/03-写文件.js](./code/03-写文件.js)

代码：

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

## 7. 简单的http服务

非常容易构建一个web服务器

查看：[./code/05-http.js](./code/05-http.js)

```JavaScript
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

```

## 8. 请求与响应

查看：[./code/06-http-req-res.js](./code/06-http-req-res.js)

```JavaScript
server.on('request', function(request, response) {
    // http://127.0.0.1:3000/ => /
    // http://127.0.0.1:3000/a/b/c => /a/b/c
    console.log( '收到客户端的请求: ' + request.url);

    // write()：往响应流中写数据，可以调用多次
    response.write('hello ');
    response.write('nodejs');
    
    // 结束响应流，
    response.end();

    // 上面三句代码等同于 reponse.end('hello nodejs') 
});
```

## 9. 处理不同URL与返回JSON

`response.end( string | buffer )`

```javascript
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
```