const http = require('http');
const fs = require('fs');
const artTpl = require('art-template');
const url = require('url');

const comments = [
  { name: '张三', message: '今天天气不错', dateTime: '2018-08-20' },
  { name: '张三2', message: '今天天气不错2', dateTime: '2018-08-22' },
  { name: '张三3', message: '今天天气不错3', dateTime: '2018-08-23' },
  { name: '张三4', message: '今天天气不错4', dateTime: '2018-08-24' },
  { name: '张三5', message: '今天天气不错5', dateTime: '2018-08-25' },
];

http
  .createServer((req, res) => {
    const urlObj = url.parse(req.url, true);
    const { pathname } = urlObj;

    if (pathname === '/') { // 根
      fs.readFile('./views/index.html', (err, data) => {
        if (err) {
          res.end('404 not found');
          return;
        }
        const html = artTpl.render(data.toString(), { comments });
        res.end(html);
      });
    } else if (pathname === '/post') { // /post
      fs.readFile('./views/post.html', (err, data) => {
        if (err) {
          res.end('404 not found');
          return;
        }
        res.end(data);
      });
    } else if (pathname.indexOf('/public/') === 0) { // public
      fs.readFile(`.${pathname}`, (err, data) => {
        if (err) {
          res.end('404 not found');
          return;
        }
        res.end(data);
      });
    } else if (pathname === '/comment') { // 评论
      const { query } = urlObj;
      comments.unshift({
        name: query.name,
        message: query.message,
        dateTime: new Date().toLocaleString(),
      });

      // 重定向：状态码 302 和 Location 头
      res.statusCode = 302;
      res.setHeader('Location', '/');

      res.end();
    } else { // 404
      fs.readFile('./views/404.html', (err, data) => {
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
