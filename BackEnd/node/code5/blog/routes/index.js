const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const { session: { user } } = req;
  res.render('index.html', { user });
});

// 导入 session 路由
require('./session.js')(router);

// 导入 topic 路由
require('./topic.js')(router);

module.exports = router;
