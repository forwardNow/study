
 # Vue介绍

## 1. 核心概念

Vue：
 * 组件化
 * 双向数据流（基于ES5的`defineProperty`来实现，IE9+才支持。）

无论是模块化还是组件化都是在细分代码，只是粒度不一样，比如说：
开发一个登陆模块，登陆包含 头部组件、主体组件、底部组件。
头部组件包含：页面（template）、样式（style）、动态效果（script）。

**双向数据流**：
 * 方向1：JS内存属性发生改变，影响页面的变化
 * 方向2：页面的改变，影响JS内存属性的改变

`<template>` 中的表达式：

* 可使用表达式的位置
    * 插值：`{{ 表达式 }}`
    * 指令：`v-xx:参数="表达式"`
* 表达式中可直接使用 vue实例 的属性和方法

## 2. vue单文件

### 2.1. 格式

`*.vue` 文件。

最终通过webpack编译成 `*.js` 在浏览器运行。

### 2.2. vue文件的内容

```html
<template>
    <!-- 只能有一个根节点 -->
</template>
<script>
    export default {

    }
</script>
<style scoped>
</style>
```

### 2.3. 开发流程

```
# 目录
project/
    src/
        index.html
        main.js
        app.vue
```

```html
<!-- 1.【index.html】指定挂载点 -->
<div id="app"></div>
```

```js
// 2.【main.js】引入 vue 和 app.vue
import Vue from "vue";
import App from "./app.vue"
```

```js
// 3.【main.js】构建 vue实例
new Vue( {
    // 关联挂载点
    el: "#app",
    // 渲染内容到挂载点
    render( createElement ) {
        return createElement( App );
    }
} );
```