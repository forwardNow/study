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

```html
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

## 3. `<select>`

在HTML中，`<select>` 创建一个下拉列表。 例如，此 HTML 创建一个口味下拉列表：

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

请注意，由于 `selected` 属性，初始化时 `Coconut` 选项被选中。 React，不是使用 `selected` 属性，使用 `<select>` 标记上的 `value` 属性。 这在受控组件中更方便，因为您只需要在一个位置更新它。 例如：

```jsx
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

总的来说，这使得 `<input type =“text”>`、`<textarea>`、`<select>` 都非常相似 - 它们都接受一个可用于实现受控组件的 `value` 属性。

>注意
>
>您可以将数组传递给 `value` 属性，从而允许您在 `select` 标记中选择多个选项：
>
>`<select multiple={true} value={['B', 'C']}>`

## 4. `<input type="file">`

在 HTML 中，`<input type ="file">`允许用户从其设备存储中选择一个或多个文件，以便上传到服务器或通过 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) 用 JavaScript 进行操作。

```html
<input type="file" />
```

因为它的值是只读的，所以它是 React 中一个不受控制的组件。 它将在文档后面与其他不受控制的组件一起讨论。

## 5. 处理多个 `<input>`

当您需要处理多个受控 `input` 元素时，可以为每个元素添加 `name` 属性，并让处理函数根据 `event.target.name` 的值选择要执行的操作。

例如：

```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

请注意我们如何使用 ES6 [计算属性名称](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)语法来更新与给定输入名称对应的状态键：

```javascript
this.setState({
  [name]: value
});
```

它相当于这个 ES5 代码：

```javascript
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

此外，由于 `setState()` 自动将部分状态合并到当前状态，因此我们只需要使用更改的部分调用它。

## 6. 受控组件的 value 为 null

在受控组件上指定 value prop 会阻止用户更改输入，除非您特意这么做。 如果您已指定值但输入仍可编辑，则可能将值设置为 `undefined` 或 `null`。

以下代码演示了这一点。 （输入首先被锁定，但在短暂延迟后变为可编辑。）

```jsx
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```

## 7. 受控组件的替代品

使用受控组件有时会很繁琐，因为您需要为可以更改数据的每种方式编写事件处理程序，并通过 React 组件管理所有输入状态。 当您将预先存在的代码库转换为 React 或将 React 应用程序与非 React 库集成时，这会变得特别烦人。 在这些情况下，您可能希望不受控制的组件，这是实现输入表单的替代技术。

## 8. 完全成熟的解决方案

如果您正在寻找一个完整的解决方案，包括验证、跟踪访问的字段、处理表单提交，[Formik](https://jaredpalmer.com/formik) 是一个受欢迎的选择。 但是，它建立在受控组件和管理状态的相同原则之上 - 所以不要忽视学习它们。