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