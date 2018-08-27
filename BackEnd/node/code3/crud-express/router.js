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

  // 2. 处理
  Student.save(body, (err) => {
    if (err) {
      // 3. 响应
      res.status(500).send('server error');
      return;
    }
    // 3. 响应
    res.redirect('/students');
  });
});

module.exports = router;
