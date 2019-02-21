/*
 * 函数类型
 *
 *    函数类型包含两部分：参数类型和返回值类型。
 *    只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。
 */
let myAdd: (x: number, y: number) => number;

function add(x: number, y: number): number {
  return x + y;
}

myAdd = add;


/*
 * 可选参数
 *
 *    TypeScript 里的每个函数参数都是必须的。
 *    在TypeScript 里我们可以在参数名旁使用 ? 实现可选参数的功能。
 *    可选参数必须跟在必须参数后面。
 *
 * 默认参数
 *
 *    当用户没有传递这个参数或传递的值是 undefined 时，。
 *    我们也可以为参数提供一个默认值
 */
function buildName(firstName: string = "zhang", lastName?: string): string {
  return firstName + " " + lastName;
}

/*
 * 剩余参数
 *
 *    在JavaScript里，你可以使用 arguments来访问所有传入的参数。
 *    在TypeScript里，你可以把所有参数收集到一个变量里
 */
function buildName2(firstName: string, ...rest: string[]): string {
  return firstName + " " + rest.join(" ");
}
