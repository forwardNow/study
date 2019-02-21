/*
 * 泛型
 *
 *    软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。
 *    组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，
 *    这在创建大型系统时为你提供了十分灵活的功能。
 *
 *    我们需要一种方法使返回值的类型与传入参数的类型是相同的。
 */
function identity<T>(arg: T): T {
  return arg;
}

// 使用
let output = identity("myString");
output = identity<string>("myString");


/*
 * 泛型类型
 *
 *    泛型函数的类型与非泛型函数的类型没什么不同，
 *    只是有一个类型参数在最前面，像函数声明一样
 */
function identity2<T>(arg: T): T {
  return arg;
}

let myIdentity2: <T>(arg: T) => T;
myIdentity2 = identity2;

/*
 * 泛型类
 *
 *    泛型类看上去与泛型接口差不多。
 *    泛型类使用（ <>）括起泛型类型，跟在类名后面。
 */
class GenericNumber<T> {
  public zeroValue: T;
  public add: (x: T, y: T) => T;
}
