# Class 的继承

## 1. 简介

Class 可以通过 `extends` 关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

```javascript
class Point {
}

class ColorPoint extends Point {
}
```

上面代码定义了一个 `ColorPoint` 类，该类通过 `extends` 关键字，继承了 `Point` 类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个 `Point` 类。下面，我们在 `ColorPoint` 内部加上代码。

```javascript
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

上面代码中，`constructor` 方法和 `toString` 方法之中，都出现了 `super` 关键字，它在这里表示父类的构造函数，用来新建父类的 `this` 对象。

子类必须在 `constructor` 方法中调用 `super` 方法，否则新建实例时会报错。这是因为子类自己的 `this` 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用 `super` 方法，子类就得不到 `this` 对象。

```javascript
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError
```

上面代码中，`ColorPoint` 继承了父类 `Point`，但是它的构造函数没有调用 `super` 方法，导致新建实例时报错。

ES5 的继承，实质是先创造子类的实例对象 `this`，然后再将父类的方法添加到 `this` 上面（`Parent.apply(this)`）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 `this` 上面（所以必须先调用 `super` 方法），然后再用子类的构造函数修改 `this`。

如果子类没有定义 `constructor` 方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有 `constructor` 方法。

```javascript
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

另一个需要注意的地方是，在子类的构造函数中，只有调用 `super` 之后，才可以使用 `this` 关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有 `super` 方法才能调用父类实例。

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```

上面代码中，子类的 `constructor` 方法没有调用 `super` 之前，就使用 `this` 关键字，结果报错，而放在 `super` 方法之后就是正确的。

下面是生成子类实例的代码

```javascript
let cp = new ColorPoint(25, 8, 'green');

cp instanceof ColorPoint // true
cp instanceof Point // true
```

上面代码中，实例对象 `cp` 同时是 `ColorPoint` 和 `Point` 两个类的实例，这与 ES5 的行为完全一致。

最后，父类的静态方法，也会被子类继承。

```javascript
class A {
  static hello() {
    console.log('hello world');
  }
}

class B extends A {
}

B.hello()  // hello world
```

上面代码中，`hello()` 是 `A` 类的静态方法，`B` 继承 `A`，也继承了 `A` 的静态方法。

## 2. Object.getPrototypeOf()

`Object.getPrototypeOf` 方法可以用来从子类上获取父类。

```javascript
Object.getPrototypeOf(ColorPoint) === Point
// true
```

因此，可以使用这个方法判断，一个类是否继承了另一个类。
