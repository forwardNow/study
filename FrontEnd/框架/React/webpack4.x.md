# webpack 4.x

> webpack 是基于 node 开发的命令行软件，webpack.config.js 文件中可使用任何 node 的 API

## 1. 新特性

约定大于配置，以保持一致性与减小配置复杂度，如：

```text
${root}/
  dist/
    main.js   # 默认输出文件
  src/    
    index.html
    index.js  # 默认入口文件
  node_modules/
  package-lock.json
  package.json
  webpack.config.js
```

## 2. 起步

### 2.1. 安装

```shell
$ npm init --yes

$ npm i webpack -D
+ webpack@4.17.2

$ npm i webpack-cli -D
+ webpack-cli@3.1.0
```

### 2.2. package.json

```javascript
{
  "scripts": {
    "build": "webpack"
  }
}
```

### 2.3. webpack.config.js

```javascript
module.exports = {
  // 'development' | 'production'
  // 指定模式后，会有相关的默认配置，如指定 'production' 后会自动混淆、压缩
  mode: 'development',
};
```

### 2.4. 打包

```shell
npm run dev
```

## 3. webpack-dev-server

>将 `/src` 中的 JS 打包到内存

### 3.1. 安装

```shell
$ npm install webpack-dev-server -D
+ webpack-dev-server@3.1.8
```

### 3.2. 起步

#### 3.2.1. package.json

> `--hot`：一旦源文件（JS 文件）内容改变，则浏览器页面自动刷新。

```javascript
{
  "scripts": {
    "dev": "webpack-dev-server --open --port 8081 --hot --host 127.0.0.1"
  }
}
```

#### 3.2.2. 运行

```shell
$ npm run dev
> webpack-dev-server --open --port 8081 --hot --host 127.0.0.1

｢wds｣: Project is running at http://127.0.0.1:8081/

# 可通过 / 目录直接访问 /dist 目录。
｢wds｣: webpack output is served from /

｢wdm｣: Hash: 40f7e964f1b893b933f3
Version: webpack 4.17.2
```

## 4. html-webpack-plugin

> 将 index.html 生成到内存，并自动配置打包好的 JS 文件。

### 4.1. 安装

```shell
$ npm install html-webpack-plugin -D

+ html-webpack-plugin@3.2.0
```

### 4.2. 配置

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 创建一个插件的实例
const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'), // 源文件
  filename: 'index.html', // 生成到内存中首页的名称
});

module.exports = {
  // 'development' | 'production'
  mode: 'development',

  plugins: [
    htmlPlugin,
  ],
};
```