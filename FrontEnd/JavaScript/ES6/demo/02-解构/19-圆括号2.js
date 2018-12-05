let num;
[(num)] = [1];

console.log(num); // 1


let x;
({ num: (x) } = { num: 2 });

console.log(x); // 2


let person = {};
[(person.name)] = ['张三'];

console.log(person); // { name: '张三' }