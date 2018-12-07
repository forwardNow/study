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

## 3. 添加平台

所有后续命令都需要在项目的目录或任何子目录中运行：

```shell
cd hello
```

添加您要定位应用的平台。 我们将添加 ios 和 android 平台并确保它们保存到 `config.xml` 和 `package.json`：

```shell
cordova platform add ios
cordova platform add android
```

检查当前的平台集：

```shell
cordova platform ls
```

运行添加或删除平台的命令会影响项目平台目录的内容，其中每个指定的平台都显示为子目录。

>注意：使用 CLI 构建应用程序时，不应编辑 `platforms` 目录中的任何文件。 在准备构建应用程序或重新安装插件时，会定期覆盖此目录中的文件。

也可以看看：

* [Cordova platform command reference documentation](https://cordova.apache.org/docs/en/8.x/reference/cordova-cli/index.html#cordova-platform-command)

## 4. 安装构建的环境

要构建和运行应用程序，您需要为要定位的每个平台安装 SDK。 或者，如果您使用浏览器进行开发，则可以使用不需要任何平台 SDK 的浏览器平台。

检查您是否满足构建到指定平台的要求：

```shell
$ cordova requirements
Android Studio project detected

Requirements check results for android:
Java JDK: installed 1.8.0
Android SDK: installed true
Android target: installed android-28,android-27,android-26,android-21,android-19,android-16,android-15
Gradle: installed /usr/local/Cellar/gradle/5.0/bin/gradle
```

可以看看：

* [Android platform requirements](https://cordova.apache.org/docs/en/8.x/guide/platforms/android/index.html#requirements-and-support)
* [iOS platform requirements](https://cordova.apache.org/docs/en/8.x/guide/platforms/ios/index.html#requirements-and-support)
* [Windows platform requirements](https://cordova.apache.org/docs/en/8.x/guide/platforms/windows/index.html#requirements-and-support)

## 5. 构建应用程序

默认情况下，`cordova create` 脚本生成一个基于 Web 的骨架应用程序，其起始页是项目的 `www/index.html` 文件。 应将任何初始化指定为 `www/js/index.js` 中定义的 [deviceready](https://cordova.apache.org/docs/en/8.x/cordova/events/events.html#deviceready) 事件处理程序的一部分。

运行以下命令为所有平台构建项目：

```shell
cordova build
```

您可以选择将每个构建的范围限制为特定平台 - 在这种情况下为 “ios”：

```shell
cordova build ios
```

可以看看：

* [Cordova build command reference documentation](https://cordova.apache.org/docs/en/8.x/reference/cordova-cli/index.html#cordova-build-command)

## 6. 测试应用程序

适用于移动平台的 SDK 通常与运行设备镜像的模拟器捆绑在一起，因此您可以从主屏幕启动应用程序，并查看它与许多平台功能的交互方式。 运行如下命令来重建应用程序并在特定平台的模拟器中查看它：

```shell
cordova emulate android
```

继续使用 `cordova emulate` 命令刷新模拟器以显示最新的应用程序，该应用程序现在可从主屏幕启动。

或者，您可以将手机插入计算机并直接测试应用程序：

```shell
cordova run android
```

在运行此命令之前，您需要按照每个平台不同设备不同设置以进行测试。

也可以看看：

* [Setting up Android emulator](https://cordova.apache.org/docs/en/8.x/guide/platforms/android/index.html#setting-up-an-emulator)
* [Cordova run command reference documentation](https://cordova.apache.org/docs/en/8.x/reference/cordova-cli/index.html#cordova-run-command)
* [Cordova emulate command reference documentation](https://cordova.apache.org/docs/en/8.x/reference/cordova-cli/index.html#cordova-emulate-command)

## 7. 添加插件

您可以修改默认生成的应用程序以利用标准 Web 技术，但是要让应用程序访问设备级功能，您需要添加插件。

插件提供了用于使用原生 SDK 功能的 Javascript API。 插件通常托管在 npm 上，您可以在[插件搜索页面](https://cordova.apache.org/plugins/)上搜索它们。 一些关键 AP I由 Apache Cordova 开源项目提供，这些 API 称为 [Core Plugin API](https://cordova.apache.org/docs/en/8.x/guide/support/index.html#core-plugin-apis)。 您还可以使用CLI启动搜索页面：

```shell
cordova plugin search camera
```

指定相机插件的 npm 包名称，即可将相机插件添加并保存到 `config.xml` 和 `package.json`：

```shell
$ cordova plugin add cordova-plugin-camera
Installing "cordova-plugin-camera" for android
Android Studio project detected
Subproject Path: CordovaLib
Subproject Path: app
Adding cordova-plugin-camera to package.json
Saved plugin info for "cordova-plugin-camera" to config.xml
```

也可以使用目录或 git repo 添加插件。

>注意：CLI 会根据每个平台添加适当的插件代码。 如果您希望使用概述中讨论的低级 shell 工具或平台 SDK 进行开发，则需要运行 Plugman 实用程序以分别为每个平台添加插件。 （有关更多信息，请参阅使用 Plugman 管理插件。）

使用 `plugin ls`（或 `plugin list` 或 `plugin`）来查看当前安装的插件。 安装的每个插件都会显示器标识符：

```shell
$ cordova plugin ls
cordova-plugin-camera 4.0.3 "Camera"
cordova-plugin-whitelist 1.3.3 "Whitelist"
```

也可以看看：

* [Cordova plugin command reference documentation](https://cordova.apache.org/docs/en/8.x/reference/cordova-cli/index.html#cordova-plugin-command)
* [Cordova plugin search page](https://cordova.apache.org/plugins/)
* [Core Plugin APIs](https://cordova.apache.org/docs/en/8.x/guide/support/index.html#core-plugin-apis)

## 8. 使用 `merges` 为每个平台添加自定义代码

虽然 Cordova 允许您轻松地为许多不同平台部署应用程序，但有时您需要添加自定义内容。 在这种情况下，您不希望修改顶级 `platforms` 中各个平台的 `www` 目录中的源文件，因为它们经常被顶级 `www` 目录的跨平台源替换。

相反，顶级 `${root}/merges` 目录提供了指定要在特定平台上部署的资源的位置。 `${root}/merges` 中的每个特定于平台的子目录都对应 `${root}/www` 目录的结构，允许您根据需要覆盖或添加文件。 例如，以下是如何使用 `${root}/merges` 来增强 Android 设备的默认字体大小：

* 在 `${root}/www/index.html` 引入一个额外的 CSS 文件 `overrides.css`

```html
<link rel="stylesheet" type="text/css" href="css/overrides.css" />
```

* 创建空文件 `${root}/www/css/overrides.css`，避免非 Android 平台编译时报找不到文件错误
* 创建文件 `${root}/merges/android/css/overrides.css`，编写 Android 上应用的样式

重建项目时，Android 版本具有特定的样式，而其他版本保持不变。

您还可以使用 `${root}/merges` 来添加原始 `www` 目录中不存在的文件。 例如，应用程序可以将后退按钮图形合并到 iOS 界面中，存储在 `merges/ios/img/back_button.png` 中，而 Android 版本可以从相应的硬件按钮捕获后退按钮事件。

## 9. 更新 Cordova 和您的项目

安装 `cordova` 工具后，您始终可以通过运行以下命令将其更新到最新版本：

```shell
sudo npm update -g cordova
```

使用此语法安装特定版本：

```shell
sudo npm install -g cordova@3.1.0
```

运行 `cordova -v` 以查看当前正在运行的版本。

```shell
$ cordova -v
8.1.2 (cordova-lib@8.1.1)
```

要查找最新发布的 cordova 版本，您可以运行：

```shell
$ npm info cordova version
8.1.2
```

要更新您要定位的平台：

```shell
$ cordova platform update android --save
$ cordova platform update ios --save
...etc.
```