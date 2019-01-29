# 组件和属性

组件允许您将UI拆分为独立的，可重用的部分，并单独考虑每个部分。 此页面介绍了组件的概念。您可以在此处找到[详细的组件 API 参考](https://reactjs.org/docs/react-component.html)。

从概念上讲，组件就像 JavaScript 函数。 它们接受任意输入（称为“props”）并返回描述屏幕上应显示内容的 React 元素。

## 1. 函数和类组件

定义组件的最简单方法是编写 JavaScript 函数：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

此函数是一个有效的 React 组件，因为它接受携带数据的单个“props”（代表属性）对象参数并返回一个 React 元素。 我们称这些组件为“函数组件”，因为它们实际上是 JavaScript 函数。

您还可以使用 ES6 中的类来定义组件：

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

从 React 的角度来看，上述两个组件是等效的。

类有一些额外的功能，我们将在下一节中讨论。 在此之前，为了简单明了我们将使用函数组件。

## 2. 渲染组件

以前，我们只遇到代表 DOM 标记的 React 元素：

```jsx
const element = <div />;
```

但是，元素也可以表示用户定义的组件：

```jsx
const element = <Welcome name="Sara" />;
```

当 React 看到表示用户定义组件的元素时，它会将 JSX 属性通过一个单独的对象传递给此组件。 我们称这个对象为“props”。

例如，此代码在页面上呈现“Hello，Sara”：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[在 CodePen 上试一试](https://reactjs.org/redirect-to-codepen/components-and-props/rendering-a-component)

让我们回顾一下这个例子中发生的事情：

1. 我们调用 `ReactDOM.render()`，使用 `<Welcome name =“Sara”/>` 元素。
2. React 使用 `{name：'Sara'}` 作为 props 调用 `Welcome` 组件。
3. 我们的 `Welcome` 组件返回 `<h1>Hello, Sara</h1>` 元素作为结果。
4. React DOM 有效地更新 DOM 以匹配 `<h1>Hello, Sara</h1>`。

>注意：始终使用大写字母打头的组件名称。
>
>React 将以小写字母开头的组件视为 DOM 标记。 例如，`<div />` 表示 HTML div 标记，但 `<Welcome />` 表示组件，并且要求 `Welcome` 在存在当前作用域内。
>
>您可以在[此处](https://reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)阅读有关此约定背后的原因的更多信息。

## 3. 组合组件

组件可以引用其他组件。 这使我们可以对任意级别的细节使用相同的组件抽象。 按钮、表单、对话框、屏幕：在 React 应用程序中，所有这些通常表示为组件。

例如，我们可以创建一个多次呈现 `Welcome` 的 `App` 组件：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[在 CodePen 上试一试](https://reactjs.org/redirect-to-codepen/components-and-props/composing-components)

通常，新的 React 应用程序在最顶层有一个 `App` 组件。 但是，如果将 React 集成到现有应用程序中，则可以使用像 `Button` 这样的小组件自下而上开始逐步应用到视图层次结构的顶部。

## 4. 提取组件

不要害怕将组件拆分成更小的组件。

例如，考虑这个 `Comment` 组件：

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[在 CodePen 上试一试](https://reactjs.org/redirect-to-codepen/components-and-props/extracting-components)

它通过 props 接收 `author`（对象）、`text`（字符串）、`date`（日期），并描述社交媒体网站上的评论。

由于嵌套，这个组件可能很难改变，并且很难重用它的各个部分。 让我们从中提取一些组件。

首先，我们将提取 `Avatar`：

```jsx
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

`Avatar` 不需要知道它将在评论中渲染的。 这就是为什么我们给它的 props 一个更通用的名称：`user` 而不是 `author`。

我们建议从组件自己的角度命名 props，而不是使用它的上下文。

我们现在可以简化一下 `Comment` 了：

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        {/* 在这里放入 Avatar 组件 */}
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

接下来，我们将提取一个 `UserInfo` 组件，该组件在用户名旁边渲染一个 `Avatar`：

```jsx
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

这让我们可以进一步简化 `Comment`：

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[在 CodePen 上试一试](https://reactjs.org/redirect-to-codepen/components-and-props/extracting-components-continued)

提取组件起初可能看起来像是笨拙的工作，但是在更大的应用程序中使用可重用组件可以获得回报。 一个好的经验法则是，如果您的 UI 的一部分被多次使用（`Button`, `Panel`, `Avatar`），或者它自身足够复杂（`App`，`FeedStory`，`Comment`），那么让它成为可重用的组件是一个很好的选择。。

## 5. props 是只读的

无论是将组件声明为函数还是类，它都不能修改自己的 props。 考虑这个 `sum` 函数：

```jsx
function sum(a, b) {
  return a + b;
}
```

这些函数称为 [“Pure function”](https://en.wikipedia.org/wiki/Pure_function)，因为它们不会尝试更改其输入，并且始终为相同的输入返回相同的结果。

相反，这个函数是不纯的，因为它改变了自己的输入：

```jsx
function withdraw(account, amount) {
  account.total -= amount;
}
```

React 非常灵活，但它有一个严格的规则：

**所有 React 组件必须在其 props 方面表现得像纯粹的函数一样**。

当然，应用程序 UI 是动态的，并随着时间的推移而变化。 在下一节中，我们将介绍一种新的“State”概念。 State 允许 React 组件随着时间的推移更改其输出以响应用户操作、网络响应、其他任何内容，而不违反此规则。