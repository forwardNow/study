# Android 平台指南

本指南介绍了如何设置 SDK 环境以部署 Android 设备的 Cordova 应用程序，以及如何在开发工作流程中选择使用以 Android 为中心的命令行工具。 无论您是要使用以平台为中心的 shell 工具还是跨平台的 Cordova CLI 进行开发，都需要安装 Android SDK。 有关两个开发路径的比较，请参阅概述。 有关 CLI 的详细信息，请参阅 Cordova CLI 参考。

## 1. 要求和支持

适用于 Android 的 Cordova 需要可以安装在 OS X，Linux 或 Windows 上的 Android SDK。 查看 Android SDK 的系统要求。 Cordova 的最新 Android 软件包支持 Android API 级别 25.支持的 Android API 级别和过去几个 cordova-android 版本的 Android 版本可在此表中找到：

| cordova-android Version | Supported Android API-Levels | Equivalent Android Version |
| - | - | - |
| 7.X.X | 19 - 27 | 4.4 - 8.1 |
| 6.X.X | 16 - 26 | 4.1 - 8.0.0 |
| 5.X.X | 14 - 23 | 4.0 - 6.0.1 |
| 4.1.X | 14 - 22 | 4.0 - 5.1 |
| 4.0.X | 10 - 22 | 2.3.3 - 5.1 |
| 3.7.X | 10 - 21 | 2.3.3 - 5.0.2 |

请注意，此处列出的版本适用于 Cordova 的 Android 软件包，[cordova-android](https://github.com/apache/cordova-android)，而不适用于 Cordova CLI。 要确定 Cordova 项目中安装的 Cordova Android 软件包的版本，请在包含项目的目录中运行命令 `cordova platform ls`。

作为一般规则，当 Android 版本在 Google 的分发仪表板上降至 5％ 以下时，Cordova 将不支持该版本。

## 2. 安装要求

### 2.1. Java 开发工具包（JDK）

安装 [Java Development Kit (JDK) 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).

在 Windows 上安装时，还需要根据 JDK 安装路径设置 `JAVA_HOME` 环境变量（请参阅设置环境变量）

### 2.2. Gradle

从 Cordova-Android 6.4.0 开始，现在需要安装 [Gradle](https://gradle.org/install/) 来构建 Android。

在 Windows 上安装时，需要将 Gradle 添加到 `path` 中（请参阅设置环境变量）

### 2.3. Android SDK

安装 Android Studio。 详细的安装说明在 Android 的开发者网站上。

### 2.4. 添加 SDK 包

安装 Android SDK 后，您还必须安装您希望定位的任何 API 级别的软件包。 建议您安装您的cordova-android 版本支持的最高 SDK 版本（请参阅要求和支持）。

打开 Android SDK Manager（从终端运行 sdkmanager）并确保安装了以下内容：

1. Android 平台 SDK 适用于您的目标 Android 版本
2. Android SDK build-tools版本19.1.0或更高版本
3. Android支持库（位于“Extras”下）

有关更多详细信息，请参阅 Android 有关安装 SDK 包的文档。

### 2.5. 设置环境变量

Cordova 的 CLI 工具需要设置一些环境变量才能正常运行。 CLI 将尝试为您设置这些变量，但在某些情况下，您可能需要手动设置它们。 应更新以下变量：

1. 将 `JAVA_HOME` 环境变量设置为 JDK 安装的位置
2. 将 `ANDROID_HOME` 环境变量设置为 Android SDK 安装的位置
3. 还建议您将 Android SDK 工具，`tools/bin` 和 `platform-tools` 目录添加到 `PATH` 中

### 2.6. OS X 和 Linux

在 Mac 或 Linux 上，您可以使用文本编辑器来创建或修改 `~/.bash_profile` 文件。 要设置环境变量，请添加一条使用 `export` 的行：

```text
export ANDROID_HOME=/Users/forwardNow/Library/Android/sdk
```

要更新 PATH，请添加类似以下内容的行（将路径替换为您当地的 Android SDK 安装位置）：

```text
export PATH=$PATH:/Users/forwardNow/Library/Android/sdk/platform-tools:/Users/forwardNow/Library/Android/sdk/tools
```

重新加载终端以反映此更改或运行以下命令：

```shell
$ source ~/.bash_profile
$ echo $PATH
......
```

### 2.7. Windows

略。

## 3. 项目配置

如果您希望在 Android 模拟器上运行 Cordova 应用程序，首先需要创建 Android 虚拟设备（AVD）。

正确配置 AVD 后，您应该能够通过运行以下命令将 Cordova 应用程序部署到模拟器：

```shell
cordova run --emulator
```

### 3.1. 配置 Gradle

截至 cordova-android@4.0.0，用于 Android 项目的 Cordova 是使用 Gradle 构建的。 有关使用 Ant 构建的说明，请参阅文档的旧版本。 请注意，从 Android SDK Tools 25.3.0 开始，不推荐使用 Ant 版本。

#### 3.1.1. 设置 Gradle 属性

可以通过设置 Cordova 公开的某些 [Gradle 属性](https://docs.gradle.org/current/userguide/build_environment.html)的值来配置 Gradle 构建。 可以设置以下属性：

| Property | Description |
| - | - |
| `cdvBuildMultipleApks` | 如果设置了此项，则将生成多个 APK 文件：每个原生平台一个。 如果您的项目使用大型原生库，这可能很重要，这会大大增加生成的 APK 的大小。 如果未设置，则将生成可在所有设备上使用的单个 APK |
| `cdvVersionCode` | 覆盖 `AndroidManifest.xml` 中设置的 `versionCode` |
| `cdvReleaseSigningPropertiesFile` | 默认值：`release-signing.properties`。
包含发布版本的签名信息的 `.properties` 文件的路径（请参阅签署应用程序） |
| `cdvDebugSigningPropertiesFile` | 默认值：`debug-signing.properties`。
包含调试版本的签名信息的 `.properties` 文件的路径（请参阅签署应用程序）。 需要与其他开发人员共享签名密钥时很有用 |
| `cdvMinSdkVersion` | 覆盖 `AndroidManifest.xml` 中设置的 `minSdkVersion` 的值。 在基于 SDK 版本创建多个 APK 时很有用 |
| `cdvBuildToolsVersion` | 覆盖自动检测到的 `android.buildToolsVersion` 值 |
| `cdvCompileSdkVersion` | 覆盖自动检测到的 `android.compileSdkVersion` 值 |

您可以通过以下四种方式之一设置这些属性：

* 通过设置环境变量，如下所示：

```shell
# export ORG_GRADLE_PROJECT_cdvMinSdkVersion=20
$ cordova build android
```

* 通过在 Cordova 构建（`build`）或运行（`run`）命令中使用 `--gradleArg` 标志：

```shell
cordova run android -- --gradleArg=-PcdvMinSdkVersion=20
```

* 通过在 Android 平台文件夹（`<your-project>/platforms/android`）中放置一个名为 `gradle.properties` 的文件并在其中设置属性，如下所示：

```text
# In <your-project>/platforms/android/gradle.properties
cdvMinSdkVersion=20
```

* 通过 `build-extras.gradle` 文件扩展 `build.gradle` 并设置属性如下：

```text
// In <your-project>/platforms/android/build-extras.gradle
ext.cdvMinSdkVersion = 20
```

后两个选项都涉及在 Android 平台文件夹中包含一个额外的文件。 通常，不建议您编辑此文件夹的内容，因为这些更改很容易丢失或覆盖。 相反，应使用 `before_build` [挂钩](https://cordova.apache.org/docs/en/8.x/guide/appdev/hooks/index.html)将这两个文件从另一个位置复制到该文件夹中作为构建命令的一部分。

#### 3.1.2. 扩展 build.gradle

略。

### 3.2. 设置版本代码

要更改应用程序生成的 apk 的版本代码，请在应用程序的 `config.xml` 文件的 `<widget>` 元素中设置 `android-versionCode` 属性。 如果未设置 `android-versionCode`，则将使用 `version` 属性确定版本代码。 例如，如果版本是 `MAJOR.MINOR.PATCH`：

```text
versionCode = MAJOR * 10000 + MINOR * 100 + PATCH
```

如果您的应用程序已启用 `cdvBuildMultipleApks` Gradle属性（请参阅设置 Gradle 属性），则应用程序的版本代码也将乘以 10，以便代码的最后一位数字可用于指示 apk 构建的体系结构。 无论版本代码是从 `android-versionCode` 属性获取还是使用 `version` 生成，都会发生这种乘法。 请注意，添加到项目中的某些插件（包括 `cordova-plugin-crosswalk-webview`）可能会自动设置此 Gradle 属性。

请注意：更新 `android-versionCode` 属性时，增加从构建的 apk 获取的版本代码是不明智的。 相反，您应该根据 `config.xml` 文件的 `android-versionCode` 属性中的值增加代码。 这是因为 `cdvBuildMultipleApks` 属性导致版本代码在构建的 apk 中乘以 10，因此使用该值将导致您的下一个版本代码是原始版本的 100 倍，等等。

## 4. 签署应用程序

首先，您应该阅读 Android 应用程序签名要求。

### 4.1. 使用标志

要签署应用程序，您需要以下参数：

| Parameter | Flag | Description |
| - | - | - |
| Keystore | --keystore | 包含 key 的密钥库(二进制文件)的路径 |
| Keystore Password | --storePassword | 密钥库的密码 |
| Alias | --alias | 指定用于签名的私钥的 ID |
| Password | --password | 指定私钥的密码 |
| Type of the Keystore | --keystoreType | 默认值：基于文件扩展名自动检测。无论是 pkcs12 还是 jks |

可以使用上面的命令行参数为 Cordova CLI 的 `build` 或 `run` 命令指定这些参数。

注意：您应该使用双 `-` 表示这些是特定于平台的参数，例如：

```shell
cordova run android --release -- --keystore=../my-release-key.keystore --storePassword=password --alias=alias_name --password=password.
```

### 4.2. 使用 build.json

或者，您可以使用相同命令的 `--buildConfig` 参数在构建配置文件（`build.json`）中指定它们。以下是构建配置文件的示例：

```json
{
    "android": {
        "debug": {
            "keystore": "../android.keystore",
            "storePassword": "android",
            "alias": "mykey1",
            "password" : "password",
            "keystoreType": ""
        },
        "release": {
            "keystore": "../android.keystore",
            "storePassword": "",
            "alias": "mykey2",
            "password" : "password",
            "keystoreType": ""
        }
    }
}
```

对于发布签名，可以排除密码，构建系统将发出询问密码的提示。

还支持在 `build.json` 中混合和匹配命令行参数和参数。 命令行参数中的值将优先。 这对于在命令行上指定密码很有用。

### 4.3. 使用 Gradle

您还可以通过包含 `.properties` 文件并使用 `cdvReleaseSigningPropertiesFile` 和 `cdvDebugSigningPropertiesFile` Gradle 属性指向它来指定签名属性（请参阅设置 Gradle 属性）。 该文件应如下所示：

```text
storeFile=relative/path/to/keystore.p12
storePassword=SECRET1
storeType=pkcs12
keyAlias=DebugSigningKey
keyPassword=SECRET2
```

`storePassword` 和 `keyPassword` 是可选的，如果省略，将提示输入。

## 5. 调试

有关 Android SDK 随附的调试工具的详细信息，请参阅 Android 的开发人员文档以进行调试。 此外，Android 的用于调试Web应用程序的开发人员文档提供了有关调试 Webview 中运行的应用程序部分的简介。

### 5.1. 在 Android Studio 中打开项目

适用于 Android 项目的 Cordova 可以在 Android IDE，Android Studio 中打开。 如果您希望使用 Android Studio 内置的 Android 调试/分析工具，或者您正在开发 Android 插件，这将非常有用。 请注意，在 Android studio 中打开项目时，建议您不要在 IDE 中编辑代码。 这将编辑项目的平台文件夹（而不是 `www`）中的代码，并且更改可能会被覆盖。 而是编辑 `www` 文件夹并通过运行 `cordova build` 复制您的更改。

希望在 IDE 中编辑其原生代码的插件开发人员在通过 `cordova plugin add` 将其插件添加到项目时应使用 `--link` 标志。 这将链接文件，以便对 `platforms` 文件夹中的插件文件的更改反映在插件的源文件夹中（反之亦然）。

要在 Android Studio 中打开 Cordova for Android 项目，请执行以下操作：

1. 启动 Android Studio.
2. 选择 `Import Project (Eclipse ADT, Gradle, etc)`.
3. 选择 `<your-project>/platforms/android`
4. `Gradle Sync`

完成导入后，您应该能够直接从 Android Studio 构建和运行应用程序。 有关详细信息，请参阅 Android Studio 概述以及从 Android Studio 构建和运行。

## 6. 以平台为中心的工作流程

cordova-android 包含许多脚本，允许在没有完整 Cordova CLI 的情况下使用该平台。 在某些情况下，此开发路径可为您提供比跨平台 cordova CLI 更多的开发选项。 例如，在将自定义 Cordova WebView 与本机组件一起部署时，需要使用 shell 工具。 在使用此开发路径之前，您仍必须按照上面的“要求和支持”中的说明配置 Android SDK 环境。

略。。

## 7. 升级

有关升级 `cordova-android` 版本的说明，请参阅[此文章](https://cordova.apache.org/docs/en/8.x/guide/platforms/android/upgrade.html)。

## 8. 生命周期指南

### 8.1. Cordova 和 Android

原生 Android 应用程序通常包含用户与之交互的一系列 activities。 可以将 activities 视为构成应用程序的各个屏幕; 应用程序中的不同任务通常会有自己的 activity。 每个 activity 都有自己的生命周期，在在 activity 进入和离开用户设备的前台时自行维护。

相比之下，Android 平台上的 Cordova 应用程序在嵌入在单个 Android activity 中的 Webview 中执行。 此 activity 的生命周期通过触发的 document events 向您的应用程序公开。 这些事件不能保证与 Android 的生命周期一致，但它们可以提供保存和恢复状态的指南。 这些事件大致映射到 Android 回调，如下所示：

| Cordova Event | 大致等效 Android 的 | 含义 |
| - | - | - |
| `deviceready` | `onCreate()` | 应用程序正在启动（不是从后台） |
| `pause` | `onPause()` | 应用程序正在转向后台 |
| `resume` | `onResume()` | 应用程序返回到前台 |

大多数其他 Cordova 平台都有类似的生命周期概念，并且当用户设备上发生类似操作时，应触发这些相同的事件。 但是，由于原生 Activity 生命周期，Android 会出现一些有时会出现的独特挑战。

### 8.2. 是什么让 Android 与众不同？

在 Android 中，操作系统可以选择在后台终止 activity，以便在设备内存不足时释放资源。 不幸的是，当您的应用程序中的 activity 被终止时，您的应用程序所在的 Webview 也将被销毁。 在这种情况下，您的应用程序维护的任何状态都将丢失。 当用户导航回您的应用程序时，操作系统将重新创建 activity 和 Webview，但您的 Cordova 应用程序不会自动恢复状态。 因此，您的应用程序必须了解触发的生命周期事件并维护适当的状态，以确保应用程序中的用户上下文在离开应用程序时不会丢失。

### 8.3. 什么时候会发生？

只要用户看不到您的应用程序，就很容易被操作系统破坏。 有两种主要情况可能发生。 第一个也是最明显的情况是用户按下主页按钮或切换到另一个应用程序。

但是，某些插件可以引入第二个（并且更加微妙）的情况。 如上所述，Cordova 应用程序通常仅限于包含 Webview 的单个 activity。 但是，有些情况下插件可以启动其他 activity，并暂时将 Cordova 活动推送到后台。 通常会启动这些其他 activity，以便使用设备上安装的原生应用程序执行特定任务。 例如，Cordova 相机插件会启动设备上原生安装的任何相机 activity 以拍摄照片。 以这种方式重新使用已安装的相机应用程序会使您的应用程序在用户尝试拍照时更像本机应用程序。 不幸的是，当本机 Activity 将您的应用推送到后台时，操作系统有可能会将其杀死。

为了更清楚地理解第二种情况，让我们来看一个使用相机插件的例子。 想象一下，您有一个需要用户拍摄个人资料照片的应用程序。 一切按计划进行时，应用程序中的事件流将如下所示：

1. 用户正在与您的应用进行互动，需要拍照
2. 相机插件启动本机相机 activity
    * Cordova activity 被推到后台（暂停事件 `pause` 被触发）
3. 用户拍照
4. 相机 activity 结束
    * Cordova activity 被移到前台（恢复事件 `resume` 被触发）
5. 用户返回到他们停止的应用程序

但是，如果设备内存不足，则可能会中断此事件流。 如果 activity 被操作系统杀死，则上述事件序列将显示如下：

1. 用户正在与您的应用进行互动，需要拍照
2. 相机插件启动本机相机 activity
    * 操作系统销毁 Cordova activity（暂停事件 `pause` 被触发）
3. 用户拍照
4. 相机 activity 结束
    * 操作系统重新创建 Cordova activity（触发设备准备 `deviceready` 和恢复事件 `resume`）
5. 用户对于他们突然回到您应用的登录界面的情况感到困惑

在这种情况下，操作系统在后台杀死了应用程序，并且应用程序没有将其状态保持为生命周期的一部分。 当用户返回到应用程序时，Webview 被重新创建，并且应用程序似乎已从头开始重新启动（因此用户感到困惑）。 这一系列事件等同于按下主页按钮或用户切换应用程序时发生的事件。 防止上述体验的关键是订阅事件并将状态正确地维护为活动生命周期的一部分。

### 8.4. 关于生命周期

在上面的示例中，显示了触发的 javascript 事件。 这些事件是您保存和恢复应用程序状态的机会。 您应该在应用程序的 `bindEvents` 函数中注册回调，该函数通过保存状态来响应生命周期事件。 您保存的信息以及保存方式由您自行决定，但您应确保保存足够的信息，以便用户可以在用户返回应用程序时将其恢复到原来的位置。

在上面的示例中还有一个附加因素仅适用于第二个讨论的情况（即插件启动外部活动时）。 当用户完成拍照时，不仅应用程序的状态丢失，而且用户拍摄的照片也是如此。 通常，该照片将通过在相机插件中注册的回调传送到您的应用程序。 但是，当 Webview 被破坏时，回调永远丢失了。 幸运的是， cordova-android 5.1.0 及更高版本提供了一种在应用程序恢复时获取该插件调用结果的方法。

### 8.5. 检索插件回调结果（cordova-android0+）

当操作系统破坏通过插件推送到后台的 Cordova activity 时，任何挂起的回调也会丢失。 这意味着如果您将回调传递给启动新 activity 的插件（例如相机插件），则在重新创建应用程序时不会触发该回调。 但是，从 cordova-android 5.1.0 开始，`resume` 事件的有效负载将包含来自插件请求的任何挂起的插件结果，该插件请求启动在活动被销毁之前进行的外部活动。

resume事件的有效负载遵循以下格式：

```javascript
{
    action: "resume",
    pendingResult: {
        pluginServiceName: string,
        pluginStatus: string,
        result: any
    }
}
```

该有效载荷的字段定义如下：

* `pluginServiceName`：返回结果的插件名称（例如 `"Camera"`）。 这可以在插件的 `plugin.xml` 文件的 `<name>` 标记中找到
* `pluginStatus`：插件调用的状态（见下文）
* `result`：无论插件调用的结果是什么

`pendingResult` 字段中 `pluginStatus` 的可能值包括以下内容：

* `"OK"` - 插件调用成功
* `"No Result"` - 插件调用结束，没有结果
* `"Error"` - 插件调用导致一些常见错误
  * `"Class not found"`
  * `"Illegal access"`
  * `"Instantiation error"`
  * `"Malformed url"`
  * `"IO error"`
  * `"Invalid action"`
  * `"JSON error"`

请注意，由插件决定结果字段中包含的内容以及返回的 `pluginStatus` 的含义。 引用您正在使用的插件的 API，以查看您希望这些字段包含的内容以及如何使用它们的值。

#### 8.5.1. Example

下面是一个简短的示例应用程序，它使用 `resume` 和 `pause` 事件来管理状态。 它使用 Apache 相机插件作为如何从 `resume` 事件有效负载检索插件调用结果的示例。 处理 `resume` 的 `event.pendingResult` 对象的代码部分需要 cordova-android 5.1.0+

```javascript
// This state represents the state of our application and will be saved and
// restored by onResume() and onPause()
var appState = {
    takingPicture: true,
    imageUri: ""
};

var APP_STORAGE_KEY = "exampleAppState";

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        // Here we register our callbacks for the lifecycle events we care about
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('resume', this.onResume, false);
    },
    onDeviceReady: function() {
        document.getElementById("take-picture-button").addEventListener("click", function() {
            // Because the camera plugin method launches an external Activity,
            // there is a chance that our application will be killed before the
            // success or failure callbacks are called. See onPause() and
            // onResume() where we save and restore our state to handle this case
            appState.takingPicture = true;

            navigator.camera.getPicture(cameraSuccessCallback, cameraFailureCallback,
                {
                    sourceType: Camera.PictureSourceType.CAMERA,
                    destinationType: Camera.DestinationType.FILE_URI,
                    targetWidth: 250,
                    targetHeight: 250
                }
            );
        });
    },
    onPause: function() {
        // Here, we check to see if we are in the middle of taking a picture. If
        // so, we want to save our state so that we can properly retrieve the
        // plugin result in onResume(). We also save if we have already fetched
        // an image URI
        if(appState.takingPicture || appState.imageUri) {
            window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(appState));
        }
    },
    onResume: function(event) {
        // Here we check for stored state and restore it if necessary. In your
        // application, it's up to you to keep track of where any pending plugin
        // results are coming from (i.e. what part of your code made the call)
        // and what arguments you provided to the plugin if relevant
        var storedState = window.localStorage.getItem(APP_STORAGE_KEY);

        if(storedState) {
            appState = JSON.parse(storedState);
        }

        // Check to see if we need to restore an image we took
        if(!appState.takingPicture && appState.imageUri) {
            document.getElementById("get-picture-result").src = appState.imageUri;
        }
        // Now we can check if there is a plugin result in the event object.
        // This requires cordova-android 5.1.0+
        else if(appState.takingPicture && event.pendingResult) {
            // Figure out whether or not the plugin call was successful and call
            // the relevant callback. For the camera plugin, "OK" means a
            // successful result and all other statuses mean error
            if(event.pendingResult.pluginStatus === "OK") {
                // The camera plugin places the same result in the resume object
                // as it passes to the success callback passed to getPicture(),
                // thus we can pass it to the same callback. Other plugins may
                // return something else. Consult the documentation for
                // whatever plugin you are using to learn how to interpret the
                // result field
                cameraSuccessCallback(event.pendingResult.result);
            } else {
                cameraFailureCallback(event.pendingResult.result);
            }
        }
    }
}

// Here are the callbacks we pass to getPicture()
function cameraSuccessCallback(imageUri) {
    appState.takingPicture = false;
    appState.imageUri = imageUri;
    document.getElementById("get-picture-result").src = imageUri;
}

function cameraFailureCallback(error) {
    appState.takingPicture = false;
    console.log(error);
}

app.initialize();
```

相应的 html：

```html
<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *">
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <link rel="stylesheet" type="text/css" href="css/index.css">
        <title>Cordova Android Lifecycle Example</title>
    </head>
    <body>
        <div class="app">
            <div>
                <img id="get-picture-result" />
            </div>
            <Button id="take-picture-button">Take Picture</button>
        </div>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
    </body>
</html>
```

### 8.6. 测试 Activity 生命周期

Android 提供了一个开发人员设置，用于测试低内存上的 Activity 销毁。 在设备或仿真器的 “开发人员选项”菜单中启用 "Don't keep activities" 设置，以模拟低内存情况。 您应始终在启用此设置的情况下进行一些测试，以确保您的应用程序正确维护状态。