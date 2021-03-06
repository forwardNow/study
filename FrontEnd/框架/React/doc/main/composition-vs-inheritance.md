# 组合与继承

React 有一个强大的组合模型，我们建议使用组合而不是继承来重用组件之间的代码。

在本节中，我们将考虑一些新的 React 开发人员经常进行继承的问题，并展示如何使用组合来解决它们。

## 1. 包含

有些组件不能提前知道自己的标签体内容。 这对于代表通用“盒子”的 `Sidebar` 或 `Dialog` 等组件尤其常见。

我们建议这些组件使用特殊的 `children` prop 将子元素直接传递给它们的输出：

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

这允许其他组件通过嵌套 JSX 将任意子项传递给它们：

```jsx
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)

`<FancyBorder>` JSX 标记内的任何内容都作为 `children` prop 传递到 `FancyBorder` 组件中。 由于 `FancyBorder` 在 `<div>` 中呈现 `{props.children}`，因此传递的元素出现在最终输出中。

虽然这种情况不太常见，但有时您可能需要在组件中使用多个“洞”。 在这种情况下，您可以提出自己的约定，而不是使用 `children`：

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

像 `<Contacts />` 和 `<Chat />` 这样的 React 元素只是对象，因此您可以像任何其他数据一样将它们作为 props 传递。 这种方法可能会提醒您其他库中的“插槽”，但对于您可以在 React 中作为 props 传递的内容没有限制。

## 2. 特殊（Specialization）

有时我们认为组件是其他组件的“特殊情况”。 例如，我们可以说 `WelcomeDialog` 是 `Dialog` 的一个特例。

在 React 中，这也是通过组合实现的，其中更“特定”的组件渲染更“通用”的组件并使用 `props` 配置它：

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />

  );
}
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

对于定义为类的组件，组合同样有效：

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## 3. 那么继承怎么样？

在 Facebook，我们在数千个组件中使用 React，并且我们没有找到任何建议创建组件继承层次结构的用例。

props 和组合为您提供了以明确和安全的方式自定义组件外观和行为所需的所有灵活性。 请记住，组件可以接受任意 props，包括原始值、React元素、函数。

如果要在组件之间重用非 UI 功能，我们建议将其提取到单独的 JavaScript 模块中。 组件可以导入它并使用该函数、对象、类，而无需扩展它。