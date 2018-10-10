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

## 3. 网络设置

## 4. ssh 服务

## 5. 修改主机名
