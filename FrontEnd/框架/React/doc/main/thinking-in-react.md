# 在 React 中思考

在我们看来，React 是使用 JavaScript 构建大型、快速 Web 应用程序的首选方式。 它在 Facebook 和 Instagram 上的表现非常好。

React 的许多重要部分之一就是它如何让你在构建应用程序时考虑应用程序。 在本文档中，我们将引导您完成使用 React 构建可搜索产品数据表的思考过程。

## 1. 从模拟开始

想象一下，我们已经有了一个 JSON API 和一个来自我们设计师的模拟器。 模拟看起来像这样：

![https://reactjs.org/static/thinking-in-react-mock-1071fbcc9eed01fddc115b41e193ec11-4dd91.png](https://reactjs.org/static/thinking-in-react-mock-1071fbcc9eed01fddc115b41e193ec11-4dd91.png)

我们的 JSON API 返回一些如下所示的数据：

```javascript
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```