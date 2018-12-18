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

## 2. 混入（mixins）

尽管在 JavaScript 中经常使用伪传统继承和原型继承，但还有一种通过 mixins 实现的伪继承。 当一个对象获取另一个对象的属性而不修改原型链时，就会发生混合。 第一个对象（接收者）实际上通过直接复制这些属性来接收第二个对象（供应商）的属性。 传统上，您使用如下函数创建 mixins：

```javascript
function mixin(receiver, supplier) {
    for (var property in supplier) {
        if (supplier.hasOwnProperty(property)) {
            receiver[property] = supplier[property]
        }
    }

    return receiver;
}
```

`mixin()` 函数接受两个参数：接收者和供应者。 该功能的目标是将供应者的所有可枚举属性复制到接收者上。 您可以使用 for-in 循环来完成此操作，该循环遍历供应者中的属性，然后将该属性的值分配给接收者上的同名属性。 请记住，这是一个浅拷贝（shallow copy），因此如果属性包含一个对象，则供应者和接收者都将指向同一个对象。 此模式经常用于向已存在于其他对象上的 JavaScript 对象添加新行为。

例如，您可以通过 mixins 而不是继承向对象添加事件支持。 首先，假设您已经定义了使用事件的自定义类型：

```javascript
function EventTarget(){
}

EventTarget.prototype = {

    constructor: EventTarget,

    addListener: function(type, listener){

        // create an array if it doesn't exist
        if (!this.hasOwnProperty("_listeners")) {
            this._listeners = [];
        }

        if (typeof this._listeners[type] == "undefined"){
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);
    },

    fire: function(event){

        if (!event.target){
            event.target = this;
        }

        if (!event.type){  // falsy
            throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners && this._listeners[event.type] instanceof Array){
            var listeners = this._listeners[event.type];
            for (var i=0, len=listeners.length; i < len; i++){
                listeners[i].call(this, event);
            }
        }
    },

    removeListener: function(type, listener){
        if (this._listeners && this._listeners[type] instanceof Array){
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }
}
```

`EventTarget` 类型为任何对象提供基本事件处理。 您可以直接在对象上添加和删除侦听器以及触发事件。 事件侦听器存储在 `_listeners` 属性上，该属性仅在首次调用 `addListener()` 时创建（这使得混合更容易）。 你可以像这样使用 `EventTarget` 的实例：

```javascript
var target = new EventTarget();

target.addListener("message", function(event) {
    console.log("Message is " + event.data);
});

target.fire({
    type: "message",
    data: "Hello world!"
});
```

支持事件对 JavaScript 中的对象很有用。 如果您想拥有一个也支持事件的不同类型的对象，您可以选择几个选项。 首先，您可以创建 `EventTarget` 的新实例，然后添加所需的属性：

```javascript
var person = new EventTarget();

person.name = "Nicholas";

person.sayName = function() {
    console.log(this.name);
    this.fire({ type: "namesaid", name: name });
};
```

在此代码中，将创建一个名为 `person` 的新变量作为 `EventTarget` 的实例，然后添加与人员相关的属性。 不幸的是，这意味着 `person` 实际上是 `EventTarget` 的一个实例，而不是 `Object` 或自定义类型。 您还需要手动添加一堆新属性。 最好采用更有条理的方式来做到这一点。

解决此问题的第二种方法是使用伪传统继承：

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype = Object.create(EventTarget.prototype);
Person.prototype.constructor = Person;

Person.prototype.sayName = function() {
    console.log(this.name);
    this.fire({ type: "namesaid", name: name });
};

var person = new Person("Nicholas");
console.log(person instanceof Person);      // true
console.log(person instanceof EventTarget); // true
```

在这种情况下，有一个继承自 `EventTarget` 的新 `Person` 类型。 您可以向 `Person` 的原型添加您需要的任何其他方法。 然而，这并不像它可能那样简洁，你可以说这种关系没有意义：一个人是一种事件目标？ 通过使用 mixins，您可以减少将这些新属性分配给原型所需的代码量：

```javascript
function Person(name) {
    this.name = name;
}

mixin(Person.prototype, new EventTarget());

mixin(Person.prototype, {
    constructor: Person,

    sayName: function() {
        console.log(this.name);
        this.fire({ type: "namesaid", name: name });
    }
});

var person = new Person("Nicholas");

console.log(person instanceof Person);      // true
console.log(person instanceof EventTarget); // false
```

这里，`Person.prototype` 与 `EventTarget` 的新实例混合在一起以获取事件行为。 然后，将 `Person.prototype` 与 `constructor` 、`sayName()` 混合以完成原型的组合。 在此示例中，`Person` 的实例不是 `EventTarget` 的实例，因为没有继承。

当然，您可能会决定在想要使用对象的属性时，根本不需要伪传统继承的构造函数。 在这种情况下，您可以在创建新对象时直接使用 mixins：

```javascript
var person = mixin(new EventTarget(), {

    name: "Nicholas",

    sayName: function() {
        console.log(this.name);
        this.fire({ type: "namesaid", name: name });
    }
});
```

在此示例中，`EventTarget` 的新实例与一些新属性混合在一起，以创建 `person` 对象，而不会影响 `person` 的原型链。

关于以这种方式使用 mixins 要记住的一件事是提供者的访问器属性会成为接收者的数据属性，这意味着你一不小心就会覆盖它们。 这是因为接收器的属性是通过赋值而不是 `Object.defineProperty()` 创建的。 例如：

```javascript
var person = mixin(new EventTarget(), {

    get name() {
        return "Nicholas"
    },

    sayName: function() {
        console.log(this.name);
        this.fire({ type: "namesaid", name: name });
    }

});

console.log(person.name); // "Nicholas"

person.name = "Greg";
console.log(person.name); // "Greg"
```

在此代码中，`name` 被定义为仅具有 `getter` 的访问器属性。 这意味着为 `name` 属性赋值应该没有效果。 但是，因为访问器属性成为 `person` 对象上的数据属性，所以可以使用新值覆盖 `name`。 在调用 `mixin()` 期间，`name` 的值从提供者处读取并分配给接收者上名为 `name` 的属性。 在此过程中，任何时候都没有定义新的访问器，使接收者上的 `name` 属性成为数据属性。

如果您希望将访问器属性作为访问器属性进行复制，则需要使用不同的 `mixin()` 函数，例如：

```javascript
function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function(property) {
        var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
        Object.defineProperty(receiver, property, descriptor);
    return receiver;
}

var person = mixin(new EventTarget(), {

    get name() {
        return "Nicholas"
    },

    sayName: function() {
        console.log(this.name);
        this.fire({ type: "namesaid", name: name });
    }
});

console.log(person.name);       // "Nicholas"

person.name = "Greg";
console.log(person.name);       // "Nicholas"
```

这个版本的 `mixin()` 使用 `Object.keys()` 来获取提供者上所有可枚举的自有属性的数组。 `forEach()` 方法用于迭代这些属性。 检索提供者上每个属性的属性描述符，然后通过 `Object.defineProperty()` 将其添加到接收者。 这可确保将所有相关属性信息传输到接收者，而不仅仅是值。 这意味着 `person` 对象具有名为 `name` 的访问器属性，因此不能覆盖它。

当然，这个版本的 `mixin()` 仅适用于 ECMAScript 5 JavaScript 引擎。 如果您的代码需要适用于较旧的引擎，则应将两个 `mixin()` 方法合并为一个函数：

```javascript
function mixin(receiver, supplier) {

    if (Object.getOwnPropertyDescriptor) {

        Object.keys(supplier).forEach(function(property) {
            var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
            Object.defineProperty(receiver, property, descriptor);
        });

    } else {

        for (var property in supplier) {
            if (supplier.hasOwnProperty(property)) {
                receiver[property] = supplier[property]
            }
        }
    }

    return receiver;
}
```

这里，`mixin()` 检查 `Object.getOwnPropertyDescriptor()` 是否存在以确定 JavaScript 引擎是否支持 ECMAScript 5。如果支持，它继续使用 ECMAScript 5 版本。 否则，使用 ECMAScript 3 版本。 此功能在现代和旧版 JavaScript 引擎中都可以安全使用，因为它们将应用最合适的 mixin 策略。

请记住，`Object.keys()` 仅返回可枚举的属性。 如果您还想复制包括不可枚举的属性在内的自有属性，请改用 `Object.getOwnPropertyNames()` 。

## 3. 作用域安全的构造函数

因为所有构造函数都只是函数，所以可以在不使用 `new` 运算符的情况下调用它们，从而影响它的值。 这样做会产生意外的结果，因为 `this` 最终会在非严格模式下强制转换为全局对象，或者构造函数在严格模式下抛出错误。 在第 4 章中，您遇到了以下示例：

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.sayName = function() {
    console.log(this.name);
};

var person1 = Person("Nicholas"); // note: missing "new"

console.log(person1 instanceof Person); // false
console.log(typeof person1); // "undefined"
console.log(name); // "Nicholas"
```

在这种情况下，`name` 被创建为全局变量，因为 `Person` 构造函数在没有 `new` 的情况下被调用。 请记住，此代码在非严格模式下运行，因为省略 `new` 会在严格模式下抛出错误。 构造函数以大写字母开头的事实通常表明它应该以 `new` 开头，但是如果你想允许这个用例并让函数在没有 `new` 的情况下工作呢？ 许多内置构造函数（例如 `Array` 和 `RegExp`）也可以在没有 `new` 的情况下工作，因为它们被编写为作用域安全的构造函数。 可以使用或不使用 `new` 调用作用域安全的构造函数，并在任一情况下返回相同类型的对象。

当使用函数调用 `new` 时，由 `this` 表示的新创建的对象已经是构造函数表示的自定义类型的实例。 因此，您可以使用 `instanceof` 来确定函数调用中是否使用了 `new`：

```javascript
function Person(name) {
    if (this instanceof Person) {
        // called with "new"
    } else {
        // called without "new"
    }
}
```

使用这样的模式，您可以根据是否使用 `new` 调用函数来控制函数的功能。 您可能希望以不同的方式处理每种情况，但您通常希望该功能以相同的方式运行（通常，以防止意外遗漏 `new` ）。 `Person` 的作用域安全版本如下所示：

```javascript
function Person(name) {
    if (this instanceof Person) {
        this.name = name;
    } else {
        return new Person(name);
    }
}
```

对于此构造函数，在使用 `new` 时将始终指定 `name` 属性。 如果未使用 `new`，则通过 `new` 递归调用构造函数以创建对象的正确实例。 这样，以下内容是等效的：

```javascript
var person1 = new Person("Nicholas");
var person2 = Person("Nicholas");

console.log(person1 instanceof Person);     // true
console.log(person2 instanceof Person);     // true
```

在不使用 `new` 运算符的情况下创建新对象正变得越来越普遍，以此来遏制因省略 `new` 而导致的错误。 JavaScript 本身有几种具有作用域安全构造函数的引用类型，例如 `Object`、`Array`、`RegExp`、`Error`。