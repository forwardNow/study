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