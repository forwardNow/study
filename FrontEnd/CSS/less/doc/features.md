# 深入指南

## 1. 概述

此文章是有关 LESS 语言功能的深入指南。 有关 Less 的快速摘要，请参阅[概述](http://lesscss.org/#overview)。

有关安装和设置 Less 环境的深入指南，以及有关 Less 开发的文档，请参阅：[使用 Less.js](http://lesscss.org/usage).

## 2. 变量

在单个位置控制常用值。

### 2.1. 概述

>通过 `@my-var` 定义和引用变量

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

### 2.2. 变量替换

>通过 `@{my-var}` 往属性名、字符串类型的值中插入变量值

上面的示例着重于使用变量来控制 CSS 规则中的值，但它们也可以在其他地方使用，例如选择器名称、属性名称、URL、`@import` 语句。

#### 2.2.1. 选择器名称

```less
// Variables
@my-selector: banner;

// Usage
.@{my-selector} {
  margin: 0 auto;
}
```

编译为：

```css
.banner {
  margin: 0 auto;
}
```

#### 2.2.2. URL

```less
// Variables
@images: "../img";

// Usage
body {
  color: #444;
  background: url("@{images}/white-sand.png");
}
```

#### 2.2.3. Import 语句

语法：`@import "@{themes}/tidal-wave.less";`

```less
// Variables
@themes: "../../src/themes";

// Usage
@import "@{themes}/tidal-wave.less";
```

#### 2.2.4. 属性名称

```less
@property: color;

.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
```

编译为：

```css
.widget {
  color: #0ee;
  background-color: #999;
}
```

### 2.3. 可变的变量

>`@var-name: color;`，通过 `@@var-name` 引用 `@color` 变量。

```less
@primary: green;
@color: primary;

.section {
  .element {
    color: @@color;
  }
}
```

编译为：

```css
.section .element {
  color: green;
}
```

### 2.4. 惰性求值

变量在使用之前不必声明。

合法的 Less 片段：

```less
.lazy-eval {
  width: @var;
}

@var: @a;
@a: 9%;
```

```less
.lazy-eval {
  width: @var;
  @a: 9%;
}

@var: @a;
@a: 100%;
```

都会编译成：

```css
.lazy-eval {
  width: 9%;
}
```

定义变量两次时，使用变量的最后一个定义，从当前作用域向上搜索。 这与 css 本身类似，其中定义中的最后一个属性决定该属性的值。

比如：

```less
@var: 0;
.class {
  @var: 1;
  .brass {
    @var: 2;
    three: @var;
    @var: 3;
  }
  one: @var;
}
```

编译为：

```css
.class {
  one: 1;
}
.class .brass {
  three: 3;
}
```

从本质上讲，每个范围都有一个“最终”值，类似于浏览器中的属性，就像使用自定义属性的此示例：

```less
.header {
  --color: white;
  color: var(--color);  // the color is black
  --color: black;
}
```

这意味着，与其他 CSS 预处理语言不同，Less 变量的行为与 CSS 非常相似。

### 2.5. 属性规则作为变量

>v3.0.0

您可以使用 `$prop` 语法轻松处理变量等属性。 有时，这可以使您的代码更轻一些。

```less
.widget {
  color: #efefef;
  background-color: $color;
}
```

编译为：

```css
.widget {
  color: #efefef;
  background-color: #efefef;
}
```

请注意，与变量一样，Less 将选择当前/父作用域中的最后一个属性作为“最终”值。

```less
.block {
  color: red;
  .inner {
    background-color: $color;
  }
  color: blue;
}
```

编译为：

```css
.block {
  color: red;
  color: blue;
}
.block .inner {
  background-color: blue;
}
```

### 2.6. 变量的默认值

我们有时会收到默认变量的请求 - 只有在尚未设置变量时才使用变量。 此功能不是必需的，因为您可以通过后面的定义轻松覆盖变量。

比如：

```less
// library
@base-color: green;
@dark-color: darken(@base-color, 10%);

// use of library
@import "library.less";
@base-color: red;
```

由于惰性计算（延迟计算），这很好用 -  `@base-color` 被覆盖，`@dark-color` 是深红色。

## 3. 父选择器

使用 `＆` 引用父选择器.

`＆` 运算符表示嵌套规则的父选择器，在将修改类或伪类应用于现有选择器时最常用：

```less
a {
  color: blue;
  &:hover {
    color: green;
  }
}
```

编译为：

```css
a {
  color: blue;
}

a:hover {
  color: green;
}
```

请注意，如果没有 `＆`，上面的示例将导致 `:hover` 规则（与 `<a>` 标签内的 hovered 元素匹配的后代选择器），这不是我们通常希望嵌套的 `:hover`。

“父选择器”运算符具有多种用途。 基本上，只要您需要嵌套规则的选择器以默认的其他方式组合。 例如，`＆` 的另一个典型用法是产生重复的类名：

```less
.button {
  &-ok {
    background-image: url("ok.png");
  }
  &-cancel {
    background-image: url("cancel.png");
  }
  &-custom {
    background-image: url("custom.png");
  }
}
```

编译为：

```css
.button-ok {
  background-image: url("ok.png");
}
.button-cancel {
  background-image: url("cancel.png");
}
.button-custom {
  background-image: url("custom.png");
}
```

### 3.1. 多个 `＆`

`＆` 可能会在选择器中出现多次。 这使得可以重复引用父选择器而不重复其名称。

```less
.link {
  & + & {
    color: red;
  }

  & & {
    color: green;
  }

  && {
    color: blue;
  }

  &, &ish {
    color: cyan;
  }
}
```

编译为：

```css
.link + .link {
  color: red;
}
.link .link {
  color: green;
}
.link.link {
  color: blue;
}
.link, .linkish {
  color: cyan;
}
```

请注意 `＆` 表示所有父选择器（不仅仅是最近的祖先），因此以下示例：

```less
.grand {
  .parent {
    & > & {
      color: red;
    }
}
```

编译为：

```css
.grand .parent > .grand .parent {
  color: red;
}
```

### 3.2. 改变选择器顺序

将选择器添加到继承的（父）选择器可能很有用。 这可以通过将 `＆` 放置当前选择器之后来完成。例如，使用 Modernizr 时，您可能希望根据支持的功能指定不同的规则：

```less
.header {
  .menu {
    border-radius: 5px;
    .no-borderradius & {
      background-image: url('images/button-background.png');
    }
  }
}
```

编译为：

```css
.header .menu {
  border-radius: 5px;
}
.no-borderradius .header .menu {
  background-image: url('images/button-background.png');
}
```

在不支持圆角的情况下使用图片。

### 3.3. 组合相乘

`＆` 还可用于在逗号分隔列表中生成选择器的每个可能的排列：

```less
p, a {
  border-top: 2px dotted #366;
  & + & {
    border-top: 0;
  }
}
```

编译为：

```css
p,
a {
  border-top: 2px dotted #366;
}
p + p,
p + a,
a + p,
a + a {
  border-top: 0;
}
```

## 4. 继承

继承是一个 Less 伪类，它将放置的选择器与它引用的选择器相匹配。

```less
.inline {
  color: red;
}

nav ul {
  &:extend(.inline);
  background: blue;
}
```

编译为：

```css
nav ul {
  background: blue;
}
.inline,
nav ul {
  color: red;
}
```

略。

## 5. 合并

合并功能允许将来自多个属性的值聚合到单个属性下的逗号或空格分隔列表中。 `merge` 对于背景和变换等属性很有用。

为了避免任何无意的连接，`merge` 需要在每个连接挂起声明上使用显式的 `+` 或 `+_` 标志。

### 5.1. 逗号

使用逗号附加属性值

```less
.mixin() {
  box-shadow+: inset 0 0 10px #555;
}
.myclass {
  .mixin();
  box-shadow+: 0 0 20px black;
}
```

编译为：

```css
.myclass {
  box-shadow: inset 0 0 10px #555, 0 0 20px black;
}
```

### 5.2. 空格

使用空格附加属性值

```less
.mixin() {
  transform+_: scale(2);
}
.myclass {
  .mixin();
  transform+_: rotate(15deg);
}
```

编译为：

```css
.myclass {
  transform: scale(2) rotate(15deg);
}
```