# RAML

## 1. 参考

* [官网](https://raml.org/)
* [raml-spec](https://github.com/raml-org/raml-spec)
* [raml 的使用](https://blog.csdn.net/fang_qiming/article/details/79379731)

## 2. 编辑器

为了编辑符合 RAML 规范的文档，需要一款编辑器（及其相应插件），有如下：

* [API Designer](https://github.com/mulesoft/api-designer)：官方推荐的设计工具，可以下载下来打开浏览器使用
* [API Workbench](http://apiworkbench.com/)：Atom 编辑器的插件
* [RAML (blzjns.vscode-raml)](https://github.com/blzjns/vscode-raml)：vscode 的插件

这里使用 vscode 来编辑 RAML 文档，安装如下：

* 第 1 步：安装 RAML 插件

* 第 2 步：全局安装 [raml2html](https://www.npmjs.com/package/raml2html)

```shell
npm i -g raml2html
```

* 第 3 步：在偏好设置中设置预览主题

```json
{
    "raml.previewTheme": "light"
}
```

## 3. 编写 RAML 文档

文件扩展名：`.raml`

### 3.1. 示例

```raml
#%RAML 1.0
---
title: 后台管理系统
baseUri: http://127.0.0.1:8083
version: v1

/module:
```

## 4. 总结

发展不是很好，没有 swagger 火。