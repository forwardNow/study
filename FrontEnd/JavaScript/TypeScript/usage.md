# 使用

在 vscode 中使用 TypeScript

## 1. 安装

```shell
# 安装 TypeScript Compiler
$ npm install -g typescript
$ tsc -v
Version 3.3.3

# 安装库的 d.ts 文件, 如安装 node.d.ts 文件
$ npm install --save -g @types/node
```

## 2. 创建项目与配置

项目目录结构：

```text
example/
  src/
    test/
      1.ts
  dist/
```

创建目录、tsconfig.json 文件：

```shell
# 创建空文件夹
$ mkdir example

# 切换到项目根目录
$ cd example

# 创建 tsconfig.json：typescript 的项目都需要一个tsconfig.json
$ tsc --init
```

`tsconfig.json` 的配置：

```json
{
  "compilerOptions": {
    // Base directory to resolve non-absolute module names
    "baseUrl": "./",

    // Redirect output structure to the directory
    "outDir": "./dist",

    // Specify the root directory of input files. Use to control the output directory structure with --outDir. 
    "rootDir": "./src",
  }
}
```