# MongoDB

## 1. 启动

```shell
# 版本
$ mongo -version
MongoDB shell version v3.6.8

# 启动
$ mongod
```

## 2. 允许远程访问

查看：[https://docs.mongodb.com/manual/reference/configuration-options/](https://docs.mongodb.com/manual/reference/configuration-options/)

有下列两种方式

* 命令行选项
* 配置文件

命令行参数：

```shell
# 使用 “--bind_ip_all” 选项，允许远程计算机访问
$ mongod --bind_ip_all
```

配置文件：

```shell
# 编辑配置文件
$ vi /etc/mongod.conf

# 配置方式一
net:
  port: 27017
  bindIp: 0.0.0.0

# 配置方式二
net:
  port: 27017
  bindIpAll: true

# 启动：指定配置文件。
$ mongod --config /etc/mongod.conf
```

## 3. 备份与还原

```shell
# 备份本地 MongoDB 的 “platform” 数据库，输出到当前目录
$ mongodump -h 127.0.0.1 --port 27017 -d platform -o ./

# 将本地 “platform” 数据库还原到远程数据库服务器
$ mongorestore -h 39.105.88.174 --port 27017 -d platform ./platform
```