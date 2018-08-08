 # Node 中的 JavaScript

## 1. 核心模块

Node 为 JavaScript 提供了很多服务器级别的API，
这些API绝大多数都被封装到一个个具名的核心模块中了，
比如：
* `fs`：操作文件
* `http`：服务构建
* `path`：路径处理
* `os`：系统信息

参考[官方API](https://nodejs.org/dist/latest-v10.x/docs/api/)

## 2. 模块系统

**模块**：
* 核心模块，如 `fs`、`http`
* 自定义模块，必须使用完整的相对路径以区分核心模块，如 `./utils.js`
* 第三方模块

node没有全局作用域，只有模块作用域，模块之间通过导入和导出进行通信

**导入和导出**

```javascript
// 文件 main.js
var utils = require('./utils.js');

// 通过 require() 方法导入其他模块
// 导入模块的路径的“.js”后缀可以省略

utils.add(1, 2)
```

```javascript
// 文件 utils.js
function add(num1, num2) {
    return num1 + num2;
}
exports.add = add;
// exports(接口对象) 默认是空对象，可以在上面挂载当前模块要向外暴露的接口
```

`exports`
* 接口对象
* 每个模块中都提供了一个 `exports` 对象，默认是空对象
* 在 `exports` 上挂载的成员，都会暴露出去
* 其他模块可通过 `require` 来获取其他模块的接口对象
