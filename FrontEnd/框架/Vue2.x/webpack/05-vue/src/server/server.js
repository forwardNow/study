// 1.引入
const express = require('express');

// 2.创建服务（相对于 http.createServer）
const app = express();

// allow custom header and CORS
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.send(200); // 让 options 请求快速返回
  } else {
    next();
  }
});


// 3.处理请求
app.get('/', (req, res) => {
  res.send('这是 node.js 服务端。');
});

// 提供静态资源服务（公开指定目录）
app.use('/static/', express.static('./static/'));

// 轮播
app.get('/api/carousel', (req, res) => {
  res.status(200).json({
    errorCode: 0,
    reason: '处理成功',
    result: {
      items: [
        { url: 'http://www.baidu.com#1', img: 'http://localhost:3000/static/img/1.jpg' },
        { url: 'http://www.baidu.com#2', img: 'http://localhost:3000/static/img/2.jpg' },
        { url: 'http://www.baidu.com#3', img: 'http://localhost:3000/static/img/3.jpg' },
      ],
    },
  });
});

// 4.监听端口（相对于 server.listen）
app.listen(3000, () => {
  console.log('http://localhost:3000');
});
