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