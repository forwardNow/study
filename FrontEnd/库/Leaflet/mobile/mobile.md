# Leaflet on Mobile

在此示例中，您将学习如何创建针对 iPhone，iPad 或 Android 手机等移动设备调整的全屏地图，以及如何轻松检测和使用当前用户位置。

## 准备页面

首先，我们将看一下页面的 HTML 和 CSS 代码。 为了使我们的 map div 元素延伸到所有可用空间（全屏），我们可以使用以下 CSS 代码（注意：在此示例中，虽然 vh 可以说更好，但由于 Google Chrome 在移动设备上存在 bug，所以我们使用百分比表示高度。）：

```css
body {
  padding: 0;
  margin: 0;
}

html,
body,
#map {
  width: 100vw;
  height: 100%;
}
```

此外，我们需要通过在 head 部分或 HTML 页面中放置以下行来告诉移动浏览器禁用不需要的页面缩放并将其设置为实际大小：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

## 初始化地图

我们现在将在 JavaScript 代码中初始化地图，就像我们在快速入门指南中所做的那样，展示整个世界：

```javascript
var map = L.map('map').fitWorld();

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: '吴钦飞（wuqinfei@qq.com）',
  maxZoom: 18,
  accessToken: 'pk.eyJ1IjoiZm9yd2FyZG5vdyIsImEiOiJjanV0aTlvdWEwOGJ1NGVwZmFkOGF2MnZpIn0.iA2jdrEzF1ubS7stvXL4ug',
  id: 'mapbox.streets'
}).addTo(map);
```

## 地理位置

Leaflet 有一个非常方便的快捷方式，用于将地图视图缩放到检测到的位置 - 使用 `locate` 方法的 `setView` 选项，替换代码中常用的 `setView` 方法：

>注意：
>
>1. 只能在手机浏览器中获取当前位置，PC 端不行
>2. Chrome 手机浏览器、360 手机浏览器需要 “HTTPs” 的地址才允许获取地理位置
>3. 魅族手机浏览器可以跑成功

在这里，我们指定 16 作为自动设置地图视图时的最大缩放。 一旦用户同意共享其位置并且浏览器检测到该位置，地图就会将视图设置为它。 现在我们有一个全屏移动地图！ 但是如果我们需要在地理定位完成后做些什么呢？ 这是 `locationfound` 和 `locationerror` 事件的用途。 让我们在检测到的位置添加一个标记，通过在 `locateAndSetView` 调用之前向 `locationfound` 事件添加事件监听器来显示弹出窗口的准确性：

```javascript
function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);
```

优秀！ 但如果地理定位失败，显示错误消息也会很好：

```javascript
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);
```

如果将setView选项设置为 `true` 并且地理位置失败，则会将视图设置为整个世界。

现在示例已经完成 - 在您的手机上试用