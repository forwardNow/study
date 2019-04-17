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

## 4. 属性名的遍历

Symbol 作为属性名，该属性不会被以下语法或 API 遍历或返回：

* `for...in`
* `for...of`
* `Object.keys()`
* `Object.getOwnPropertyNames()`
* `JSON.stringify()`

但是，它也不是私有属性，`Object.getOwnPropertySymbols` 方法，可以获取指定对象的所有 Symbol 属性名。

`Object.getOwnPropertySymbols` 方法

* 返回一个数组
* 成员是当前对象的所有用作属性名的 Symbol 值。

```javascript
const person = {};
let idSymbol = Symbol('id');
let secretSymbol = Symbol('secret');

person[idSymbol] = '123456';
person[secretSymbol] = 'wahh';

const personSymbols = Object.getOwnPropertySymbols(person);

personSymbols
// [Symbol(id), Symbol(secret)]
```

另一个新的 API，`Reflect.ownKeys` 方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

```javascript
let person = {
  [Symbol('id')]: '123456',
  name: '张三',
  gender: 0
};

Reflect.ownKeys(person)
// ["name", "gender", Symbol(id)]
```

由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。

```javascript
let size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

let x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]
```

## 5. Symbol.for()，Symbol.keyFor()

`Symbol.for` 方法：

* 接受一个字符串作为参数
* 搜索指定名称的 Symbol 值
* 如果有，就返回这个 Symbol 值
* 如果无，就新建并返回一个以该字符串为名称的 Symbol 值。

```javascript
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
```

`Symbol.for()` vs `Symbol()`

* 都会生成新的 Symbol 值
* 前者会被登记在全局环境中供搜索，后者不会
* 调用 `Symbol.for("cat")` 30 次，每次都会返回同一个 Symbol 值
* 调用 `Symbol("cat")` 30 次，会返回 30 个不同的 Symbol 值

```javascript
Symbol.for("bar") === Symbol.for("bar"); // true

// 由于 Symbol() 写法没有登记机制，所以每次调用都会返回一个不同的值。
Symbol("bar") === Symbol("bar"); // false
```

`Symbol.keyFor` 方法返回一个已登记的 Symbol 类型值的 `key`。

```javascript
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

需要注意的是，`Symbol.for` 为 Symbol 值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值。

```javascript
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);

// iframe 窗口生成的 Symbol 值，可以在主页面得到。
iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo'); // true
```

## 6. 实例：模块的 Singleton 模式

Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。

## 7. 内置的 Symbol 值

除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

类似于 `toString` 方法，当对象作为特定的方法的参数时，会调用对象特定 Symbol 值参数的方法。

### 7.1. Symbol.hasInstance

对象的 `Symbol.hasInstance` 属性，指向一个内部方法。当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法。比如，`foo instanceof Foo` 在语言内部，实际调用的是 `Foo[Symbol.hasInstance](foo)`。

```javascript
const Person = {
  [Symbol.hasInstance](name) {
    return name === '张三';
  }
};

'张三' instanceof Person; // true

// 等价于
Person[Symbol.hasInstance]('张三'); // true
```

### 7.2. Symbol.isConcatSpreadable

对象的 `Symbol.isConcatSpreadable` 属性：

* 作为 `Array.prototype.concat()` 的参数时，是否会展开其成员
* 值为 `undefined`、`true` 时会展开
* 值为 `false` 时不展开

```javascript
let num1 = [1, 2];
console.log(num1[Symbol.isConcatSpreadable]); // undefined
['a', 'b'].concat(num1); // ["a", "b", 1, 2]


let num2 = [1, 2];
num2[Symbol.isConcatSpreadable] = false;
console.log(['a', 'b'].concat(num2)); // ["a", "b", Array(2)]

let argument = { 0: 'a', 1: 'b', length: 2 };
console.log(argument[Symbol.isConcatSpreadable]); // undefined
argument[Symbol.isConcatSpreadable] = true;
['x', 'y'].concat(argument); // ["x", "y", "a", "b"]
```

`Symbol.isConcatSpreadable` 属性也可以定义在类里面。

```javascript
class MyArray extends Array {
  constructor(args) {
    super(args);
    this[Symbol.isConcatSpreadable] = true;
  }
}
class MyArray2 extends Array {
  constructor(args) {
    super(args);
  }
  get [Symbol.isConcatSpreadable] () {
    return false;
  }
}
```

### 7.3. Symbol.species

对象的 `Symbol.species` 属性，指向一个构造函数。创建衍生对象时，会使用该属性。

```javascript
class MyArray extends Array {
  // do something
}

const myArray1 = new MyArray(1, 2, 3);
const myArray2 = myArray1.map(x => x);
const myArray3 = myArray1.filter(x => true);

myArray2 instanceof MyArray; // true
myArray3 instanceof MyArray; // true
myArray3 instanceof Array;   // true
```

`Symbol.species` 可改变衍生类的构造函数：

```javascript
// 默认
class MyArray extends Array {
  static get [Symbol.species]() {
    return this;
  }
}

// 改为
class MyArray2 extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const myArray1 = new MyArray2(1, 2, 3);
const myArray2 = myArray1.map(x => x);

myArray2 instanceof MyArray2; // false
myArray2 instanceof Array;    // true
```

### 7.4. Symbol.match

对象的 `Symbol.match` 属性，指向一个函数。当执行 `str.match(myObject)` 时，如果该属性存在，会调用它，返回该方法的返回值。

```javascript
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)

class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1
```

### 7.5. Symbol.replace

对象的 `Symbol.replace` 属性，指向一个方法，当该对象被 `String.prototype.replace` 方法调用时，会返回该方法的返回值。

```javascript
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)
```

```javascript
const searchValue = {
  [Symbol.replace](search, replace) {
    return [search, replace];
  },
};

'hello'.replace(searchValue, 'world'); //  ["hello", "world"]
```

### 7.6. Symbol.search

对象的 `Symbol.search` 属性，指向一个方法，当该对象被 `String.prototype.search` 方法调用时，会返回该方法的返回值。

```javascript
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0
```

### 7.7. Symbol.split

对象的 `Symbol.split` 属性，指向一个方法，当该对象被 `String.prototype.split` 方法调用时，会返回该方法的返回值。

```javascript
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)
```

下面是一个例子。

```javascript
class MySplitter {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    let index = string.indexOf(this.value);
    if (index === -1) {
      return string;
    }
    return [
      string.substr(0, index),
      string.substr(index + this.value.length)
    ];
  }
}

'foobar'.split(new MySplitter('foo'))
// ['', 'bar']

'foobar'.split(new MySplitter('bar'))
// ['foo', '']

'foobar'.split(new MySplitter('baz'))
// 'foobar'
```

### 7.8. Symbol.iterator

对象的 `Symbol.iterator` 属性，指向该对象的默认遍历器方法。

```javascript
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

对象进行 `for...of` 循环时，会调用 `Symbol.iterator` 方法，返回该对象的默认遍历器

```javascript
class Collection {
  *[Symbol.iterator]() {
    let i = 0;
    while(this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}

let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

for(let value of myCollection) {
  console.log(value);
}
// 1
// 2
```

### 7.9. Symbol.toPrimitive

对象的 `Symbol.toPrimitive` 属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

`Symbol.toPrimitive` 被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。

* Number：该场合需要转成数值
* String：该场合需要转成字符串
* Default：该场合可以转成数值，也可以转成字符串

```javascript
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
```

### 7.10. Symbol.toStringTag

对象的 `Symbol.toStringTag` 属性，指向一个方法。

在该对象上面调用 `Object.prototype.toString` 方法时，如果这个属性存在，它的返回值会出现在 `toString` 方法返回的字符串之中，表示对象的类型。

也就是说，这个属性可以用来定制 `[object Object]` 或 `[object Array]` 中 `object` 后面的那个字符串。

```javascript
// 例一
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"

// 例二
class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
let x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"
```

ES6 新增内置对象的 `Symbol.toStringTag` 属性值如下。

* `JSON[Symbol.toStringTag]`：'JSON'
* `Math[Symbol.toStringTag]`：'Math'
* Module 对象 `M[Symbol.toStringTag]`：'Module'
* `ArrayBuffer.prototype[Symbol.toStringTag]`：'ArrayBuffer'
* `DataView.prototype[Symbol.toStringTag]`：'DataView'
* `Map.prototype[Symbol.toStringTag]`：'Map'
* `Promise.prototype[Symbol.toStringTag]`：'Promise'
* `Set.prototype[Symbol.toStringTag]`：'Set'
* `%TypedArray%.prototype[Symbol.toStringTag]`：'Uint8Array' 等
* `WeakMap.prototype[Symbol.toStringTag]`：'WeakMap'
* `WeakSet.prototype[Symbol.toStringTag]`：'WeakSet'
* `%MapIteratorPrototype%[Symbol.toStringTag]`：'Map Iterator'
* `%SetIteratorPrototype%[Symbol.toStringTag]`：'Set Iterator'
* `%StringIteratorPrototype%[Symbol.toStringTag]`：'String Iterator'
* `Symbol.prototype[Symbol.toStringTag]`：'Symbol'
* `Generator.prototype[Symbol.toStringTag]`：'Generator'
* `GeneratorFunction.prototype[Symbol.toStringTag]`：'GeneratorFunction'