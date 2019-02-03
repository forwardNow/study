# 表单

HTML 表单元素与 React 中的其他 DOM 元素的工作方式稍有不同，因为表单元素自然会保留一些内部状态。 例如，纯 HTML 中的此表单接受一个名称：

```jsx
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

当用户提交表单时，此表单也具有普通 HTML 表单重载页面的默认行为。 如果您可在 React 中使用此行为。 但在大多数情况下会禁用默认行为，使用 JavaScript 函数来处理表单的提交并访问用户在表单中输入的数据。 实现这一目标的标准方法是使用一种称为“受控组件”的技术。

## 1. 受控组件

在HTML中，表单元素（如 `<input>`、`<textarea>`、`<select>`）通常会保持自己的状态并根据用户输入进行更新。 在 React 中，可变状态通常保存在组件的 state 属性中，并且仅使用 `setState()` 更新。

我们可以通过使 React 的 state 成为“唯一数据来源”来将两者结合起来。 然后，React 组件即渲染表单又控制用户的输入。 这种由 React 控制其值的表单元素称为“受控组件”。

例如，如果我们想让前面的示例在提交时记录名称，我们可以将表单编写为受控组件：

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

由于 `value` 属性是在我们的表单元素上设置的，因此显示的值将始终为 `this.state.value`，使 React 的 state 成为事实的来源。 由于 `handleChange` 在每次击键时运行以更新 React 状态，因此显示的值将在用户键入时更新。

对于受控组件，每个状态变化都将具有关联的处理函数。 这使得修改或验证用户输入变得简单。例如，如果我们想强制使用全大写字母写入名称，我们可以将 `handleChange` 写为：

```jsx
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

## 2. `<textarea>`

在 HTML 中，`<textarea>` 元素通过其子节点定义其文本：

```jsx
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

在React中，`<textarea>` 使用 `value` 属性。 这样，使用 `<textarea>` 的表单可以与使用单行输入的表单非常相似地编写：

```jsx
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

请注意，`this.state.value` 在构造函数中初始化，因此文本区域以其中的一些文本开头。
