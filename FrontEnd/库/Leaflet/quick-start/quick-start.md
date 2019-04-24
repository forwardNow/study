# Leaflet 快速入门指南

本分步指南将帮助您快速了解 Leaflet 基础知识，包括设置 Leaflet 地图，使用标记，折线和弹出窗口以及处理事件。

## 1. 准备页面

在为地图编写任何代码之前，您需要在页面上执行以下准备步骤：

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <title>Preparing your page</title>

  <!-- 
    1. Include Leaflet CSS file in the head section of your document:
   -->
  <link rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
        integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
        crossorigin=""/>

  <!-- 
    2. Include Leaflet JavaScript file after Leaflet’s CSS:
  
    Make sure you put this AFTER Leaflet's CSS
  -->
  <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
          integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
          crossorigin=""></script>

  <style>
    /*
      4. Make sure the map container has a defined height,
         for example by setting it in CSS:
     */
    #mapid { height: 180px; }
  </style>
</head>
<body>
  
  <!-- 
    3. Put a div element with a certain id where you want your map to be:
   -->
  <div id="mapid"></div>

</body>
</html>
```

现在你已准备好初始化的地图，可以用它做一些事情了。

## 2. 设置地图

让我们用漂亮的 Mapbox Streets tiles 创建伦敦市中心的地图。 首先，我们将初始化地图并将其视图设置为我们选择的地理坐标和缩放级别：

```javascript
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
```

默认情况下（因为我们在创建地图实例时未传递任何选项），地图上的所有鼠标和触摸交互都已启用，并且具有缩放和归属控件。

请注意，`setView` 调用也会返回 map 对象 - 大多数 Leaflet 方法在它们不返回显式值时都会这样，这样可以方便地进行类似 jQuery 的方法链。

接下来，我们将一个切片层添加到我们的地图中，在这种情况下，它是一个 Mapbox Streets 切片层。 创建切片图层通常涉及设置切片图像的 [URL 模板](https://leafletjs.com/reference.html#url-template)，属性文本和图层的最大缩放级别。 在此示例中，我们将使用 [Mapbox 的“经典地图”](https://www.mapbox.com/api-documentation/#maps)中的 `mapbox.streets` 切片（为了使用 Mapbox 中的切片，您还必须[获取访问令牌](https://www.mapbox.com/studio/account/tokens/)）。

```javascript
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
```

mapbox 账号：

```text
forwardNow
wuqinfei@qq.com
密码：Chrome 自动生成
```

确保在 `div` 和 `leaflet.js` 包含之后调用所有代码。 就是这样！ 你现在有一个工作的传单地图。

值得注意的是，Leaflet 与（地图）提供者无关，这意味着它不会强制选择特定的 tile 提供者。 您可以尝试用 `mapbox.satellite` 替换 `mapbox.streets`，看看会发生什么。 此外，Leaflet 甚至不包含单个提供者特定的代码行，因此如果您需要，您可以自由使用其他提供者（我们建议使用 Mapbox，它看起来很漂亮）。

每当使用基于 OpenStreetMap 的任何内容时，根据版权声明，归属是强制性的。 大多数其他平铺提供者（例如 [MapBox](https://www.mapbox.com/help/how-attribution-works/)，[Stamen](http://maps.stamen.com/) 或 [Thunderforest](https://www.thunderforest.com/terms/)）也需要归属。 确保在信用到期时给予信贷。

## 3. 标记，圆圈和多边形

除了图块层，您还可以轻松地向地图添加其他内容，包括标记，折线，多边形，圆形和弹出窗口。 我们添加一个标记：

```javascript
var marker = L.marker([51.5, -0.09]).addTo(mymap);
```

添加圆是相同的（除了以米为单位指定半径作为第二个参数），但允许您通过在创建对象时将选项作为最后一个参数传递来控制它的外观：

```javascript
var circle = L.circle([51.508, -0.11], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(mymap);
```

添加多边形非常简单：

```javascript
var polygon = L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047]
]).addTo(mymap);
```

## 4. 使用弹出窗口

当您想要将某些信息附加到地图上的特定对象时，通常会使用弹出窗口。 Leaflet 有一个非常方便的快捷使用方式：

```javascript
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");
```

尝试点击我们的对象。 `bindPopup` 方法将带有指定 HTML 内容的弹出窗口附加到标记，以便在单击对象时显示弹出窗口，并且 `openPopup` 方法（仅用于标记）会立即打开附加的弹出窗口。

您还可以将弹出窗口用作图层（当您需要的不仅仅是将弹出窗口附加到对象时）：

```javascript
var popup = L.popup()
  .setLatLng([51.5, -0.09])
  .setContent("I am a standalone popup.")
  .openOn(mymap);
```

这里我们使用 `openOn` 而不是 `addTo`；如果使用 `addTo`，则会在一个点出现两个弹出窗口，`openOn` 则会关闭先前的弹出窗口。

## 5. 处理事件

每次在 Leaflet 中发生某些事情，例如用户点击标记或更改地图缩放比例，相应的对象发送一个您可以使用函数订阅的事件。 它允许您对用户交互做出反应：

```javascript
function onMapClick(e) {
  console.log("You clicked the map at " + e.latlng);
}

mymap.on('click', onMapClick);
```

每个对象都有自己的一组事件 - 有关详细信息，请参阅文档。 侦听器函数的第一个参数是一个事件对象 - 它包含发生的事件的有用信息。 例如，地图点击事件对象（上例中的 `e`）具有 `latlng` 属性，该属性是单击发生的位置。

让我们通过使用弹出窗口而不是警报框来改进我们的示例：

```javascript
var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}

mymap.on('click', onMapClick);
```

尝试单击地图，您将在弹出窗口中看到坐标。

现在您已经学习了 Leaflet 基础知识，并可以立即开始构建地图应用程序！ 不要忘记查看详细文档或其他示例。