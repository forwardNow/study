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

查看：[./webpack/01-sample/src/index.html](./webpack/01-sample/src/index.html)

需求：使用 jQuery 将列表隔行变色。

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

**总结**：

1. webpack 能够处理 JS 文件的互相依赖关系；
2. webpack 能够处理 JS 兼容问题，把浏览器不识别的语法转为能识别的语法。

## 5. 最基本的配置文件

查看：[./webpack/02-base-config](./webpack/02-base-config)

**创建并编辑 webpack.config.js 文件**：

```javascript
const path = require('path');

module.exports = {
  // 入口。指定要打包文件的位置
  entry: path.join(__dirname, './src/main.js'),

  // 出口。输出文件相关的配置
  output: {
    // 指定打包好的文件，输出的位置
    path: path.join(__dirname, './dist'),

    // 指定输出文件的名称
    filename: 'bundle.js',
  },
};
```

**执行打包命令**：

```shell
$ ./node_modules/.bin/webpackHash: b1bcaed961f060499873
Version: webpack 3.12.0
Time: 220ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  275 kB       0  [emitted]  [big]  main
   [0] ./src/main.js 132 bytes {0} [built]
    + 1 hidden module
```

**总结**：

1. 执行 `webpack` 命令时，没有指定入口和出口
2. webpack 就去找 `webpack.config.js` 文件
3. 执行 `webpack.config.js` 文件获取到配置对象
4. 根据配置文件中指定的入口和出口进行打包构建。

## 6. webpack-dev-server

当改动代码后，想立即看到改变后的效果。

node/nodemon 、 webpack/webpack-dev-server

### 6.1. 基本使用

查看：[./webpack/03-dev-server-base](./webpack/03-dev-server-base)

**安装**：

```shell
$ npm install webpack-dev-server@2
+ webpack-dev-server@2.11.3
```

webpack-dev-server 如果想要正常运行，需要本地安装 webpack。

**运行**：

```shell
$ ./node_modules/.bin/webpack-dev-server
Project is running at http://localhost:8080/
webpack output is served from /
Hash: 4745cdd348836783435c
Version: webpack 3.12.0
Time: 382ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  597 kB       0  [emitted]  [big]  main
```

**总结**：

* 打包后的文件存放到内存中以避免频繁读写磁盘，通过 `http:localhost:8080/bundle.js` 访问
* 改变 `/src/` 中的文件后，会自动刷新浏览器

### 6.2. 常用参数

* `--open` 自动打开浏览器
* `--port 8000` 设置端口号
* `--contentBase src` 设置根路径
* `--hot` 热更新
  * 不会重新编译完整的 bundle，以补丁的方式加载变化的部分；
  * 不会刷新整个页面（针对样式的修改）

推荐在 `scripts` 中定义

```json
"scripts": {
  "dev": "webpack-dev-server --open --port 8000 --contentBase src --hot"
},
```

运行 `npm run dev` 即可。

### 6.3. 在配置文件中设置参数

这种方式要稍显麻烦，设置热更新需要 webpack 的热更新模块插件。

```javascript
// 启用热更新:第 2 步
const webpack = require('webpack');

module.exports = {
  // ...

  // 配置 webpack-dev-server
  devServer: {
    open: true, // 自动打开浏览器
    port: 8000, // 端口号
    contentBase: 'src', // 设置根目录
    hot: true,  // 启用热更新:第 1 步
  },

  // 配置插件
  plugins: [ 
    // 启用热更新:第 3 步
    new webpack.HotModuleReplacementPlugin(),
  ],
};
```

## 7. html-webpack-plugin 插件

**说明**：

不使用该插件：

* 需要指定启动的目录（`--contentBase src`）
* 需要手动引入 `<script src="/bundle.js">`

使用该插件后：

* 将指定模板编译到内存，避免频繁读写磁盘
* 自动把打包好的 `bundle.js` 插入到 `<body>` 末尾

**使用**：

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ...

  // 配置插件
  plugins: [
    // 启动页
    new HtmlWebpackPlugin({
      // 指定模板页面：将此模板编译到内存中
      template: path.join(__dirname, './src/index.html'),

      // 指定编译后的文件名称
      filename: 'index.html',
    }),
  ],
};
```

## 8. 处理样式文件

webpack 默认只能打包处理 JS 类型的文件，非 JS 文件需要配置（loader）。

### 8.1. css 文件

**安装**：

```shell
$ npm i css-loader@0.28.11 -D

+ css-loader@0.28.11

$ npm i style-loader -D

+ style-loader@0.23.0
```

**配置**：

```javascript
module.exports = {
  // ...

  // 配置第三方模块加载器
  module: {

    /*
     * 文件的匹配规则和对应处理器
     * webpack 要处理的文件不是 JS 文件时，会在这里匹配相应的 loader 进行处理，
     * 处理的结果直接交给 webpack 进行打包合并，最终输出到 bundle.js
     */
    rules: [
      {
        // 匹配规则
        test: /\.css$/,

        /*
         * 匹配到了使用哪些 loader 来处理
         * loader 从右到左调用，以管道的方式
         */
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

```

### less 文件

**安装**：

```shell
$ npm i less-loader -D

+ less-loader@4.1.0

$ npm i less -D

+ less@3.8.1
```

**配置**：

```javascript
module.exports = {
  // ...

  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
};

```