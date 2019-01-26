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