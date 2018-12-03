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

>示例：[./demo/05-let-暂时性死区.js](./demo/05-let-暂时性死区.js)

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

>示例：[./demo/07-let-暂时性死区3-typeof.js](./demo/07-let-暂时性死区3-typeof.js)

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

>示例：[./demo/08-let-不能重复声明.js](./demo/08-let-不能重复声明.js)

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

>示例：[./demo/09-block-为什么需要块级作用域.js](./demo/09-block-为什么需要块级作用域.js)

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

>示例：[./demo/10-block-为什么需要块级作用域2.js](./demo/10-block-为什么需要块级作用域2.js)

```javascript
for (var i = 0; i < 10; i++) {
  // do something
}

console.log(i); // 10
```

上面代码中，变量 `i` 只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

### 2.2. ES6 的块级作用域

`let` 实际上为 JavaScript 新增了块级作用域。

>示例：[./demo/11-block-es6-1.js](./demo/11-block-es6-1.js)

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

>示例：[./demo/12-block-es6-2.js](./demo/12-block-es6-2.js)

```javascript
{
  { let num = 1; }
  console.log(num); // ReferenceError: num is not defined
}
```

内层作用域可以定义外层作用域的同名变量。

>示例：[./demo/13-block-es6-3.js](./demo/13-block-es6-3.js)

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