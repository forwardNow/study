# webpack

## 1. nrm

**作用**：

提供了一些最常用的 NPM 包镜像地址，能够让我们快速的切换安装包时候的服务器地址。

**镜像**：

以前 npm 包只存在于国外的 NPM 服务器，但是由于网络原因经常访问不了；

这时候，有人在国内创建了一个和官网完全一样的 NPM 服务器，其数据全部同步自官网。

**使用**：

```shell
# 安装
$ sudo npm i nrm -g
+ nrm@1.0.2

# 查看镜像源地址
$ nrm ls

  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/

# 切换镜像源地址
$ nrm use npm
$ nrm use taobao
```