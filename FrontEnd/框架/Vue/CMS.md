 # CMS 系统

## 1. 项目结构

```
cms/
  node_modules/           # 依赖包
  src/                    # 源码
    components/               # 组件
    static/                   # 静态资源
    app.vue                   # 入口 Vue 组件
    index.html                # 首页
    main.js                   # JS 入口
  package-lock.json       # 版本锁定文件
  package.json            # 项目描述文件
  postcss.config.js       # CSS 浏览器前缀设置
  webpack.config.js       # webpack 配置文件

```

## 2. /app.vue

内容说明：

```html
<!-- header  -->
header 部分
<!-- /header  -->

<!-- main -->
<router-view></router-view>
<!-- /main -->

<!-- footer  -->
footer 部分
<!-- /footer  -->
```

## 3. /src/static

css/
fonts/
  iconfont.css    # 项目使用到的阿里巴巴字体图标
  iconfnt.ttf
img/
vender/       ## 第三方库
  mui/            



## 4. /src/components/

结构：

```
home/
  home.vue    # 首页
```

### 4.1. home/home.vue

内容：

* 轮播图：https://mint-ui.github.io/docs/#/en2/swipe

