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

## 2. 更新已渲染的元素

React 元素是不可变的。 创建元素后，您无法更改其子元素或属性。 元素就像电影中的单个帧：它代表特定时间点的 UI。

根据我们迄今为止的知识，更新 UI 的唯一方法是创建一个新元素，并将其传递给 `ReactDOM.render()`。

考虑这个滴答作响的时钟示例：

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

[在 CodePen 上试一试](https://reactjs.org/redirect-to-codepen/rendering-elements/update-rendered-element)

它每秒从 `setInterval()` 的回调中调用 `ReactDOM.render()` 。

>注意：实际上，大多数 React 应用程序只调用一次 `ReactDOM.render()`。 在接下来的部分中，我们将了解如何将此类代码封装到有状态的组件中。我们建议您不要跳过任何主题，因为它们是相互依赖的。

## 3. React 仅更新必要的内容

React DOM 将元素及其子元素与前一元素进行比较，并仅应用必要的 DOM 更新，使 DOM 呈现你期望的状态。

您可以通过使用浏览器工具检查最后一个示例来验证：

![https://reactjs.org/granular-dom-updates-c158617ed7cc0eac8f58330e49e48224.gif](https://reactjs.org/granular-dom-updates-c158617ed7cc0eac8f58330e49e48224.gif)

即使我们在每个 tick 上创建描述整个 UI 树的元素，但只有内容已更改的文本节点才会被React DOM 更新。

在我们的经验中，考虑 UI 在任何给定的时刻应该呈现，而不是随着时间的推移去如何改变它，可以消除一整类错误。