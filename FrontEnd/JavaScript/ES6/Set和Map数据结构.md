# Set 和 Map 数据结构

## 1. Set

### 1.1. 基本用法

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

`Set` 本身是一个构造函数，用来生成 Set 数据结构。

```javascript
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

通过 `add()` 方法向 Set 结构加入成员，Set 结构不会添加重复的值。

`Set` 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

```javascript
// 例一：接受数组作为参数
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二：接受数组作为参数
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三：接受类似数组的对象作为参数。
const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 类似于
const set = new Set();
document
 .querySelectorAll('div')
 .forEach(div => set.add(div));
set.size // 56
```

去除数组重复成员的方法：

```javascript
// 去除数组的重复成员
[...new Set(array)]
```

去除字符串里面的重复字符：

```javascript
[...new Set('ababbc')].join('')
// "abc"
```

向 Set 加入值的时候，不会发生类型转换，所以 `5`和 `"5"` 是两个不同的值。

Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（`===`），主要的区别是该算法中 `NaN` 等于自身，而精确相等运算符认为 `NaN` 不等于自身。

```javascript
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
```

两个对象总是不相等的：

```javascript
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2
```

### 1.2. Set 实例的属性和方法

Set 结构的实例有以下属性：

* `Set.prototype.constructor`：构造函数，默认就是Set函数。
* `Set.prototype.size`：返回Set实例的成员总数。

Set 实例的方法分为两大类：

* 操作方法（用于操作数据）
* 遍历方法（用于遍历成员）

操作方法：

* `add(value)`：添加某个值，返回 Set 结构本身。
* `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
* `has(value)`：返回一个布尔值，表示该值是否为 `Set` 的成员。
* `clear()`：清除所有成员，没有返回值。

```javascript
const s = new Set();

// 注意2被加入了两次
s.add(1).add(2).add(2);

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```

`Object` 结构和 `Set` 结构判断是否包含指定键名：

```javascript
// Object
const object = {};

if (key in object) {
  // do something
}


// Set
const set = new Set();

if (set.has(key)) {
  // do something
}
```

`Array.from` 方法可以将 Set 结构转为数组。

```javascript
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
```

去除数组重复成员的另一种方法：

```javascript
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```