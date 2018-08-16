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

const source = Rx.Observable.interval(1000).take(3);
const source2 = Rx.Observable.of(3);
const source3 = Rx.Observable.of(4, 5, 6);
const example = source.concat(source2, source3);

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
// complete
