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