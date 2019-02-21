/*
 * 函数类型
 *
 *    接口能够描述JavaScript中对象拥有的各种各样的外形。
 *    除了描述带有属性的普通对象外，接口也可以描述函数类型。
 */

// type Iprofile = (name: string, age: number) => string;
interface Iprofile {
  (name: string, age: number): string;
}


let say: Iprofile;

say = (name, age) => {
  return `I am ${name}, ${age} years old.`;
};

console.log(say("张三", 18));

/*
 * 类类型
 *
 *    与 C# 或 Java 里接口的基本作用一样，
 *    TypeScript 也能够用它来明确的强制一个类去符合某种契约。
 */

interface Iperson {
  name: string;
  age: number;
  setInfo(name: string, age: number): void;
  say(): string;
}

class Teacher implements Iperson {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public setInfo(name: string, age: number): void {
    this.name = name;
    this.age = age;
  }

  public say(): string {
    return `${this.name}, ${this.age}`;
  }
}

let teacher: Teacher = new Teacher("wahh", 22);
console.log(teacher.say()); // wahh, 22
teacher.setInfo("heihei", 99);
console.log(teacher.say()); // heihei, 99
