# 将 React 添加到网站

将 React 用到什么程度，取决于你。

React 从一开始就被设计为逐步采用，您可以根据需要尽可能少（或多）得使用的 React。 也许您只想在现有页面中添加一些“交互性的片段”。 React 组件是一种很好的方法。

大多数网站不是、也不一定是单页应用。 只需几行代码而无需构建工具，请在网站的一小部分中尝试使用 React。 然后，您可以逐渐扩展它，或将其包含在一些动态小部件中。

## 1. 在一分钟内添加 React

在本节中，我们将展示如何将 React 组件添加到现有 HTML 页面。 您可以在自己的网站，也可以创建一个空的HTML文件来练习。

没有复杂的工具或安装要求 - 要完成本节，您只需要连接互联网和一分钟的时间。

可选：[下载完整示例（压缩后 2KB）](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)

### 1.1. 第 1 步：将 DOM 容器添加到 HTML

首先，打开要编辑的 HTML 页面。 添加一个空的 `<div>` 标记，以标记要使用 React 显示内容的位置。 例如：

```html
<!-- ... existing HTML ... -->

<div id="like_button_container"></div>

<!-- ... existing HTML ... -->
```

我们给这个 `<div>` 一个唯一的 `id` HTML 属性。 这将允许我们稍后从 JavaScript 代码中找到它并在其中显示 React 组件。

提示：

您可以在 `<body>` 标记内的任何位置放置 “container” `<div>`。 您可以根据需要在一个页面上拥有尽可能多的独立 DOM 容器。 它们通常是空的-- React 将替换 DOM 容器中的任何现有内容。

### 1.2. 第 2 步：添加脚本标记

接下来，在结束 `</ body>` 标记之前的 HTML 页面中添加三个 `<script>` 标记：

```html
  <!-- ... other HTML ... -->

  <!-- Load React. -->
  <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

  <!-- Load our React component. -->
  <script src="like_button.js"></script>

</body>
```

前两个标签加载 React。 第三个将加载您的组件代码。

### 1.3. 第 3 步：创建一个 React 组件

在 HTML 页面旁边创建一个名为 `like_button.js` 的文件。

打开[此入门代码](https://cdn.rawgit.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)并将其粘贴到您创建的文件中。

>参考：[./eg/01.like-btn.html](./eg/01.like-btn.html)

```html
<div id="like_button_container"></div>

<!-- Load React. -->
<!-- Note: when deploying, replace "development.js" with "production.min.js". -->
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

<!-- Our React component. -->
<script>
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
</script>
```

### 1.4. 就是如此

没有第四步。 您刚刚将第一个 React 组件添加到您的网站。

有关集成 React 的更多提示，请查看下一节。

### 1.5. 提示：重用组件

通常，您可能希望在 HTML 页面上的多个位置显示 React 组件。 这是一个显示“Like”按钮三次并将一些数据传递给它的示例

注意：当 React 驱动的部分彼此隔离时，此策略最有用。 在 React 代码中，更容易使用组件组合。

### 1.6. 提示：生产环境下压缩 JavaScript

在将您的网站部署到生产环境之前，请注意，使用为压缩的 JavaScript 会显着降低用户的页面速度。

如果您已经压缩了应用程序脚本，那么如果您确保部署的 HTML 加载以 production.min.js 结尾的 React 版本，那么您的站点就可以部署了：

```html
<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
```

如果你的脚本没有压缩步骤，[这是设置它的一种方法](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3)。

## 2. 可选：在 React 中尝试使用 JSX