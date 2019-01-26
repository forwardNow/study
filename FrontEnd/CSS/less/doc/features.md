# 深入指南

## 1. 概述

此文章是有关 LESS 语言功能的深入指南。 有关 Less 的快速摘要，请参阅[概述](http://lesscss.org/#overview)。

有关安装和设置 Less 环境的深入指南，以及有关 Less 开发的文档，请参阅：[使用 Less.js](http://lesscss.org/usage).

## 2. 变量

在单个位置控制常用值。

### 2.1. 概述

在样式表中看到相同的值重复数十甚至数百次，这种情况并不罕见：

```css
a,
.link {
  color: #428bca; /* 重复的颜色值 */
}

.widget {
  color: #fff;
  background: #428bca; /* 重复的颜色值 */
}
```

变量为您提供从单个位置控制这些值的方法，使您的代码更易于维护：

```less
// Variables
@link-color:        #428bca; // sea blue
@link-color-hover:  darken(@link-color, 10%);

// Usage
a,
.link {
  color: @link-color;
}

a:hover {
  color: @link-color-hover;
}

.widget {
  color: #fff;
  background: @link-color;
}
```