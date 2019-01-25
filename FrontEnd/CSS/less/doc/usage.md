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

您可以通过在脚本标记之前在 less 对象上设置选项来以编程方式设置选项 - 这会影响所有初始链接标记和 less 的编程使用。

```html
<script>
  less = {
    env: "development",
    async: false,
    fileAsync: false,
    poll: 1000,
    functions: {},
    dumpLineNumbers: "comments",
    relativeUrls: false,
    rootpath: ":/a.com/"
  };
</script>
<script src="less.js"></script>
```

另一种方法是在脚本标记上指定选项，例如

```html
<script>
  less = {
    env: "development"
  };
</script>
<script src="less.js" data-env="development"></script>
```

或者为了简洁起见，可以将它们设置为脚本和链接标记上的属性：

```html
<script src="less.js" data-poll="1000" data-relative-urls="false"></script>
<link data-dump-line-numbers="all" data-global-vars='{ "myvar": "#ddffee", "mystr": "\"quoted\"" }' rel="stylesheet/less" type="text/css" href="less/styles.less">
```

### 2.2. 浏览器支持

Less.js 支持所有现代浏览器（Chrome、Firefox、Safari、IE11+、Edge）。 虽然在生产中可以在客户端使用 Less，但请注意这样做会对性能产生影响（尽管 Less 的最新版本要快得多）。 此外，如果发生 JavaScript 错误，有时会出现装饰性问题。 这是灵活性与速度的折衷。 为了尽可能提高静态网站的性能，我们建议在服务器端编译 Less。

有理由在生产中使用客户端 Less，例如，如果您想允许用户调整将影响主题的变量，并且您希望实时向他们显示 - 在这种情况下，用户不担心在看到之前等待样式更新。

### 2.3. 提示

* 确保在脚本之前包含样式表。
* 链接多个 `.less` 样式表时，每个样式表都是独立编译的。 因此，您在样式表中定义的任何变量、混合或名称空间都无法访问。

## 3. Less.js 选项

### 3.1. Include Paths

```shell
lessc --include-path=PATH1;PATH2

{ paths: ['PATH1', 'PATH2'] }
```

如果 `@import` 规则中的文件不存在于该确切位置，则 Less 将在传递给此选项的位置查找该文件。 例如，您可以使用它来指定要在 Less 文件中简单且相对地引用的库的路径。

类似于指定 path 环境变量。

### 3.2. Rootpath

```shell
lessc -rp=resources/
lessc --rootpath=resources/

{ rootpath: 'resources/' }
```

允许您为 css 中的每个生成的 import 和 URL 添加路径。 这不会影响处理的 Less import语句，只会影响输出 css 中的那些语句。

例如，如果 css 使用的所有图像都位于名为 `resources` 的文件夹中，则可以使用此选项将其添加到 URL 中，然后将该文件夹的名称配置为可配置。

### 3.3. 重写网址

```shell
lessc -ru=off
lessc --rewrite-urls=off
{ rewriteUrls: 'off' }

lessc -ru=all
lessc --rewrite-urls=all
{ rewriteUrls: 'all' }

lessc -ru=local
lessc --rewrite-urls=local
{ rewriteUrls: 'local' }
```

默认情况下，URL保持原样（`'off'`），因此如果您在引用图像的子目录中导入文件，则将在 css 中输出完全相同的URL。 此选项允许您重写导入文件中的 URL，以便 URL 始终相对于已传递给 Less 的基本文件。 例如。

```text
${root}/
  main.less
  global/
    fonts.less
    myfont/
      myfont.woff2
```

```less
/* main.less */
@import "global/fonts.less";
```

```less
/* global/fonts.less */
@font-face {
  font-family: 'MyFont';
  src: url('myfont/myfont.woff2') format('woff2');
  src: url('./myfont/myfont.woff2') format('woff2');
}
```

设置 `rewriteUrls: 'off'`，`main.less` 输出为：

```css
/* main.less */

/* global/fonts.less */
@font-face {
  font-family: 'MyFont';
  src:
    url('myfont/myfont.woff2') format('woff2'),
    url('./myfont/myfont.ttf') format('ttf');
}
```

设置 `rewriteUrls: 'all'`，`main.less` 输出为：

```css
/* main.less */

/* global/fonts.less */
@font-face {
  font-family: 'MyFont';
  src:
    url('./global/myfont/myfont.woff2') format('woff2'),
    url('./global/myfont/myfont.ttf') format('ttf');
}
```

设置 `rewriteUrls: 'local'`，`main.less` 输出为：

```css
/* main.less */

/* global/fonts.less */
@font-face {
  font-family: 'MyFont';
  src:
    url('myfont/myfont.woff2') format('woff2'),
    url('./global/myfont/myfont.ttf') format('ttf');
}
```

如果你将 Less 与 [CSS 模块](https://github.com/css-modules/css-modules) 结合起来使用类似的解析语义（如 Node.js），这可能很有用。

您可能还需要考虑使用 data-uri 函数而不是此选项，它会将图像嵌入到 css 中。

### 3.4. Math

略

### 3.5. Strict Units

```shell
lessc -su=on
lessc --strict-units=on

{ strictUnits: true }
```

默认为 `off` / `false`。

如果没有此选项，则在数学运算时尝试猜测输出单位。 例如

```less
.class {
  width: 1px * 2px;
}
```

在这种情况下，事情显然是不对的 - 长度乘以长度给出一个区域，但 css 不支持指定区域。 因此我们假设用户意味着其中一个值是值，而不是长度单位，我们输出 `2px`。

使用严格的单位，我们假设这是计算中的错误并抛出错误。

### 3.6. Global Variables

```shell
lessc --global-var="color1=red"

{ globalVars: { color1: 'red' } }
```

此选项定义可由文件引用的变量。 声明放在基础 Less 文件的顶部，这意味着可以使用它，但如果在文件中定义了此变量，也可以覆盖它。

### 3.7. Modify Variables

```shell
lessc --modify-var="color1=red"

{ modifyVars: { color1: 'red' } }
```

与全局变量选项相反，这会将声明放在基本文件的末尾，这意味着它将覆盖 Less 文件中定义的任何内容。

### 3.8. URL Arguments

```shell
lessc --url-args="cache726357"

{ urlArgs: 'cache726357' }
```

此选项允许您指定要转到每个 URL 的参数。 例如，这可以用于缓存清除。

### 3.9. Lint

运行 Less 解析器，只报告错误而不输出任何内容。

### 3.10. 允许从不安全的HTTPS主机导入

```shell
lessc --insecure

{ insecure: true }
```

### 3.11. Source Map Options

```shell
lessc --source-map

{ sourceMap: {} }
```

告诉 less 生成 Source Map