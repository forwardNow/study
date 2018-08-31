const express = require('express');

const app = express();

/*
中间件：处理请求的，本质就是函数


*/

/**
 * Express 中间件
 * @param {Request} req 请求
 * @param {Response} res 响应
 * @param {function} next 执行下一个中间件
 */
function middleware(req, res, next) {
  next();
}

/*
注册中间件：

* app.use(middleware) 匹配所有 url
* app.use(pathnamePrefix, middleware) 匹配指定前缀的 url
* app.get(pathname, middleware) 完全匹配 url，且为 GET 请求
* app.post(pathname, middleware) 完全匹配 url，且为 POST 请求

*/

app.use((req, res, next) => {
  console.log(1, req.url);
  next();
});

app.use('/a/', (req, res, next) => {
  console.log(2, req.url);
  next();
});

app.get('/a/b', (req, res, next) => {
  console.log(3, req.url);
  next();
});

app.get('/a/b', (req, res, next) => {
  console.log(4, req.url);
  next();
});

app.use((req, res) => {
  console.log(5, req.url);
  res.status(404).send(`没有：${req.method} ${req.url}`);
});

/*
服务端

1 '/a/b'
2 '/b'
3 '/a/b'
4 '/a/b'
5 '/a/b'

浏览器

  没有：GET /a/b
*/
app.listen(3000);
