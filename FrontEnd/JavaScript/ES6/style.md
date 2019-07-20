# 编程风格

本章探讨如何将 ES6 的新语法，运用到编码实践之中，与传统的 JavaScript 语法结合在一起，写出合理的、易于阅读和维护的代码。

多家公司和组织已经公开了它们的风格规范，下面的内容主要参考了 [Airbnb](https://github.com/airbnb/javascript) 公司的 JavaScript 风格规范。

## 1. 块级作用域

### 1.1. let 取代 var

ES6 提出了两个新的声明变量的命令：`let` 和 `const`。其中，`let` 完全可以取代 `var`，因为两者语义相同，而且 `let` 没有副作用。

```javascript
'use strict';

if (true) {
  let x = 'hello';
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

上面代码如果用 `var` 替代 `let`，实际上就声明了两个全局变量，这显然不是本意。变量应该只在其声明的代码块内有效，`var` 命令做不到这一点。

`var` 命令存在变量提升效用，`let` 命令没有这个问题。

```javascript
'use strict';

if (true) {
  console.log(x); // ReferenceError
  let x = 'hello';
}
```

上面代码如果使用 `var` 替代 `let`，`console.log` 那一行就不会报错，而是会输出 `undefined`，因为变量声明提升到代码块的头部。这违反了变量先声明后使用的原则。

所以，建议不再使用 `var` 命令，而是使用 `let` 命令取代。

### 1.2. 全局常量和线程安全

在 `let` 和 `const` 之间，建议优先使用 `const`，尤其是在全局环境，不应该设置变量，只应设置常量。

`const` 优于 `let` 有几个原因。

* 一个是 `const` 可以提醒阅读程序的人，这个变量不应该改变；
* 另一个是 `const` 比较符合函数式编程思想，运算不改变值，只是新建值，而且这样也有利于将来的分布式运算；
* 最后一个原因是 JavaScript 编译器会对 `const` 进行优化，所以多使用 `const`，有利于提高程序的运行效率，也就是说 `let` 和 `const` 的本质区别，其实是编译器内部的处理不同。

```javascript
// bad
var a = 1, b = 2, c = 3;

// good
const a = 1;
const b = 2;
const c = 3;

// best
const [a, b, c] = [1, 2, 3];
```

`const` 声明常量还有两个好处，一是阅读代码的人立刻会意识到不应该修改这个值，二是防止了无意间修改变量值所导致的错误。

所有的函数都应该设置为常量。

长远来看，JavaScript 可能会有多线程的实现（比如 Intel 公司的 River Trail 那一类的项目），这时 `let` 表示的变量，只应出现在单线程运行的代码中，不能是多线程共享的，这样有利于保证线程安全。

## 2. 字符串

静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。

```javascript
// bad
const a = "foobar";
const b = 'foo' + a + 'bar';

// acceptable
const c = `foobar`;

// good
const a = 'foobar';
const b = `foo${a}bar`;
```
