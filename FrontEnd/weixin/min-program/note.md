# 微信小程序注意点

## 1. API

### 1.1. 重复调用 wx.getLocation 导致的问题

重现：

```javascript
wx.getLocation({ success: (res) => { console.log(res); } });
wx.getLocation({ success: (res) => { console.log(res); } });
```

解决：

```javascript
 wx.getLocation({
  success: (res) => {
    console.log(res);

    wx.getLocation({
      success: (res) => {
        console.log(res);
      },
    });
  },
});


// 或者使用 async/await
```

## 2. 组件

### 2.1. 地图坐标系的问题

* `wx.getLocation` 默认返回 `gps` 坐标
* `map` 组件使用的 `gcj02` 坐标系
* qqmap-wx-jssdk 使用的是 `gcj02` 坐标系
