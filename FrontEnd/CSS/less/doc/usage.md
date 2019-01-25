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