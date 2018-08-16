const Rx = require('rxjs/Observable');

// 在 Observable 类上打补丁
require('rxjs/add/observable/of');
require('rxjs/add/observable/interval');

// 在 Observable 实例上打补丁
require('rxjs/add/operator/map');
require('rxjs/add/operator/take');
require('rxjs/add/operator/first');
require('rxjs/add/operator/skip');
require('rxjs/add/operator/takeLast');

const source = Rx.Observable.interval(1000).take(6);
const example = source.takeLast(2);

example.subscribe({
  next: (value) => { console.log(value); },
  error: (err) => { console.log(`Error: ${err}`); },
  complete: () => { console.log('complete'); },
});
// 4
// 5
// complete
