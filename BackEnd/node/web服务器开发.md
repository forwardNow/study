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

参考：[http_class_http_clientrequest](https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_class_http_clientrequest)

`IncomingMessage` 常用方法及属性

* `request.getHeader(name)`
* `request.url`

## 5. 响应对象 Response

参考：[http_class_http_serverresponse](https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_class_http_serverresponse)

`ServerResponse` 常用方法及属性

* `response.end([data][, encoding][, callback])`：此方法必须调用，否则一直被阻塞。
* `response.getHeader(name)`
* `response.setHeader(name, value)`

## 6. 服务端渲染

**服务端渲染和客户端渲染的区别**：

* 客户端渲染不利于 SEO 搜索引擎优化
* 服务器端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
* 真正的网站既不是纯异步也不是纯服务端渲染出来的，而是两者的结合，比如 京东
  * 商品列表采用服务端渲染，目的是为了 SEO 搜索引擎优化
  * 商品评论列表采用客户端渲染，以提高用户体验，因为不需要 SEO 优化


## 7. 在 Node 中使用模板引擎

模板引擎最早就是诞生于服务器领域，后来才发展到前端；本质是字符串解析替换。

`{{}}`：双花括号，mustache 语法，八字胡语法

art-template 既可以在浏览器端使用，也可以在node中使用。


## 8. 统一处理静态资源

浏览器收到 HTML 响应内容后，开始从上到下一次解析。

在解析过程中，如果发现下面这些标签（具有外链资源），浏览器会自动对这些资源发起新的请求：

* `<link href="xx1">`
* `<script src="xx2"></script>`
* `<img src="xx3">`
* `<iframe src="xx4">`
* `<video src="xx5">`
* `<audio src="xx6">`

为了统一处理静态资源，我们约定把所有静态资源放在 `public` 目录

### 8.1. 示例

目录：

```
feedback/
  views/
    index.html
  public/
    css/
    js/
    img/
    lib/
  app.js
```

app.js：

```javascript
const http = require('http');
const fs = require('fs');

http
  .createServer((req, res) => {
    const { url } = req;

    if (url === '/') {
      fs.readFile('./views/index.html', (err, data) => {
        if (err) {
          res.end('404 not found');
          return;
        }
        res.end(data);
      });
    } else if (url.indexOf('/public/') === 0) {
      fs.readFile(`.${url}`, (err, data) => {
        if (err) {
          res.end('404 not found');
          return;
        }
        res.end(data);
      });
    }
  })
  .listen(3000, () => {
    console.log('http://localhost:3000');
  });

```

## 9. 表单提交

### 9.1. 处理 url

使用 `url` 核心模块，解析 `req.url` 获取 `pathname` 和 `query` 。

```javascript
url.parse('/comment?name=张三,gender=男', true)
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=张三,gender=男',
  query: { name: '张三,gender=男' },
  pathname: '/comment',
  path: '/comment?name=张三,gender=男',
  href: '/comment?name=张三,gender=男' }
```

### 9.2. 重定向

```javascript
// 重定向：302 状态码（临时重定向）和 Location 头
res.statusCode = 302;
res.setHeader('Location', '/');

res.end();
```

## 10. REPL

* read：读取用户输入
* eval：执行输入
* print：打印输出
* loop：循环，等待用户输入

在 node 中也有类似于浏览器控制台的环境，如下

```
wuqinfeis-iMac:feedback forwardNow$ node（敲回车）
> url.parse('/comment?name=张三')
```

在控制台环境可以直接使用核心模块而不必引入，主要用于测试一些 API。