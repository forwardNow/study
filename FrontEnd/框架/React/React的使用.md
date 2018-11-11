# React的使用

## 1. 起步

### 1.1. 安装

```shell
$ npm install react -S
+ react@16.5.0

$ npm install react-dom -S
+ react-dom@16.5.0
```

`react` ：关于虚拟 DOM 的创建，以及组件的创建和生命周期

`react-dom` ：专门进行 DOM 操作。（将创建好的虚拟 DOM 和组件渲染到页面上）

### 1.2. 创建容器

```html
<div id="app"></div>
```

### 1.3. 导入包

```javascript
import React from 'react';
import ReactDom from 'react-dom';
```

### 1.4. 创建虚拟 DOM 元素

>虚拟 DOM，用 JS 对象来表示 DOM 以及 DOM 之间的嵌套关系。

```javascript
/**
 * 2.创建虚拟 DOM 元素
 * @param-1 {string} 元素的类型
 * @param-2 {object} 元素的属性
 * @param-3 {object|string} 子节点（其他虚拟 DOM 或者文本子节点）
 * @param-n {object} 其他子节点
 *
 * @example
 * <h1 id='myh1' title='标题'>我是大标题</h1>
 */
const myh1 = React.createElement(
  'h1',
  {
    id: 'myh1',
    title: '标题',
  },
  '我是大标题',
);
```

### 1.5. 渲染

```javascript
/**
 * 3.将虚拟 DOM 渲染到页面的 DOM 元素
 * @param-1 {object} 虚拟 DOM 对象
 * @param-2 {HTMLElement} DOM 容器
 */
ReactDom.render(myh1, document.querySelector('#app'));
```

## 2. JSX

### 2.1. 说明

在 JS 文件中，默认不能直接写 HTML 代码。

可以使用 babel 来转换这些 JS 中的 HTML 代码。

这种在 JS 中，混合 HTML 代码的语法，叫做 JSX（符合 XML 规范的 JS）。

JSX 在运行时，将其转换成了 `React.createElement(...)` 来执行。

### 2.2. 启用 JSX 语法

```shell
# 安装 babel
$ npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react

$ npm install --save-dev @babel/plugin-transform-runtime
$ npm install --save @babel/runtime
```

配置 `.babelrc` 文件

```json
{
  "presets": [ "@babel/preset-env", "@babel/preset-react" ],
  "plugins": [ "@babel/plugin-transform-runtime" ]
}
```

配置 webpack `loader`

```javascript
{
  test: /\.js|jsx$/,
  use: 'babel-loader',
  exclude: /node_modules/,
}
```

### 2.3. 使用

#### 2.3.1. JS 表达式

语法： `{ exp }`

示例：

```javascript
const msg = '哇哈哈2';
const title = '我是 DIV';

// JSX 数组
const list = [
  <p>1</p>,
  <p>2</p>,
];

const div =
  <div title={ title }>
    { msg }
    { list }
  </div>
;
```

注意：

* 为属性的值为表达式时，不要用引号包裹 `{ exp }`
* 用 JSX 创建 DOM 时，根节点只能有一个
* 必须符合 XML 语法规范，如标签成对出现，单标签必须闭合
* 在编译 JSX 代码时，遇到 `<标签>` 就将其作为 HTML 编译，遇到 `{}` 就将其作为 JS 编译。

#### 2.3.2. 注释

```javascript
/* 我是注释 */
```

#### 2.3.3. 关键词

关键字前面加 `html` 前缀，例如 `class` 属性为 `htmlClass`，`for` 属性为 `htmlFor`