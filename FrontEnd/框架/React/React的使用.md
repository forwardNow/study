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
