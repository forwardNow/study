# 概览

>2018年12月30日 - [Leaflet 1.4.0](https://leafletjs.com/2018/12/30/leaflet-1.4.0.html) 已经发布！

Leaflet 是领先的开源 JavaScript 库，适用于移动设备的友好的交互式地图。它的JS只需要大约 38 KB，它具有大多数开发人员所需的所有地图功能。

Leaflet 的设计考虑了简单性、性能、可用性。 它可以在所有主要的桌面和移动平台上高效工作，可以通过大量[插件](https://leafletjs.com/plugins.html)进行扩展，具有漂亮、易于使用、完善的 [API 文档](https://leafletjs.com/reference.html)、简单易读的[源代码](https://github.com/Leaflet/Leaflet)，这是一种乐趣。

通过[快速入门指南](https://leafletjs.com/examples/quick-start/)了解更多信息，查看[其他教程](https://leafletjs.com/examples.html)，或直接访问 [API 文档](https://leafletjs.com/reference.html)。 如果您有任何疑问，请先查看[常见问题解答](https://github.com/Leaflet/Leaflet/blob/master/FAQ.md)。

## 1. 特点

Leaflet 并不试图为每个人做所有事情。 相反，它专注于使基本的东西完美地运作。

* 开箱即用的图层
  * 瓦片图层（Tile layers、切片图层）, WMS
  * 标记（Markers），弹出窗口（Popups）
  * 矢量图层：折线（polylines），多边形（polygons），圆形（circles），矩形（rectangles）
  * 图像叠加（Image overlays）
  * GeoJSON
* 互动特点
  * 用惯性拖动平移
  * 滚轮变焦（缩放）
  * 在移动设备上捏缩放
  * 双击缩放
  * 缩放到区域
  * 键盘导航
  * 事件：点击，鼠标悬停等
  * 标记拖动
* 视觉特点
  * 缩放和平移动画
  * 平铺和弹出窗口淡出动画
  * 非常好的标记、弹出窗口、地图控件的默认设计
  * 视网膜分辨率支持
* 自定义特点
  * 纯 CSS3 弹出窗口和控件，便于重新设计
  * 基于图像和 HTML 的标记
  * 自定义地图图层和控件的简单界面
  * 自定义地图投影（开箱即用 EPSG：3857/4326/3395）
  * 强大的 OOP 工具，用于扩展现有的类
* 性能特点
  * 移动硬件加速使其感觉像原生应用一样流畅
  * 利用 CSS3 功能使平移和缩放变得非常流畅
  * 智能折线/多边形渲染具有动态剪切和简化功能，因此速度非常快
  * 模块化构建系统，用于省略您不需要的功能
  * 在移动设备上点击延迟消除
* 地图控件
  * 缩放按钮
  * 归属（Attribution）
  * 图层切换器
  * 比例（尺）
* 浏览器支持
  * 桌面端
    * Chrome
    * Firefox
    * Safari 5+
    * Opera 12+
    * IE 7–11
    * Edge
  * 移动端
    * Safari for iOS 7+
    * Android browser 2.2+, 3.1+, 4+
    * Chrome for mobile
    * Firefox for mobile
    * IE10+ for Win8 devices
* 杂项（Misc）
  * 非常轻巧
  * 没有外部依赖