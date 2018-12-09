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

但是，有时使用参数实际上比命名参数更有效。 例如，假设您要创建一个接受任意数量参数并返回其总和的函数。 您不能使用命名参数，因为您不知道需要多少参数，因此在这种情况下，使用参数是最佳选择。

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