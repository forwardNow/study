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

## 2. 将本地状态添加到类中

我们将通过三个步骤将 `date` 从 props 移至 state：

1. 在 `render()` 方法中，将 `this.props.date` 替换为 `this.state.date`：

    ```jsx
    class Clock extends React.Component {
      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }
    ```

2. 添加一个类构造函数，用于指定初始 `this.state`：

    ```jsx
    class Clock extends React.Component {
      // 注意我们如何将 props 传递给基础构造函数
      // 类组件应始终使用 props 调用基础构造函数。
      constructor(props) {
        super(props);
        this.state = {date: new Date()};
      }

      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }
    ```

3. 从 `<Clock />` 元素中删除 `date` 属性：

    ```jsx
    ReactDOM.render(
      <Clock />,
      document.getElementById('root')
    );
    ```

稍后我们将定时器代码添加回组件本身。

结果如下：

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[在 CodePen 上试一试](http://codepen.io/gaearon/pen/KgQpJd?editors=0010)

接下来，我们将使 `Clock` 设置自己的定时器并每秒更新一次。

## 3. 将生命周期方法添加到类中

在具有许多组件的应用程序中，释放组件在销毁时所占用的资源非常重要。

我们想在第一次将 `Clock` 渲染成 DOM 时设置一个计时器。 这在 React 中称为“mounting”（安装/挂载）。

我们还希望在删除 `Clock` 生成的 DOM 时清除该计时器。 这在 React 中称为“unmounting”（卸载）。

我们可以在组件类上声明特殊方法，以便在组件安装和卸载时运行一些代码：

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

这些方法称为“生命周期方法”。

`componentDidMount()` 方法在将组件输出渲染成 DOM 之后运行。 这是设置计时器的好地方：

```jsx
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}
```

请注意我们如何在 `this` 保存计时器 ID。

由于 `this.props` 是由 React 本身设置的，而 `this.state` 具有特殊含义，但如果您需要存储不参与数据流的内容（如计时器 ID），您可以手动向该类添加其他字段）。

我们将在 `componentWillUnmount()` 生命周期方法中拆除计时器：

```jsx
componentWillUnmount() {
  clearInterval(this.timerID);
}
```

最后，我们将实现一个名为 `tick()` 的方法，`Clock` 组件将每秒运行一次。

它将使用 `this.setState()` 来安排组件本地状态的更新：

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[在 CodePen 上试一试](http://codepen.io/gaearon/pen/amqdNA?editors=0010)

现在时钟每秒都会滴答作响。

让我们快速回顾一下发生了什么以及调用这些方法的顺序：

1. 当 `<Clock />` 传递给 `ReactDOM.render()` 时，React 调用 `Clock` 组件的构造函数。 由于 `Clock` 需要显示当前时间，因此它会使用包含当前时间的对象初始化 `this.state`。 我们稍后会更新这个状态。
2. 然后 React 调用 `Clock` 组件的 `render()` 方法。 这就是 React 如何了解应该在屏幕上显示的内容。 React 然后更新 DOM 以匹配 `Clock` 的渲染输出。
3. 当 `Clock` 的输出插入 DOM 时，React 调用 `componentDidMount()` 生命周期方法。 在其中，`Clock` 组件要求浏览器设置一个计时器，以便每秒调用一次组件的 `tick()` 方法。
4. 浏览器每秒调用 `tick()` 方法。 在其中，`Clock` 组件通过使用包含当前时间的对象调用 `setState()` 来调度 UI 更新。 感谢 `setState()` 调用，React 知道状态已经改变，并再次调用 `render()` 方法来了解屏幕上应该是什么。 这次，`render()` 方法中的 `this.state.date` 将不同，因此渲染输出将包含更新的时间。 React 相应地更新 DOM。
5. 如果从 DOM 中删除了 `Clock` 组件，则 React 会调用 `componentWillUnmount()` 生命周期方法，以便停止计时器。

## 4. 正确使用 state

关于 `setState()`，您应该了解三件事。

### 4.1. 不要直接修改 state

例如，这不会重新渲染组件：

```jsx
// Wrong
this.state.comment = 'Hello';
```

相反，使用 `setState()`：

```jsx
// Correct
this.setState({comment: 'Hello'});
```

您可以给 `this.state` 直接赋值的唯一位置是构造函数。

### 4.2. state 更新可能是异步的

React 可以将多个 `setState()` 调用批处理为单个更新以提高性能。

因为 `this.props` 和 `this.state` 可能是异步更新，所以不应该依赖它们的值来计算下一个状态。

例如，此代码可能无法更新计数器：

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要修复它，请使用第二种形式的 `setState()` 接受函数而不是对象。 该函数将接收先前的状态作为第一个参数，并将更新作为第二个参数应用于 props：

```jsx
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

我们使用了上面的箭头函数，但它也适用于常规函数：

```jsx
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### 4.3. 合并 state 更新

当您调用 `setState()` 时，React 会将您提供的对象合并到当前状态。