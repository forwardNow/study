# 微信小程序注意点

## 1. 多次调用 API 导致的问题

重现：

```javascript
 wx.getLocation({
  success: (res) => {
    console.log(res);
  },
});

wx.getLocation({
  success: (res) => {
    console.log(res);
  },
});
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
