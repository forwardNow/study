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