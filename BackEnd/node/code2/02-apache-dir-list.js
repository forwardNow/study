const http = require('http');
const fs = require('fs');

const server = http.createServer();

const wwwDir = '/Users/forwardNow/develop/work/study/BackEnd/node/code2/www';

server.on('request', (req, res) => {
  // const { url } = req;
  const filePath = './template.html';

  fs.readFile(filePath, (readFileError, templateContent) => {
    let html = '';

    if (readFileError) {
      res.end('404 not found');
      return;
    }

    fs.readdir(wwwDir, (readdirError, files) => {
      if (readdirError) {
        console.log('目录不存在');
        return;
      }
      files.forEach((file) => {
        html += `
        <tr>
          <td data-value="dir/"><a class="icon dir" href="/dir/">${file}</a></td>
          <td class="detailsColumn" data-value="0"></td>
          <td class="detailsColumn" data-value="1534570846">8/18/18, 1:40:46 PM</td>
        </tr>        
        `;
      });

      res.end(templateContent.toString().replace('{{content}}', html));
    });
  });
});

server.listen(3000, () => {
  console.log('http://localhost:3000');
});
