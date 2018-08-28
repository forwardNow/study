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
* 数据表 => 集合（数组）
* 表记录 => 文档对象

MongoDB 不需要设计表结构，也就是说可以任意往里面存数据，没有结构一说。

## 3. 下载与安装

官网：https://www.mongodb.com/

### 3.1. OSX

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