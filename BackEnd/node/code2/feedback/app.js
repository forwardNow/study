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
