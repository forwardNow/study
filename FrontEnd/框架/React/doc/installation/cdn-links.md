# CDN 链接

React 和 ReactDOM 都可通过 CDN 获得。

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

上述版本仅用于开发，不适合生产。 React 的压缩和优化生产版本可在以下位置获得：

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

要加载特定版本的 `react` 和 `react-dom`，请将 `16` 替换为版本号。

## 为什么使用 crossorigin 属性？

如果您从 CDN 提供 React，我们建议您保持 crossorigin 属性设置：

```html
<script crossorigin src="..."></script>
```

我们还建议验证您使用的 CDN 是否设置了 `Access-Control-Allow-Origin:*` HTTP 标头：

![https://reactjs.org/static/cdn-cors-header-89baed0a6540f29e954065ce04661048-dd807.png](https://reactjs.org/static/cdn-cors-header-89baed0a6540f29e954065ce04661048-dd807.png)

这样可以在 React 16 及更高版本中实现更好的[错误处理体验](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)。