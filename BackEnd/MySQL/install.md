# 1. 安装与卸载 MySQL

## 1.1. 卸载

卸载：[Mac OS X下完全卸载MySQL —— CSDN](https://blog.csdn.net/u012721519/article/details/55002626)

## 1.2. 安装

>参考：[在 Mac 下用 Homebrew 安装 MySQL](http://blog.neten.de/posts/2014/01/27/install-mysql-using-homebrew/)

```shell
# 安装最新版本
$ brew install mysql
```

```text
==> /usr/local/Cellar/mysql/8.0.13/bin/mysqld --initialize-insecure --user=forwardNow --basedir=/usr/local/Cellar/mysql/8.0.13 --datadir=/usr/local/var/mysql --tmpdi
==> Caveats
We've installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot

A "/etc/my.cnf" from another install may interfere with a Homebrew-built
server starting up correctly.

To have launchd start mysql now and restart at login:
  brew services start mysql
Or, if you don't want/need a background service you can just run:
  mysql.server start
==> Summary
🍺  /usr/local/Cellar/mysql/8.0.13: 267 files, 237MB
==> Caveats
==> openssl
A CA file has been bootstrapped using certificates from the SystemRoots
keychain. To add additional certificates (e.g. the certificates added in
the System keychain), place .pem files in
  /usr/local/etc/openssl/certs

and run
  /usr/local/opt/openssl/bin/c_rehash

openssl is keg-only, which means it was not symlinked into /usr/local,
because Apple has deprecated use of OpenSSL in favor of its own TLS and crypto libraries.

If you need to have openssl first in your PATH run:
  echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.zshrc

For compilers to find openssl you may need to set:
  export LDFLAGS="-L/usr/local/opt/openssl/lib"
  export CPPFLAGS="-I/usr/local/opt/openssl/include"

For pkg-config to find openssl you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/openssl/lib/pkgconfig"

==> mysql
We've installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot

A "/etc/my.cnf" from another install may interfere with a Homebrew-built
server starting up correctly.

To have launchd start mysql now and restart at login:
  brew services start mysql
Or, if you don't want/need a background service you can just run:
  mysql.server start
```

## 1.3. 启动服务

```shell
# 启动
$ brew services start mysql

# 停止
$ brew services stop mysql

# 重启
$ brew services restart mysql
```

## 1.4. 登陆与设置密码

>brew 安装 mysql 后，需要通过命令行设置 root 的密码后才可以用图形界面的客户端连接。

```shell
# 登陆
$ mysql -uroot -pwuqinfei@qq.com

mysql>ALTER USER root@localhost IDENTIFIED WITH mysql_native_password BY 'wuqinfei@qq.com';
```

## 1.5. 客户端连接

旧版 sequelpro 不兼容 MySQL 8，打开数据库会保存，使用[测试版](https://sequelpro.com/test-builds)
