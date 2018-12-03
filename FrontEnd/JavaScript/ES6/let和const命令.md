# let 和 const 命令

## 1. let 命令

### 1.1. 基本用法

ES6 新增了 `let` 命令，用来声明变量。它的用法类似于 `var`，但是所声明的变量，只在 `let` 命令所在的代码块内有效。

>示例：[./demo/01-let和const/01-let.js](./demo/01-let和const/01-let.js)

```javascript
{
  let letNum = 1;
  var varNum = letNum * 10;
}

console.log(varNum);  // 10
console.log(letNum);  // ReferenceError: letNum is not defined
```

上面的代码表明：`let` 声明的变量只在它所在的代码块有效。

`for` 循环的计数器，用 `let` 命令很合适：

>示例：[./demo/01-let和const/02-let-for.js](./demo/01-let和const/02-let-for.js)

```javascript
for (var i = 0; i < 10; i++) {
  // do nothings
}

for (let j = 0; j < 10; j++) {
  // do nothings
}

console.log('var:', i); // var: 10
console.log('let:', j); // ReferenceError: j is not defined
```

上面的代码中，变量 `i` 是 `var` 命令声明的，在全局范围内都有效。

另外，`for` 循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

>示例：[./demo/01-let和const/03-let-for.js](./demo/01-let和const/03-let-for.js)

```javascript
for (let i = 0; i < 2; i++) {
  let i = '哇哈哈';
  console.log(i);
}
// 哇哈哈
// 哇哈哈
```

运行上面的代码输出两次 `哇哈哈`。循环体中的变量 `i` 与循环变量 `i` 不在同一个作用域。

### 1.2. 不存在变量提升

`var` 命令会发生”变量提升“现象，即变量可以在声明之前使用，值为 `undefined`。这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。

为了纠正这种现象，`let` 命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

>示例：[./demo/01-let和const/04-let-变量提升.js](./demo/01-let和const/04-let-变量提升.js)

```javascript
console.log(varNum); // undefined
console.log(letNum); // ReferenceError: letNum is not defined

var varNum = 1;
let letNum = 2;
```

### 1.3. 暂时性死区

只要块级作用域内存在 `let` 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

>示例：[./demo/01-let和const/05-let-暂时性死区.js](./demo/01-let和const/05-let-暂时性死区.js)

```javascript
var num = 123;

{
  console.log(num); // ReferenceError: num is not defined
  let num;
}
```

上面代码中，存在全局变量 `num`，但是块级作用域内 `let` 又声明了一个局部变量 `num`，导致后者绑定这个块级作用域，所以在 `let` 声明变量前，使用 `num` 会报错。

ES6 明确规定，如果区块中存在 `let` 和 `const` 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用 `let` 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

>示例：[./demo/01-let和const/06-let-暂时性死区2.js](./demo/01-let和const/06-let-暂时性死区2.js)

```javascript
var num = 123;

{
  // <--- TDZ 开始
  console.log(num); // ReferenceError: num is not defined
  let num;
  // TDZ 结束 --->

  console.log(num); // undefined;
}
```

上面代码中，在 `let` 命令声明变量 `num` 之前，都属于变量 `num` 的“死区”。

“暂时性死区”也意味着 `typeof` 不再是一个百分之百安全的操作。

>示例：[./demo/01-let和const/07-let-暂时性死区3-typeof.js](./demo/01-let和const/07-let-暂时性死区3-typeof.js)

```javascript
// 使用未声明的变量 y
console.log(typeof y); // undefined

typeof x; // ReferenceError: x is not defined
let x;
```

上面代码中，`y` 是一个不存在的变量名，结果返回 “undefined”。所以，在没有 `let` 之前，`typeof` 运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。

ES6 规定暂时性死区和 `let`、`const` 语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

### 1.4. 不允许重复声明

`let` 不允许在相同作用域内，重复声明同一个变量。

>示例：[./demo/01-let和const/08-let-不能重复声明.js](./demo/01-let和const/08-let-不能重复声明.js)

```javascript
(function f1() {
  var num1 = 1;
  var num1 = 2;

  console.log('f1:', num1); // f1: 2
}());

(function f2() {
  let num2 = 3;
  var num2 = 4; // SyntaxError: Identifier 'num2' has already been declared

  console.log('f2:', num2);
}());

(function f3() {
  let num3 = 5;
  let num3 = 6; // SyntaxError: Identifier 'num3' has already been declared

  console.log('f3:', num3);
}());
```

当然也不能再函数内部重新声明参数。

```javascript
function f1(arg) {
  let arg; // 报错
}

function f2(arg) {
  {
    let arg; // 不报错
  }
}
```

## 2. 块级作用域

### 2.1. 为什么需要块级作用域？

ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

第一种场景，内层变量可能会覆盖外层变量。

>示例：[./demo/01-let和const/09-block-为什么需要块级作用域.js](./demo/01-let和const/09-block-为什么需要块级作用域.js)

```javascript
var num = 1;

function f1() {
  console.log(num);
  if (false) {
    var num = 100;
  }
}

function f2() {
  var num;
  console.log(num);
  if (false) {
    num = 100;
  }
}

f1();  // undefined
```

`f1()` 中的变量 `num` 由于变量提升，覆盖了同名的全局变量 `num`。`f1()` 与 `f2()` 是等价的。

第二种场景，用来计数的循环变量泄露为全局变量。

>示例：[./demo/01-let和const/10-block-为什么需要块级作用域2.js](./demo/01-let和const/10-block-为什么需要块级作用域2.js)

```javascript
for (var i = 0; i < 10; i++) {
  // do something
}

console.log(i); // 10
```

上面代码中，变量 `i` 只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

### 2.2. ES6 的块级作用域

`let` 实际上为 JavaScript 新增了块级作用域。

>示例：[./demo/01-let和const/11-block-es6-1.js](./demo/01-let和const/11-block-es6-1.js)

```javascript
function f1() {
  let num = 1;
  if (true) {
    let num = 5;
  }

  return num;
}

console.log(f1()); // 1
```

上面的函数有两个代码块，都声明了变量 `num`，运行后输出 `1`。这表示外层代码块不受内层代码块的影响。如果两次都使用 `var` 定义变量 `num`，最后输出的值才是 `5`。

外层作用域无法读取内层作用域的变量。

>示例：[./demo/01-let和const/12-block-es6-2.js](./demo/01-let和const/12-block-es6-2.js)

```javascript
{
  { let num = 1; }
  console.log(num); // ReferenceError: num is not defined
}
```

内层作用域可以定义外层作用域的同名变量。

>示例：[./demo/01-let和const/13-block-es6-3.js](./demo/01-let和const/13-block-es6-3.js)

```javascript
{
  let num = 1;
  { let num = 2; }
}
```

块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。

```javascript
// IIFE 写法
(function () {
  var num = 1;
  console.log(num);
}());

// 块级作用域写法
{
  let num = 2;
  console.log(num);
}
```

### 2.3. 块级作用域与函数声明

函数能不能在块级作用域之中声明？这是一个相当令人混淆的问题。

ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

```javascript
// 情况一
if (true) {
  function f() {}
}

// 情况二
try {
  function f() {}
} catch(e) {
  // ...
}
```

上面两种函数声明，根据 ES5 的规定都是非法的。

但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。

ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于 `let`，在块级作用域之外不可引用。

但如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6 在附录 B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。

* 允许在块级作用域内声明函数。
* 函数声明类似于 `var`，即会提升到全局作用域或函数作用域的头部。
* 同时，函数声明还会提升到所在的块级作用域的头部。

注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作 `let` 处理。

根据这三条规则，在浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于`var` 声明的变量。

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

```javascript
// 情况一
if (true) {
  let f = function f() {}
}

// 情况二
try {
  let f = function f() {}
} catch(e) {
  // ...
}
```

## 3. const 命令

### 3.1. 基本用法

`const` 声明一个只读的常量。一旦声明，常量的值就不能改变。

>示例：[./demo/01-let和const/14-const-1.js](./demo/01-let和const/14-const-1.js)

```javascript
const PI = 3.14;

console.log(PI);  // 3.14

PI = 3.1415926;   // TypeError: Assignment to constant variable.
```

上面代码表明改变常量的值会报错。

`const` 声明的变量不得改变值，这意味着，`const` 一旦声明变量，就必须立即初始化，不能留到以后赋值。

>示例：[./demo/01-let和const/15-const-2.js](./demo/01-let和const/15-const-2.js)

```javascript
const PI; // SyntaxError: Missing initializer in const declaration

PI = 3.14;
```

上面代码表示，对于 `const` 来说，只声明不赋值，就会报错。

`const` 的作用域与 `let` 命令相同：只在声明所在的块级作用域内有效。

`const` 命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

`const` 声明的常量，也与 `let` 一样不可重复声明。

### 3.2. 本质

`const` 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const` 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

>示例：[./demo/01-let和const/16-const-本质.js](./demo/01-let和const/16-const-本质.js)

```javascript
const person = {};

person.name = '张三';
console.log(person.name); // 张三

person = {}; // TypeError: Assignment to constant variable.
```

上面代码中，常量 `person` 储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把 `person` 指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

如果真的想将对象冻结，应该使用 `Object.freeze()` 方法。

>示例：[./demo/01-let和const/17-const-freeze.js](./demo/01-let和const/17-const-freeze.js)

```javascript
const person = {
  name: '哇哈哈',
};

Object.freeze(person);
console.log(Object.isFrozen(person)); // true

/* 在严格模式下，会报如下错误；在非严格模式下，会忽略下行代码
 * TypeError: Cannot assign to read only property 'name' of object '#<Object>'
 */
person.name = '张三';
console.log(person.name); // 哇哈哈
```

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

```javascript
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

### 3.3. ES6 声明变量的六种方法

ES5 只有两种声明变量的方法：

* `var` 命令
* `function` 命令

S6 一共有 6 种声明变量的方法:

* `var` 命令
* `function` 命令
* `let` 命令
* `const` 命令
* `import` 命令
* `class` 命令

## 4. 顶层对象的属性

顶层对象，在浏览器环境指的是 `window` 对象，在 Node 指的是 `global` 对象。ES5 之中，顶层对象的属性与全局变量是等价的。

>示例：[./demo/01-let和const/01-let和const/18-global.js](./demo/01-let和const/01-let和const/18-global.js)

```javascript
window.num = 1;
console.log(num); // 1

// <=> this.num2 = 2; <=> window.num2 = 2;
num2 = 2;
console.log(window.num2); // 2
```

上面代码中，顶层对象的属性赋值与全局变量的赋值，是同一件事。

顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。这样的设计带来了几个很大的问题：

* 没法在编译时就报出变量未声明的错误，只有运行时才能知道，因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的
* 程序员很容易不知不觉地就创建了全局变量（比如打字出错）
* 顶层对象的属性是到处可以读写的，这非常不利于模块化编程
* `window` 对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的

ES6 为了改变这一点，一方面规定，为了保持兼容性，`var` 命令和 `function` 命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let` 命令、`const` 命令、`class` 命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

>示例：[./demo/01-let和const/19-global2.js](./demo/01-let和const/19-global2.js)

```javascript
var num1 = 1;
console.log(num1); // 1

let num2 = 2;
console.log(global.num2); // undefined
```

上面代码中，全局变量 `num1` 由 `var` 命令声明，所以它是顶层对象的属性；全局变量 `num2` 由 `let` 命令声明，所以它不是顶层对象的属性，返回`undefined`。

## 5. global 对象

ES5 的顶层对象，本身也是一个问题，因为它在各种实现里面是不统一的。

* 浏览器里面，顶层对象是 `window` ，但 Node 和 Web Worker 没有 `window`。
* 浏览器和 Web Worker 里面，`self` 也指向顶层对象，但是 Node 没有 `self`。
* Node 里面，顶层对象是 `global` ，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用 `this` 变量，但是有局限性。

* 全局环境中，`this` 会返回顶层对象。但是，Node 模块和 ES6 模块中，`this` 返回的是当前模块。
* 函数里面的 `this`，如果函数不是作为对象的方法运行，而是单纯作为函数运行，`this` 会指向顶层对象。但是，严格模式下，这时 `this` 会返回 `undefined`。
* 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么 `eval`、`new Function` 这些方法都可能无法使用。

```javascript
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```

现在有一个提案，在语言标准的层面，引入 `global` 作为顶层对象。也就是说，在所有环境下，`global` 都是存在的，都可以从它拿到顶层对象。

垫片库 system.global 模拟了这个提案，可以在所有环境拿到 `global`。

```javascript
// CommonJS 的写法
require('system.global/shim')();

// ES6 模块的写法
import shim from 'system.global/shim'; shim();
```

上面代码可以保证各种环境里面，`global` 对象都是存在的。

```javascript
// CommonJS 的写法
var global = require('system.global')();

// ES6 模块的写法
import getGlobal from 'system.global';
const global = getGlobal();
```

上面代码将顶层对象放入变量 `global`。