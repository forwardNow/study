# Linux自有服务

## 1. 修改主机名

### 1.1. 临时设置

语法：`hostname 新的主机名`

示例：

```shell
➜  ~ hostname aliyun

➜  ~ hostname
aliyun

# 切换一下用户，即可显示切换后的主机名
➜  ~ su
```

### 1.2. 永久设置

>需要重启后生效

修改配置文件 `/etc/sysconfig/network` 中的 `HOSTNAME` 的值即可

```shell
# 修改配置文件
➜  ~ vim /etc/sysconfig/network
# Created by anaconda
NETWORKING_IPV6=no
PEERNTP=no
HOSTNAME=aliyun

# 将主机名加入本地 hosts 文件：如果不设置，有些服务器软件（如 Apache）可能不能运行
➜  ~ vim /etc/hosts
127.0.0.1   localhost aliyun
::1         localhost localhost.localdomain

# 测试
➜  ~ ping aliyun
PING aliyun (172.17.248.133) 56(84) bytes of data.
64 bytes from aliyun (172.17.248.133): icmp_seq=1 ttl=64 time=0.016 ms
64 bytes from aliyun (172.17.248.133): icmp_seq=2 ttl=64 time=0.033 ms
```

## 2. `chkconfig`

作用：开机启动项的管理。

|任务|旧指令|新指令|
|-|-|-|
|使某服务自动启动|chkconfig --level 3 httpd on|systemctl enable httpd.service|
|使某服务不自动启动|chkconfig --level 3 httpd off|systemctl disable httpd.service|
|检查服务状态|service httpd status|systemctl status httpd.service （服务详细信息）<br>systemctl is-active httpd.service （仅显示是否 Active)|
|显示所有已启动的服务|chkconfig --list|systemctl list-units --type=service|
|启动某服务|service httpd start|systemctl start httpd.service|
|停止某服务|service httpd stop|systemctl stop httpd.service|
|重启某服务|service httpd restart|systemctl restart httpd.service|

### 2.1. 查询启动项

6.x 的指令

```shell
➜  ~ chkconfig --list

注：该输出结果只显示 SysV 服务，并不包含
原生 systemd 服务。SysV 配置数据
可能被原生 systemd 配置覆盖。

      要列出 systemd 服务，请执行 'systemctl list-unit-files'。
      查看在具体 target 启用的服务请执行
      'systemctl list-dependencies [target]'。

aegis          0:关 1:关  2:开  3:开  4:开  5:开  6:关
agentwatch     0:关 1:关  2:开  3:开  4:开  5:开  6:关
mongod         0:关 1:关  2:关  3:开  4:关  5:开  6:关
netconsole     0:关 1:关  2:关  3:关  4:关  5:关  6:关
network        0:关 1:关  2:开  3:开  4:开  5:开  6:关

# 3 是命令行模式，5 是桌面模式
```

7.x 新指令 [systemctl命令](http://man.linuxde.net/systemctl)：

```shell
➜  ~ systemctl list-units --type=service | grep sshd
  UNIT                               LOAD   ACTIVE SUB     DESCRIPTION
  sshd.service                       loaded active running OpenSSH server daemon

LOAD   = Reflects whether the unit definition was properly loaded.
ACTIVE = The high-level unit activation state, i.e. generalization of SUB.
SUB    = The low-level unit activation state, values depend on unit type.
```

### 2.2. 添加开机启动服务

语法：`chkconfig --add 服务名`

注意：

* 只能添加可以通过 `service ssh start` 启动的服务才可以添加

### 2.3. 删除开机启动服务

语法：`chkconfig --del 服务名`

### 2.4. 设置服务在指定级别启动

语法：`chkconfig --level 35 服务名 on` （或者 `off`）

## 3. ntp 服务

## 4. 防火墙

## 5. rpm 软件管理

## 6. cron 计划任务