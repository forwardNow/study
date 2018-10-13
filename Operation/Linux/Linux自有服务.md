# Linux 自有服务

自有服务，即不需要用户另外去安装的服务，而是系统已经有了（内置了）。

## 1. 运行模式

运行模式也称之为运行级别。

### 1.1. CentOS-6

在 Linux 中存在一个进程：init 。pid 为 1。

```shell
➜  ~ ps -ef
UID  PID  PPID  C STIME TTY CMD
root   1     0  0 Oct03 ?   /usr/lib/systemd/systemd --system --deserialize 18
```

该进程（init）存在一个对应的配置文件：inittab。

* 系统运行级别配置文件，位置 `/etc/inittab`
* init 进程初始化是会读取该配置文件

运行级别：

* `0` 关机级别
* `3` 完全的多用户模式，带网络
* `5` X11，完整的图形化界面模式
* `6` 重启级别

跟运行级别有关的命令：

* `init 0` 关机
* `init 3` 切换到多用户模式（临时）
* `init 5` 切换到桌面模式（临时）
* `init 6` 重启

上面这些命令实际上，是将数字（运行级别）传递给了 init 进程，init 进程执行相应的操作。

### 1.2. CentOS-7

CentOS 7.x 已经不使用运行级别了：

```shell
➜  ~ cat /etc/inittab
# inittab is no longer used when using systemd.
#
# ADDING CONFIGURATION HERE WILL HAVE NO EFFECT ON YOUR SYSTEM.
#
# Ctrl-Alt-Delete is handled by /usr/lib/systemd/system/ctrl-alt-del.target
#
# systemd uses 'targets' instead of runlevels. By default, there are two main targets:
#
# multi-user.target: analogous to runlevel 3
# graphical.target: analogous to runlevel 5
#
# To view current default target, run:
# systemctl get-default
#
# To set a default target, run:
# systemctl set-default TARGET.target
#
```

查看当前默认模式（target）：

```shell
➜  ~ systemctl get-default
multi-user.target
```

设置默认模式：

```shell
➜  ~ systemctl set-default multi-user.target
Removed symlink /etc/systemd/system/default.target.
Created symlink from /etc/systemd/system/default.target to /usr/lib/systemd/system/multi-user.target.

➜  ~ systemctl set-default graphical.target
```

## 2. 用户与用户组管理

Linux 系统是一个多用户多任务的操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后以这个账号的身份进入系统。

用户的账号一方面可以帮助系统管理员对使用系统的用户进行跟踪，并控制他们对系统资源的访问；另一方面也可以帮助用户组织文件，并为用户提供安全性保护。

每个用户账号都拥有一个唯一的用户名和各自的密码。

用户在登陆时键入正确的用户名和密码后，就能够进入系统和自己的主目录。

要实现用户账号的管理，要完成的工作主要有如下几个方面：

* 用户账号的添加、删除、修改，用户密码的管理
* 用户组的管理

涉及到三个文件：

* `/etc/passwd` 存储用户的关键信息
* `/etc/group`  存储用户组（主组和附加组）的关键信息
* `/etc/shadow` 存储用户的密码信息

### 2.1. 用户管理

>跟操作用户相关的命令（除了 `passwd`），只有超级管理员才能使用。

```shell
➜  ~ which useradd usermod userdel passwd
/usr/sbin/useradd
/usr/sbin/usermod
/usr/sbin/userdel
/usr/bin/passwd
```

#### 2.1.1. 添加用户

语法：`useradd 选项 用户名`

常用选项：

* `-g` 指定用户主组，选项的值为 id 或组名
* `-G` 指定用户附加组
* `-u` 指定用户的 id（用户的标识符），系统默认会从 500 之后按个分配 uid
* `-c` 添加注释

示例：

```shell
# 创建新用户
➜  ~ useradd zhangsan

# 验证方式 1
➜  ~ cat /etc/passwd | grep zhangsan
zhangsan:x:1001:1001::/home/zhangsan:/bin/bash

# 验证方式 2
➜  ~ tail -1 /etc/passwd
zhangsan:x:1001:1001::/home/zhangsan:/bin/bash

# 验证方式 3
➜  ~ ls /home
ftptest  zhangsan
```

执行 `useradd` 后，系统会默认为你做：

* 创建同名的家目录
* 创建同名的用户组

解读：

```text
zhangsan:x:1001:1001::/home/zhangsan:/bin/bash

用户名:密码:用户ID:用户组ID:注释:家目录:解释器 shell

用户名：用户的账号，登陆时需要输入
密码：一般都是“x”，表示占位符
用户ID：用户的标识符
用户组ID：所属的主组
注释：解释该用户是做什么的
家目录：用户登陆后默认的位置（`~`）
解释器 shell：用户输入指令后，该解释器会收集用户输入传递给内核处理
```

#### 2.1.2. 修改用户

语法：`usermod 选项 用户名 [新的用户名]`

常用选项：

* `-g`
* `-G`
* `-u`
* `-l` 修改用户名

示例：

```shell
➜  ~ tail -3 /etc/passwd
mongod:x:996:994:mongod:/var/lib/mongo:/bin/false
ftptest:x:1000:1000::/home/ftptest:/bin/bash
zhangsan:x:1001:1001::/home/zhangsan:/bin/bash

# 将 zhangsan 修改为 lisi
➜  ~ usermod -u 1002 -g 1000 -G 1000 -l lisi zhangsan
➜  ~ tail -3 /etc/passwd
mongod:x:996:994:mongod:/var/lib/mongo:/bin/false
ftptest:x:1000:1000::/home/ftptest:/bin/bash
lisi:x:1002:1000::/home/zhangsan:/bin/bash

# 查看主组和附加组
➜  ~ tail -3 /etc/group
mongod:x:994:
ftptest:x:1000:lisi
zhangsan:x:1001:
```

#### 2.1.3. 设置用户密码

Linux 不允许不允许没有密码的用户登陆到系统，新建的用户处于锁定状态

语法：`passwd 用户名`

示例：

```shell
➜  ~ tail -1 /etc/passwd
lisi:x:1002:1000::/home/zhangsan:/bin/bash

➜  ~ passwd lisi
Changing password for user lisi.
New password:【123456】
BAD PASSWORD: The password is shorter than 8 characters
Retype new password:
passwd: all authentication tokens updated successfully.

# 查看密码是否已经设置（mongod 没有密码）
➜  ~ tail -3 /etc/shadow
mongod:!!:17808::::::
ftptest:$6$FHB9KYAi$rMcyq/Qt/VtCDPVJ5d/MLeDZ369z2s06v4j2H/UPpFPHpu/Gn6HmwCO64R6zd0.gCmHtPCeNgShIJGJMM6gR20:17811:0:99999:7:::
lisi:$6$diehAwbc$rMfya2qyJ5.rKj4txUHqStSiuqEHxk5WXU7SGlm.FRqe5spld7clpEsEa0xYGTL01mpJhK1gwZd7ZzWTbhxiE1:17817:0:99999:7:::
```

#### 2.1.4. 切换用户

语法：`su 用户名`

说明：

* switch user
* 如果不指定用户名则切换到超级管理员
* 切换用户后，工作路径不变
* 超级管理员切换到普通用户不需要密码
* 超级管理员可以访问普通用户的家目录

示例：

```shell
# 切换到 lisi 用户
➜  ~ su lisi
[lisi@iz8rrzrale48hez root]$ pwd
/root
[lisi@iz8rrzrale48hez root]$ cd
[lisi@iz8rrzrale48hez ~]$ pwd
/home/zhangsan

# 切换到超级管理员
[lisi@iz8rrzrale48hez ~]$ su
Password:
➜  zhangsan cd
➜  ~ pwd
/root
```

#### 2.1.5. 删除用户

语法：`userdel 选项 用户名`

常用选项：

* `-r` ： 表示删除用户，并删除其家目录

示例：

```shell
# 已登录的用户，无法删除
➜  ~ userdel lisi
userdel: user lisi is currently used by process 8728

➜  ~ ps -ef | grep lisi
root      8727  8633  0 17:59 pts/1    00:00:00 su lisi
lisi      8728  8727  0 17:59 pts/1    00:00:00 bash

# 终止相关进程，再进行删除用户操作
➜  ~ kill 8727

➜  ~  ...killed.

➜  ~  userdel lisi
```

### 2.2. 用户组管理

每个用户都有一个用户组，系统可以对一个用户组中的所有用户进行集中管理。

不同 Linux 系统对用户组的规定有所不同，如创建新用户时，如果不指定用户组，会创建（与用户名）同名的用户组。

用户组的管理涉及用户组的添加、删除、修改，实际上是对 `/etc/group` 文件的更新。

```shell
➜  ~ tail /etc/group
postfix:x:89:
chrony:x:996:
sshd:x:74:
ntp:x:38:
tcpdump:x:72:
nscd:x:28:
nginx:x:995:
mongod:x:994:
ftptest:x:1000:
zhangsan:x:1001:
```

文件内容结构：

`用户组名:密码占位符:用户组ID:组内用户名`

* 密码占位符：一般不会去设置密码
* 组内用户名：哪些用户将该组作为附加组

#### 2.2.1. 用户组添加

语法：`groupadd 选项 组名`

常用选项：

* `-g`：指定用户组 ID。（如果不指定，默认从 1000 开始挨个分配）

示例：

```shell
➜  ~ groupadd admin
➜  ~ tail -1 /etc/group
admin:x:1002:
```

#### 2.2.2. 用户组修改

语法：`groupmod 选项 组名`

常用参数：

* `-g`：修改 ID
* `-n`：修改组名

示例：

```shell
➜  ~ tail -1 /etc/group
admin:x:1002:
➜  ~ groupmod -n wahaha -g 1010 admin
➜  ~ tail -1 /etc/group
wahaha:x:1010:
```

#### 2.2.3. 用户组删除

语法：`groupdel 组名`

示例：

```shell
➜  ~ groupdel wahaha
➜  ~ cat /etc/group | grep wahaha
➜  ~
```

注意：

* 当删除的组是某个用户的主组时，不能删除这个组；要先移除组内所有用户。

## 3. 网络设置

### 3.1. 网卡配置文件

位置：`/etc/sysconfig/network-scripts`

文件命名格式：`ifcfg-网卡名称`

```shell
➜  ~ ls /etc/sysconfig/network-scripts | grep ifcfg
ifcfg-eth0
ifcfg-lo
```

查看：

```shell
➜  ~ cat /etc/sysconfig/network-scripts/ifcfg-lo
DEVICE=lo
IPADDR=127.0.0.1
NETMASK=255.0.0.0
NETWORK=127.0.0.0
# If you're having problems with gated making 127.0.0.0/8 a martian,
# you can change this to something else (255.255.255.255, for example)
BROADCAST=127.255.255.255
ONBOOT=yes
NAME=loopback

➜  ~ cat /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0
BOOTPROTO=dhcp
ONBOOT=yes
```

### 3.2. 网卡服务重启方式

**方式一**：

```shell
➜  ~ service network restart
```

有些 Linux 分支不见得有这个服务。

**方式二**：

```shell
➜  ~ ls -l /etc/init.d/
total 52
-rw-r--r--  1 root root  1160 Sep  7  2017 README
-rwxr-xr-x  1 root root  2164 Sep 28 10:08 aegis
-rwxr-xr-x  1 root root  3044 Sep 28 10:08 agentwatch
-rw-r--r--. 1 root root 17500 May  3  2017 functions
-rwxr-xr-x  1 root root  3693 Sep 18 22:16 mongod
-rwxr-xr-x. 1 root root  4334 May  3  2017 netconsole
-rwxr-xr-x. 1 root root  7293 May  3  2017 network

➜  ~ /etc/init.d/network restart

➜  ~ /etc/init.d/network restart
Restarting network (via systemctl):                        [  OK  ]
```

`/etc/init.d/` 目录下存放着服务的快捷方式，可直接执行。

创建快捷方式（软链接）：

* 语法：`ln -s 文件路径 快捷方式路径`

### 3.3. 重启指定网卡

语法：

* `ifdown 网卡名` 停止指定网卡
* `ifup 网卡名` 启动指定网卡

示例：

```shell
➜  ~ ifdown eth0
➜  ~ ifup eth0
```

注意：

在实际工作中不要禁用网卡。

## 4. SSH 服务

### 4.1. 介绍

SSH：secure shell，安全外壳协议。

有两个常用方式：

* 远程连接
* 远程文件传输

SSH 协议默认使用 22 端口号。（防火墙默认是允许该端口号的）

### 4.2. 配置文件

位置：`/etc/ssh/ssh_config`

```shell
➜  ~ cat /etc/ssh/ssh_config
......
# Host *
#   ForwardAgent no
#   ForwardX11 no
#   RhostsRSAAuthentication no
#   RSAAuthentication yes
#   PasswordAuthentication yes
#   HostbasedAuthentication no
#   GSSAPIAuthentication no
#   GSSAPIDelegateCredentials no
#   GSSAPIKeyExchange no
#   GSSAPITrustDNS no
#   BatchMode no
#   CheckHostIP yes
#   AddressFamily any
#   ConnectTimeout 0
#   StrictHostKeyChecking ask
#   IdentityFile ~/.ssh/identity
#   IdentityFile ~/.ssh/id_rsa
#   IdentityFile ~/.ssh/id_dsa
#   IdentityFile ~/.ssh/id_ecdsa
#   IdentityFile ~/.ssh/id_ed25519
#   Port 22
#   Protocol 2
#   Cipher 3des
#   Ciphers aes128-ctr,aes192-ctr,aes256-ctr,arcfour256,arcfour128,aes128-cbc,3des-cbc
#   MACs hmac-md5,hmac-sha1,umac-64@openssh.com,hmac-ripemd160
#   EscapeChar ~
#   Tunnel no
#   TunnelDevice any:any
#   PermitLocalCommand no
#   VisualHostKey no
#   ProxyCommand ssh -q -W %h:%p gateway.example.com
#   RekeyLimit 1G 1h
#
# Uncomment this if you want to use .local domain
# Host *.local
#   CheckHostIP no

➜  ~
```

### 4.3. 重启

```shell
➜  ~ service sshd restart
Redirecting to /bin/systemctl restart sshd.service
```

### 4.3. 应用

## 5. 修改主机名
