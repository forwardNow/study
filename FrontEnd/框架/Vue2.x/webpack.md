# webpack

## 1. nrm

> nrm 只是提供了镜像地址，并切换镜像地址。我们安装包时还是需要使用 npm。

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
$ nrm use taobao

   Registry has been set to: https://registry.npm.taobao.org/
```

## 2. webpack 概念

### 2.1. 在网页中会引入常见的资源

* JS
  * .js
  * .jsx
  * .ts
* CSS
  * .css
  * .less
  * .scss (与 less 差不多)
  * .sass (已经很少用了)
* image
  * .jpg
  * .png
  * .gif
  * .svg
* font(字体文件)
  * .svg
  * .ttf
  * .eot
  * .woff
  * .woff2
* template(模板文件)
  * .ejs
  * .art (art-template)
  * .vue (在 webpack 中定义的单文件组件)

### 2.2. 网页中引入静态资源过多带来的问题

1. 网页加载速度慢
    * 解析 HTML 文件的过程中请求其他的资源
2. 处理错综复杂的依赖关系

### 2.3. 解决上述问题

问题 1：

* js、css
  * 合并、压缩
* image
  * 精灵图
  * base64

问题 2：

* requireJS
* webpack

同时解决 问题1 和 问题2：

* Gulp
  * 基于 task 任务的
  * 小巧灵活
* webpack
  * 基于整个项目进行构建的

### 2.4. webpack 是什么

webpack 是前端的一个项目构建工具，它是基于 Node.js 开发出来的一个前端工具。

解决依赖关系，减少网络请求。

借助 webpack可以完美实现资源的合并、打包、压缩、混淆等诸多功能。

## 3. 安装

```shell
# 全局安装
$ sudo npm install -g webpack

# 安装到项目依赖
$ npm install webpack --save-dev
```

## 4. 初步使用

>1.webpack 能够处理 JS 文件的互相依赖关系；2.webpack 能够处理 JS 兼容问题，把浏览器不识别的语法转为能识别的语法。

**项目结构**：

```text
/
  dist/
  src/
    css/
    images/
    js/
    index.html
    main.js
  package.json
```

**安装 webpack 、jquery**：

```shell
$ npm install --save-dev webpack@3
+ webpack@3.12.0

$ npm install --save jquery
```

**编写 `main.js`**：

```javascript
import $ from 'jquery';

$(() => {
  $('li:odd').css('backgroundColor', 'red');
  $('li:even').css('backgroundColor', 'blue');
});
```

**打包**：

```shell
$ ./node_modules/.bin/webpack ./src/main.js ./dist/bundle.js

    Asset    Size  Chunks                    Chunk Names
bundle.js  275 kB       0  [emitted]  [big]  main
   [0] ./src/main.js 131 bytes {0} [built]
    + 1 hidden module
```

**在 index.html 中引用**：

```html
<!DOCTYPE html>
<html lang="en">
<body>
  <ul>
    <li>111111111</li>
    <li>2222222222</li>
    <li>33333333</li>
    <li>444444444</li>
  </ul>
  <script src="../dist/bundle.js"></script>
</body>
</html>
```