# 创建一个新的 React 应用程序

使用集成的工具链可获得最佳用户和开发人员体验。

这个页面描述了一些流行的 React 工具链，它们可以帮助完成以下任务：

* 扩展到许多文件和组件。
* 使用 npm 的第三方库。
* 及早发现常见错误。
* 在开发中实时编辑 CSS 和 JS。
* 优化生产输出。

此页面上推荐的工具链不需要配置即可开始使用。

## 1. 你可能不需要工具链

如果您没有遇到上述问题或者对使用 JavaScript 工具感到不舒服，请考虑在 HTML 页面上将 React 作为普通的 `<script>` 标记添加进来，以及可选择地使用 JSX。

这也是将 React 集成到现有网站的最简单方法。 如果您觉得有用，可以随时添加更大的工具链！

## 2. 推荐的工具链

React 团队主要推荐以下解决方案：

* 如果您正在学习 React 或创建新的单页应用程序，请使用 [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)。
* 如果您使用 Node.js 构建服务器呈现的网站，请尝试 [Next.js](https://reactjs.org/docs/create-a-new-react-app.html#nextjs).
* 如果您正在构建一个面向静态内容的网站，请尝试 [Gatsby](https://reactjs.org/docs/create-a-new-react-app.html#gatsby)。
* 如果您正在构建组件库或与现有代码库集成，请尝试[更灵活的工具链](https://reactjs.org/docs/create-a-new-react-app.html#more-flexible-toolchains)。

### 2.1. Create React App

[Create React App](http://github.com/facebookincubator/create-react-app) 非常适合学习 React，也是在 React 中开始构建新的[单页面应用程序](https://reactjs.org/docs/glossary.html#single-page-application)的最佳方式。

它设置了您的开发环境，以便您可以使用最新的 JavaScript 功能，提供良好的开发体验，并优化您的应用程序以进行生产。 您需要在计算机上安装 Node >= 6 和 npm >= 5.2。 要创建项目，请运行：

```shell
npx create-react-app my-app
cd my-app
npm start
```

>注意：第一行的 npx 不是拼写错误 - 它是 [npm 5.2+ 附带的打包运行工具](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)。

Create React App 不处理后端逻辑或数据库; 它只是创建一个前端构建管道，因此您可以将它与任何您想要的后端一起使用。 在底层，它使用 [Babel](http://babeljs.io/) 和 [webpack](https://webpack.js.org/)，但你不需要了解它们。

当您准备部署到生产环境时，运行 `npm run build` 将在 `build` 文件夹中创建应用程序的优化版本。 您可以从 [README](https://github.com/facebookincubator/create-react-app#create-react-app-) 和[用户指南](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents)中了解有关 Create React App 的更多信息。

### 2.2. Next.js

[Next.js](https://nextjs.org/) 是一个流行的轻量级框架，用于使用 React 构建的静态和服务器呈现的应用程序。 它包括开箱即用的样式和路由解决方案，并假设您使用 Node.js 作为服务器环境。

从[官方指南](https://nextjs.org/learn/)中学习 Next.js。

### 2.3. Gatsby

[Gatsby](https://www.gatsbyjs.org/) 是使用 React 创建静态网站的最佳方式。 它允许您使用 React 组件，但输出预渲染的 HTML 和 CSS 以确保最快的加载时间。

从[官方指南](https://www.gatsbyjs.org/docs/)和[入门套件库](https://www.gatsbyjs.org/docs/gatsby-starters/)中学习 Gatsby。

### 2.4. 更灵活的工具链

以下工具链提供更多灵活性和选择。 我们向更有经验的用户推荐他们：

* [Neutrino](https://neutrinojs.org/) 将 webpack 的强大功能与预设的简单性相结合，并包含 React 应用程序和 React 组件的预设。
* [nwb](https://github.com/insin/nwb) 特别适合发布 npm 的 React 组件。 它也可以用于创建 React 应用程序。
* [Parcel](https://parceljs.org/) 是一个快速，零配置的 Web 应用程序打包器，可与 React 配合使用。
* [Razzle](https://github.com/jaredpalmer/razzle) 是一个服务器渲染框架，不需要任何配置，但提供比 Next.js 更多的灵活性。