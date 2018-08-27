const fs = require('fs');
const express = require('express');
const Student = require('./student.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('index.html');
});

router.get('/students', (req, res) => {
  Student.findAll((err, data) => {
    if (err) {
      res.status(500).send('server error');
      return;
    }
    res.render('index.html', { students: data });
  });
});

router.get('/student/new', (req, res) => {
  res.render('new.html');
});

router.post('/student/new', (req, res) => {
  // 1. 获取表单数据
  const { body } = req;
  const {
    name, gender, age, hobbies,
  } = body;

  // 2. 处理
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('server error');
    }
    const { students } = JSON.parse(data);
    students.push({
      id: students.length + 1,
      name,
      gender,
      age,
      hobbies,
    });
    fs.writeFile('./db.json', JSON.stringify({ students }), (err2) => {
      if (err2) {
        res.status(500).send('server error');
      }

      // 3. 响应
      res.redirect('/students');
    });
  });
});

module.exports = router;
