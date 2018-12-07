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
