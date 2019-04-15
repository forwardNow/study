# Symbol

## 1. 概述

ES6 引入 `Symbol` 的原因：

* ES5 的对象属性名都是字符串，这容易造成属性名的冲突。

  >比如
  >
  >你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。

* `Symbol` 这种机制，保证每个属性的名字都是独一无二的就好了，从根本上防止属性名的冲突

ES6 引入了一种新的原始数据类型 `Symbol` ：

* 表示独一无二的值
* 它是 JavaScript 语言的第七种数据类型
* 前六种是：
  1. `undefined`
  2. `null`
  3. 布尔值（Boolean）
  4. 字符串（String）
  5. 数值（Number）
  6. 对象（Object）
* Symbol 值通过 `Symbol` 函数生成

对象的属性名现在可以有两种类型：

* 字符串
* Symbol 类型

凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

```javascript
let s = Symbol();

typeof s
// "symbol"
```

注意，`Symbol` 函数前不能使用 `new` 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

`Symbol` 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```javascript
// 如果不加参数，它们在控制台的输出都是 Symbol()，不利于区分。
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"


// 如果 Symbol 的参数是一个对象，
// 就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)
```

注意，`Symbol` 函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的 `Symbol` 函数的返回值是不相等的。

```javascript
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```

Symbol 值不能与其他类型的值进行运算，会报错。

```javascript
let sym = Symbol('My symbol');

"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string
```

但是，Symbol 值可以显式转为字符串。

```javascript
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
```

另外，Symbol 值也可以转为布尔值，但是不能转为数值。

```javascript
let sym = Symbol();
Boolean(sym) // true
!sym  // false

if (sym) {
  // ...
}

Number(sym) // TypeError
sym + 2 // TypeError
```