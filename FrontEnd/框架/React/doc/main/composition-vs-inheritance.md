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