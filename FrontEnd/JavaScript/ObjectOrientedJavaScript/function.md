# 函数

如第 1 章所述，函数实际上是 JavaScript 中的对象。 函数的定义特征 - 它与任何其他对象的区别 - 是存在名为 `[[Call]]` 的内部属性。内部属性不能通过代码访问，而是定义在执行代码时的行为。 ECMAScript 为 JavaScript 中的对象定义了多个内部属性，这些内部属性由双方括号表示法指示。

`[[Call]]` 属性表示该对象可执行。只有函数具有 `[[Call]]` 属性，因此当任何对象拥有 `[[Call]]` 属性时，`typeof` 运算符都返回 `"function"`。 这导致了过去的一些混乱，因为一些浏览器中，正则表达式也具有的 `[[Call]]` 属性，因此被错误地识别为函数。 现在所有浏览器的行为都相同，因此 `typeof` 不再将正则表达式标识为函数。

本章讨论在 JavaScript 中定义和执行函数的各种方法。 因为函数是对象，所以它们的行为与其他语言中的函数不同，这种行为对于理解 JavaScript 很重要。

## 1. 声明与表达式

实际上有两种字面量形式的函数。 第一个是函数声明，它以 `function` 关键字开头，并包含紧随其后的函数的名称。 函数的内容用大括号括起来，如下面的声明所示：

```javascript
function add(num1, num2) {
    return num1 + num2;
}
```

第二种形式是函数表达式，在 `function` 关键字之后不需要名称。 这些函数被认为是匿名的，因为函数对象本身没有名称。 相反，函数表达式通常通过变量或属性引用，如下面的表达式：

```javascript
var add = function(num1, num2) {
    return num1 + num2;
};
```

此代码实际上为变量 `add` 分配了一个函数值。 函数表达式几乎与函数声明相同，除了缺少名称以及末尾多了个分号。 赋值表达式通常以分号结尾，就像您分配任何其他值一样。

虽然这两种形式非常相似，但它们的区别非常重要。 在执行代码时，函数声明被提升到上下文的顶部（外部函数或全局作用域）。 这意味着您可以在定义函数的代码之前使用它，而不会生成错误。 例如：

```javascript
var result = add(5, 5);
function add(num1, num2) {
    return num1 + num2;
}
```

此代码可能看起来会导致错误，但它可以正常工作。 那是因为 JavaScript 引擎将函数声明提升到顶部，就好像它是这样编写的：

```javascript
// how the JavaScript engine interprets the code
function add(num1, num2) {
    return num1 + num2;
}
var result = add(5, 5);
```

函数提升仅发生在函数声明中，因为函数名称是提前知道的。 另一方面，函数表达式不能被提升，因为函数只能通过变量引用。 所以这段代码会导致错误：

```javascript
// error!
var result = add(5, 5);
var add = function(num1, num2) {
    return num1 + num2;
};
```

只要您在使用函数之前始终定义函数，使用函数声明或函数表达式都不会出问题。

## 2. 将函数作为值

因为 JavaScript 中的函数是 first-class，所以您可以像使用其他任何对象一样使用它们。 您可以将它们赋值给变量，将它们添加到对象的属性上，将它们作为参数传递给其他函数，将它们作为函数的返回值。 基本上，您可以在任何使用任何其他引用类型值的地方使用函数。 这使 JavaScript 的函数非常强大。 请考虑以下示例：

```javascript
function sayHi() {
    console.log("Hi!");
}

sayHi(); // outputs "Hi!"

var sayHi2 = sayHi;

sayHi2(); // outputs "Hi!"
```

在这段代码中，有一个 `sayHi` 的函数声明。 然后创建名为 `sayHi2` 的变量并赋值 `sayHi`。 `sayHi` 和 `sayHi2` 现在都指向相同的功能，这意味着都可以执行，也会有相同的结果。 要理解为什么会发生这种情况，请查看重写的相同代码以使用 `Function` 构造函数：

```javascript
var sayHi = new Function("console.log(\"Hi!\");");

sayHi();        // outputs "Hi!"

var sayHi2 = sayHi;

sayHi2();       // outputs "Hi!"
```

`Function` 构造函数明确证明 `sayHi` 可以像任何其他对象一样传递。 当你记住函数是对象时，很多行为开始变得有意义。

例如，您可以将函数作为参数传递给另一个函数。 JavaScript 数组上的 `sort()` 方法接受比较函数作为可选参数。 当比较数组中的两个值时，就会调用比较函数。 如果第一个值小于第二个值，则比较函数必须返回一个负数。 如果第一个值大于第二个值，则函数必须返回正数。 如果两个值相等，则函数应返回零。

默认情况下，`sort()` 将数组中的每个项目转换为字符串，然后执行比较。 这意味着如果不指定比较函数，则无法准确排序数字数组。 例如，您需要包含一个比较函数来准确排序数字数组，例如：

```javascript
var numbers = [ 1, 5, 8, 4, 7, 10, 2, 6 ];
numbers.sort(function(first, second) {
    return first - second;
});

console.log(numbers); // "[1, 2, 4, 5, 6, 7, 8, 10]"

numbers.sort();

console.log(numbers); // "[1, 10, 2, 4, 5, 6, 7, 8]"
```

在这个例子中，传递给 `sort()` 的比较函数实际上是一个函数表达式。 请注意，该函数没有名称; 它仅作为传递给另一个函数的引用存在（作为匿名函数）。 两个值相减会从比较函数中返回正确的结果。

将其与第二次调用 `sort()` 进行比较，该调用不使用比较函数。 数组的顺序与预期的不同，因为 1 后跟 10，这是因为默认比较在比较它们之前将所有值转换为字符串。

## 3. 参数

JavaScript 函数的另一个独特方面是，您可以将任意数量的参数传递给任何函数，而不会导致错误。 那是因为函数参数实际上存储在类数组对象 `arguments` 中。 就像常规JavaScript数组一样，参数可以增长以包含任意数量的值。 这些值通过数字索引引用，并且有一个 `length` 属性来确定存在多少个值。

`arguments` 对象在任何函数内自动可用。 这意味着函数中的命名参数主要是为了方便而存在，并不实际限制函数可以接受的参数数量。

`arguments` 对象不是 `Array` 的实例，因此没有与数组相同的方法; `Array.isArray(arguments)`始终返回 `false`。

另一方面，JavaScript 也不会忽略函数的命名参数。 函数期望的参数数量存储在函数的 `length` 属性中。 请记住，函数实际上只是一个对象，因此它可以具有属性。 `length` 属性表示函数期望的参数数量。 知道函数预期参数数量在 JavaScript 中很重要，因为如果传入太多或太少的参数，函数不会抛出错误。

这是一个使用 `arguments` 和函数预期参数数量的简单示例; 请注意，传递给函数的参数数量对预期函数时参数数量没有影响：

```javascript
function reflect(value) {
    return value;
}

console.log(reflect("Hi!")); // "Hi!"
console.log(reflect("Hi!", 25)); // "Hi!"
console.log(reflect.length); // 1

reflect = function() {
    return arguments[0];
};

console.log(reflect("Hi!")); // "Hi!"
console.log(reflect("Hi!", 25)); // "Hi!"
console.log(reflect.length); // 0
```

此示例首先使用单个命名参数定义 `reflect()` 函数，但在将第二个参数传递给函数时没有错误。 此外，`length` 属性为 1，因为只有一个命名参数。 然后重新定义 `reflect()` 函数，没有命名参数; 它返回 `arguments[0]`，这是传入的第一个参数。该函数的新版本与前一版本完全相同，但其长度为 0。

`reflect()` 的第一个实现更容易理解，因为它使用命名参数（就像在其他语言中一样）。 使用 `arguments` 对象的版本可能会令人困惑，因为没有命名参数，您必须读取函数体以确定是否使用了参数。 这就是为什么许多开发人员宁愿避免使用参数，除非必要。

但是，有时使用 `arguments` 实际上比命名参数更有效。 例如，假设您要创建一个接受任意数量参数并返回其总和的函数。 您不能使用命名参数，因为您不知道需要多少参数，因此在这种情况下，使用参数是最佳选择。

```javascript
function sum() {
    var result = 0,
        i = 0,
        len = arguments.length;

    while (i < len) {
        result += arguments[i];
        i++;
    }

    return result;
}

console.log(sum(1, 2)); // 3
console.log(sum(3, 4, 5, 6)); // 18
console.log(sum(50)); // 50
console.log(sum()); // 0
```

`sum()` 函数接受任意数量的参数，并通过使用 `while` 循环遍历参数中的值将它们添加到一起。 这与您将数字数组相加的情况完全相同。 当没有传入参数时，该函数甚至可以工作，因为结果初始化为值 0。

## 4. 重载

大多数面向对象的语言都支持函数重载，这是单个函数具有多个签名的能力。 函数签名由函数名称加上函数期望的参数的数量和类型组成。 因此，单个函数可以有一个接受单个字符串参数的签名，另一个接受两个数字参数。 该语言根据传入的参数确定要调用的函数版本。

如前所述，JavaScript 函数可以接受任意数量的参数，函数所使用的参数类型根本不需要指定。 这意味着 JavaScript 函数实际上没有签名。 缺少函数签名也意味着缺少函数重载。 看看当你尝试声明两个具有相同名称的函数时会发生什么：

```javascript
function sayMessage(message) {
    console.log(message);
}

function sayMessage() {
    console.log("Default message");
}

sayMessage("Hello!"); // outputs "Default message"
```

如果这是另一种语言，则 `sayMessage("Hello！")` 的输出可能是 `Hello！`。 但是，在 JavaScript 中，当您定义多个具有相同名称的函数时，代码中最后出现的函数会获胜。 先前的函数声明被完全删除，最后一个声明将会被使用。 再来一次，使用对象思考这种情况会有所帮助：

```javascript
var sayMessage = new Function("message", "console.log(message);");

sayMessage = new Function("console.log(\"Default message\");");

sayMessage("Hello!"); // outputs "Default message"
```

以这种方式查看代码可以清楚地了解为什么以前的代码不起作用。 函数对象连续两次分配给 `sayMessage`，因此第一个函数对象丢失是有道理的。

函数在 JavaScript 中没有签名这一事实并不意味着您无法模仿函数重载。 您可以使用 `arguments` 对象检索传入的参数数量，并且可以使用该信息来确定要执行的操作。 例如：

```javascript
function sayMessage(message) {
    if (arguments.length === 0) {
        message = "Default message";
    }

    console.log(message);
}

sayMessage("Hello!"); // outputs "Hello!"
```

在此示例中，`sayMessage()` 函数根据传入的参数数量有不同的行为。如果没有传入参数（`arguments.length === 0`），则使用默认消息。 否则，第一个参数用作消息。 这比其他语言中的函数重载更复杂，但最终结果是相同的。 如果您确实要检查不同的数据类型，可以使用 `typeof` 和 `instanceof`。

实际上，检查命名参数是否为 `undefined` 比依赖 `arguments.length` 更常见。

## 5. 对象方法

如第 1 章所述，您可以随时添加和删除对象中的属性。 当属性值实际上是一个函数时，该属性被视为方法。 您可以像添加属性一样向对象添加方法。 例如，在下面的代码中，为 `person` 变量分配了一个具有 `name` 属性和 `sayName` 方法的对象字面量。

```javascript
var person = {
    name: "Nicholas",
    sayName: function() {
        console.log(person.name);
    }
};

person.sayName(); // outputs "Nicholas"
```

请注意，数据属性和方法的语法完全相同 - 标识符后跟冒号和值的。`sayName` 属性的值恰好是一个函数。 然后，您可以直接从对象中调用方法，如 `person.sayName("Nicholas")`。

### 5.1. `this` 对象

您可能已经注意到上一个示例中的一些奇怪内容。 `sayName()` 方法直接引用 `person.name`，这会在方法和对象之间产生紧密的耦合。 由于许多原因，这是有问题的。 首先，如果更改变量名称，还需要记住在方法中更改对该名称的引用。 其次，这种紧密耦合使得难以对不同的对象使用相同的功能。 幸运的是，JavaScript 解决了这个问题。

JavaScript 中的每个作用域都有一个 `this` 对象，它表示函数的调用对象。 在全局作用域中，它表示全局对象（Web 浏览器中的 `window`）。 调用对象的方法时，默认情况下，该值等于该对象。 因此，您可以改为引用 `this`，而不是直接引用方法中的对象。 例如，您可以重写以前的示例中的代码来使用它：

```javascript
var person = {
    name: "Nicholas",
    sayName: function() {
        console.log(this.name);
    }
};

person.sayName();       // outputs "Nicholas"
```

此代码与早期版本的工作方式相同，但这次，`sayName()` 引用 `this` 而不是 `person`。 这意味着您可以轻松更改变量的名称，甚至可以在不同的对象上重用该函数。

```javascript
function sayNameForAll() {
    console.log(this.name);
}

var person1 = {
    name: "Nicholas",
    sayName: sayNameForAll
};

var person2 = {
    name: "Greg",
    sayName: sayNameForAll
};

var name = "Michael";

person1.sayName(); // outputs "Nicholas"
person2.sayName(); // outputs "Greg"
sayNameForAll();   // outputs "Michael"
```

在此示例中，首先定义名为 `sayName` 的函数。 然后，创建两个对象字面量，将 `sayName` 属性值设置为 `sayNameForAll` 函数。 函数只是引用值，因此您可以将它们作为属性值分配给任意数量的对象。 当在 `person1` 上调用 `sayName()` 时，它输出 `Nicholas`; 当在 `person2` 上调用时，它输出 “`Greg`”。 那是因为在调用函数时 `this` 会被设置好了，所以 `this.name` 是准确的。

此示例的最后一部分定义了一个名为 `name` 的全局变量。 当直接调用 `sayNameForAll()` 时，它输出 “`Michael`”，因为全局变量被视为全局对象的属性。

### 5.2. 改变 `this`

使用和操作函数的 `this` 的能力是 JavaScript 中良好的面向对象编程的关键。 函数可以在许多不同的上下文中使用，并且它们需要能够在每种情况下工作。 尽管通常 `this` 会自动分配，但您可以更改其值以实现不同的目标。 有三种函数方法可以让您更改它的值。 （请记住，函数是对象，对象可以有方法，因此函数也可以。）

#### 5.2.1. `call()`

操作它的第一个函数方法是 `call()`，它使用特定的值和特定参数执行函数。  `call()` 的第一个参数是执行函数时 `this` 的值。 所有后续参数都是传递给函数的参数。 例如，假设您更新 `sayNameForAll()` 以获取参数：

```javascript
function sayNameForAll(label) {
    console.log(label + ":" + this.name);
}

var person1 = {
    name: "Nicholas"
};

var person2 = {
    name: "Greg"
};

var name = "Michael";

sayNameForAll.call(this, "global"); // outputs "global:Michael"
sayNameForAll.call(person1, "person1"); // outputs "person1:Nicholas"
sayNameForAll.call(person2, "person2"); // outputs "person2:Greg"
```

在此示例中，`sayNameForAll()` 接受一个用作输出值标签的参数。 然后调用该函数三次。 请注意，函数名后面没有括号，因为它是作为对象而不是作为要执行的代码来访问的。 第一个函数调用使用全局 `this` 并传入参数 `"global"` 来输出 `"global:Michael"`。 相同的函数再被调用两次，对于 `person1` 和 `person2` 分别调用一次。 因为正在使用 `call()` 方法，所以您不需要将函数直接添加到每个对象上 - 您可以显式指定此值，而不是让 JavaScript s引擎自动执行此操作。

#### 5.2.2. `apply()`

您可以用来操作它的第二个函数方法是 `apply()`。 `apply()` 方法与 `call()` 完全相同，只是它只接受两个参数：`this` 的值和一个数组或类数组对象（这意味着你可以使用 `arguments` 作为第二个参数）。 因此，不用像 `call()` 一样挨个传递每个参数，而是可以轻松地将数组传递给 `apply()` 作为第二个参数。 除此之外，`call()` 和 `apply()` 的行为相同。 此示例显示了 `apply()` 方法的操作：

```javascript
function sayNameForAll(label) {
    console.log(label + ":" + this.name);
}

var person1 = {
    name: "Nicholas"
};

var person2 = {
    name: "Greg"
};

var name = "Michael";

sayNameForAll.apply(this, ["global"]); // outputs "global:Michael"
sayNameForAll.apply(person1, ["person1"]); // outputs "person1:Nicholas"
sayNameForAll.apply(person2, ["person2"]); // outputs "person2:Greg"
```

此代码采用前面的示例，并使用 `apply()` 替换 `call()`，结果完全一样。 您使用的方法通常取决于数据的类型。 如果您已有数据数组，请使用 `apply()`; 如果你只有个别变量，请使用 `call()`。

#### 5.2.3. `bind()`

更改它的第三个函数方法是 `bind()`。 ECMAScript 5 中添加了此方法，其行为与其他两种方法完全不同。 `bind()` 的第一个参数是新函数的 this 值。 所有其他参数表示应在新函数中永久设置的命名参数。 您仍然可以传入以后未永久设置的任何参数。

```javascript
function sayNameForAll(label) {
    console.log(label + ":" + this.name);
}

var person1 = {
    name: "Nicholas"
};

var person2 = {
    name: "Greg"
};

// ① create a function just for person1
var sayNameForPerson1 = sayNameForAll.bind(person1);
sayNameForPerson1("person1"); // outputs "person1:Nicholas"

// ② create a function just for person2
var sayNameForPerson2 = sayNameForAll.bind(person2, "person2");
sayNameForPerson2(); // outputs "person2:Greg"

// ③ attaching a method to an object doesn't change 'this'
person2.sayName = sayNameForPerson1;
person2.sayName("person2"); // outputs "person2:Nicholas"
```

① 中没有为 `sayNameForPerson1()` 绑定任何参数，因此您仍需要传入输出的标签。② 中， 函数 `sayNameForPerson2()` 不仅将 `person2` 绑定到 `this`，还将第一个参数绑定为 `"person2"`。 这意味着您可以调用 `sayNameForPerson2()` 而不传入任何其他参数。 ③ 本示例的最后一部分将 `sayNameForPerson1()` 添加到 `person2` 上，属性名为 `sayName`。 该函数是绑定的，因此即使 `sayNameForPerson1` 现在是 `person2` 上的函数，它的值也不会改变。 该方法仍然输出 `person1.name` 的值。

## 6. 总结

JavaScript 函数的独特之处在于它们也是对象，这意味着它们可以像任何其他对象值一样被访问、复制、覆盖、操作。 JavaScript 函数和其他对象之间的最大区别是一个特殊的内部属性 `[[Call]]`，它包含函数的执行指令。 `typeof` 运算符在对象上查找此内部属性，如果找到它，则返回 `"function"`。

有两种函数字面量形式：声明和表达。 函数声明包含函数关键字右侧的函数名称，并被提升到定义它们的上下文的顶部。 函数表达式可用于变量可使用的任何地方，例如赋值表达式，函数参数或另一个函数的返回值。

因为函数是对象，所以有一个 `Function` 构造函数。 您可以使用 `Function` 构造函数创建新函数，但这通常不建议使用，因为它会使您的代码更难理解和调试更加困难。 也就是说，在运行之前不知道函数的真实形式的情况下，您可能会不时地使用它。

您需要很好地掌握函数，以了解面向对象编程在 JavaScript 中的工作原理。 因为 JavaScript 没有类的概念，所以您必须使用函数和其他对象来实现聚合和继承。