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

示例：

```shell

```

## 3. 网络设置

## 4. ssh 服务

## 5. 修改主机名
