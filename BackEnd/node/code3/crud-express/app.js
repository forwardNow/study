const express = require('express');
const fs = require('fs');

const app = express();

app.engine('html', require('express-art-template'));

app.use('/public/', express.static('./public/'));

app.get('/', (req, res) => {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('server error');
    }
    const { students } = JSON.parse(data);
    res.render('index.html', { students });
  });
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
