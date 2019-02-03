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

## 3. Keys

key 帮助 React 识别哪些项目已更改、已添加、已删除。 应该为数组内部的元素赋予 key，以使元素具有稳定的标识：

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

选择 key 的最佳方法是使用在其兄弟姐妹中唯一标识列表项的字符串。 大多数情况下，您会使用数据中的 ID 作为 key：

```jsx
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

当您没有渲染项目的稳定 ID 时，您的最后的手段是使用项目索引作为 key：

```jsx
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

如果项目的顺序可能发生变化，我们不建议使用索引 key。 这可能会对性能产生负面影响，并可能导致组件状态出现问题。 查看 Robin Pokorny 的文章，[深入解释使用索引作为 key 的负面影响](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)。 如果您选择不为列表项分配显式 key，则 React 将默认使用索引作为键。

这里有一个[深入的解释](https://reactjs.org/docs/reconciliation.html#recursing-on-children)，如果你有兴趣了解更多，为什么需要 key。

## 4. 使用 key 提取组件

key 仅在数组的上下文中有意义。

例如，如果提取 `ListItem` 组件，则应将 key 保留在数组中的 `<ListItem />` 元素上，而不是 `ListItem` 本身中的 `<li>` 元素上。

示例：不正确的 key 用法

```jsx
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

示例：正确的 key 用法

```jsx
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

一个好的经验法则是 `map()` 调用中的元素需要 key。

## 5. key 必须在兄弟元素中独一无二

数组中使用的 key 在其兄弟姐妹中应该是唯一的。 但是，它们不需要全局唯一。 当我们生成两个不同的数组时，我们可以使用相同的 key：

```jsx
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

key 用作 React 的提示，但它们不会传递给您的组件。 如果组件中需要相同的值，请将其明确地作为具有不同名称的 prop 传递：

```jsx
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

通过上面的示例，`Post` 组件可以读取 `props.id`，但不能读取 `props.key`。

## 6. 在 JSX 中嵌入 `map()`

在上面的例子中，我们声明了一个单独的 `listItems` 变量并将其包含在 JSX 中：

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX 允许在花括号中嵌入任何表达式，因此我们可以内联 `map()` 结果：

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

有时这会产生更清晰的代码，但这种风格也会被滥用。 就像在 JavaScript 中一样，由您来决定是否值得提取变量以提高可读性。 请记住，如果 `map()` 体太嵌套，则可能是提取组件的好时机。
