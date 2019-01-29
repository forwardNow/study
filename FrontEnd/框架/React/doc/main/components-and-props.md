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