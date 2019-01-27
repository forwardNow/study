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

在上面的示例中，我们仅依赖于浏览器本身支持的功能。 这就是为什么我们使用 JavaScript 函数调用来告诉 React 要显示的内容：

```javascript
const e = React.createElement;

// Display a "Like" <button>
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);
```

但是，React 还提供了使用 JSX 的选择：

```jsx
// Display a "Like" <button>
return (
  <button onClick={() => this.setState({ liked: true })}>
    Like
  </button>
);
```

这两个代码片段是等效的。 虽然 JSX 是完全可选的，但许多人发现它对编写 UI 代码很有帮助 - 包括 React 和其他库。

你可以使用这个[在线转换器](http://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2%2Cstage-3&prettier=true&targets=Node-6.12&version=6.26.0&envVersion=)玩 JSX。

### 2.1. 快速尝试 JSX

在您的项目中尝试 JSX 的最快方法是将 `<script>` 标记添加到您的页面：

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

现在，您可以在任何 `<script>` 标记中使用 JSX，方法是向其添加 `type="text/babel"` 属性。 这是一个带[有 JSX 的示例 HTML 文件](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html)，您可以下载和使用它。

这种方法适用于学习和创建简单的演示。 但是，它会使您的网站变慢并且不适合生存环境。 当您准备好向前学习，请删除此新的 `<script>` 标记以及您添加的 `type="text/babel"` 属性。 相反，在下一节中，您将设置一个 JSX 预处理器来自动转换所有 `<script>` 标记。

### 2.2. 将 JSX 添加到项目中

将 JSX 添加到项目不需要像打包器或开发服务器那样的复杂工具。 从本质上讲，添加 JSX 就像添加 CS S预处理器一样。 唯一的要求是在您的计算机上安装 Node.js.

转到终端中的项目文件夹，并粘贴以下两个命令：

* 第 1 步：运行 `npm init -y`（如果失败，这是一个修复）
* 第 2 步：运行 `npm install babel-cli@6 babel-preset-react-app@3`

提示：我们这里只使用 npm 来安装 JSX 预处理器; 你不需要它做任何其他事情。 React 和应用程序代码都可以保留为 `<script>` 标记而不进行任何更改。

恭喜！ 您刚刚为项目添加了生产就绪的 JSX 设置。

### 2.3. 运行 JSX 预处理器

创建一个名为 `src` 的文件夹并运行此终端命令：

```shell
npx babel --watch src --out-dir . --presets react-app/prod 
```

注意：`npx` 不是拼写错误 - 它是一个包含在 npm 5.2+ 的[包运行工具](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)。
如果您看到错误消息“您错误地安装了 babel 软件包”，则可能错过了上一步。 在同一文件夹中执行，然后重试。

不要等待它完成 - 此命令启动 JSX 的自动观察程序。

如果您现在使用此 JSX 入门代码创建名为 `src/like_button.js` 的文件，则观察程序将使用适合浏览器的纯 JavaScript 代码创建预处理的 `like_button.js`。 使用 JSX 编辑源文件时，转换将自动重新运行。

使用它的好处，这也允许您使用现代 JavaScript 语法功能，而不必担心破坏旧浏览器。 我们刚刚使用的工具叫做 Babel，你可以从它的[文档](http://babeljs.io/docs/en/babel-cli/)中了解更多。

如果您注意到您对构建工具感到满意并希望它们为您做更多工作，那么下一节将介绍一些最受欢迎且最易于使用的工具链。如果没有 - 那些脚本标签会做得很好！