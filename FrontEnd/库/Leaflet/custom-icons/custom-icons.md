# 为标记自定义图标

在本教程中，您将学习如何轻松定义自己的图标，以供您在地图上放置的标记使用。

## 1. 准备图像

要制作自定义图标，我们通常需要两个图像 - 实际图标图像和阴影图像。 在本教程中，我们采用了 Leaflet 徽标并创建了四个图像 - 三个不同颜色的叶子图像和三个阴影图像：

![leaf-green.png](https://leafletjs.com/examples/custom-icons/leaf-green.png)
![leaf-red.png](https://leafletjs.com/examples/custom-icons/leaf-red.png)
![leaf-orange.png](https://leafletjs.com/examples/custom-icons/leaf-orange.png)
![leaf-shadow.png](https://leafletjs.com/examples/custom-icons/leaf-shadow.png)

请注意，图像中的白色区域实际上是透明的。

## 2. 创建一个图标

Leaflet 中的标记图标由 `L.Icon` 对象定义，这些对象在创建标记时作为选项传递。 让我们创建一个绿叶图标：

```javascript
var greenIcon = L.icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
  shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
```

现在在地图上放置带有此图标的标记很简单：

```javascript
L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
```

## 3. 定义图标类

如果我们需要创建几个有许多共同点的图标怎么办？ 让我们定义我们自己的包含共享选项的图标类，继承自 `L.Icon`！ Leaflet 非常简单：

```javascript
var LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: `${baseUrl}/leaf-shadow.png`,
    iconSize:     [38, 95],
    shadowSize:   [50, 64],
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [-3, -76]
  }
});
```

现在我们可以从这个类创建所有三个叶子图标并使用它们：

```javascript
var greenIcon = new LeafIcon({iconUrl: `${baseUrl}/leaf-green.png`}),
    redIcon = new LeafIcon({iconUrl: `${baseUrl}/leaf-red.png`}),
    orangeIcon = new LeafIcon({iconUrl: `${baseUrl}/leaf-orange.png`});
```

您可能已经注意到我们使用 `new` 关键字来创建 LeafIcon 实例。 那么为什么没有它就会创建所有 Leaflet 类？ 答案很简单：真正的 Leaflet 类以大写字母命名（例如 `L.Icon`），它们也需要用 `new` 创建，但也有小写名称（`L.icon`）的快捷方式，为方便起见而创建这个：

```javascript
L.icon = function (options) {
  return new L.Icon(options);
};
```

你也可以对你的课程做同样的事情。 好的，让我们最终在地图上放置一些带有这些图标的标记：

```javascript
L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map).bindPopup("I am a green leaf.");
L.marker([51.495, -0.083], {icon: redIcon}).addTo(map).bindPopup("I am a red leaf.");
L.marker([51.49, -0.1], {icon: orangeIcon}).addTo(map).bindPopup("I am an orange leaf.");
```