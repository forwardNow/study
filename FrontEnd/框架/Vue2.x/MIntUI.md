# Mint UI

## 1. 与 MUI 的比较

MUI 不同于 Mint-UI，MUI 只是开发出来的一套好用的代码片段，里面提供了配套的样式、HTML，类似于 Bootstrap。

Mint UI 是真正的组件库，是使用 Vue 技术封装出来的成套组件，可以无缝的和 Vue 项目进行基础开发。

Mint UI 只适用于 Vue 项目。

## 2. 起步

官网：[https://mint-ui.github.io/#!/zh-cn](https://mint-ui.github.io/#!/zh-cn)

安装：

```shell
npm i mint-ui -S

+ mint-ui@2.2.13
```

导入：

```javascript
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'

Vue.use(MintUI)
```

## 3. 使用

* JS Component
  * Toast
* CSS Component
  * Button
* Form Component

## 4. 按需导入

安装:

```shell
npm install babel-plugin-component -D

+ babel-plugin-component@1.1.1
```

将 .babelrc 修改为：

```javascript
{
  "presets": ["env", "stage-0"],
  "plugins": [
    "transform-runtime",
    [
      "component",
      [
        {
          "libraryName": "mint-ui",
          "style": true
        }
      ]
    ]
  ]
}
```

使用 Button 组件

```javascript
// 已包含样式
import { Button } from 'mint-ui';

Vue.component(Button.name, Button);
```