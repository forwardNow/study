/*
 * TypeScript 的核心原则之一是对值所具有的结构进行类型检查。
 * 它有时被称做“鸭式辨型法”或“结构性子类型化”。
 * 在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
 */

interface IPerson {
  name: string;
  age: number;

  // 可选属性
  birthday?: Date;

  // 只读属性
  readonly id: string;
}

function sayProfile(person: IPerson) {
  const {name, age} = person;

  // person.id = "2"; // error
  console.log(`I'm ${name}, ${age} years old.`);
}

sayProfile({name: "张三", age: 18, id: ""});
