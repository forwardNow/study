# 构造器和原型

在没有理解构造函数和原型的情况下，您可能已经能够在 JavaScript 中走得很远，但是如果没有很好地掌握这些构造函数和原型，您就不可能真正理解 JavaScript 语言。因为 JavaScript 缺少类，所以它转向构造函数和原型来为对象提供类似的行为。但是仅仅因为某些模式与类相似，并不意味着它们的行为方式相同。在本章中，您将详细探讨构造器和原型，以了解JavaScript如何使用它们创建对象。

## 1. 构造器

构造函数只是一个与 `new` 一起使用来创建对象的函数。 到目前为止，您已经看到了几个内置的 JavaScript 构造函数，例如 `Object`、`Array`、`Function`。 构造函数的优点是使用相同构造函数创建的对象包含相同的属性和方法。 如果要创建多个类似的对象，可以创建自己的构造函数，从而创建自己的引用类型。

因为构造函数只是一个函数，所以您可以用相同的方式定义它。 唯一的区别是构造函数名称应以大写字母开头，以区别于其他函数。 例如，查看以下空的 `Person` 函数：

```javascript
function Person() {
    // intentionally empty
}
```

这个函数是一个构造函数，但是这个函数和任何其他函数之间绝对没有语法差异。 `Person` 是一个构造函数的线索在名称中 —— 第一个字母是大写的。

定义构造函数后，您可以开始创建实例，如以下两个 `Person` 对象：

```javascript
var person1 = new Person();
var person2 = new Person();
```

如果没有参数传递给构造函数，您甚至可以省略括号：

```javascript
var person1 = new Person;
var person2 = new Person;
```

尽管 `Person` 构造函数没有显式返回任何内容，但 `person1` 和 `person2` 都被视为新 `Person` 类型的实例。 `new` 运算符自动创建给定类型的对象并返回它。 这也意味着您可以使用 `instanceof` 运算符来推断对象的类型。 以下代码显示了对新创建的对象的 `instanceof` 操作：

```javascript
console.log(person1 instanceof Person); // true
console.log(person2 instanceof Person); // true
```

因为 `person1` 和 `person2` 是使用 `Person` 构造函数创建的，所以 `instanceof` 在检查这些对象是否是 `Person` 类型的实例时返回 `true` 。

您还可以使用 `constructor` 属性检查实例的类型。 每个对象实例都是使用 `constructor` 属性自动创建的，该属性包含对创建它的构造函数的引用。 对于通用对象（通过对象字面量或对象构造函数创建的对象），`constructor` 属性的值为 `Object`; 对于使用自定义构造函数创建的对象，`constructor` 属性的值指向该构造函数。 例如，`Person` 是 `person1` 和 `person2` 的 `constructor` 属性性：

```javascript
console.log(person1.constructor === Person); // true
console.log(person2.constructor === Person); // true
```

在两种情况下，`console.log` 函数都输出 `true`，因为两个对象都是使用 `Person` 构造函数创建的。

即使实例与其构造函数之间存在这种关系，仍然建议您使用 `instanceof` 来检查实例的类型。 这是因为构造函数属性可以被覆盖，因此可能不完全准确。

当然，空构造函数不是很有用。 构造函数的重点是使用相同的属性和方法创建更多对象变得容易。 要做到这一点，只需在构造函数中的 `this` 上添加您想要的任何属性，如下例所示：

```javascript
function Person(name) {
    this.name = name;
    this.sayName = function() {
        console.log(this.name);
    };
}
```

此版本的 `Person` 构造函数接受一个命名参数 `name`，并将其赋值给 `this` 对象的 `name` 属性。 构造函数还向 `this` 添加 `sayName()`方法。 当您调用构造函数时， `this` 对象由 `new` 自动创建，它是构造函数类型的实例。 （在这种情况下，`this` 是 `Person` 的一个实例。）不需要从函数返回值，因为 `new` 运算符产生返回值。

现在，您可以使用 `Person` 构造函数来创建具有初始化 `name` 属性的对象：

```javascript
var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

console.log(person1.name); // "Nicholas"
console.log(person2.name); // "Greg"
person1.sayName(); // outputs "Nicholas"
person2.sayName(); // outputs "Greg"
```

每个对象都有自己的 `name` 属性，因此 `sayName()` 应根据您使用它的对象返回不同的值。

您还可以在构造函数中显式调用 `return`。 如果返回的值是对象，则将返回它而不是新创建的对象实例。 如果返回的值是基本类型值，则使用新创建的对象，并忽略返回的值。

构造函数允许您以一致的方式初始化类型的实例，在使用对象之前执行必需的属性设置。 例如，您可以在构造函数中使用 `Object.defineProperty()` 来帮助初始化实例：

```javascript
function Person(name) {
    Object.defineProperty(this, "name", {
        get: function() {
            return name;
        },
        set: function(newName) {
            name = newName;
        },
        enumerable: true,
        configurable: true
    });

    this.sayName = function() {
        console.log(this.name);
    };
}
```

在此版本的 `Person` 构造函数中，`name` 属性是一个访问器属性，它使用 `name` 参数存储实际名称。 这是可能的，因为命名参数就像局部变量一样。

确保始终使用 `new` 调用构造函数; 否则，您可能会更改全局对象而不是新创建的对象。 考虑以下代码中发生的情况：

```javascript
var person1 = Person("Nicholas"); // note: missing "new"
console.log(person1 instanceof Person); // false
console.log(typeof person1); // "undefined"
console.log(name); // "Nicholas"
```

当 `Person` 作为没有 `new` 的函数被调用时，构造函数内部的值等于全局 `this` 对象。 变量 `person1` 不包含值，因为 `Person` 构造函数依赖 `new` 来提供返回值。 没有 `new`，`Person` 只是一个没有 `return` 语句的函数。 对 `this.name` 的赋值实际上创建了一个名为 `name` 的全局变量，该变量存储了传递给 `Person` 的名称。 第 6 章描述了这个问题和更复杂的对象组合模式的解决方案。

如果在严格模式下调用 `Person` 构造函数而不使用 `new`，则会发生错误。 这是因为严格模式不会将给 `this` 分配给全局对象。 相反，这仍然 `this` 的是 `undefined`，每当您尝试在 `undefined` 上创建属性时都会发生错误。

构造函数允许您配置具有相同属性的对象实例，但仅构造函数不会消除代码冗余。 在目前为止的示例代码中，每个实例都有自己的 `sayName()` 方法，即使 `sayName()` 没有更改。 这意味着如果你有一个对象的 100 个实例，那么就有 100 个函数副本完成同样的事情，只是使用不同的数据。

如果所有实例共享一个方法，那么它将更高效，然后该方法可以使用 `this.name` 来检索适当的数据。 这就是使用原型的时机。

## 2. 原型

您可以将原型视为对象的配方。 几乎每个函数（除了一些内置函数）都有一个在创建新实例期间使用的 `prototype` 属性。 该原型在所有对象实例之间共享，并且这些实例可以访问原型的属性。 例如，`hasOwnProperty()` 方法是在 `Object` 的原型上定义的，但它可以从任何对象访问，就好像它是一个自己的属性一样，如下例所示：

```javascript
var book = {
    title: "The Principles of Object-Oriented JavaScript"
};

console.log("title" in book); // true
console.log(book.hasOwnProperty("title")); // true
console.log("hasOwnProperty" in book); // true
console.log(book.hasOwnProperty("hasOwnProperty")); // false
console.log(Object.prototype.hasOwnProperty("hasOwnProperty")); // true
```

即使书上没有 `hasOwnProperty()` 的定义，该方法仍然可以通过 `book.hasOwnProperty()` 访问，因为该定义确实存在于 `Object.prototype` 上。 请记住，`in` 运算符对原型属性和自己的属性都返回 `true`。

您可以使用以下函数确定属性是否在原型上：

```javascript
function hasPrototypeProperty(object, name) {
return name in object && !object.hasOwnProperty(name);
}
console.log(hasPrototypeProperty(book, "title")); // false
console.log(hasPrototypeProperty(book, "hasOwnProperty")); // true
```

如果属性在对象中但 `hasOwnProperty()` 返回 `false`，则属性在原型上。
