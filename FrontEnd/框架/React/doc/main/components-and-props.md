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