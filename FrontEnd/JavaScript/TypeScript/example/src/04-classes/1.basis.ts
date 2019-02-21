class Animal {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m.`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  public bark() {
    console.log("Woof! Woof!");
  }
}

let dog: Dog = new Dog("dog");
dog.move(10);

/*
 * 修饰符
 *
 *    限制程序对成员的访问
 *
 *    public：默认，在类之外也可以访问该成员
 *    private：在类之外也不可以访问该成员
 *    protected：在类之外也不可以访问该成员，但在子类中可访问
 *    readonly：只读，只能在声明时或构造函数里被初始化
 */
class Person {
  public name: string;
  private id: string;

  protected constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

class Jack extends Person {
  constructor(id: string, name: string) {
    // protected 的构造函数，可以在子类中访问
    super(id, name);

    // private 的成员，只能在定义它的类中访问
    // this.id;
  }
}

// new Person("123", "zhangsan"); // error

/*
 * 访问器属性
 *
 *    TypeScript 支持通过 getters/setters 来截取对对象成员的访问。
 *    它能帮助你有效的控制对对象成员的访问。
 */
class Employee {
  private n: string;

  constructor(name: string) {
    this.n = name;
  }

  get name(): string {
    return this.n;
  }

  set name(name: string) {
    this.n = name;
  }
}


/*
 * 静态属性
 *
 *    创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。
 */
class Grid {
  public static origin = {x: 0, y: 0};
}
