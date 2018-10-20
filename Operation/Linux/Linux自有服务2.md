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

**作用**：同步计算机的时间。

**同步方式**：

* 手动同步
* 通过服务自动同步

**上游时间服务器的概念**：

```text
根时间服务器
    ......
        上上一级的时间服务器
            上一级的时间服务器
                自己的服务器
```

**手动同步**：

语法：`ntpdate 时间服务器地址`

可在 [http://www.ntp.org.cn/](http://www.ntp.org.cn/) 选择ntp服务器获取时间

```shell
➜  ~ ntpdate 120.25.108.11
```

**通过服务自动同步**：

启动 `ntpd` 服务即可：`service ntpd start`。

```shell
➜  ~ systemctl list-units --type=service | grep ntp
  ntpd.service  loaded active running Network Time Service
```

## 4. 防火墙服务

### 4.1. 介绍

防火墙：

* 防范网络攻击
* 有软件防火墙、硬件防火墙之分
* 选择性让请求通过，从而保证网络安全性
* 早 CentOS 6.x 中使用的是 iptables
* 在 CentOS 7.x 中使用的是 firewalld
* 国家长城防火墙 GFW

### 4.2. 使用

```shell
# 启动
➜  ~ service firewalld start
Redirecting to /bin/systemctl start firewalld.service

# 查看进程
➜  ~ ps -ef | grep fire
root      1918     1  2 16:30 ? 00:00:00 /usr/bin/python -Es /usr/sbin/firewalld --nofork --nopid

# 查看服务状态
➜  ~ service firewalld status
Redirecting to /bin/systemctl status firewalld.service
● firewalld.service - firewalld - dynamic firewall daemon
   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; disabled; vendor preset: enabled)
   Active: inactive (dead)
     Docs: man:firewalld(1)

# 关闭
➜  ~ service firewalld stop
Redirecting to /bin/systemctl stop firewalld.service
```

## 5. rpm 软件管理

### 5.1. 介绍

用于 Linux 中的软件包管理：

* 查询
* 安装（更新）
* 卸载

### 5.2. 查询

语法：`rpm 选项 软件名`

常用选项：

* `-q` 查询 query
* `-a` 全部 all

示例：

```shell
# 查看有没有装某个软件
➜  ~ rpm -qa | grep node
nodejs-6.14.3-1.el7.x86_64
```

### 5.3. 卸载

语法：`rpm -e 软件名`

注意：

* 没有被其他软件依赖的软件，可直接卸载
* 强制卸载，不考虑依赖关系：`rpm -e 软件名 --nodeps`

### 5.4. 安装

>安装 rpm 包

安装包的获得方式

* 去官网下载最新版本
* 从光盘中安装

查看块状设备：

```shell
➜  ~ lsblk
NAME   MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
vda    253:0    0  40G  0 disk
└─vda1 253:1    0  40G  0 part /
```

设备的挂载和弹出：

* `umount 设备的挂载点` ：弹出
* `mount 设备原始地址 设备的挂载点` ：挂载

```shell
# 查看设备的原始地址
➜  ~ ls -l /dev

➜  ~ mkdir /mnt/dvd

# 挂载
➜  ~ mount /dev/sr0 /mnt/dvd

# 弹出
➜  ~ umount /mnt/dvd
```

安装软件包：`rpm -ivh 完整软件名称`

* `-i` 安装 install
* `-v` 显示进度条
* `-h` 以 `#` 方式显示进度条

```shell
rpm -ivh ...../xxx.rpm
```

## 6. cron 计划任务

### 6.1. 介绍

在指定的时间点执行任务（如凌晨两点重启 Nginx）。

### 6.2. 使用

语法：`crontab 选项`

常用选项：

* `-l` 列出指定用户的计划任务列表
* `-e` 编辑~
* `-u` 指定用户的用户名，默认为当前用户
* `-r` 删除指定用户的计划任务

计划任务的语法：（一行为一个计划）

* `分 时 日 月 周 需要执行的命令`
* `45 15 * * * ls -l` 每天 15:45 执行这个命令
* 取值范围：
  * 分：0~59
  * 时：0~23
  * 日：1~23
  * 月：1~12
  * 周：0-6，0 表示星期天
* 符号
  * `*` 表示通配
  * `-` 区间，如 `1-7`
  * `/` 每隔，如在分的位置写 `*/10` 表示每隔10分钟执行一次
  * `,` 多个，在分的位置写 `1,2,3`

示例：

```shell
➜  ~ crontab -e
no crontab for root - using an empty one
crontab: installing new crontab

➜  ~ crontab -l
 45 15 * * * ls -l

➜  ~ crontab -r
➜  ~ crontab -l
no crontab for root

# 每月 1、10、22 日的 04:45 重启 network
45 4 1,10,22 * * service network restart

# 双休 01:10 重启
10 1 * * 5,6 reboot

# 每天 18:00 ~ 23:00，每间隔 30 分钟重启一次
*/30 18-23 * * * reboot
```

### 6.3. 权限问题

默认情况下，所有用户都可以创建计划任务的，超级管理员可通过配置文件设置某些用户创建计划任务的权限

文件

* `/etc/cron.deny`（黑名单）直接在配置文件里写用户名即可，一行一个
* `/etc/cron.allow`（白名单）默认不存在，需要创建，优先级高于黑名单