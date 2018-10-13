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

## 3. 网络设置

## 4. ssh 服务

## 5. 修改主机名
