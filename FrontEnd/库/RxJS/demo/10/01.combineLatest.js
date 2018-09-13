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
require('rxjs/add/operator/last');
require('rxjs/add/operator/concat');
require('rxjs/add/operator/startWith');
require('rxjs/add/operator/merge');
require('rxjs/add/operator/combineLatest');

const source = Rx.Observable.interval(500).take(3);
const newest = Rx.Observable.interval(300).take(6);

const example = source.combineLatest(newest, (x, y) => x + y);

example.subscribe({
  next: (value) => { console.log(value); },
  error: (err) => { console.log(`Error: ${err}`); },
  complete: () => { console.log('complete'); },
});
// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// complete
