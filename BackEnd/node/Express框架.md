 # Express 框架

## 1. 介绍

原生的 http 核心模块在某些方面不足应对满足我们的开发需求，所以我们需要使用框架来提供开发效率。

框架的目的就是提高效率，让我们的代码高度统一。

在 Node 中，有很多 web 开发框架（如 koa），这里以 [Express](http://expressjs.com/) 为主。

作者：https://github.com/tj 

## 2. 安装

参考：http://expressjs.com/en/starter/installing.html

```shell
$ npm install --save express
+ express@4.16.3
added 52 packages from 47 contributors in 4.218s
```

## 3. hello world

参考：http://expressjs.com/en/starter/hello-world.html

查看：[./code3/01.express-helloworld.js](./code3/01.express-helloworld.js)

```javascript
// 1.引入
const express = require('express');

// 2.创建服务（相对于 http.createServer）
const app = express();


// 3.处理请求
app.get('/', (req, res) => {
  res.send('hello express');
});

// 提供静态资源服务（公开指定目录）
app.use('/public/', express.static('./public/'));
app.use('/static/', express.static('./static/'));

app.get('/about', (req, res) => {
  res.send('关于 Express');
});

// 4.监听端口（相对于 server.listen）
app.listen(3000, () => {
  console.log('http://localhost:3000');
});

```


## 4. 自动重启服务

使用第三方命令行工具 nodemon ,但文件被修改后自动重启服务。

nodemon 是一个基于 Node.js 开发的第三方命令行工具，我们需要独立安装：

```shell
$ npm install --global nodemon
```

使用：

```shell
$ nodemon app.js
+ nodemon@1.18.3
added 300 packages from 151 contributors in 11.539s
```

只要是通过 `nodemon` 执行的脚本，它会监视脚本的变化，一旦脚本被修改则自动帮你重启服务。

## 5. 基本路由

路由其实就是一张表，这个表里面有具体的映射关系。

get：

```javascript
app.get('/', (req, res) => {
  res.send('hello world');
});
```

post：

```javascript
app.post('/reg', (req, res) => {
  req.query;
  res.send('hello world');
});
```

## 6. 静态服务（公开静态资源）

文档：http://expressjs.com/en/starter/static-files.html

```
/
  public/
    js/
      a.js
```

常用方式：

```javascript
// 访问 /public/js/a.js
app.use('/public/', express.static('./public/'));
```

省略目录：

```javascript
// 访问 /js/a.js
app.use( express.static('./public/'));
```

其他（别名）：

```javascript
// 访问 /abc/js/a.js
app.use('/abc/', express.static('./public/'));
```

## 7. 配置并使用 art-template

文档：https://aui.github.io/art-template/express/

### 7.1. 安装

```shell
$ npm install --save art-template
$ npm install --save express-art-template
```

### 7.2. 配置

```javascript
var express = require('express');
var app = express();

// 当渲染以 .art 结尾的文件时，使用 art-template 模板引擎
app.engine('art', require('express-art-template'));
```

### 7.3. 使用

Express 为 Response 提供了一个方法：`render()`：

```javascript
res.render('模板路径', {模板数据})
```

当给 Express 配置了模板引擎后才可以使用 `render()`：

```javascript
app.engine('html', require('express-art-template'));
```

模板路径默认情况下是相对于 `${root}/views/` 目录，可指定默认相对路径：

```javascript
app.set('views', './myViews/');
```

使用：

```javascript
app.get('/', (req, res) => {
  // ./views/index.html
  res.render('index.html', {
    title: '首页'
  });
});
```

## 8. 获取 GET 请求参数

```javascript
req.query; //=> { name: '张三' }
```

## 9. 获取 POST 请求体数据

在 Express 中没有内置获取表单 POST 请求体的 API，
需要使用 Express 中间件 [body-parser](http://expressjs.com/en/resources/middleware/body-parser.html)。

### 9.1. 安装

```shell
$ npm install --save body-parser
```

### 9.2. 配置

配置完成后，会在 `req` 上添加添加 `body` 属性以获取请求体数据。

```javascript
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```

## 10. 路由

### 10.1. 路由设计

| method | pathname        | query | body                       | desc       |
| ------ | --------------- | ----- | -------------------------- | ---------- |
| GET    | /students       |       |                            | 渲染首页   |
| GET    | /student/new    |       |                            | 渲染添加页 |
| POST   | /student/new    |       | name&age&gender&hobbies    | 处理添加   |
| GET    | /student/edit   | id    |                            | 渲染编辑页 |
| POST   | /student/edit   |       | id&name&age&gender&hobbies | 处理编辑   |
| GET    | /student/delete | id    |                            | 处理删除   |

### 10.2. Express 路由

目录：

```
/
app.js
router.js
```

router.js

```javascript
const express = require('express');

// 1. 创建路由容器
const router = express.Router();

// 2. 把路由挂载到路由容器上
router.get('/', (req, res) => {
  res.render('index.html');
});

// 3. 导出路由容器
module.exports = router;
```

/app.js

```javascript
const express = require('express');

// 4. 引入路由容器
const router = require('./router.js');

const app = express();

//...

// 5. 把路由容器挂载到 app 服务上
app.use(router);

```

## 11. 模块

模块职责要单一。

划分模块的目的就是为了增强代码的可维护性，提升开发效率。

### 11.1. app.js 模块

职责：

* 创建服务
* 做一些服务相关配置
    * 模板引擎
    * body-parser 解析 post 请求体
    * 提供静态服务
* 挂载路由
* 监听端口并启动服务

### 11.2. router.js 模块

职责：

* 处理路由
* 根据不同的请求方法、请求路径，设置不同的请求处理函数
