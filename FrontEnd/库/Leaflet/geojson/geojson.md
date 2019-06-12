# 在 Leaflet 中使用 GeoJSON

GeoJSON 正在成为许多 GIS 技术和服务中非常流行的数据格式 - 它简单，轻便，直观，而且 Leaflet 非常擅长处理它。 在此示例中，您将学习如何通过 [GeoJSON](https://tools.ietf.org/html/rfc7946) 创建地图向量并与其进行交互。

## 1. 关于 GeoJSON

根据 [GeoJSON 规范（RFC 7946）](https://tools.ietf.org/html/rfc7946)：

>GeoJSON 是一种用于编码各种地理数据结构的格式。 GeoJSON 对象可以表示空间区域（几何），空间有界实体（要素）或要素列表（FeatureCollection）。 GeoJSON 支持以下几何类型：Point，LineString，Polygon，MultiPoint，MultiLineString，MultiPolygon 和 GeometryCollection。 GeoJSON 中的功能包含 Geometry 对象和其他属性，FeatureCollection 包含功能列表。

Leaflet 支持上述所有 GeoJSON 类型，但 [Features](https://tools.ietf.org/html/rfc7946#section-3.2) 和 [FeatureCollections](https://tools.ietf.org/html/rfc7946#section-3.3) 最适用，因为它们允许您使用一组属性描述功能。 我们甚至可以使用这些属性来设置 Leaflet 向量的样式。 这是一个简单的 GeoJSON 功能的示例：

```javascript
var geojsonFeature = {
  "type": "Feature",
  "properties": {
    "name": "Coors Field",
    "amenity": "Baseball Stadium",
    "popupContent": "This is where the Rockies play!"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [-104.99404, 39.75621]
  }
};
```

## 2. GeoJSON 层

GeoJSON 对象通过 [GeoJSON 层](https://leafletjs.com/reference.html#geojson) 添加到地图中。 要创建它并将其添加到地图，我们可以使用以下代码：

```javascript
L.geoJSON(geojsonFeature).addTo(map);
```

GeoJSON 对象也可以作为有效 GeoJSON 对象的数组传递。

```javascript
var myLines = [
  {
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
  },
  {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
  }
];
```

或者，我们可以创建一个空的 GeoJSON 图层并将其分配给变量，以便我们以后可以添加更多功能。

```javascript
var myLayer = L.geoJSON().addTo(map);
myLayer.addData(geojsonFeature);
```

## 3. 选项

### 3.1. style

样式选项可用于以两种不同的方式设置样式。 首先，我们可以传递一个简单的对象，它以相同的方式设置所有路径（折线和多边形）的样式：

```javascript
var myLines = [
  {
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
  },
  {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
  }
];

var myStyle = {
  "color": "#ff7800",
  "weight": 5,
  "opacity": 0.65
};

L.geoJSON(myLines, {
  style: myStyle
}).addTo(map);
```

或者，我们可以传递一个函数，根据函数的属性设置各个特征（feature）的样式。 在下面的示例中，我们检查“party”属性并相应地设置我们的多边形样式：

```javascript
var states = [
  {
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
  },
  {
    "type": "Feature",
    "properties": {"party": "Democrat"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
  }
];

L.geoJSON(states, {
    style: function(feature) {
        switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
    }
}).addTo(map);
```

### pointToLayer

