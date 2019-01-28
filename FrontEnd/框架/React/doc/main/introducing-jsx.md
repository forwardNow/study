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