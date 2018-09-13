 # Observable Operator - combineLatest, withLatestFrom, zip

>非同步最难的地方在于，当有多个非同步行为同时触发且相互依赖，这时候我们要处理的逻辑跟状态就会变得极其复杂，甚至程式码很可能会在完成的一两天后就成了 Legacy Code。

昨天我们最后讲到了 `merge` 的用法，它的逻辑就像是 OR(||)一样，可以把多个 observable 合并且同时处理，当其中任合一个 observable 送出元素时，我们都做相同的处理。

今天我们要讲的三个 operators 则像是 AND(&&) 逻辑，它们都是在多个元素送进来时，只输出一个新元素，但各自的行为上仍有差异，需要读者花点时间思考，建议在头脑清醒时阅读本篇文章。

## 1. Operators

### 1.1. combineLatest

首先我们要介绍的是 combineLatest，它会取得各个 observable 最后送出的值，再输出成一个值，我们直接看范例会比较好解释。

