# ECS

[阿里云服务器公网ip无法访问解决办法](https://yq.aliyun.com/articles/87135)

远程连接密码: 183376

## 1. CentOS5

### 1.1. 账户

账户: root / Wu+

远程连接：

```shell
$ ssh root@39.105.88.174

Welcome to Alibaba Cloud Elastic Compute Service !
```

### 1.2. 修改 ssh 配置

```shell
[root@iz8rrzrale48hez ssh]# cd /etc/ssh
[root@iz8rrzrale48hez ssh]# vim sshd_config


# 允许root用户登录
PermitRootLogin yes

# 默认为0，不发送，修改为每60秒发送一次keepalive报文，以保持连接
ClientAliveInterval 60

# 每次keepalive报文发送三个，超过三个仍然未能建立连接的话，断开连接
ClientAliveCountMax 3  
```