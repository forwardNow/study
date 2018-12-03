const person = {};

person.name = '张三';
console.log(person.name); // 张三

person = {}; // TypeError: Assignment to constant variable.
