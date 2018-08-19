const http = require('http');
const fs = require('fs');
const artTemplate = require('art-template');

const server = http.createServer();

const wwwDir = '/Users/forwardNow/develop/work/study/BackEnd/node/code2/www';

server.on('request', (req, res) => {
  fs.readFile('./template.2.html', (err1, tplData) => {
    if (err1) {
      console.log('文件不存在');
      return;
    }

    fs.readdir(wwwDir, (err2, files) => {
      const html = artTemplate.render(tplData.toString(), { files });
      res.end(html);
    });
  });
});

server.listen(3000, () => {
  console.log('http://localhost:3000');
});
