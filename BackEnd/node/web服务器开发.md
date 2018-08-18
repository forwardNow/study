 # Web 服务器开发
 
## 1. IP 地址和端口号

* IP 地址用来定位计算机
* 端口号用来定位具体的应用程序
* 一切需要联网通信的软件都会占用一个端口号
* 端口号的范围 0 ~ 65536 之间
* 在计算机中有一些默认的端口号，最好不要去使用
    * 如 HTTP服务 的80
* 开发过程中使用一些简单好记的就可以了


## 2. Content-Type

```javascript
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
```

注意：
* 服务端默认使用 utf-8 编码字符串
* 文本需要指定编码`charset=utf-8`，图片等媒体数据不需要指定编码
* 查看 [HTTP Content-Type](http://tool.oschina.net/commons)

## 3. 读取文件返回浏览器

配合 fs 模块使用

```javascript
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
```

## 4. 请求对象 Request

## 5. 响应对象 Response

## 6. 在 Node 中使用模板引擎

## 7. 统一处理静态资源

## 8. 服务端渲染

