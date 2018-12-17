# 继承

学习如何创建对象是理解面向对象编程的第一步。 第二步是了解继承。 在传统的面向对象语言中，类继承其他类的属性。但是，在 JavaScript 中，可以在没有定义关系的类结构的对象之间进行继承。 这种继承的机制是你已经熟悉的机制：原型。

## 1. 原型链和 `Object.prototype`

JavaScript 的内置继承方法称为原型链接或原型继承。 正如您在第 4 章中学到的，原型属性可以自动在对象实例上使用，这是一种继承形式。 对象实例从原型继承属性。 因为原型也是一个对象，它有自己的原型并继承了原型。 这是原型链：一个对象继承自其原型，而该原型又继承自其原型，依此类推。

除非您另行指定，否则所有对象（包括您自己定义的对象）都会自动从 `Object` 继承（本章稍后将对此进行讨论）。 更具体地说，所有对象都继承自 `Object.prototype`。 通过对象字面量定义的任何对象都将其 `[[Prototype]]` 设置为 `Object.prototype`，这意味着它从 `Object.prototype` 继承属性，就像本例中的 `book` 一样：

```javascript
var book = {
    title: "The Principles of Object-Oriented JavaScript"
};

var prototype = Object.getPrototypeOf(book);

console.log(prototype === Object.prototype);        // true
```

这里，`book` 有一个等于 `Object.prototype` 的原型。 不需要额外的代码来实现这一点，因为这是创建新对象时的默认行为。 这种关系意味着该书自动从 `Object.prototype` 接收方法。

### 1.1. `Object.prototype` 上的方法

过去几章中使用的几种方法实际上是在 `Object.prototype` 上定义的，因此被所有其他对象继承。 那些方法是：

* `hasOwnProperty()` : 确定是否存在具有给定名称的自有属性
* `propertyIsEnumerable()` : 确定自己的属性是否可枚举
* `isPrototypeOf()` : 确定对象是否是另一个对象的原型
* `valueOf()` : 返回对象的值表示形式
* `toString()` : 返回对象的字符串表示形式

这五种方法通过继承出现在所有对象上。 当您需要在 JavaScript 中使对象一致地工作时，最后两个是很重要的，有时您可能想要自己定义它们。

#### 1.1.1. `valueOf()`

只要在对象上使用运算符，就会调用 `valueOf()` 方法。 默认情况下，`valueOf()` 只返回对象实例。 原始包装器类型覆盖 `valueOf()` ，以便它返回 `String` 的字符串，`Boolean` 的布尔值和 `Number` 的数字。 同样，`Date` 对象的 `valueOf()` 方法以毫秒为单位返回纪元时间（就像 `Date.prototype.getTime()`  一样）。 这使您可以编写比较日期的代码，例如：

```javascript
var now = new Date();
var earlier = new Date(2010, 1, 1);

console.log(now > earlier); // true
```

在此示例中，`now` 是表示当前时间的日期，而 `earlier` 是过去的固定日期。 当使用大于运算符（`>`）时，在执行比较之前，会在两个对象上调用 `valueOf()` 方法。 您甚至可以从另一个日期中减去一个日期，因为 `valueOf()` 返回纪元开始的毫秒数。

如果要将对象用于运算符，则始终可以定义自己的 `valueOf()` 方法。 如果确实定义了 `valueOf()` 方法，请记住，您不是要更改运算符的工作方式，而是仅使用运算符默认行为的值。

#### 1.1.2. `toString()`

每当 `valueOf()` 返回引用值而不是原始值时，`toString()` 方法被称为回退。 每当 JavaScript 期待一个字符串时，它也会隐式调用原始值。 例如，当一个字符串用作加运算符的一个操作数时，另一个操作数将自动转换为字符串。 如果另一个操作数是原始值，则将其转换为字符串表示形式（例如，`true` 变为 `"true"`），但如果它是引用值，则调用 `valueOf()` 。 如果 `valueOf()` 返回引用值，则调用 `toString()` 并使用返回的值。 例如：

```javascript
var book = {
    title: "The Principles of Object-Oriented JavaScript"
};

var message = "Book = " + book;

console.log(message); // "Book = [object Object]"
```

此代码通过将 `"Book ="` 与 `book` 结合来构造字符串。 由于 `book` 是一个对象，因此调用其 `toString()` 方法。 该方法继承自 `Object.prototype`，并在大多数 `JavaScript` 引擎中返回默认值 `"[object Object]"`。 如果您对该值感到满意，则无需更改对象的 `toString()` 方法。 但是，有时候定义自己的 `toString()` 方法会很有用，这样字符串转换就会返回一个提供更多信息的值。 例如，假设您希望以前的脚本记录该书的标题：

```javascript
var book = {
    title: "The Principles of Object-Oriented JavaScript",
    toString: function() {
        return "[Book " + this.title + "]"
    }
};

var message = "Book = " + book;

// "Book = [Book The Principles of Object-Oriented JavaScript]"
console.log(message);
```

此代码为 · 定义了一个自定义 `toString()` 方法，该方法返回比继承版本更有用的值。 您通常不需要担心定义自定义 `toString()` 方法，但最好知道必要时可以这样做。

### 1.2. 修改 `Object.prototype`

默认情况下，所有对象都从 `Object.prototype` 继承，因此对 `Object .prototype` 的更改会影响所有对象。 那是一个非常危险的情况。 在第 4 章中，建议您不要修改内置对象原型，并且对于 `Object.prototype` 该加倍小心。 看看会发生什么：

```javascript
Object.prototype.add = function(value) {
    return this + value;
};

var book = {
    title: "The Principles of Object-Oriented JavaScript"
};

console.log(book.add(5)); // "[object Object]5"
console.log("title".add("end")); // "titleend"

// in a web browser
console.log(document.add(true)); // "[object HTMLDocument]true"
console.log(window.add(5)); // "[object Window]true"
```

添加 `Object.prototype.add()` 会导致所有对象都有 `add()` 方法，无论它是否真的有意义。 这个问题不仅是开发人员的问题，也是 JavaScript 语言委员会的问题：它必须将新方法放在不同的位置，因为向 `Object.prototype` 添加方法会产生无法预料的后果。

此问题的另一个方面涉及向 `Object.prototype` 添加可枚举属性。 在前面的示例中，`Object.prototype.add()` 是一个可枚举的属性，这意味着它将在您使用 `for-in` 循环时显示，例如：

```javascript
var empty = {};

for (var property in empty) {
    console.log(property);
}
```

在这里，一个空对象仍然会输出 `"add"` 作为属性，因为它存在于原型上并且是可枚举的。 考虑到在 JavaScript 中使用 `for-in` 的频率，使用可枚举属性修改 `Object.prototype` 可能会影响很多代码。 因此，[Douglas Crockford](http://crockford.com/javascript/) 建议始终在 `for-in` 循环中使用 `hasOwnProperty()`，例如：

```javascript
var empty = {};

for (var property in empty) {
    if (empty.hasOwnProperty(property)) {
        console.log(property);
    }
}
```

虽然这种方法对于可能不需要的原型属性是有效的，但它也限制了 `for-in` 仅用于自有属性的用途，这可能是你想要的，也可能不是你想要的。 最灵活的最佳选择是不修改 `Object.prototype`。