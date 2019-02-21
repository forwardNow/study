//#region 基本类型

// 布尔值
let isDone: boolean = false;

// 数字
let decLiteral: number = 6;

// 字符串
let username: string = "jack";

// null 和 undefined：任何类型的变量，起值都可以为这两个值
// let u: undefined = undefined;
// let n: null = null;

//#endregion

//#region 特殊类型

// any 类型：类似于 var，变量可接受任意类型，可调用任意的方法
let notSure: any = 4;
notSure = "whh";
notSure.sayHello(); // 即使未定义，也可以调用

// void：没有任何类型
function warnUser(): void {
  console.log("该函数没有返回值");
}

// object：引用类型，除number、string、boolean、symbol、null、undefined之外的类型
function create(o: object | null): void {
  console.log(o);
}
create({});
// create(false); // Error
//#endregion

//#region 类型断言（类比强转）
let someValue: any = "wahh";

let strLen: number = (someValue as string).length;
//#endregion
