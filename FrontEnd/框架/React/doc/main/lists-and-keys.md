# 列表和 key

首先，让我们回顾一下如何在 JavaScript 中转换列表。

给定下面的代码，我们使用 `map()` 函数获取数字数组并将其值加倍。 我们将 `map()` 返回的新数组赋值给 `doubled` 变量并记录下来：

```jsx
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

此代码将 `[2, 4, 6, 8, 10]` 记录到控制台。

在 React 中，将数组转换为元素列表几乎完全相同。

## 1. 渲染多个组件

您可以使用花括号 `{}` 构建元素集合并将它们包含在 JSX 中。

下面，我们使用 JavaScript `map()` 函数遍历数字数组。 我们为每个项目返回一个 `<li>` 元素。 最后，我们将结果元素数组分配给 `listItems`：

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

我们将整个 `listItems` 数组包含在 `<ul>` 元素中，并将其呈现给 DOM：

```jsx
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

此代码显示 1 到 5 之间的数字项目符号列表。

## 2. 基础 List 组件

通常，您将在组件内渲染列表。

我们可以将前面的示例重构为一个接受数字数组并输出无序元素列表的组件。

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

运行此代码时，将向您发出警告，指出应为列表项提供 key。 “key”是在创建元素列表时需要包含的特殊字符串属性。 我们将在下一节讨论它为什么重要。

让我们为 `numbers.map()` 中的列表项分配一个 `key`，并修复缺少的 key 问题。

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)