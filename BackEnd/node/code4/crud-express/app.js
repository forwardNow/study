const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');

const app = express();

// 渲染引擎
app.engine('html', require('express-art-template'));

// 静态服务
app.use('/public/', express.static('./public/'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// 把路由容器挂载到 app 服务上
app.use(router);

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
