# 介绍 JSX

考虑这个变量声明：

```jsx
const element = <h1>Hello, world!</h1>;
```

这个有趣的标签语法既不是字符串也不是 HTML。

它被称为 JSX，它是 JavaScript 的语法扩展。 我们建议将它与 React 一起使用来描述UI应该是什么样子。 JSX 可能会虽然是模板语言，但它具有 JavaScript 的全部功能。

JSX 生成 React “元素”。 我们将在下一节中探索将它们渲染成 DOM。 下面，您可以找到 JSX 的基础知识，以帮助您入门。

## 1. 为何选择 JSX？

React 认为渲染逻辑本质上与其他 UI 逻辑耦合这一事实：事件如何处理，状态如何随时间变化，以及数据如何准备显示。

React 不是将标记和逻辑放在单独的文件中来人为地分离，而是通过“组件”(包含两者的的松散耦合单元)进行[关注点分离](https://en.wikipedia.org/wiki/Separation_of_concerns)。 我们将在另一部分回到组件，但如果你还不熟悉在 JS 中加入标记，那么这个话题可能会说服你。

React 不需要使用 JSX，但是大多数人发现在 JavaScript 代码中使用UI时它是一种有用的视觉辅助工具。 它还允许 React 显示更多有用的错误和警告消息。

有了这个，让我们开始吧！

## 2. 在 JSX 中嵌入表达式

在下面的示例中，我们声明一个名为 `name` 的变量，然后在 JSX 中将其包裹在花括号中使用它：

```jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

您可以在 JSX 中的大括号内放置任何有效的 JavaScript 表达式。 例如，`2 + 2`， `user.firstName` 或 `formatName(user)` 都是有效的 JavaScript 表达式。

在下面的示例中，我们将调用 JavaScript 函数 `formatName(user)` 的结果嵌入到 `<h1>` 元素中。

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[在 CodePen 上试一试](https://reactjs.org/redirect-to-codepen/introducing-jsx)

为了便于阅读，我们将 JSX 拆分为多行。 虽然不需要，但在执行此操作时，我们还建议将其包裹在括号中，以避免自动分号插入的陷阱。