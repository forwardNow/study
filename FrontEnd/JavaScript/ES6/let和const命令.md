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

运行上面的代码输出两次 `哇哈哈`。循环体中的变量 `i` 与循环变量 `i` 不在同一个作用域，有各自单独的作用域。