# 使用

## 1. 命令行用法

使用命令行将 `.less` 文件编译为 `.css` 文件

如果您不喜欢命令行，请了解有关 [Less 的 GUI](http://lesscss.org/tools/#guis-for-less) 的更多信息。

### 1.1. 全局安装

用 [npm](https://www.npmjs.org/) 安装

```shell
# 安装
$ sudo npm install less -g

# 查看版本
$ lessc -v
lessc 3.9.0 (Less Compiler) [JavaScript]
```

`-g` 选项安装全局可用的 `lessc` 命令。

### 1.2. 在 node 的开发环境下安装

或者，如果您不想全局使用编译器，则可能会遇到

```shell
npm i less --save-dev
```

这将在项目文件夹中安装最新的 `lessc` 正式版，并将其添加到项目的 `package.json` 中的 `devDependencies` 字段中。

### 1.3. lessc 的 beta 版本

周期性的，随着新功能的开发，lessc 版本将发布到 npm，标记为 beta。 这些版本不会作为 `@latest` 官方发行版发布，并且通常会在版本中发布 beta 版（使用 `lessc -v` 获取当前版本）。

由于补丁版本不会中断，我们将立即发布补丁版本，alpha / beta / candidate 版本将作为次要或主要版本升级发布（我们努力从 1.4.0 开始遵循[语义版本控制](http://semver.org/)）。

### 1.4. 服务器端和命令行用法

包含在此存储库中的二进制文件 `bin/lessc` 可与 Linux、OS X、Windows 上的 Node.js 一起使用。

使用：`lessc [option option=parameter ...] <source> [destination]`

#### 1.4.1. 命令行用法

```shell
lessc [option option=parameter ...] <source> [destination]
```

如果 `source` 设置为 `-`（减号），则从 stdin 读取输入。

#### 1.4.2. 示例

将 `bootstrap.less` 编译为 `bootstrap.css`

```shell
lessc bootstrap.less bootstrap.css
```

### 1.5. lessc 的选项

对于所有其他选项，请参阅 [Less 选项](http://lesscss.org/usage/#less-options)。

#### 1.5.1. silent

```shell
lessc -s lessc --silent
```

停止显示任何警告。

#### 1.5.2. version

```shell
lessc -v
lessc --version
```

#### 1.5.3. help

```shell
lessc --help
lessc -h
```

打印包含可用选项和退出的帮助消息。

#### 1.5.4. makefile

```shell
lessc -M
lessc --depends
```

输出生成文件 import 的依赖文件列表。

## 2. 浏览器端用法

在浏览器中使用 Less.js 是最简单的入门方式，便于使用 Less 进行开发，但在生产中，当性能和可靠性很重要时，我们建议使用 Node.js 或许多第三方工具之一进行预编译。

首先，将 `.less` 样式表与 `rel` 属性设置为“`stylesheet/less`”链接：

```html
<link rel="stylesheet/less" type="text/css" href="styles.less" />
```

接下来，下载 [less.js](https://github.com/less/less.js/archive/master.zip) 并将其包含在页面 `<head>` 元素的 `<script></script>` 标记中：

```html
<script src="less.js" type="text/javascript"></script>
```

### 2.1. 设置选项

