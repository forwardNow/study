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

