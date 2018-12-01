# MongoDB

## 1. 启动

```shell
# 版本
$ mongo -version
MongoDB shell version v3.6.8

# 启动：使用 “--bind_ip_all” 选项，允许远程计算机访问
$ mongod --bind_ip_all
```

## 2. 备份与还原

```shell
# 查看当前工作目录
$ pwd
/root/db_dump

# 备份本地 MongoDB 的 “platform” 数据库，输出到当前目录
$ mongodump -h 127.0.0.1 --port 27017 -d platform -o ./

# 将本地 “platform” 数据库还原到远程数据库服务器
$ mongorestore -h 39.105.88.174 --port 27017 -d platform ./platform
```