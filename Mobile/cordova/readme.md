# Cordova

## 1. 介绍

发音：科多瓦

官网：[https://cordova.apache.org](https://cordova.apache.org)

## 2. 快速开始

### 2.1. 安装命令行工具

```shell
npm install -g cordova
```

### 2.2. 创建 cordova 项目

```shell
cordova create MyApp
```

### 2.3. 检测环境是否配置好

```shell
cd MyApp
cordova requirements
# 提示 Gradle 没有安装
```

### 2.4. 安装 Gradle

参考 [https://gradle.org/install/](https://gradle.org/install/)：

```shell
$ brew install gradle
$ gradle -v
Gradle 5.0
```

### 2.5. 查看并安装目标平台

```shell
cd MyApp
cordova platforms list
cordova platform add android
```

### 2.6. 修改 build.gradle 文件

>如果你的maven仓库有问题，则需要更改 `android` 目录下所有子项目的 `build.gradle` 。

位置：

```text
${root}/
  platforms/
    android/
      build.gradle    # 文件 1
      app/
        build.gradle  # 文件 2
      CordovaLib/
        build.gradle  # 文件 3
```

修改 maven 仓库地址：

```text
修改之前：

  jcenter()
  maven {
      url "https://maven.google.com"
  }

修改之后：

  google()
  jcenter()
```

### 2.7. 生成 apk 文件

```shell
cordova build android
```

## 3. 参考

* [Cordova开发环境踩坑记](https://github.com/abeet/Blog/issues/23)