const fs = require('fs');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('index.html');
});

router.get('/students', (req, res) => {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('server error');
    }
    const { students } = JSON.parse(data);
    res.render('index.html', { students });
  });
});

module.exports = router;
