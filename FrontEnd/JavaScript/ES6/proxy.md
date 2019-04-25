# Proxy

## 1. 概述

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

```javascript
// new Proxy() 表示生成一个 Proxy 实例，
// target 参数表示所要拦截的目标对象，
// handler 参数也是一个对象，用来定制拦截行为。
var proxy = new Proxy(target, handler);
```

下面是一个拦截读取属性行为的例子。

```javascript
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
```

注意，要使得 `Proxy` 起作用，必须针对 `Proxy` 实例（上例是 `proxy` 对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。

一个技巧是将 Proxy 对象，设置到 `object.proxy` 属性，从而可以在 `object` 对象上调用。

```javascript
var object = { proxy: new Proxy(target, handler) };
```

Proxy 实例也可以作为其他对象的原型对象。

```javascript
var proxy = new Proxy({}, {
  get: function(target, property) {
    return '该对象上无此属性';
  }
});

let obj = Object.create(proxy);
obj.time // "该对象上无此属性"
```

上面代码中，`proxy` 对象是 `obj` 对象的原型，`obj` 对象本身并没有 `time` 属性，所以根据原型链，会在 `proxy` 对象上读取该属性，导致被拦截。

同一个拦截器函数，可以设置拦截多个操作。

```javascript
var handler = {
  get: function(target, property) {
    if (property === 'prototype') {
      return Object.prototype;
    }
    return '你在访问属性：' + property;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "你在访问属性：foo" // true
```

对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。

## 2. Proxy 实例的方法

Proxy 支持的拦截操作，一共 13 种。

* `get(target, propKey, receiver)`：拦截对象属性的读取，比如 `proxy.foo` 和 `proxy['foo']`。
* `set(target, propKey, value, receiver)`：拦截对象属性的设置，比如 `proxy.foo = v` 或 `proxy['foo'] = v`，返回一个布尔值。
* `has(target, propKey)`：拦截 `propKey in proxy` 的操作，返回一个布尔值。
* `deleteProperty(target, propKey)`：拦截 `delete proxy[propKey]` 的操作，返回一个布尔值。
* `ownKeys(target)`：拦截 `Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in` 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 `Object.keys()` 的返回结果仅包括目标对象自身的可遍历属性
* `getOwnPropertyDescriptor(target, propKey)`：拦截 `Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
* `defineProperty(target, propKey, propDesc)`：拦截 `Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
* `preventExtensions(target)`：拦截 `Object.preventExtensions(proxy)`，返回一个布尔值。
* `getPrototypeOf(target)`：拦截 `Object.getPrototypeOf(proxy)`，返回一个对象。
* `isExtensible(target)`：拦截 `Object.isExtensible(proxy)`，返回一个布尔值。
* `setPrototypeOf(target, proto)`：拦截 `Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
* `apply(target, object, args)`：拦截 Proxy 实例作为函数调用的操作，比如 `proxy(...args)`、 `proxy.call(object, ...args)`、`proxy.apply(...)`。
* `construct(target, args)`：拦截 Proxy 实例作为构造函数调用的操作，比如 `new proxy(...args)`。

### 2.1. get()

`get` 方法用于拦截某个属性的读取操作，可以接受三个参数：

```javascript
/**
 * @param target {object} 目标对象
 * @param propKey {string} 属性名
 * @param receiver {object?} proxy 实例本身（严格地说，是操作行为所针对的对象）
 */
get(target, propKey, receiver)
```

下面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回 `undefined`。

```javascript
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError("Property \"" + property + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // Property "age" does not exist.
```

`get` 方法拦截继承属性。

```javascript
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
obj.foo // "GET foo"
```

上面代码中，拦截操作定义在 `Prototype` 对象上面，所以如果读取 `obj` 对象继承的属性时，拦截会生效。

```javascript
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c
```

上面代码中，数组的位置参数是 `-1`，就会输出数组的倒数第一个成员。

利用 Proxy，可以将读取属性的操作（`get`），转变为执行某个函数，从而实现属性的链式操作。

```javascript
var pipe = (function () {
  return function (value) {
    var funcStack = [];
    var oproxy = new Proxy({} , {
      get : function (pipeObject, fnName) {
        if (fnName === 'get') {
          return funcStack.reduce(function (val, fn) {
            return fn(val);
          },value);
        }
        funcStack.push(window[fnName]);
        return oproxy;
      }
    });

    return oproxy;
  }
}());

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63
```

上面代码设置 Proxy 以后，达到了将函数名链式使用的效果。

下面的例子则是利用 `get` 拦截，实现一个生成各种 DOM 节点的通用函数 `dom`。

```javascript
const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

document.body.appendChild(el);
```

如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。

```javascript
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});

const handler = {
  get(target, propKey) {
    return 'abc';
  }
};

const proxy = new Proxy(target, handler);

proxy.foo
// TypeError: Invariant check failed
```