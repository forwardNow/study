# hello world

最小的 React 示例如下所示：

```jsx
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

它在页面上显示标题为“Hello，world！”的标题。

[在 CodePen 上试一试](https://reactjs.org/redirect-to-codepen/hello-world)

单击上面的链接以打开在线编辑器。 随意进行一些更改，看看它们如何影响输出。 本指南中的大多数页面都有像这样的可编辑示例。

## 1. 如何阅读本指南

在本指南中，我们将研究 React 应用程序的构成模块：元素和组件。 掌握它们之后，您可以从小型可重复使用的部分创建复杂的应用程序。

>提示：本指南专为喜欢逐步学习概念的人士而设计。 如果您喜欢边做边学，请查看我们的实用教程。 您可能会发现本指南和教程相互补充。

这是关于主要 React 概念的分步指南的第一章。 您可以在导航侧栏中找到所有章节的列表。 如果您是通过移动设备阅读此内容，则可以通过按屏幕右下角的按钮来访问导航。

本指南中的每一章都以前面章节中介绍的知识为基础。 您可以按照侧栏中显示的顺序阅读“主要概念”指南章节，了解 React 的大部分内容。 例如，“介绍JSX”是继本章之后的下一章。

## 2. 知识水平假设

React 是一个 JavaScript 库，因此我们假设您对 JavaScript 语言有基本的了解。 如果您不自信，我们建议您通过 [JavaScript 教程](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)检查您的知识水平，并让您按照本指南进行操作而不会迷惑。 这可能需要 30 分钟到一个小时，但结果你不必觉得你同时学习了 React 和 JavaScript。

>注意：本指南偶尔会使用示例中的一些较新的 JavaScript 语法。 如果您在过去几年中没有使用过 JavaScript，那么[这三点](https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c)应该可以帮到您。

