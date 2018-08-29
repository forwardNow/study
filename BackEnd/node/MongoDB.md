 # MongoDB

## 1. 参考

菜鸟教程：http://www.runoob.com/mongodb/mongodb-tutorial.html

## 2. 关系型数据库和非关系型数据库

### 2.1. 关系型数据库

表就是关系，或者说表与表之间存在关系。

**特点**：

* 需要通过 SQL 语言来操作
* 在操作数据之前都需要设计表结构
* 数据表支持约束
    * 唯一性约束
    * 主键
    * 默认值
    * 非空

**关系**：

* 一对一
* 一对多
* 多对对

**关系型数据库**：

* Oracle
* SQLServer
* MySQL

### 2.2. 非关系型数据库

非常灵活，有的非关系型数据库就是 key-value 对。

而 MongoDB 是长得最像关系型数据库的非关系型数据库：

* 数据库
* 数据表 => 集合（collection）
* 表记录 => 文档

MongoDB 不需要设计表结构，
也就是说可以任意往里面存数据，没有结构一说，
也就是说可以往集合里插入任意结构的对象。

## 3. MongoDB 基本概念

* 数据库
* 集合（表）
* 文档（表记录）：文档结构很灵活，没有任何限制

建库建表由 MongoDB 来完成，不需要像 MySQL 一样先创建数据库、表。

```javascript
// MongoDB 存储结构
{
  // 数据库 test
  test: {

    // 集合（表）
    cats: [

      // 文档（表记录）
      {name: "张三", age: 10},
      {name: "张三2", age: 11},
      {name: "张三2", age: 11},

    ]

  },
  // 数据库 admin
  admin: {

  }
}
```

## 4. 下载与安装

官网：https://www.mongodb.com/

### 4.1. OSX

文档： https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

```shell
# 安装
$ brew install mongodb

# 测试
$ mongod --version
db version v4.0.1
git version: 54f1582fc6eb01de4d4c42f26fc133e623f065fb
allocator: system
modules: none
build environment:
    distarch: x86_64
    target_arch: x86_64
```

## 5. 启动与停止

### 5.1. 默认数据存储目录

默认数据存储目录为 `/data/db`，此目录需要手动创建并给予读写权限

```shell
$ sudo mkdir -p /data/db
$ sudo chmod -R 777 /data/db
```

### 5.2. 启动

```shell
# 使用默认数据存储目录
$ mongod

# 使用指定数据存储目录
$ mongod --dbpath=数据存储目录路径
```

### 5.3. 停止

通过 `Ctrl + C` 停止。

## 6. 连接数据库


```shell
$ mongo
MongoDB shell version v4.0.1
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 4.0.1
Welcome to the MongoDB shell.
>
# 退出
> exit
bye
```

## 7. 基本命令

### 7.1. `show dbs`

查看所有数据库

```
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```

### 7.2. `db`

查看当前数据库。

【注】：如果数据库中没有数据，则不会在 `show dbs` 中显示。

```
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> db
test
```

### 7.3. `use 数据库名称`

切换到指定的数据库（如果没有则新建）

```
> use mydb
switched to db mydb
> db
mydb
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```

### 7.4. 插入数据

在 `mydb` 数据库中创建集合（表） `students`，并插入一条数据（对象）

```
> db
mydb
> db.students.insertOne({"name": "wuqinfei"});
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5b853e3a26fb7dc36213f272")
}
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
mydb    0.000GB
```

### 7.5. 查询数据

```shell
# 查询所有集合（表）
> show collections
insert

# 查询指定集合的所有数据
> db.students.find()
{ "_id" : ObjectId("5b853e3a26fb7dc36213f272"), "name" : "wuqinfei" }
```

## 8. 在 Node 中操作 MongoDB

### 8.1. 使用官方的 `mongodb` 原生驱动包

官方的驱动包太麻烦（原始）。

文档：https://github.com/mongodb/node-mongodb-native

### 8.2. 使用第三方 `mongoose` 来操作

#### 8.2.1. 说明

`mongoose` 基于官方的 `mongodb` 做了再一次封装，使用更简单。

文档：https://mongoosejs.com/

#### 8.2.2. 安装

```shell
$ npm install mongoose --save
```

#### 8.2.3. 起步

查看：[./code4/01.mongoose-demo.js](./code4/01.mongoose-demo.js)

```javascript
// 引入
const mongoose = require('mongoose');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

// 创建模型（设计数据库）
// MongoDB 是动态的，非常灵活，只需要在代码中设计数据库
// mongoose 使设计数据库更简单
// Cat 为集合（表）名，生成 cats 集合
// { name: String } 键（字段）
const Cat = mongoose.model('Cat', { name: String });

// 实例化一个 Cat
const kitty = new Cat({ name: 'Zildjian' });

// 持久化保存 kitty 实例
kitty.save().then(() => console.log('meow'));
```

**查看**：

```shell
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
mydb    0.000GB
test    0.000GB
> use test
switched to db test
> show collections
cats
> db.cats.find()
{ "_id" : ObjectId("5b85defba953ff06bdce91ef"), "name" : "Zildjian", "__v" : 0 }
{ "_id" : ObjectId("5b85df3164614806db23d2f8"), "name" : "Zildjian", "__v" : 0 }
>
```

## 9. mongoose 基本使用

查看：[./code4/02.mongoose-demo2.js](./code4/02.mongoose-demo2.js)

> mongoose 中所有操作数据的 API 都支持 Promise。

### 9.1. 设计 Schema 并发布 Model

```javascript
// 引入
const mongoose = require('mongoose');

// 结构（模型）
const { Schema } = mongoose;

// 1. 连接 MongoDB 数据库
// 连接的数据库不存在时，当往其插入一条数据时会自动创建
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

// 2. 创建 Schema 实例：设计文档结构（表结构）
// 约束的目录：保证数据的完整性，不要有脏数据
const userSchema = new Schema({
  username: {
    type: String,
    index: true, // 索引
    unique: true, // 唯一性约束
    required: true, // 非空约束
  },
  password: {
    type: String,
    required: true, // 非空约束
    default: '123456', // 默认值约束
  },
  email: {
    type: String,
  },
});

// 3. 创建模型
// mongoose.model()
//   参数1：数据库名称。'User' => 数据库 users
//   参数2：Scheme 实例
//   返回值：模型构造函数
const User = mongoose.model('User', userSchema);

// 4. 操作模型

```

### 9.2. 增加数据

文档：https://mongoosejs.com/docs/models.html#constructing-documents

```javascript
const admin = new User({
  username: 'admin',
  password: '123456',
  email: 'admin@qq.com',
});

// 保存
admin.save((err, ret) => {
  if (err) {
    console.log('保存失败');
  } else {
    console.log('保存成功');
    console.log(ret);
    /*
    { password: '123456',
      _id: 5b860c3e8371021ecb5dc29b,
      username: 'admin',
      email: 'admin@qq.com',
      __v: 0 }
    */
  }
});
```

### 9.3. 查询

文档

* https://mongoosejs.com/docs/models.html#querying
* https://mongoosejs.com/docs/queries.html

查询所有：

```javascript
User.find((err, ret) => {
  if (err) {
    return console.log(err);
  }
  return console.log(ret);
  // [ {...}, {...} ]
});
```

按条件查询所有：

```javascript
User.find({
  username: 'zhangsan',
}, (err, ret) => {
  if (err) {
    return console.log(err);
  }
  return console.log(ret);
  // [ {...} ]
});
```

按条件查询单条数据：

```javascript
User.findOne({
  username: 'zhangsan',
}, (err, ret) => {
  if (err) {
    return console.log(err);
  }
  return console.log(ret);
  // {...}
});
```

### 9.4. 删除

文档：https://mongoosejs.com/docs/api.html#model_Model.deleteMany

删多条：

```javascript
User.deleteMany({
  name: 'zhangsan'
}, err => {
  if (err) {
    return console.log(err);
  } else {
    return console.log('删除成功');
  }
});
```

删一条：

```javascript
User.deleteOne({
  name: 'zhangsan'
}, err => {
  if (err) {
    return console.log(err);
  } else {
    return console.log('删除成功');
  }
});
```

### 9.5. 更新

文档：https://mongoosejs.com/docs/models.html#updating

```javascript

User.updateOne({
  username: 'zhangsan', // 条件（where）
}, {
  password: '123', // set
}, (err) => {
  if (err) {
    return console.log('更新失败');
  }
  return console.log('更新成功');
});
```

## 扩展：Node 操作 MySQL

文档：https://www.npmjs.com/package/mysql

查看：[./code4/03.node操作mysql.js](./code4/03.node操作mysql.js)

```javascript
const mysql = require('mysql');

// 创建连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'pkui',
});

// 1. 连接数据库（打开冰箱门）
connection.connect();

// 2. 操作数据（把大象放入冰箱）
connection.query('SELECT * FROM `sys_dept`', (error, results, fields) => {
  if (error) {
    throw error;
  }
  console.log('The solution is: ', results[0]);
});

// 关闭连接（关上冰箱门）
connection.end();

```