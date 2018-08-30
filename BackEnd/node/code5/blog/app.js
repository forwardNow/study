const express = require('express');
const path = require('path');
const expressArtTemplate = require('express-art-template');

const app = express();

// 静态服务
app.use('/public/', express.static(path.join(__dirname, './public/')));

// 渲染引擎
app.engine('html', expressArtTemplate);

// 视图目录
app.set('views', path.join(__dirname, './views/'));

app.get('/', (req, res) => {
  res.render('index.html', {
    title: '博客系统',
  });
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
