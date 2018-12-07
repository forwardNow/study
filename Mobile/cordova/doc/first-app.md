# 创建您的第一个 Cordova 应用程序

本指南介绍如何使用 cordova 命令行界面（CLI）创建 JS / HTML Cordova 应用程序并将其部署到各种原生移动平台。 有关 Cordova 命令行的详细参考，请查看 [CLI 参考](https://cordova.apache.org/docs/en/8.x/reference/cordova-cli/index.html)。

## 1. 安装 Cordova CLI

Cordova 命令行工具作为 npm 包发布的。

要安装 cordova 命令行工具，请按照下列步骤操作：

1. 下载并安装 [Node.js](https://nodejs.org/en/download/). 在安装后，您应该能够在命令行上执行 `node` 和 `npm` 命令。
2. （可选）下载并安装 [git 客户端](http://git-scm.com/downloads)（如果您没有）。 安装之后，您应该能够在命令行上执行 `git` 命令。 CLI 使用它来下载 git repo 中的资源。
3. 使用 Node.js 的 `npm` 命令安装 cordova 模块。 `npm` 命令将自动下载 cordova 模块。
* 在 OS X 和 Linux 上：

```shell
sudo npm install -g cordova
```

* 在 Windows：

```shell
C:\>npm install -g cordova
```

安装之后，您应该能够在命令行上运行 `cordova`，它应该打印帮助文本。

## 2. 创建应用程序

在源代码的目录，并创建一个 cordova 项目：

```shell
cordova create hello com.example.hello HelloWorld
```

这将为您的 cordova 应用程序创建所需的目录结构。 默认情况下，`cordova create` 脚本会生成基于 Web 的骨架应用程序，其主页是项目的 `www/index.html` 文件。

也可以看看：

* [Cordova create command reference documentation](https://cordova.apache.org/docs/en/8.x/reference/cordova-cli/index.html#cordova-create-command)
* [Cordova project directory structure](https://cordova.apache.org/docs/en/8.x/reference/cordova-cli/index.html#directory-structure)
* [Cordova project templates](https://cordova.apache.org/docs/en/8.x/guide/cli/template.html#)

