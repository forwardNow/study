# Node.js ORM sequelize 的使用

## 1. 参考

* [文档 —— 中文](https://demopark.github.io/sequelize-docs-Zh-CN/)
* [官网](http://docs.sequelizejs.com/)
* [源码 —— GitHub](https://github.com/sequelize/sequelize)

## 2. 安装

```shell
npm install sequelize  

npm install mysql2
```

## 3. 连接数据库

```javascript
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'wuqinfei@qq.com', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // 请参考 Querying - 查询 操作符 章节
  operatorsAliases: false,
});

module.exports = { Sequelize, sequelize };

```