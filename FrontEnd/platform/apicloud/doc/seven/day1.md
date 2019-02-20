# 第 1 天：介绍与准备

>了解 APICloud 平台、理解 APICloud 应用设计思想、掌握平台使用流程。学习如何对一款 APP 进行需求分析、功能分解和架构设计等编码之前重要的准备工作。

**学习目标**：

* 总体上了解一下 APICloud 平台，重点介绍相关的学习资源，入门资料，常见的 FAQ 等
* 明确我们这七天要开发一个什么样的 APP，明确功能需求，跟上每天的课程节奏，可以课前预习
* 梳理出对于一款 APP，在开发之前（Coding 之前），一些通用而又重要的准备工作，适合于所有 APP 开发，而非单指 APICloud

**主要内容**：

1. APICloud 平台介绍
   1. 查看 APICloud 平台能力
   2. APICloud 应用的开发模式和使用的技术语言
   3. APICloud 技术、产品、生态、案例、商业模式的总体介绍
   4. APICloud 开发者相关的服务支撑体系
   5. 新手应该如何开始入门 APICloud 应用开发
2. APICloud 平台使用流程
   1. APICloud 云控制台使用
   2. 选择一款主流 H5 编码工具并安装相应的 APICloud 插件
   3. APICloud 应用开发的基础操作流程
3. 应用需求分析
   1. 梳理需求说明文档
   2. 进行 UE/UI 设计
4. 总体架构设计
   1. APICloud 应用设计思想
5. UI 架构设计
   1. APICloud 应用的 UI 组成结构
   2. APICloud 界面布局 5 大组件
   3. APICloud 混合渲染技术原理
   4. 使用 APICloud 的 5 大 UI 组件完成应用 UI 架构设计
   5. 输出 APP 的 UI 架构设计文档
6. 功能点分解
   1. 基于需求说明，梳理出主要功能点
   2. 为每个功能点，给出合适的技术实现方案
   3. 在 APICloud 聚合 API 找到功能点对应的模块
   4. 输出 APP 的功能模块分解文档
7. 开放服务选择
   1. 基于需求说明，梳理出需要使用的开放服务
   2. 调研不同的开放服务商所提供的服务是否能满足自己应用的需求
   3. 在 APICloud 聚合 API 找到对应的开放服务模块
   4. 输出 APP 的开放服务分解文档
8. 数据接口定义
   1. 定义服务端接口文档
   2. 输出服务端接口调试文件
9. 应用证书和第三方 Key 申请
   1. 申请应用证书
   2. 确定应用包名
   3. 申请开放平台相关 Key

## 1. APICloud 平台介绍

### 1.1. 查看 APICloud 平台能力

要使用 APICloud 平台开发 APP，很多用户的第一个问题是：APICloud 平台能否满足自己的 APP 开发需求?

查看：[API 文档](https://docs.apicloud.com/)

通过关键字（如 “支付”、“扫码” 等）搜索相关功能模块。

APICloud 平台功能体系:

![https://docs.apicloud.com/img/docImage/seven-course/day1/1.1.png](https://docs.apicloud.com/img/docImage/seven-course/day1/1.1.png)

### 1.2. APICloud 应用的开发模式和使用的技术语言

APICloud 应用开发模式： 标准的 HTML/CSS/JS + APICloud 扩展 API

![https://docs.apicloud.com/img/docImage/seven-course/day1/1.2.png](https://docs.apicloud.com/img/docImage/seven-course/day1/1.2.png)

APICloud 扩展 API 调用方式： 就是使用标准的 JavaScript 语法，与标准的 JavaScript 对象调用方式一致。

```javascript
// 核心模块在 window.api 对象下，不需要单独引用，可以直接调用
api.methodName(param, callback);

// 扩展模块需要 require 引入，遵守 CommonJS 规范
var module = api.require('moduleName');
module.methodName(param, callback);

// 参数，是一个 JSON 对象
// param: {}

// 回调函数，是一个 Function 对象，方法调用的结果通过此函数返回
// callback: function(ret, err){}
```

例如：

```javascript
// 打开新窗口
api.openWin();

// 打开系统通讯录
api.openContacts();

// 录音
api.startRecord();

// 缓存网络图片
api.imageCache();

// 加载fs模块
var fs = api.require('fs');

// 新建一个文件
fs.createFile();

// 加载二维码/条形码扫描模块
var scanner = api.require('FNScanner');

// 打开二维码/条形码扫描
scanner.openScanner();
```

为什么要扩展 API？

* 兼容性
* Page != App
  * Page 强调页面
  * App 强调功能和体验
* B/S vs Client/Cloud
  * B/S，传统的架构，浏览器和服务器。
  * Client/Cloud，移动互联网起来后，终端类型多种多样，客户端提供功能和界面，云端提供数据和服务。
* 速度、交互、体验
  * 用 HTML5 来开发是一个挑战
* 迭代
  * HTML5 标准很难达到一致，迭代缓慢
  * Android、iOS 每次发布新版本都是行业迫切需要的功能。
* 扩展
  * HTML5 所没有的功能

APICloud 平台定位：

![https://docs.apicloud.com/img/docImage/seven-course/day1/1.4.png](https://docs.apicloud.com/img/docImage/seven-course/day1/1.4.png)

### 1.3. APICloud 技术、产品、生态、案例、商业模式的总体介绍

