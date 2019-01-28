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

## 3. JSX 也是一个表达式

编译之后，JSX 表达式成为常规 JavaScript 函数调用并计算为 JavaScript 对象。

这意味着您可以在 `if` 语句和 `for` 循环中使用 JSX，将其分配给变量，接受它作为参数，并从函数返回它：

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

## 4. 使用 JSX 指定属性

您可以使用引号将字符串文本指定为属性：

```jsx
const element = <div tabIndex="0"></div>;
```

您还可以使用花括号在属性中嵌入 JavaScript 表达式：

```jsx
const element = <img src={user.avatarUrl}></img>;
```

在属性中嵌入 JavaScript 表达式时，不要在花括号周围加上引号。 您应该使用引号（对于字符串值）或花括号（对于表达式），但不能在属性中同时使用它们。

>警告：由于 JSX 更接近 JavaScript 而不是 HTML，因此 React DOM 使用 camelCase 属性命名约定而不是 HTML 属性名称。例如，`class` 在 JSX 中变为 `className`，`tabindex` 变为 `tabIndex`。

## 5. 使用 JSX 指定子项

如果标记为空，您可以使用 `/>` 立即关闭它，如 XML：

```jsx
const element = <img src={user.avatarUrl} />;
```

JSX 标签可能包含子项：

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

## 6. JSX 防止注入攻击

在 JSX 中嵌入用户输入是安全的：

```jsx
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

默认情况下，React DOM 在渲染之前会转义 JSX 中嵌入的任何值。 因此，它确保您永远不会注入未在应用程序中明确写入的任何内容。 在渲染之前，所有内容都会转换为字符串。 这有助于防止 [XSS（跨站点脚本）](https://en.wikipedia.org/wiki/Cross-site_scripting)攻击。

## 7. JSX 代表对象

Babel 将 JSX 编译为 `React.createElement()` 调用。

这两个例子是相同的：

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```jsx
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` 执行一些检查以帮助您编写无错误的代码，但实质上它创建了一个这样的对象：

```jsx
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

这些对象称为“React 元素”。 您可以将它们视为您希望在屏幕上看到的内容的描述。 React 读取这些对象并使用它们构建 DOM 并使其保持最新。

我们将在下一节中探索将 React 元素渲染成 DOM。

>提示：我们建议您为所选编辑器使用“Babel”语言定义，以便正确高亮显示 ES6 和 JSX 代码。 本网站使用与之兼容的 [Oceanic Next](https://labs.voronianski.com/oceanic-next-color-scheme/) 配色方案。