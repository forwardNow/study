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

### 8.2. less 文件

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

### 8.3. scss 文件

**安装**：

```shell
$ npm i sass-loader -D

+ sass-loader@7.1.0

$ npm i node-sass -D

+ node-sass@4.9.3
```

**配置**：

```javascript
module.exports = {
  // ...

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
```

## 9. 处理图片路径

默认情况下，webpack 无法处理 css 文件中的 url 地址，无论是图片还是字体文件。

**安装**：

```shell
$ npm i url-loader@0.6.2 -D

+ url-loader@0.6.2

$ npm i file-loader@0.11.2 -D

+ file-loader@0.11.2
```

**配置**：

```javascript
{
  test: /\.(jpg|png|gif|bmp|jpeg)$/,

  /*
    * url-loader 依赖 file-loader
    * 默认转 base64，可通过设置 limit 参数，当小于该值时才转 base64
    */
  use: [
    {
      loader: 'url-loader',
      options: {
        // 单位 KB
        limit: 92,

        /*
          * 设置打包后的文件名称，默认为 hash 值名称
          * [hash:8] 取前 8 位 hash 值
          */
        name: '[name].[hash:8].[ext]',
      },
    },
  ],
},
```

## 10. 处理字体文件

**说明**：

使用 `url-loader`

**配置**：

```javascript
// 处理字体文件
{
  test: /\.(ttf|eot|svg|woff|woff2)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        // 单位 KB
        limit: 1024 * 2,

        /*
          * 设置打包后的文件名称，默认为 hash 值名称
          * [hash:8] 取前 8 位 hash 值
          */
        name: '[name].[hash:8].[ext]',
      },
    },
  ],
},
```

## 11. 处理 ECMAScript 高级语法

**说明**：

webpack 默认只能处理一部分 ES6 的新语法，更高级的语法需要借助第三方 loader。

使用 [babel](https://babeljs.io/) 帮我们将高级语法转换为低级语法

**安装**：

```shell
# 核心包及插件
$ npm i -D babel-core babel-loader@7 babel-plugin-transform-runtime

+ babel-loader@7.1.5
+ babel-plugin-transform-runtime@6.23.0
+ babel-core@6.26.3

# 可使用的 ES 语法（语法包）：env 包含所有的 ES 语法。
$ npm i -D babel-preset-env babel-preset-stage-0

+ babel-preset-stage-0@6.24.1
+ babel-preset-env@1.7.0
```

**配置**：

创建 `/.babelrc` 文件，并编辑：

```json
{
  "presets": ["env", "stage-0"],
  "plugins": ["transform-runtime"]
}
```

配置 loader：

```javascript
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: 'babel-loader',
},
```

## 12. 在 webpack 中使用 Vue

### 12.1. 像网页中一样使用

**说明**：

vue 包的入口是 `"main": "dist/vue.runtime.common.js",`，
此 JS 只提供了 runtime-only 的方式，并不能像网页中一样使用。

可以自行引入完整的文件 `vue/dist/vue.js`。

**示例**：

```javascript
import Vue from 'vue/dist/vue';

const app = new Vue({
  el: '#app',
  data: {
    msg: 'hello',
  },
});
```

### 12.2. 单文件模式

**说明**：

处理 `.vue` 文件，需要安装配置 vue-loader。

使用 vue-runtime 时，要借助 `render()` 函数将根组件（`/src/App.vue`）渲染到页面。

**安装**：

```shell
npm i -D vue-loader@14 vue-template-compiler

+ vue-template-compiler@2.5.17
+ vue-loader@14.2.3
```

**配置**：

```javascript
{
  test: /\.vue$/,
  use: 'vue-loader',
},
```

**示例**：

```html
<!-- src/index.html -->
<div id="app"></div>
```

```javascript
// src/main.js
import Vue from 'vue';
import AppComponent from './App.vue';

const app = new Vue({
  el: '#app',
  render(createElements) {
    return createElements(AppComponent);
  },
});
```

## 13. 路由

### 13.1. 基本使用

**安装**：

```shell
$ npm i -S vue-router

+ vue-router@3.0.1
```

**使用**：

```html
<!-- /src/index.html -->
<div id="#app"></div>
```

```html
<!-- /src/App.vue -->
<template>
  <div>
    App Vue
    <router-link to="/login">登陆</router-link>
    <router-link to="/register">注册</router-link>
    <router-view></router-view>
  </div>
</template>
```

```javascript
// /src/main.js

// 1. 引入
import Vue from 'vue';
import VueRouter from 'vue-router';

// 2. 安装
Vue.use(VueRouter);

// 3. 配置路由
const router = new VueRouter({
  routes: [
    { path: '/login', component: LoginComponent },
    { path: '/register', component: RegisterComponent },
  ],
});

// 4. 挂载到根实例
const app = new Vue({
  el: '#app',
  render(createElements) {
    return createElements(AppComponent);
  },
  router,
});
```

### 13.2. 子路由

**示例**：

```html
<!-- /src/index.html -->
<div id="app"></div>

<!-- /src/App.vue -->
<template>
  <div>
    App：
    <router-link to="/management">管理</router-link>
    <router-view></router-view>
  </div>
</template>

<!-- /src/views/management/Management.vue -->
<template>
  <div>
    管理：
    <router-link to="/management/user">用户管理</router-link>
    <router-link to="/management/dept">部门管理</router-link>
    <router-view></router-view>
  </div>
</template>
```

```javascript
import ManagementComponent from './views/management/Management.vue';
import UserManagementComponent from './views/management/User.vue';
import DeptManagementComponent from './views/management/Dept.vue';

const router = new VueRouter({
  routes: [
    {
      path: '/management',
      component: ManagementComponent,
      children: [
        { path: 'user', component: UserManagementComponent },
        { path: 'dept', component: DeptManagementComponent },
      ],
    },
  ],
});
```

## 14. Vue 单文件中的样式

### 14.1. 作用域

**说明**：

通过 `<style scope>` 设置内嵌样式只对该组件有效。

通过属性选择器实现。

**示例**：

```html
<style scoped>
</style>
```

### 14.2. 使用 scss/less 语法

**说明**：

通过 `<style lang="scss">` 设置使用的 css 预处理器。

**示例**：

```html
<style lang="scss">
</style>
```