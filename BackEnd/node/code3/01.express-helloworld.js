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
