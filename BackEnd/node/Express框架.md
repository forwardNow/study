 # Express 框架

## 1. 介绍

原生的 http 核心模块在某些方面不足应对满足我们的开发需求，所以我们需要使用框架来提供开发效率。

框架的目的就是提高效率，让我们的代码高度统一。

在 Node 中，有很多 web 开发框架（如 koa），这里以 [Express](http://expressjs.com/) 为主。

作者：https://github.com/tj 

## 2. 安装

参考：http://expressjs.com/en/starter/installing.html

```shell
$ npm install --save express
+ express@4.16.3
added 52 packages from 47 contributors in 4.218s
```

## 3. hello world

参考：http://expressjs.com/en/starter/hello-world.html

查看：[./code3/01.express-helloworld.js](./code3/01.express-helloworld.js)

```javascript
// 1.引入
const express = require('express');

// 2.创建服务（相对于 http.createServer）
const app = express();


// 3.处理请求
app.get('/', (req, res) => {
  res.send('hello express');
});

// 提供静态资源服务（公开指定目录）
app.use('/public/', express.static('./public/'));
app.use('/static/', express.static('./static/'));

app.get('/about', (req, res) => {
  res.send('关于 Express');
});

// 4.监听端口（相对于 server.listen）
app.listen(3000, () => {
  console.log('http://localhost:3000');
});

```