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

## 2. `Object.prototype` 上的方法

过去几章中使用的几种方法实际上是在 `Object.prototype` 上定义的，因此被所有其他对象继承。 那些方法是：

* `hasOwnProperty()` : 确定是否存在具有给定名称的自有属性
* `propertyIsEnumerable()` : 确定自己的属性是否可枚举
* `isPrototypeOf()` : 确定对象是否是另一个对象的原型
* `valueOf()` : 返回对象的值表示形式
* `toString()` : 返回对象的字符串表示形式

这五种方法通过继承出现在所有对象上。 当您需要在 JavaScript 中使对象一致地工作时，最后两个是很重要的，有时您可能想要自己定义它们。