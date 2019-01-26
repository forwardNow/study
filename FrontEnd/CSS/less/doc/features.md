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

## 6. Mixins

“混合”其他选择器的属性。

您可以混合使用类选择器和 id 选择器，例如

```less
.a, #b {
  color: red;
}
.mixin-class {
  .a();
}
.mixin-id {
  #b();
}
```

编译为：

```css
.a, #b {
  color: red;
}
.mixin-class {
  color: red;
}
.mixin-id {
  color: red;
}
```

目前和历史上，mixin 调用中的括号是可选的，但是可选括号是不推荐使用的，并且将来的版本中将需要它们。

```less
.a();
.a;  // currently works, but deprecated; don't use
```

### 6.1. 不输出 Mixin

如果你想创建一个 mixin，但你不希望 mixin 在你的 CSS 输出中，请在 mixin 定义之后加上括号。

```less
.mixin-1 {
  color: black;
}
.mixin-2() {
  background: white;
}
.class {
  .mixin-1();
  .mixin-2();
}
```

编译为：

```css
.mixin-1 {
  color: black;
}
.class {
  color: black;
  background: white;
}
```

### 6.2. Mixins 中的选择器

Mixins 可以包含的不仅仅是属性，它们也可以包含选择器。

```less
.my-hover-mixin() {
  &:hover {
    border: 1px solid red;
  }
}
button {
  .my-hover-mixin();
}
```

编译为：

```css
button:hover {
  border: 1px solid red;
}
```

### 6.3. 名称空间

如果要在更复杂的选择器中混合属性，可以堆叠多个 id 或类。

```less
#outer() {
  .inner {
    color: red;
  }
}

.c {
  #outer > .inner();
}
```

引用名称空间中的 mixin：

```less
// all do the same thing
#outer > .inner();
#outer .inner();
#outer.inner();
```

使用命名空间后你的 mixins 减少了与其他库 mixin 或用户 mixin 的冲突，但它也可以是一种“组织” mixins 组的方法。

```less
#my-library {
  .my-mixin() {
    color: black;
  }
}
// which can be used like this
.class {
  #my-library.my-mixin();
}
```

### 6.4. 受保护的命名空间

如果命名空间具有保护，则仅在保护条件返回 `true` 时才使用由其定义的 mixins。 命名空间保护的计算方式与 mixin 的保护完全相同，因此以下两个 mixin 的工作方式相同：

```less
#namespace when (@mode = huge) {
  .mixin() { /* */ }
}

#namespace {
  .mixin() when (@mode = huge) { /* */ }
}
```

假定所有嵌套命名空间和 mixin 的默认函数具有相同的值。 以下 mixin 从未被计算过，其中一个包含条件的结果肯定为假：

```less
#sp_1 when (default()) {
  #sp_2 when (default()) {
    .mixin() when not(default()) { /* */ }
  }
}
```

### 6.5. `!important` 关键字

在 mixin 调用之后使用 `!important` 关键字将其继承的所有属性标记为 `!important`：

```less
.foo (@bg: #f5f5f5, @color: #900) {
  background: @bg;
  color: @color;
}
.unimportant {
  .foo();
}
.important {
  .foo() !important;
}
```

编译为：

```css
.unimportant {
  background: #f5f5f5;
  color: #900;
}
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}
```

### 6.6. Mixin 的参数

如何将参数传递给 mixins

Mixins 也可以接受参数，这些参数是混合时传递给选择器块的变量。

```less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
```

以下是我们如何将其混合到各种规则集中：

```less
#header {
  .border-radius(4px);
}
.button {
  .border-radius(6px);
}
```

参数 mixin 也可以为其参数设置默认值：

```less
.border-radius(@radius: 5px) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
```

我们现在可以像这样调用它：

```less
#header {
  .border-radius();
}
```

它将包括 5px 边界半径。

您还可以使用不带参数的参数化 mixins。 如果要从 CSS 输出中隐藏规则集，但希望将其属性包含在其他规则集中，这将非常有用：

```less
.wrap() {
  text-wrap: wrap;
  white-space: -moz-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
}

pre { .wrap() }
```

编译为：

```css
pre {
  text-wrap: wrap;
  white-space: -moz-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
}
```

#### 6.6.1. 具有多个参数的 Mixins

参数可以是分号或逗号分隔。 建议使用分号。 符号逗号具有双重含义：它可以解释为 mixin 参数分隔符或 css 列表分隔符。

使用逗号作为 mixin 分隔符使得无法将逗号分隔列表创建为参数。 另一方面，如果编译器在 mixin 调用或声明中看到至少一个分号，则它假定参数由分号分隔，并且所有逗号都属于 css 列表：

* 两个参数，每个参数包含以逗号分隔的列表：`.name(1, 2, 3; something, else)`
* 三个参数，每个包含一个数字：`.name(1, 2, 3)`
* 使用空分号创建 mixin 调用，其中一个参数包含逗号分隔的 css 列表：`.name(1, 2, 3;)`
* 逗号分隔的默认值：`.name(@param1: red, blue;)`

定义具有相同名称和参数数量的多个 mixin 是合法的。 Less 将使用所有可应用的属性。 如果你使用 mixin 并只传递一个参数，例如 `.mixin(green);`，则调用所有只需要传递一个必需参数  mixins ：

```less
.mixin(@color) {
  color-1: @color;
}
.mixin(@color; @padding: 2) {
  color-2: @color;
  padding-2: @padding;
}
.mixin(@color; @padding; @margin: 2) {
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}
.some .selector div {
  .mixin(#008000);
}
```

编译为：

```css
.some .selector div {
  color-1: #008000;
  color-2: #008000;
  padding-2: 2;
}
```

#### 6.6.2. 使用具名参数

调用 mixin 可以通过其名称而不仅仅是位置来提供参数值。 任何参数都可以通过其名称指定，并且它们不必具有任何特殊顺序：

```less
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}
```

编译为：

```css
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```

#### 6.6.3. `@arguments` 变量

`@arguments` 在 mixins 中有一个特殊含义，它包含调用 mixin 时传递的所有参数。 如果您不想处理单个参数，这非常有用：

```less
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}
```

编译为：

```css
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
     -moz-box-shadow: 2px 5px 1px #000;
          box-shadow: 2px 5px 1px #000;
}
```

#### 6.6.4. 高级参数和 `@rest` 变量

您可以使用 `...` 如果您希望 mixin 采用可变数量的参数。 在变量名之后使用它将把这些参数分配给变量。

```less
.mixin(...) {        // matches 0-N arguments
.mixin() {           // matches exactly 0 arguments
.mixin(@a: 1) {      // matches 0-1 arguments
.mixin(@a: 1; ...) { // matches 0-N arguments
.mixin(@a; ...) {    // matches 1-N arguments
```

此外：

```less
.mixin(@a; @rest...) {
   // @rest is bound to arguments after @a
   // @arguments is bound to all arguments
}
```

### 6.7. 模式匹配

有时，您可能希望根据传递给它的参数更改 mixin 的行为。 让我们从基本的东西开始：

```less
.mixin(@s; @color) { ... }

.class {
  .mixin(@switch; #888);
}
```

现在让我们假设我们希望 `.mixin` 的行为不同，根据 `@switch` 的值，我们可以定义 `.mixin`：

```less
.mixin(dark; @color) {
  color: darken(@color, 10%);
}
.mixin(light; @color) {
  color: lighten(@color, 10%);
}
.mixin(@_; @color) {
  display: block;
}
```

现在，如果我们运行：

```less
@switch: light;

.class {
  .mixin(@switch; #888);
}
```

我们将获得以下 CSS：

```css
.class {
  color: #a2a2a2;
  display: block;
}
```

传递给 `.mixin` 的颜色减轻了。 如果 `@switch` 的值是 `dark`，则结果将是较暗的颜色。

发生了这些事情：

* 第一个 mixin 定义不匹配，因为它期望 `dark` 作为第一个参数。
* 第二个 mixin 定义匹配，因为它预期 `light`。
* 第二个 mixin 定义匹配，因为它期望任何值。

仅使用匹配的 mixin 定义。 变量匹配并绑定到任何值。 除变量之外的任何内容仅与值等于自身的值匹配。

我们也可以匹配数量，这是一个例子：

```less
.mixin(@a) {
  color: @a;
}
.mixin(@a; @b) {
  color: fade(@a; @b);
}
```

现在如果我们用一个参数调用 `.mixin`，我们将得到第一个定义的输出，但是如果我们用两个参数调用它，我们将获得第二个定义，即 `@a` 淡化为 `@b`。

### 6.8. 将 Mixins 作为函数使用

从 mixin 调用中选择属性和变量

属性/值 访问器。

从 Less 3.5 开始，您可以使用属性/变量访问器以计算的 mixin 规则中选择一个值。 这可以允许您使用类似于函数的 mixin。

```less
.average(@x, @y) {
  @result: ((@x + @y) / 2);
}

div {
  // call a mixin and look up its "@return" value
  padding: .average(16px, 50px)[@result];
}
```

编译为：

```css
div {
  padding: 33px;
}
```

如果您有多个匹配的 mixin，则会计算和合并所有规则，并返回具有该标识符的最后一个匹配值。 这类似于 CSS中 的级联，它允许您“覆盖” mixin 值。

```less
// library.less
#library() {
  .mixin() {
    prop: foo;
  }
}

// customize.less
@import "library";
#library() {
  .mixin() {
    prop: bar;
  }
}

.box {
  my-value: #library.mixin[prop];
}
```

输出为：

```css
.box {
  my-value: bar;
}
```

### 6.9. 递归 Mixins

创建循环

在 Less 中，mixin自我调用。 当与条件表达式和模式匹配结合使用时，这种递归 mixin 可用于创建各种迭代/循环结构。

```less
.loop(@counter) when (@counter > 0) {
  .loop((@counter - 1));    // next iteration
  width: (10px * @counter); // code for each iteration
}

div {
  .loop(5); // launch the loop
}
```

编译为：

```css
div {
  width: 10px;
  width: 20px;
  width: 30px;
  width: 40px;
  width: 50px;
}
```

使用递归循环生成 CSS 网格类的一般示例：

```less
.generate-columns(4);

.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}
```

编译为：

```css
.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
```

### 6.10. Mixin 保护

当您想要匹配表达式而不是简单值或参数数量时，保护很有用。 如果您熟悉函数式编程，则可能已经遇到过它们。

在尝试尽可能接近 CSS 的声明性质时，Less 选择通过受保护的 mixins 而不是 if / else 语句实现条件执行，这是 `@media` 查询功能规范的一部分。

```less
.mixin(@a) when (lightness(@a) >= 50%) {
  background-color: black;
}
.mixin(@a) when (lightness(@a) < 50%) {
  background-color: white;
}
.mixin(@a) {
  color: @a;
}
```

关键是 when 关键字，它引入了一个保护序列（这里只有一个保护）。 现在，如果我们运行以下代码：

```less
.class1 { .mixin(#ddd) }
.class2 { .mixin(#555) }
```

编译为：

```css
.class1 {
  background-color: black;
  color: #ddd;
}
.class2 {
  background-color: white;
  color: #555;
}
```

#### 6.10.1. 比较操作符

保护中可用的比较运算符的完整列表是：`>`，`>=`，`=`，`=<`，`<`。 此外，关键字 `true` 是唯一的真值，使这两个 mixin 等效：

```less
.truth(@a) when (@a) { ... }
.truth(@a) when (@a = true) { ... }
```

除关键字 `true` 之外的任何值都是假值：

```less
.class {
  .truth(40); // Will not match any of the above definitions.
}
```

请注意，您还可以相互比较参数，或使用非参数：

```less
@media: mobile;

.mixin(@a) when (@media = mobile) { ... }
.mixin(@a) when (@media = desktop) { ... }

.max(@a; @b) when (@a > @b) { width: @a }
.max(@a; @b) when (@a < @b) { width: @b }
```

#### 6.10.2. 逻辑操作符

您可以使用逻辑运算符。 语法基于 CSS 媒体查询。

`and`，同时满足多个保护才为匹配：

```less
.mixin(@a) when (isnumber(@a)) and (@a > 0) { ... }
```

`,`，只要有一个满足则匹配：

```less
.mixin(@a) when (@a > 10), (@a < -10) { ... }
```

`not`，否操纵：

```less
.mixin(@b) when not (@b > 0) { ... }
```

#### 6.10.3. 参数值类型检查

通过 `is` 函数检查参数值的类型：

```less
.mixin(@a; @b: 0) when (isnumber(@b)) { ... }
.mixin(@a; @b: black) when (iscolor(@b)) { ... }
```

基础的类型检查函数：

* `iscolor`
* `isnumber`
* `isstring`
* `iskeyword`
* `isurl`

如果您想检查某个值是否在某个特定单位中而不是数字，您可以使用以下方法之一：

* `ispixel`
* `ispercentage`
* `isem`
* `isunit`

### 6.11. Mixin 别名

将 mixin 调用分配给变量

可以将 Mixins 分配给变量以作为变量调用调用，或者可以将其用于映射查找。

```less
#theme.dark.navbar {
  .colors(light) {
    primary: purple;
  }
  .colors(dark) {
    primary: black;
    secondary: grey;
  }
}

.navbar {
  @colors: #theme.dark.navbar.colors(dark);
  background: @colors[primary];
  border: 1px solid @colors[secondary];
}
```

编译为：

```css
.navbar {
  background: black;
  border: 1px solid grey;
}
```

整个 mixin 调用可以是别名并称为变量调用。 如：

```less
#library() {
  .rules() {
    background: green;
  }
}
.box {
  @alias: #library.rules();
  @alias();
}
```

编译为：

```css
.box {
  background: green;
}
```

## 7. CSS 保护

像Mixin 保护一样，保护也可以应用于 css 选择器，这是用于声明 mixin 然后立即调用它的语法糖。

```less
button when (@my-option = true) {
  color: white;
}
```

您还可以通过将此功能与 `＆` 功能相结合来实现 `if` 类型语句，从而允许您对多个保护进行分组。

```less
& when (@my-option = true) {
  button {
    color: white;
  }
  a {
    color: blue;
  }
}
```

请注意，您还可以通过使用实际的 `if()` 函数和变量调用来实现类似的模式。 如：

```less
@dr: if(@my-option = true, {
  button {
    color: white;
  }
  a {
    color: blue;
  }
});
@dr();
```

## 8. 分离的规则集

将一个规则集分配给变量

分离的规则集是一组 css 属性、嵌套规则集、媒体声明、存储在变量中的任何其他内容。 您可以将其包含在规则集或其他结构中，并将其所有属性复制到那里。 您也可以将它用作 mixin 参数，并将其作为任何其他变量传递。

简单示例：

```less
// declare detached ruleset
@detached-ruleset: { background: red; }; // semi-colon is optional in 3.5.0+

// use detached ruleset
.top {
    @detached-ruleset(); 
}
```

编译为：

```css
.top {
  background: red;
}
```

调用分离的规则集时，必须加上小括号。

当您想要定义一个在媒体查询中包装一段代码或不支持的浏览器类名抽象出来的 mixin 时，它非常有用。 规则集可以传递给 mixin，以便 mixin 可以包装内容，例如，

```less
.desktop-and-old-ie(@rules) {
  @media screen and (min-width: 1200px) { @rules(); }
  html.lt-ie9 &                         { @rules(); }
}

header {
  background-color: blue;

  .desktop-and-old-ie({
    background-color: red;
  });
}
```

这里 `desktop-and-old-ie` mixin 定义了媒体查询和根类，以便您可以使用 mixin 来包装一段代码。 这将输出

```css
header {
  background-color: blue;
}
@media screen and (min-width: 1200px) {
  header {
    background-color: red;
  }
}
html.lt-ie9 header {
  background-color: red;
}
```

现在可以将规则集分配给变量或传递给 mixin，并且可以包含完整的 Less 功能集，例如，

```less
@my-ruleset: {
    .my-selector {
      background-color: black;
    }
  };
```