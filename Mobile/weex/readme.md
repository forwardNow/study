# Weex

## 1. 环境

官网：[https://weex.incubator.apache.org/cn](https://weex.incubator.apache.org/cn)

```shell
# 全局安装
$ sudo npm install -g weex-toolkit

# 报各种警告，安装错误；删除重新安装。
$ sudo rm -Rf /Users/forwardNow/.xtoolkit
$ sudo rm -Rf /usr/local/lib/node_modules/weex-toolkit

# 设置权限
$ sudo chmod -R 777 /Users/forwardNow/.xtoolkit

$ weex -v
? May weex-toolkit anonymously report usage statistics to improve the tool over time? Yes
? Which npm registry you perfer to use? taobao
09:33:01 : Set telemetry => true
09:33:01 : Set registry => http://registry.npm.taobao.org
Set telemetry = true
Set registry = "http://registry.npm.taobao.org"
09:33:01 : You can config this configuration again by using `weex config [key] [value]`
09:33:01 : Enjoying your coding time!

   v1.3.11
 - weex-builder : v0.4.0
 - weex-previewer : v1.5.1
```