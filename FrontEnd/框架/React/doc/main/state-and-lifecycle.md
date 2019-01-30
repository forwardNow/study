# 状态和生命周期

本页介绍了 React 组件中的状态和生命周期的概念。 您可以在此处找到详细的组件 API 参考。

考虑前面部分之一的滴答时钟示例。 在渲染元素中，我们只学习了一种更新 UI 的方法。 我们调用 `ReactDOM.render()` 来改变渲染输出：

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[在 CodePen 上试一试](http://codepen.io/gaearon/pen/gwoJZk?editors=0010)

在本节中，我们将学习如何使 `Clock` 组件真正可重用和封装。 它将设置自己的计时器并每秒更新一次。

我们可以从封装时钟的外观开始：

```jsx
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[在 CodePen 上试一试](http://codepen.io/gaearon/pen/dpdoYR?editors=0010)

但是，它错过了一个至关重要的要求：`Clock` 设置定时器并每秒更新 UI 的事实应该是 `Clock` 的实现细节。

理想情况下，我们想要写一次并自己更新 `Clock`：

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

为实现这一点，我们需要在 `Clock` 组件中添加“state”。

State 类似于 props，但它是私有的并且完全由组件控制。

我们之前提到过，定义为类的组件有一些额外的功能。 本地 state 正是如此：仅适用于类的功能。

## 1. 将函数转换为类

您可以通过五个步骤将函数组件（如 `Clock`）转换为类：

1. 创建一个扩展 `React.Component` 的同名 ES6 类。
2. 向它添加一个名为 `render()` 的空方法。
3. 将函数体移动到 `render()` 方法中。
4. 用 `render()` 体中的 `this.props` 替换 `props`。
5. 删除剩余的空函数声明。

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[在 CodePen 上试一试](http://codepen.io/gaearon/pen/zKRGpo?editors=0010)

`Clock` 现在被定义为一个类而不是一个函数。

每次更新发生时都会调用 `render` 方法，但只要我们将 `<Clock />` 渲染到同一个 DOM 节点中，就只会使用一个 `Clock` 类的实例。 这使我们可以使用其他功能，如本地状态和生命周期方法。