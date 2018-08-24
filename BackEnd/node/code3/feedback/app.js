const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const comments = [
  { name: '张三', message: '今天天气不错', dateTime: '2018-08-20' },
  { name: '张三2', message: '今天天气不错2', dateTime: '2018-08-22' },
  { name: '张三3', message: '今天天气不错3', dateTime: '2018-08-23' },
  { name: '张三4', message: '今天天气不错4', dateTime: '2018-08-24' },
  { name: '张三5', message: '今天天气不错5', dateTime: '2018-08-25' },
];

// 静态目录
app.use('/public/', express.static('./public/'));

// 配置 art-template
app.engine('html', require('express-art-template'));

// 配置中间件

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index.html', { comments });
});

app.get('/post', (req, res) => {
  res.render('post.html');
});

app.post('/comment', (req, res) => {
  const { body: query } = req;
  comments.unshift({
    name: query.name,
    message: query.message,
    dateTime: new Date().toLocaleString(),
  });

  res.redirect('/');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
