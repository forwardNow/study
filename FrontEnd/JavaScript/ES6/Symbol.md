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

## 2. 作为属性名的 Symbol

Symbol 值可以作为标识符，用于对象的属性名：

* 每一个 Symbol 值都是不相等的，就能保证不会出现同名的属性
* 这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

```javascript
let idSymbol = Symbol();

// 第一种写法
let person1 = {};
person1[idSymbol] = '123456789012345678';

// 第二种写法
let person2 = {
  [idSymbol]: '123456789012345678'
};

// 第三种写法
let person3 = {};
Object.defineProperty(person3, idSymbol, { value: '123456789012345678' });

// 以上写法都得到同样结果
console.log(person1[idSymbol]) // "123456789012345678"
console.log(person2[idSymbol]) // "123456789012345678"
console.log(person3[idSymbol]) // "123456789012345678"
```

注意，Symbol 值作为对象属性名时，不能用点运算符。

同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。

```javascript
let getIdSymbol = Symbol();

let person = {
  [getIdSymbol]: function (name) { ... }
};

person[getIdSymbol]('张三');
```

Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。

```javascript
const log = {};

log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn')
};
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');
```

下面是另外一个例子。

```javascript
const COLOR_RED    = Symbol();
const COLOR_GREEN  = Symbol();

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN;
    case COLOR_GREEN:
      return COLOR_RED;
    default:
      throw new Error('Undefined color');
    }
}
```

常量使用 Symbol 值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的 `switch` 语句会按设计的方式工作。

还有一点需要注意，Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。

## 3. 实例：消除魔术字符串

魔术字符串指的是：在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。

风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。

```javascript
// 字符串 'Triangle' 就是一个魔术字符串。
// 它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle':
      area = 0.5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 });
```

常用的消除魔术字符串的方法，就是把它写成一个变量。

```javascript
// 把 'Triangle' 写成 shapeType 对象的 triangle 属性，这样就消除了强耦合。
const shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = 0.5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

如果仔细分析，可以发现 `shapeType.triangle` 等于哪个值并不重要，只要确保不会跟其他 `shapeType` 属性的值冲突即可。因此，这里就很适合改用 Symbol 值。

```javascript
const shapeType = {
  triangle: Symbol()
};
```

上面代码中，除了将 `shapeType.triangle` 的值设为一个 Symbol，其他地方都不用修改。