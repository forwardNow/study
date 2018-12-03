const person = {
  name: '哇哈哈',
};

Object.freeze(person);
console.log(Object.isFrozen(person)); // true

/* 在严格模式下，会报如下错误；在非严格模式下，会忽略下行代码
 * TypeError: Cannot assign to read only property 'name' of object '#<Object>'
 */
person.name = '张三';
console.log(person.name); // 哇哈哈