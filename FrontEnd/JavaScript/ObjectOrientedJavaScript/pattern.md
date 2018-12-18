# 对象模式

JavaScript 有许多用于创建对象的模式，通常有多种方法可以完成同样的事情。 您可以随时定义自己的自定义类型或自己的通用对象。 您可以使用继承来共享对象之间的行为，也可以使用其他技术，例如 mixins。 您还可以利用高级 JavaScript 功能来防止修改对象的结构。 本章中讨论的模式为您提供了管理和创建对象的强大方法，所有这些都基于您的用例。

## 1. 私有属性和特权方法

JavaScript 中的所有对象属性都是公共的，并且没有明确的方法来指示不应从特定对象外部访问属性。 但是，在某些时候，您可能不希望数据公开。 例如，当一个对象使用一个值来确定某种状态时，在没有该对象允许的情况下修改该数据会使状态管理进程陷入混乱。 避免这种情况的一种方法是使用命名约定。 例如，如果属性不是公开的，则使用下划线（例如 `this._name`）为属性添加前缀是很常见的。 但是，有一些方法可以隐藏不依赖于约定的数据，因此在防止修改私人信息方面更具“防弹性”。

### 1.1. 模块模式

模块模式是一种对象创建模式，旨在创建具有私有数据的单例对象。 基本方法是使用返回对象的立即调用的函数表达式（IIFE）。 IIFE 是一个定义的函数表达式，然后立即调用以生成结果。 该函数表达式可以包含任何无法从该函数外部访问的局部变量。 因为返回的对象是在该函数中定义的，所以对象的方法可以访问数据。 （IIFE 中定义的所有对象都可以访问相同的局部变量。）以这种方式访问私有数据的方法称为特权方法。 这是模块模式的基本格式：

```javascript
var yourObject = (function() {

    // private data variables

    return {
        // public methods and properties
    };

}());
```

在此模式中，将立即创建并执行匿名函数。 （注意函数末尾的额外括号。您可以使用此语法立即执行匿名函数。）这意味着函数只存在片刻，执行，然后被销毁。 IIFE 是 JavaScript 中非常流行的模式，部分用于模块模式。

模块模式允许您将常规变量当做私有属性来使用。 您可以通过创建闭包函数作为对象方法来实现此目。闭包只是访问自己作用域之外的数据的函数。 例如，每当您访问函数中的全局对象（例如 Web 浏览器中的 `window`）时，该函数都会访问其自身范围之外的变量。 与模块函数的不同之处在于变量在 IIFE 中声明，并且在 IIFE 内声明的函数中访问。 例如：

```javascript
var person = (function() {
  
    var age = 25;

    return {
        name: "Nicholas",

        getAge: function() {
            return age;
        },

        growOlder: function() {
            age++;
        }
    };

}());

console.log(person.name); // "Nicholas"
console.log(person.getAge()); // 25

person.age = 100;
console.log(person.getAge()); // 25

person.growOlder();
console.log(person.getAge()); // 26
```

此代码使用模块模式创建 `person` 对象。 `age` 变量的作用类似于对象的私有属性。 它不能直接从对象外部访问，但可以由对象方法使用。 对象有两个特权方法：`getAge()` ，它读取 `age` 变量的值，`growOlder()` ，它增加 `age`。 这两种方法都可以直接访问变量 `age`，因为它是在定义它们的外部函数中定义的。

模块模式有一种变体，称为显示模块模式，它将所有变量和方法排列在 IIFE 的顶部，并简单地将它们分配给返回的对象。 您可以使用显示模块模式编写上一个示例，如下所示：

```javascript
var person = (function() {
    var age = 25;

    function getAge() {
        return age;
    }

    function growOlder() {
        age++;
    }

    return {
        name: "Nicholas",
        getAge: getAge,
        growOlder: growOlder
    };

}());
```

在显示模块模式中，`age`、`getAge()` 和 `growOlder()` 都在 IIFE 内定义。 然后将 `getAge()` 和 `growOlder()` 函数分配给返回的对象，在 IIFE 之外有效地“揭示”它们。 此代码与使用传统模块模式的早期示例基本相同; 但是，有些人更喜欢这种模式，因为它将所有变量和函数声明保持在一起。

### 1.2. 构造函数的私有成员

模块模式非常适合定义具有私有属性的单个对象，但是对于需要自己的私有属性的自定义类型呢？ 您可以在构造函数内部使用与模块模式类似的模式来创建特定于实例的私有数据。 例如：

```javascript
function Person(name) {

    // define a variable only accessible inside of the Person constructor
    var age = 25;

    this.name = name;

    this.getAge = function() {
        return age;
    };

    this.growOlder = function() {
        age++;
    };

}

var person = new Person("Nicholas");

console.log(person.name); // "Nicholas"
console.log(person.getAge()); // 25

person.age = 100;
console.log(person.getAge()); // 25

person.growOlder();
console.log(person.getAge()); // 26
```

在此代码中，`Person` 构造函数具有局部变量 `age`。 该变量用作 `getAge()` 和 `growOlder()` 方法的一部分。 当您创建 `Person` 的实例时，该实例将获取其自己的 `age` 变量、`getAge()` 方法、`growOlder()` 方法。 在许多方面，这类似于模块模式，其中构造函数创建局部范围并返回此对象。 正如第 4 章所讨论的那样，在对象实例上放置方法的效率低于在原型上放置方法的效率，但是当您需要私有的特定于实例的数据时，这是唯一可行的方法。

如果您希望在所有实例之间共享私有数据（就像它在原型上一样），您可以使用看起来像模块模式但使用构造函数的混合方法：

```javascript
var Person = (function() {

    // everyone shares the same age
    var age = 25;

    function InnerPerson(name) {
        this.name = name;
    }

    InnerPerson.prototype.getAge = function() {
        return age;
    };

    InnerPerson.prototype.growOlder = function() {
        age++;
    };

    return InnerPerson;
}());

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

console.log(person1.name);      // "Nicholas"
console.log(person1.getAge());  // 25

console.log(person2.name);      // "Greg"
console.log(person2.getAge());  // 25

person1.growOlder();
console.log(person1.getAge());   // 26
console.log(person2.getAge());   // 26
```

在此代码中，`InnerPerson` 构造函数在 IIFE 中定义。 变量 `age` 在构造函数外部定义，但用于两个原型方法。 然后返回 `InnerPerson` 构造函数，并成为全局范围中的 `Person` 构造函数。 `Person` 的所有实例最终都会共享 `age` 变量，因此使用一个实例更改值会自动影响另一个实例。