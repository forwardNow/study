 # 笔记

## 1. Node.js 是什么

Node.js 是一个JavaScript运行时环境，也就是说可以解析和执行JavaScript代码的容器。

浏览器中的JavaScript：（做界面）
* EcmaScript
* BOM
* DOM

Node.js中的JavaScript：（做服务端）
* EcmaScript
* 操作node服务器提供的API
    * 文件读写
    * 网络服务的构建
    * 网络通信
    * http服务器
    * 等

特性：
* 事件驱动
* 非阻塞IO模型（异步）

构建于Chrome的V8引擎之上
* 代码之上具有特定格式的文本，引擎认识它并帮你解析和执行
* V8是解析执行JavaScript代码最快的

## 2. Node.js 做什么

* Web服务器后台
* 命令行工具
    * npm（node）
    * git（c语言）
    * webpack
    * gulp
    * hexo（node）
* 游戏服务器
