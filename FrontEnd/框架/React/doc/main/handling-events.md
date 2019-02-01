# 处理事件

使用 React 元素处理事件与处理 DOM 元素上的事件非常相似。 有一些句法上的差异：

* React 事件使用 camelCase 而不是小写命名。
* 使用 JSX，您可以将函数作为事件处理程序而不是字符串传递。

例如，HTML：

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

在 React 中略有不同：

```jsx
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

另一个区别是你不能返回 `false` 来防止 React 中的默认行为。 您必须明确调用 `preventDefault`。 例如，使用纯 HTML，为了防止打开新页面的默认链接行为，您可以编写：

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

在 React 中，这可能是：

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

这里，`e` 是虚拟事件。 React 根据 [W3C 规范](https://www.w3.org/TR/DOM-Level-3-Events/)定义了这些虚拟事件，因此您无需担心跨浏览器兼容性。 有关详细信息，请参阅 [SyntheticEvent](https://reactjs.org/docs/events.html) 参考指南。

使用 React 时，通常不需要调用 `addEventListener` 来在创建 DOM 元素后添加侦听器。 相反，只需在最初呈现元素时提供侦听器。

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[在 CodePen 上试一试](http://codepen.io/gaearon/pen/xEmzGg?editors=0010)

在 JSX 回调中你必须要小心 `this` 的含义。 在 JavaScript 中，默认情况下不会绑定类方法。 如果您忘记绑定 `this.handleClick` 并将其传递给 `onClick`，则在实际调用该函数时，`this` 将是 `undefined` 的。

这不是 React 的特殊行为; 它是 [JavaScript 中函数如何工作](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/)的一部分。 通常，如果您在其后引用没有 `()` 的方法，例如 `onClick={this.handleClick}`，则应该绑定该方法。

如果调用 `bind` 会让你烦恼，有两种方法可以解决这个问题。 如果您使用的是实验性[公共类字段语法](https://babeljs.io/docs/plugins/transform-class-properties/)，则可以使用类字段正确绑定回调：

```jsx
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

默认情况下，在 `Create React App` 中启用此语法。

如果您没有使用类字段语法，则可以在回调中使用箭头函数：

```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

此语法的问题是每次 `LoggingButton` 渲染时都会创建不同的回调。 在大多数情况下，这没有问题。 但是，如果将此回调作为 prop 传递给较低层级组件，则这些组件可能会进行额外的重新渲染。 我们通常建议在构造函数中使用绑定或使用类字段语法来避免这种性能问题。