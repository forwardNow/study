# 理解对象

尽管 JavaScript 中有许多内置引用类型，但您很可能会相当频繁地创建自己的对象。 在执行此操作时，请记住 JavaScript 中的对象是动态的，这意味着它们可以在代码执行期间随时更改。 基于类的语言基于类定义锁定对象，而 JavaScript 对象没有这样的限制。

JavaScript 编程的很大一部分是管理这些对象，这就是理解对象如何工作的原因是理解 JavaScript 整体的关键。 本章稍后将对此进行更详细的讨论。

## 1. 定义属性

回忆一下第 1 章，创建自己的对象有两种基本方法：使用 `Object` 构造函数和使用对象字面量。 例如：

```javascript
var person1 = {
    name: "Nicholas"
};

var person2 = new Object();
person2.name = "Nicholas";

person1.age = "Redacted";
person2.age = "Redacted";

person1.name = "Greg";
person2.name = "Michael";
```

`person1` 和 `person2` 都是具有 `name` 属性的对象。 稍后在该示例中，为两个对象分配了 `age` 属性，您可以在定义对象后立即执行此操作，或者稍后执行此操作。 除非另有说明，否则您创建的对象始终可以进行修改以进行修改（有关详细信息，请参阅第 45 页的“防止对象修改”）。 此示例的最后一部分更改每个对象上的 `name` 值; 属性值也可以随时更改。

首次将属性添加到对象时，JavaScript 会在对象上使用名为 `[[Put]]` 的内部方法。 `[[Put]]` 方法在对象中创建一个点来存储属性。 你可以类比往 hash 表中添加键值对。 此操作不仅指定初始值，还指定属性的某些特性。 因此，在前面的示例中，当首先在每个对象上定义 `name` 和 `age` 属性时，将为每个对象调用 `[[Put]]` 方法。

调用 `[[Put]]` 的结果是在对象上创建自有属性。 自有属性表示只有该属性拥有该属性。 该属性直接存储在实例上，并且必须通过该对象对该属性进行操作。

自有属性与原型属性不同，这将在第 4 章中讨论。

将新值分配给现有属性时，会发生名为 `[[Set]]` 的单独操作。 此操作将使用新值替换属性的当前值。 在上一个示例中，将 `name` 设置为第二个值会导致调用 `[[Set]]`。 有关 `person1` 的 `name` 和 `age` 属性发生变化背后发生了什么情况，请参见图 3-1。

![Figure 3-1: Adding and changing properties of an object](./images/3-1.png)

在图的第一部分中，使用对象字面量来创建 `person1` 对象。 这会对 `name` 属性执行隐式 `[[Put]]`。 为 `person1.age` 分配值会为 `age` 属性执行 `[[Put]]`。 但是，将 `person1.name` 设置为新值（`"Greg"`）会对 `name` 属性执行 `[[Set]]` 操作，从而覆盖现有属性值。

## 2. 检测属性

由于可以随时添加属性，因此有时需要检查对象中是否存在属性。 新的 JavaScript 开发人员经常错误地使用以下模式来检测属性是否存在：

```javascript
// unreliable
if (person1.age) {
    // do something with age
}
```

这种模式的问题是 JavaScript 的强制类型转换造成的结果。 如果值为真值（对象，非空字符串，非零数字或 `true`），则 `if` 条件的计算结果为 `true`;如果值为假值（`null`，`undefined`，`0`，`false`，`NaN` 或空字符串），则计算结果为 `false`）。 因为对象属性可以包含这些假值之一，所以示例代码可能会产生错误判定。 例如，如果 `person1.age` 为 `0`，则即使属性存在，也不会满足 `if` 条件。 测试存在属性的更可靠方法是使用 `in` 运算符。

`in` 运算符在特定对象中查找具有给定名称的属性，如果找到它则返回 `true`。 实际上，`in` 运算符检查哈希表中是否存在给定键。 例如，以下是在使用 `in` 来检查 `person1` 对象中的某些属性：

```javascript
console.log("name" in person1); // true
console.log("age" in person1); // true
console.log("title" in person1); // false
```

请记住，方法只是引用函数的属性，因此您可以以相同的方式检查方法的存在。 下面向 `person1` 添加一个新函数 `sayName()`，并使用 `in` 来确认函数的存在。

```javascript
var person1 = {
    name: "Nicholas",
    sayName: function() {
        console.log(this.name);
    }
};

console.log("sayName" in person1);  // true
```

在大多数情况下，`in` 运算符是确定属性是否存在于对象中的最佳方法。 它具有不评估属性值的附加好处，如果这样的评估可能导致性能问题或错误，这可能很重要。

但是，在某些情况下，您可能只想检查属性是否属于自己的属性。 `in` 运算符检查自己的属性和原型属性，因此您需要采用不同的方法。 调用 `hasOwnProperty()` 方法，该方法存在于所有对象上，并且仅当给定属性存在且为自己的属性时才返回 `true`。 例如，以下代码在 `person1` 中的不同属性上比较使用 `in` 和 `hasOwnProperty()` 的结果：

```javascript
var person1 = {
    name: "Nicholas",
    sayName: function() {
        console.log(this.name);
    }
};

console.log("name" in person1); // true
console.log(person1.hasOwnProperty("name")); // true
console.log("toString" in person1); // true
console.log(person1.hasOwnProperty("toString")); // false
```

在此示例中，`name` 是 `person1` 的自己的属性，因此 `in` 运算符和 `hasOwnProperty()` 都返回 `true`。 然而，`toString()` 方法是一个存在于所有对象上的原型属性。 操作符对 `toString()` 返回 `true`，但 `hasOwnProperty()` 返回 `false`。 这是一个重要的区别，将在第 4 章进一步讨论。

## 3. 删除属性

就像属性可以随时添加到对象一样，它们也可以被删除。 简单地将属性设置为 `null` 实际上并不会从对象中删除属性。 这样的操作调用 `[[Set]]` 的值为 `null`，正如您在本章前面所见，它只替换属性的值。 您需要使用 `delete` 运算符从对象中完全删除属性。

`delete` 运算符在单个对象属性上工作，并调用名为 `[[Delete]]` 的内部操作。 您可以将此操作视为从哈希表中删除 键/值 对。 当 `delete` 运算符成功时，它返回 `true`。 （某些属性无法删除，本章稍后将对此进行更详细的讨论。）例如，以下列表显示了 delete 运算符的操作：

```javascript
var person1 = {
    name: "Nicholas"
};

console.log("name" in person1); // true
delete person1.name; // true - not output
console.log("name" in person1); // false
console.log(person1.name); // undefined
```

在此示例中，将从 `person1` 中删除 `name` 属性。 操作完成后，`in` 运算符返回 `false`。 另请注意，尝试访问不存在的属性只会返回 `undefined`。图 3-2 显示了 `delete` 如何影响对象。

![Figure 3-2: When you delete the name property, it completely disappears from person1.](./images/3-2.png)

## 4. 枚举

默认情况下，添加到对象的所有属性都是可枚举的，这意味着您可以使用 `for-in` 循环对它们进行迭代。 可枚举属性的内部 `[[Enumerable]]` 属性设置为 `true`。 `for-in` 循环枚举对象上的所有可枚举属性，将属性名称分配给变量。 例如，以下循环输出对象的属性名称和值：

```javascript
var property;
for (property in object) {
    console.log("Name: " + property);
    console.log("Value: " + object[property]);
}
```

每次通过 `for-in` 循环时，属性变量都会填充对象上的下一个可枚举属性，直到所有这些属性挨个填充完毕。 此时，循环结束，代码执行继续。 此示例使用括号表示法检索对象属性的值并将其输出到控制台，这是 JavaScript 中括号表示法的主要用例之一。

如果您只需要稍后在程序中使用的对象属性列表，ECMAScript 5 引入了 `Object.keys()` 方法来检索可枚举属性名称的数组，如下所示：

```javascript
var properties = Object.keys(object);

// if you want to mimic for-in behavior
var i, len;

for (i=0, len=properties.length; i < len; i++){
    console.log("Name: " + properties[i]);
    console.log("Value: " + object[properties[i]]);
}
```

此示例使用 `Object.keys()` 从对象检索可枚举属性。 然后使用 for 循环迭代属性并输出名称和值。 通常，在需要操作属性名称数组的情况下使用 `Object.keys()` ，在不需要数组时使用 `for-in`。

在 `for-in` 循环中返回的可枚举属性与 `Object.keys()` 返回的属性之间存在差异。 `for-in` 循环还枚举原型属性，而 Object.keys() 仅返回自有（实例）属性。 第 4 章讨论了原型和自身属性之间的差异。

请记住，并非所有属性都是可枚举的。 实际上，对象上的大多数原生方法都将 `[[Enumerable]]` 属性设置为 `false`。 您可以使用 `propertyIsEnumerable()` 方法检查属性是否可枚举，该方法存在于每个对象上：

```javascript
var person1 = {
    name: "Nicholas"
};

console.log("name" in person1); // true
console.log(person1.propertyIsEnumerable("name")); // true

var properties = Object.keys(person1);

console.log("length" in properties); // true
console.log(properties.propertyIsEnumerable("length")); // false
```

这里，`name` 属性是可枚举的，因为它是在 `person1` 上定义的自定义属性。 另一方面，`properties` 数组的 `length` 属性不可枚举，因为它是 `Array.prototype` 上的内置属性。 您会发现默认情况下很多原生属性都不可枚举。

## 5. 属性类型

有两种不同类型的属性：数据属性和访问器属性。 数据属性包含一个值，如本章前面的示例中的 `name` 属性。 `[[Put]]` 方法的默认行为是创建数据属性，本章到目前为止的每个示例都使用了数据属性。 访问器属性不包含值，而是定义为函数，在读取属性时调用的函数（称为 `getter`），以及在写入属性时调用的函数（称为 `setter`）。 访问者属性只需要一个 `getter` 或 `setter`，尽管他们可以同时拥有。

使用对象字面量定义访问器属性有一种特殊语法：

```javascript
var person1 = {
    _name: "Nicholas",

    get name() {
        console.log("Reading name");
        return this._name;
    },

    set name(value) {
        console.log("Setting name to %s", value);
        this._name = value;
    }
};

console.log(person1.name); // "Reading name" then "Nicholas"

person1.name = "Greg";
console.log(person1.name); // "Setting name to Greg" then "Greg"
```

此示例定义名为 `name` 的访问者属性。 有一个名为 `_name` 的数据属性，它包含属性的实际值。 （前导下划线是一个常见的约定，表示该属性被认为是私有的，但实际上它仍然是公共的。）为 `name` 定义 `getter` 和 `setter` 的语法看起来很像一个函数，但没有 `function` 关键字。 在访问者属性名称之前使用特殊关键字 `get` 和 `set`，后面紧跟括号和函数体。 预期 `getter` 将返回一个值，而 `setter` 将接收作为参数分配给该属性的值。

尽管此示例使用 `_name` 存储属性数据，但您可以轻松地将数据存储在变量中，甚至存储在另一个对象中。 此示例仅添加日志记录到属性的行为; 如果您只将数据存储在另一个属性中，通常没有理由使用访问者属性 —— 只需使用属性本身。 当您希望赋值来触发某种行为时，或者在读取值时需要计算所需的返回值时，访问器属性最有用。

您不需要同时定义 `getter` 和 `setter`; 你可以选择一个或两个。 如果只定义一个 `getter`，那么该属性将变为只读，并且尝试写入该属性将在非严格模式下静默失败并在严格模式下抛出错误。 如果仅定义 `setter`，则该属性将变为只写，并且尝试读取该值都将在 strict 和 nonstrict 模式下以静默方式失败。

## 6. 属性的特性

在 ECMAScript 5 之前，无法指定属性是否应该是可枚举的。 实际上，根本无法访问属性的内部特性。 ECMAScript 5 通过引入几种直接与属性特性交互的方法以及引入新属性来改变这一点。 现在可以创建与内置属性行为相同的 JavaScript 属性。 本节详细介绍了数据和访问器属性的特性，从它们共有的特性开始。

### 6.1. 普通特性

数据和访问器属性之间共享两个属性属性。 一个是 `[[Enumerable]]`，它决定了你是否可以迭代属性。 另一个是 `[[Configurable]]`，它决定是否可以更改属性。 您可以使用 `delete` 删除可配置的属性，也可以随时可更改可配置的属性。 （这也意味着可配置属性可以从数据数据更改为访问器属性，反之亦然。）默认情况下，您在对象上声明的所有属性都是可枚举和可配置的。

如果要更改属性特性，可以使用 `Object.defineProperty()` 方法。 此方法接受三个参数：要配置的对象，属性名称和包含要设置的属性的特性描述符对象。 描述符具有与内部属性同名但没有方括号的属性。 因此，您使用 `enumerable` 设置 `[[Enumerable]]`，使用 `configurable` 设置 `[[Configurable]]`。 例如，假设您要使对象属性不可枚举且不可配置：

```javascript
var person1 = {
    name: "Nicholas"
};

Object.defineProperty(person1, "name", {
    enumerable: false
});

console.log("name" in person1); // true
console.log(person1.propertyIsEnumerable("name")); // false

var properties = Object.keys(person1);
console.log(properties.length); // 0

Object.defineProperty(person1, "name", {
    configurable: false
});

// try to delete the Property
delete person1.name;
console.log("name" in person1); // true
console.log(person1.name); // "Nicholas"

Object.defineProperty(person1, "name", { // error!!!
    configurable: true
});
```

`name` 属性定义为通常，但随后会对其进行修改以将其 `[[Enumerable]]` 属性设置为 `false`。 `propertyIsEnumerable()` 方法现在返回 `false`，因为它引用了 `[[Enumerable]]` 的新值。之后，`name` 被更改为不可配置。 从现在开始，删除 `name` 的尝试失败，因为无法更改属性，因此 `person1` 上仍存在 `name`。 再次在 `name` 上调用 `Object.defineProperty()` 也不会导致对该属性的进一步更改。 实际上，`name` 被锁定为 `person1` 上的属性。

代码的最后一部分尝试将 `name` 重新定义为可再次配置。 但是，这会引发错误，因为您无法再次配置不可配置的属性。 尝试将数据属性更改为访问者属性（反之亦然）也会在这种情况下引发错误。

当 JavaScript 以严格模式运行时，尝试删除不可配置的属性会导致错误。 在非严格模式下，会静默失败。

### 6.2. 数据属性特性

数据属性具有访问器没有的两个附加特性。 第一个是 `[[Value]]`，它保存属性值。 在对象上创建属性时，将自动填充此特性。 所有属性值都存储在 `[[Value]]` 中，即使该值是函数。

第二个特性是 `[[Writable]]`，它是一个布尔值，表示属性是否可以写入。 默认情况下，除非另行指定，否则所有属性都是可写的。

使用这两个附加特性，即使属性尚不存在，也可以使用 `Object.defineProperty()` 完全定义数据属性。 考虑以下代码：

```javascript
var person1 = {
    name: "Nicholas"
};
```

你在本章中看过这个片段; 它将 `name` 属性添加到 `person1` 并设置其值。 您可以使用以下（更详细）代码获得相同的结果：

```javascript
var person1 = {};

 Object.defineProperty(person1, "name", {
    value: "Nicholas",
    enumerable: true,
    configurable: true,
    writable: true
});
```

调用 `Object.defineProperty()` 时，它首先检查属性是否存在。 如果该属性不存在，则添加描述符中指定的属性。 在这种情况下，`name` 不是 `person1` 的属性。

使用 `Object.defineProperty()` 定义新属性时，指定所有特性非常重要，否则布尔属性会自动默认为 `false`。 例如，以下代码创建一个不可枚举，不可配置且不可写的 `name` 属性，因为它在 `Object.defineProperty()` 的调用中没有显式地使任何特性为 `true`。

```javascript
var person1 = {};

Object.defineProperty(person1, "name", {
    value: "Nicholas"
});

console.log("name" in person1); // true
console.log(person1.propertyIsEnumerable("name")); // false

delete person1.name;
console.log("name" in person1); // true

person1.name = "Greg";
console.log(person1.name); // "Nicholas"
```

在此代码中，除了读取值之外，您无法对 `name` 属性执行任何操作; 其他所有操作都被锁定。 如果您要更改现有属性，请记住只有您指定的特性才会更改。

当您尝试更改值时，不可写属性会在严格模式下抛出错误。 在非严格模式下，操作将静默失败。

### 6.3. 访问器属性特性

访问者属性还有两个附加特性。 因为访问器属性没有存储值，所以不需要 `[[Value]]` 或 `[[Writable]]`。 相反，访问器具有 `[[Get]]` 和 `[[Set]]`，它们分别包含 `getter` 和 `setter` 函数。 与 `getter` 和 `setter` 的对象字面量形式一样，您只需定义其中一个特性即可创建属性。

如果您尝试同时使用数据特性和访问器特性创建属性，则会出现错误。

使用访问器属性特性而不是对象字面量来定义访问器属性的优点是，您可以在现有对象上定义这些属性。 如果要使用对象字面量，则必须在创建对象时定义访问器属性。

与数据特性一样，您还可以指定访问器属性是可配置的还是可枚举的。 考虑一下前面的这个例子：

```javascript
var person1 = {
    _name: "Nicholas",

    get name() {
        console.log("Reading name");
        return this._name;
    },

    set name(value) {
        console.log("Setting name to %s", value);
        this._name = value;
    }
};
```

此代码也可以编写如下：

```javascript
var person1 = {
    _name: "Nicholas"
};

Object.defineProperty(person1, "name", {
    get: function() {
        console.log("Reading name");
        return this._name;
    },
    set: function(value) {
        console.log("Setting name to %s", value);
        this._name = value;
    },
    enumerable: true,
    configurable: true
});
```

请注意，传递给 `Object.defineProperty()` 的对象上的 `get` 和 `set` 键是包含函数的数据属性。 您不能在此处使用对象字面量的访问器格式。

设置其他属性（`[[Enumerable]]` 和 `[[Configurable]]`）可以更改访问者属性的工作方式。 例如，您可以创建一个不可配置，不可数，不可写的属性，如下所示：

```javascript
var person1 = {
    _name: "Nicholas"
};

Object.defineProperty(person1, "name", {
    get: function() {
        console.log("Reading name");
        return this._name;
    }
});

console.log("name" in person1); // true
console.log(person1.propertyIsEnumerable("name")); // false

delete person1.name;
console.log("name" in person1); // true

person1.name = "Greg";
console.log(person1.name); // "Nicholas"
```

在此代码中，`name` 属性是一个只有 `getter` 的访问器属性。 没有 `setter` 或任何其他显式设置为 `true` 的特性，因此可以读取但不能更改该值。

与通过对象字面量定义的访问器属性一样，当您尝试更改没有 `setter` 的访问器属性会在严格模式下引发错误。 在非严格模式下，操作无提示失败。 尝试读取仅定义了 `setter` 的访问者属性始终返回 `undefined`。

### 6.4. 定义多个属性

如果使用 `Object.defineProperties()` 而不是 `Object.defineProperty()` ，可以同时在对象上定义多个属性。 此方法接受两个参数：要处理的对象和包含所有属性信息的对象。 第二个参数的键是属性名称，值是定义这些属性的特性的描述符对象。 例如，以下代码定义了两个属性：

```javascript
var person1 = {};

Object.defineProperties(person1, {
    // data property to store data
    _name: {
        value: "Nicholas",
        enumerable: true,
        configurable: true,
        writable: true
    },

    // accessor property
    name: {
        get: function() {
            console.log("Reading name");
            return this._name;
        },
        set: function(value) {
            console.log("Setting name to %s", value);
            this._name = value;
        },
        enumerable: true,
        configurable: true
    }
});
```

此示例将 `_name` 定义为数据属性，将 `name` 定义为访问器属性。 您可以使用 `Object.defineProperties()` 定义任意数量的属性; 您甚至可以同时更改现有属性并创建新属性。 效果与多次调用 `Object.defineProperty()` 相同。

### 6.5. 检索属性特性

如果需要获取属性特性，可以使用 `Object.getOwnPropertyDescriptor()` 在 JavaScript 中执行此操作。 顾名思义，此方法仅适用于自有属性。 此方法接受两个参数：要处理的对象和要检索的属性名称。 如果属性存在，则应该获取到具有四个特性的描述符对象：可配置，可枚举，以及适用于属性类型的其他两个属性。 即使您没有专门设置特性，您仍将收到包含该属性特性的适当值的对象。 例如，此代码创建一个属性并检查其特性：

```javascript
var person1 = {
    name: "Nicholas"
};

var descriptor = Object.getOwnPropertyDescriptor(person1, "name");

console.log(descriptor.enumerable); // true
console.log(descriptor.configurable); // true
console.log(descriptor.writable); // true
console.log(descriptor.value); // "Nicholas"
```

这里，名为 `name` 的属性被定义为对象字面量的一部分。 对 `Object.getOwnPropertyDescriptor()` 的调用返回一个具有可枚举、可配置、可写、值的对象，即使这些对象未通过 `Object.defineProperty()` 显式定义。

## 7. 禁止修改对象

对象与属性一样，具有控制其行为的内部属性。 其中一个属性是 `[[Extensible]]`，它是一个布尔值，指示是否可以修改对象本身。 默认情况下，您创建的所有对象都是可扩展的，这意味着可以随时将新属性添加到对象中。 你在本章中已经多次看过这个。 通过将`[[Extensible]]` 设置为 `false`，可以防止将新属性添加到对象。 有三种不同的方法可以实现这一目标。

### 7.1. 禁止扩展（Preventing Extensions）

创建不可扩展对象的一种方法是使用 `Object.preventExtensions()`。 此方法接受单个参数，该参数是您要使其不可扩展的对象。 在对象上使用此方法后，您将永远无法再次向其添加任何新属性。 您可以使用 `Object.isExtensible()` 检查 `[[Extensible]]` 的值。 以下代码显示了两种方法的示例。

```javascript
var person1 = {
    name: "Nicholas"
};

console.log(Object.isExtensible(person1)); // true

Object.preventExtensions(person1);
console.log(Object.isExtensible(person1)); // false

person1.sayName = function() {
    console.log(this.name);
};

console.log("sayName" in person1); // false
```

在创建 `person1` 之后，此示例在使对象的 `[[Extensible]]` 属性不可更改之前检查该对象的 `[[Extensible]]` 属性。 既然 `person1` 是不可扩展的，那么 `sayName()` 方法永远不会添加到它中。

尝试将属性添加到不可扩展的对象将在严格模式下引发错误。 在非严格模式下，操作静默失败。 您应始终对不可扩展的对象使用严格模式，以便在不正确使用不可扩展的对象时知道。

### 7.2. 密封对象（Sealing Objects）

创建不可扩展对象的第二种方法是密封对象。 密封对象是不可扩展的，并且其所有属性都是不可配置的。 这意味着您不仅不能向对象添加新属性，而且还无法删除属性或更改其类型（从数据到访问器，反之亦然）。 如果对象已密封，则只能读取和写入其属性。

您可以在对象上使用 `Object.seal()` 方法来密封它。 发生这种情况时，`[[Extensible]]` 属性设置为 `false`，并且所有属性的 `[[Configurable]]` 属性都设置为 `false`。 您可以使用 `Object.isSealed()` 检查对象是否已密封，如下所示：

```javascript
var person1 = {
    name: "Nicholas"
};

console.log(Object.isExtensible(person1)); // true
console.log(Object.isSealed(person1)); // false

Object.seal(person1);
console.log(Object.isExtensible(person1)); // false
console.log(Object.isSealed(person1)); // true

person1.sayName = function() {
    console.log(this.name);
};

console.log("sayName" in person1); // false

person1.name = "Greg";
console.log(person1.name); // "Greg"

delete person1.name;
console.log("name" in person1); // true
console.log(person1.name); // "Greg"

var descriptor = Object.getOwnPropertyDescriptor(person1, "name");
console.log(descriptor.configurable); // false
```

此代码密封 `person1`，因此您无法添加或删除属性。 由于所有密封对象都是不可扩展的，因此在 `person1` 上使用时，`Object.isExtensible()` 返回 `false`，并且尝试添加名为 `sayName()` 的方法将静默失败。 此外，虽然 `person1.name` 已成功更改为新值，但尝试删除它会失败。

如果您熟悉 Java 或 C++，那么密封对象也应该是熟悉的。 基于其中一种语言的类创建新对象实例时，无法向该对象添加任何新属性。 但是，如果属性包含对象，则可以修改该对象。 实际上，密封对象是 JavaScript 在不使用类的情况下为您提供相同的控制方式。

确保对密封对象使用严格模式，这样当有人试图错误地使用该对象时，您将收到错误。