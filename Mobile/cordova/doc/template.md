# Cordova 应用程序模板

## 1. 使用模板

模板允许您使用预先存在的代码来快速启动项目。

通过在 [npm](https://www.npmjs.com/search?q=cordova%3Atemplate) 上搜索关键字 `cordova:template`，找到创建应用的模板。 您还可以使用本地模板或 Git 储库中的模板。

找到您想要使用的模板后。 使用该模板创建项目，方法是在 `create` 命令期间指定 `--template` 标志，然后指定模板源。

>模板：[Framework7 - Vue - Webpack Cordova Template](https://www.npmjs.com/package/cordova-template-framework7-vue-webpack)

从 NPM 包、Git 仓库或本地路径创建 cordova 项目：

```shell
cordova create hello com.example.hello HelloWorld --template <npm-package-name>
cordova create hello com.example.hello HelloWorld --template <git-remote-url>
cordova create hello com.example.hello HelloWorld --template <path-to-template>
```

成功使用模板创建项目后，您需要指明要与应用程序一起定位的平台。 进入项目文件夹并添加平台。

## 2. 创建模板

首先创建一个将成为模板的基础 cordova 应用程序。 然后，您将应用程序的内容放入以下结构中。 使用模板时，`template_src` 中的所有内容都将用于创建新项目，因此请确保在该文件夹中包含任何必要的文件。 请参阅此[示例](https://github.com/apache/cordova-template-reference)以获取详细信

```text
template_package/
├── package.json      (optional; needed to publish template on npm)
├──   index.js        (required)
└── template_src/     (required)
    └── CONTENTS OF APP TEMPLATE
```

>注意：`index.js` 应该导出对 `template_src` 的引用，而 `package.json` 应该引用 `index.js`。 有关如何完成的详细信息，请参阅[示例](https://github.com/apache/cordova-template-reference)。

要完成模板，请编辑 `package.json` 以包含关键字 `cordova:template`。

```json
{
  ...
  "keywords": [
    "ecosystem:cordova",
    "cordova:template"
  ]
  ...
}
```

恭喜！ 您已经创建了一个用于创建 Cordova 项目的模板。 在 npm 上分享你的模板，这样每个人都可以从你的辛勤工作中受益。