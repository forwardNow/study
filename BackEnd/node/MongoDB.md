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

官方的驱动包太麻烦。

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