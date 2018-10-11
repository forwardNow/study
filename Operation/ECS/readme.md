# ECS - CentOS 6.5

远程连接密码: 183376

## 1. 账户

账户: root / Wu+

远程连接：

```shell
$ ssh root@39.105.88.174

Welcome to Alibaba Cloud Elastic Compute Service !
```

## 2. 开放端口和 IP

[阿里云服务器公网ip无法访问解决办法](https://yq.aliyun.com/articles/87135)

## 3. 安装 zsh 和 oh my zsh

安装 zsh

```shell
# 安装zsh包
yum -y install zsh

# 切换默认shell为zsh
chsh -s /bin/zsh

# 重启服务器让修改的配置生效
shutdown -r
```

安装 git

```shell
# 查看 git 信息
yum info git

# 安装
yum install -y git
```

安装 oh my zsh

```shell
sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

## 4. 修改 ssh 配置避免频繁掉线

```shell
[root@iz8rrzrale48hez ssh]# cd /etc/ssh
[root@iz8rrzrale48hez ssh]# vim sshd_config


# 允许root用户登录
PermitRootLogin yes

# 默认为0，不发送，修改为每60秒发送一次keepalive报文，以保持连接
ClientAliveInterval 60

# 每次keepalive报文发送三个，超过三个仍然未能建立连接的话，断开连接
ClientAliveCountMax 3

# 重新载入ssh参数
[root@iz8rrzrale48hez ssh]# service sshd reload
```

## 5. 安装并配置 Nginx

安装

```shell
➜  ~ yum install -y nginx
```

查看安装路径

```shell
➜  ~ rpm -ql nginx
```

启动与停止

```shell
# 启动
nginx

# 停止
nginx -s stop
```

编辑 `/etc/nginx/nginx.conf`

```text
server {
    listen       80 default_server;
    # listen       [::]:80 default_server;
    server_name  _;
    root         /root/github/vue-admin/dist;
    charset UTF-8;
    index index.html;
}
```

更改权限，使 Nginx 可访问

```shell
chmod o+x /root
```

## 6. 安装 node

```shell
# 安装，但版本太低
yum install nodejs

# 安装镜像源管理
npm install -g nrm
nrm use taobao

# 升级 node
npm install -g n
n stable

# 升级 npm
npm install -g npm
```

## 7. 安装 MongoDB

安装

```zsh
➜  ~ vi /etc/yum.repos.d/mongodb-org-3.6.repo
➜  ~ yum install -y mongodb-org
```

运行

```zsh
➜  ~ mongod &
➜  nodejs-admin git:(master) jobs
[1]  - running    mongod
[2]  + running    node app.js
```

## 8. 使用 `setsid` 命令运行后台任务

使用 ssh 远程连接到 CentOS 执行的后台任务，一旦关闭 ssh ，后台任务就会自动停止。

```shell
# 后台运行 nodejs 服务
➜  ~ cd /root/github/nodejs-admin
➜  nodejs-admin git:(master) ✗ setsid node app.js &

# 后台运行 MongoDB 数据库
➜  ~ setsid mongod &

# 查看端口占用情况
➜  ~ netstat -tunlp | grep 3000
➜  ~ netstat -tunlp | grep 27017
```

## 9. 安装 vsftp

```shell
# 安装
➜  ~ yum install vsftpd
Installed:
  vsftpd.x86_64 0:3.0.2-22.el7

Complete!

# 启动
➜  ~ service vsftpd start

# 查看服务状态
➜  ~ systemctl status vsftpd.service

# 查看进程
➜  ~ ps -ef | grep ftp
root     30085     1  0 19:26 ?   00:00:00 /usr/sbin/vsftpd /etc/vsftpd/vsftpd.conf

# 查看端口
➜  ~ netstat -tnlp | grep ftp
tcp6      0      0 :::21     :::*     LISTEN      30085/vsftpd
```

```shell
# 创建用户
➜  ~ useradd ftptest

# 修改密码：123
➜  ~ passwd ftptest
```

[修改匿名用户的权限](https://juejin.im/post/5ad56f6ef265da238f1309d4)

## 10. 安装 SSL 证书

证书位置

```text
/root/ssl_cert/1539663368755.key
/root/ssl_cert/1539663368755.pem
```

配置 Nginx ：

```shell
➜  ~ vim /etc/nginx/nginx.conf

    server {
        listen 443;
        server_name fn1.top;
        ssl on;
        root         /root/github/vue-admin/dist;
        charset UTF-8;
        index index.html;
        ssl_certificate   /root/ssl_cert/1539663368755.pem;
        ssl_certificate_key  /root/ssl_cert/1539663368755.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

        location ^~/api {
            proxy_set_header Host $http_host;
            proxy_set_header X-Forward-For $remote_addr;
            proxy_pass http://127.0.0.1:3000/api;
            proxy_cookie_path  /api /api;
        }
    }