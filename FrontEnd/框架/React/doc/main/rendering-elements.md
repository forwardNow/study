# 渲染元素

元素是 React 应用程序的最小构建块。

元素描述了您希望在屏幕上看到的内容：

```jsx
const element = <h1>Hello, world</h1>;
```

与浏览器 DOM 元素不同，React 元素是普通对象，创建起来很廉价。 React DOM 负责更新 DOM 以匹配 React 元素。

>注意：人们可能会将元素与更广为人知的“组件”概念混淆。 我们将在下一节介绍组件。 组件是由元素组成的，我们建议您在开始之前阅读本节。

## 1. 将元素渲染到 DOM 中

假设你的 HTML 文件中有一个 `<div>`：

```html
<div id="root"></div>
```

我们将其称为“根” DOM 节点，因为其中的所有内容都将由 React DOM 管理。

仅使用 React 构建的应用程序通常具有单个根 DOM 节点。 如果要将 React 集成到现有应用程序中，则可以拥有任意多个孤立的根 DOM 节点。

要将 React 元素渲染到根 `DOM` 节点，请将它们传递给 `ReactDOM.render()`：

```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

在 [CodePen](https://reactjs.org/redirect-to-codepen/rendering-elements/render-an-element) 上试一试

它在页面上显示“Hello，world”。