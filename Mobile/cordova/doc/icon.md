# 自定义图标

本节介绍如何为各种平台配置应用程序的图标。 有关启动画面图像的相关的插件 `Cordova-Plugin-Splashscreen` 的文档在[这里](https://cordova.apache.org/docs/en/8.x/reference/cordova-plugin-splashscreen/)。

## 1. 在CLI中配置图标

在CLI中工作时，您可以通过在 `config.xml` 中的 `<icon>` 元素定义应用程序图标。 如果未指定图标，则使用Apache Cordova logo。

```xml
<icon src="res/ios/icon.png" platform="ios" width="57" height="57" density="mdpi" />
```

| 属性 | 描述 |
| - | - |
| src | Required。相对于项目目录的图像文件的位置 |
| platform | Optional。指定平台。 |
| width | Optional。图像的像素（px）宽度。 |
| height | Optional。图像的像素（px）高度。 |
| density | Optional。图像的密度。 |
| target | Optional。图像文件及其所有“MRT随播广告”的目标文件名。 |

以下配置可用于定义将用于所有平台的单个默认图标。

```xml
<icon src="res/icon.png" />
```

对于每个平台，您还可以定义图标集以适应不同的屏幕分辨率。

### 1.1. Android

```xml
<platform name="android">
    <!--
        ldpi    : 36x36 px
        mdpi    : 48x48 px
        hdpi    : 72x72 px
        xhdpi   : 96x96 px
        xxhdpi  : 144x144 px
        xxxhdpi : 192x192 px
    -->
    <icon src="res/android/ldpi.png" density="ldpi" />
    <icon src="res/android/mdpi.png" density="mdpi" />
    <icon src="res/android/hdpi.png" density="hdpi" />
    <icon src="res/android/xhdpi.png" density="xhdpi" />
    <icon src="res/android/xxhdpi.png" density="xxhdpi" />
    <icon src="res/android/xxxhdpi.png" density="xxxhdpi" />
</platform>
```

也可以看看：

* [Android icon guide](https://www.google.com/design/spec/style/icons.html)
* [Android - Supporting multiple screens](http://developer.android.com/guide/practices/screens_support.html)

### 1.2. 浏览器

图标不适用于浏览器平台。

### 1.3. iOS

```xml
<platform name="ios">
    <!-- iOS 8.0+ -->
    <!-- iPhone 6 Plus  -->
    <icon src="res/ios/icon-60@3x.png" width="180" height="180" />
    <!-- iOS 7.0+ -->
    <!-- iPhone / iPod Touch  -->
    <icon src="res/ios/icon-60.png" width="60" height="60" />
    <icon src="res/ios/icon-60@2x.png" width="120" height="120" />
    <!-- iPad -->
    <icon src="res/ios/icon-76.png" width="76" height="76" />
    <icon src="res/ios/icon-76@2x.png" width="152" height="152" />
    <!-- Spotlight Icon -->
    <icon src="res/ios/icon-40.png" width="40" height="40" />
    <icon src="res/ios/icon-40@2x.png" width="80" height="80" />
    <!-- iOS 6.1 -->
    <!-- iPhone / iPod Touch -->
    <icon src="res/ios/icon.png" width="57" height="57" />
    <icon src="res/ios/icon@2x.png" width="114" height="114" />
    <!-- iPad -->
    <icon src="res/ios/icon-72.png" width="72" height="72" />
    <icon src="res/ios/icon-72@2x.png" width="144" height="144" />
    <!-- iPad Pro -->
    <icon src="res/ios/icon-167.png" width="167" height="167" />
    <!-- iPhone Spotlight and Settings Icon -->
    <icon src="res/ios/icon-small.png" width="29" height="29" />
    <icon src="res/ios/icon-small@2x.png" width="58" height="58" />
    <!-- iPad Spotlight and Settings Icon -->
    <icon src="res/ios/icon-50.png" width="50" height="50" />
    <icon src="res/ios/icon-50@2x.png" width="100" height="100" />
    <!-- iPad Pro -->
    <icon src="res/ios/icon-83.5@2x.png" width="167" height="167" />
</platform>
```

也可以看看：

* [App Icons on iPad and iPhone](https://developer.apple.com/library/content/qa/qa1686/_index.html)