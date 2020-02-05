# python3 教程

## 1. 安装

* 方法一：在[官网](https://www.python.org/downloads/)下载安装
* 方法二：通过 homebrew 安装，`brew install python3`
  * [brew更换国内镜像源](https://blog.csdn.net/tzjvon/article/details/79648825)

验证是否安装成功：

```shell
$ python3 --version
Python 3.7.2
```

## 2. 交互式命令行

进入：

```shell
$ python3
>>> 2**10
1024
```

退出：

```shell
>>> exit()
```

## 3. 基础

### 3.1. print() 和 input()

```python
name = input("what's your name? ")
print("hello", name)
```

`input()` 函数获取的都是字符串，可使用 `int()` 函数将数值字符串转为数值。

### 3.2. 注释、代码块

```python
# “#” 打头的都为注释
num = 1

# “:” 后面缩进的一部分是代码块
if num == 1:
  print(num)
```

### 3.3. 数据类型

整数：

* 十进制： 1 、100、-123、0 等
* 十六进制： 以 `0x` 打头，如 `0xff00`

浮点数：

* 数学写法：1.23、-1.234 等
* 科学计数法：如 `1.23e9`
* 超出范围的值用 `inf` 表示

字符串：

* 通过单引号（`'`）或双引号（`"`）界定单行内容
* 通过三引号（`'''`）界定多行内容
* `\`开头的表示转义字符，如 `"\n"`

布尔值：

* 值：`True` 、`False`
* 逻辑运算符：`and` 、`or`、`not`

空值：

* 值：`None`

### 3.4. 变量

```python
num1 = 10 / 3
num2 = 10 // 3
num3 = 10 % 3
print(num1, num2, num3) # 3.3333333333333335 3 1
```

### 3.5. 编码和字符串

编码：

* ASCII：一个字节表示一个字符
* Unicode：将所有语言统一到一套编码里，通常由 2 个或 4 个字节表示一个字符
* UTF-8：将 Unicode 转为“可变长编码”
  * UTF-8编码把一个Unicode字符根据不同的数字大小编码成1-6个字节，常用的英文字母被编码成1个字节，汉字通常是3个字节，只有很生僻的字符才会被编码成4-6个字节。
  * 如果你要传输的文本包含大量英文字符，用UTF-8编码就能节省空间
* Python3 使用 Unicode 编码

字符串：

* `ord()` 函数获取字符的整数表示
* `chr()` 函数把编码转换为对应的字符
* byte 类型，如 `x = b'abc'`
* 字符串的 `encode()` 方法可以编码为指定的字节数

  ```python
  >>> '中文'.encode('utf-8')
  b'\xe4\xb8\xad\xe6\x96\x87'
  ```

* `len()` 函数获取字符串有多少个字符
* 在源文件顶部添加 `# -*- coding: utf-8 -*-` 语句，告知解释器用 UTF-8 解码

格式化：

* 占位符

  ```text
  %d    整数
  %f    浮点数
  %s    字符串
  %x    十六进制整数
  ```

* 示例：

  ```python
  >>> '%s 花了 $%f  买了 %d 杯奶茶, 奶茶的颜色是红色(%x)' % ('吴钦飞', 1.23, 10, 0xff0000)
  '吴钦飞 花了 $1.230000  买了 10 杯奶茶, 奶茶的颜色是红色(ff0000)'
  ```

### 3.6. list 和 tuple

list：

* 格式： `[元素1, 元素2, ...]`
* 功能
  * `len(my_list)` 元素个数
  * `my_list[index]` 获取指定索引的元素
  * `my_list.append(item)` 末尾添加元素
  * `my_list.insert(index, item)` 指定索引处插入元素
  * `my_list.pop(index)` 弹出指定索引的元素
* 示例

  ```python
  >>> chars = ['a', 'b', 'c']
  >>> len(chars) # 获取元素个数
  3
  >>> chars[1] # 获取指定索引的元素
  'b'
  >>> chars[-1] # 获取倒数的元素
  'c'
  >>> chars.insert(1, 'ab') # 插入元素
  >>> chars
  ['a', 'ab', 'b', 'c']
  >>> chars.pop(1) # 删除元素，默认删 -1 位置的
  'ab'
  >>> chars
  ['a', 'b', 'c']
  ```

tuple：

* 格式：`(元素1, 元素2, ...)`
* 注意：
  * 单个元素时： `(1,)`
  * 一旦初始化就不能改变

### 3.7. 条件判断

格式：

```text
if <条件判断1>:
    <执行1>
elif <条件判断2>:
    <执行2>
elif <条件判断3>:
    <执行3>
else:
    <执行4>
```

示例：

```python
score = input('your score: ')
score = int(score)

if score >= 90:
    print('A')
elif score >= 80:
    print('B')
elif score >= 60:
    print('C')
else:
    print('D')
```

### 3.8. 循环

说明：

* `range(start, end)` 可产生一个序列
* `list(range_result)` 可将序列转为 list

示例：

```python
for item in range(0, 5):
    if item == 1:
        continue
    elif item == 3:
        break
    print(item)

# 输出： 0 2

item = 0
while item < 5:
    item = item + 1
    if item == 1:
        continue
    elif item == 3:
        break
    print(item)

# 输出：2
```

### 3.9. dict 和 set

dict：

* 说明
  * key-value 的集合
  * 判断 key 是否存在
    * `key in my_dict`
  * 根据 key 获取 value
    * `my_dict[key]`，无指定 key 会报错
    * `my_dict.get(key)`，无指定 key 返回 `None`
  * 添加 key-value
    * `my_dict[new_key] = 'new value'`
  * 删除 key-value
    * `my_dict.pop(key)`
* 示例

  ```python
  person = {
    'name': '张三',
    'age': 18
  }

  print(person['name'])

  print(person.get('id'))  # None

  print('id' in person)  # False

  # key 不存在，报错
  # print(person['id'])

  person['id'] = 1

  person.pop('id')
  ```

set：

* 说明
  * key 的集合，不重复
  * 可用 `set()` 函数将 list 转为 set
  * `my_set.add(key)`，添加元素
  * `my_set.remove(key)`，删除元素
* 示例

  ```python
  nums = {1, 2, 3}

  print(1 in nums)  # True

  nums.add('a')

  nums.remove(2)
  ```

## 4. 函数

### 4.1. 内置函数

* 官网：[https://docs.python.org/3/library/functions.html](https://docs.python.org/3/library/functions.html)

### 4.2. 数据类型转换

* `int()`
* `float()`
* `str()`
* `bool()`

### 4.3. 定义函数

* 说明
  * return 语句默认返回 `None`
* 示例

  ```python
  def my_abs(num):
      if num < 0:
          return -num
      return num


  print(my_abs(-1))
  ```

### 4.4. 空函数

* 说明
  * 使用 pass 语句，作为占位符
* 示例

  ```python
  def do_nothing:
      pass
  ```

### 4.5. 参数检查

* 说明
  * 通过 `isinstance(target, tuple)` 判断变量 target 是否为指定的类型
* 示例

  ```python
  num = 1
  print(isinstance(1, (int, float)))
  print(isinstance('1', (int, float)))
  ```

### 4.6. 返回多个值

* 说明
  * `return (x, y)` 可简写为 `return x, y`
  * 多个变量可以接收一个元组，如 `x,y = (1, 2)`
* 示例

  ```python
  def move(x, y):
    return x, y


  x, y = move(1, 2)
  print(x, y) # 1 2
  ```

### 4.7. 参数

* 默认值

  ```python
  def fn_default_arg(x, y=2):
    print(x, y)


  fn_default_arg(1)  # 1 2
  ```

* 可变参数

  ```python
  # 接收多个参数，args 是 tuple
  def fn_args(*args):
      for arg in args:
          print(arg)


  fn_args(3, 4)
  # 3
  # 4


  def fn_args_2(x, y):
      print(x, y)

  # 用 list 或 tuple 传多个参数
  fn_args_2(*[5, 6])  # 5 6
  fn_args_2(*(7, 8))  # 7 8
  ```

* 关键字参数

  ```python
  #  kw 是 dict 类型
  def fn_kw(x, **kw):
      print(x, kw)


  fn_kw(9, name='吴钦飞', age=18)  # 9 {'name': '吴钦飞', 'age': 18}
  fn_kw(11, **{'name': '张三', 'age': 19})
  ```

* 命名关键字参数

  ```python
  # * 号或可变参数（*args） 分隔位置参数和命名参数
  def fn_named_kw(x, *, name, age):
      print(x, name, age)


  fn_named_kw(10, name='张三', age=20)
  ```

## 5. 高级特性

### 5.1. 切片

* 针对 list 或 str
* 格式
  * `list[startIndex:endIndex]`
  * 包头不包尾
  * startIndex 缺省值为 0
  * endIndex 缺省值为 list 长度

### 5.2. 迭代

说明：

* `for item in list` 可以迭代 可迭代对象，如下
* `isinstance(my_list, Iterable)` 判断是不是可迭代对象
* `enumerate(my_list)` 将 list 转为 index-item 对

示例：

```python
from collections.abc import Iterable

my_list = [1, 2, 3]
if isinstance(my_list, Iterable):
    for item in my_list:
        print(item)
    for i, item in enumerate(my_list):
        print('i, item =', i, item)

my_tuple = (4, 5, 6)
if isinstance(my_tuple, Iterable):
    for item in my_tuple:
        print(item)

my_str = 'abc'
if isinstance(my_str, Iterable):
    for item in my_str:
        print(item)

my_dict = {'name': 'wqf', 'age': 18}
if isinstance(my_dict, Iterable):
    for key in my_dict:
        print('key =', key)
    for val in my_dict.values():
        print('val =', val)
    for k, v in my_dict.items():
        print('key-val =', k, v)
```

### 5.3. 列表生成式

格式：

```text
[expression for item in iterable_obj if condition]
```

示例：

```python
>>> [x for x in range(0, 3)]
[0, 1, 2]

>>> [x * 2 for x in range(0, 3)]
[0, 2, 4]

# 条件过滤
>>> [x * 2 for x in range(0, 3) if x > 0]
[2, 4]

# 双重循环
>>> [x + y for x in range(1, 3) for y in range(5, 7)]
[6, 7, 7, 8]

# 多个变量
>>> person = {'name': '吴钦飞', 'age': 18}
>>> [k + '=' + str(v) for k, v in person.items()]
['name=吴钦飞', 'age=18']

# 获取当前目录下所有文件的名称
>>> import os
>>> [d for d in os.listdir('.')]
['package.json', 'Mobile', 'Android']
```

### 5.4. 生成器

格式：

* `g = (x * 2 for x in range(0, 2))`

说明：

* 节省内存
* 通过 `next(g)` 获取下一个元素，没有元素则抛异常

示例：

```python
>>> g = (x * 2 for x in range(0, 2))
>>> next(g)
0
>>> next(g)
2
>>> next(g)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration


# 通过 for 遍历 generator
>>> g = (x + 1 for x in range(0, 2))
>>> for item in g:
...     print(item)
...
1
2


# 生成器函数和 yield
>>> def odd():
...     yield 1
...     yield 3
...
>>> odd_g = odd()

>>> next(odd_g)
1
>>> next(odd_g)
3
>>> next(odd_g)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

### 5.5. 迭代器

`Iterable` 对象：

* 可被 `for item in iterable_obj` 遍历
* 可通过 `isinstance([], Iterable)` 判断
* `list`、`tuple`、`dict`、`set`、`str`

`Iterator` 对象：

* 迭代器
* 可被 `next()` 函数调用并不断返回下一个值
* 可通过 `isinstance((x for x in range(10)), Iterator)` 判断
* 可被 `for item in g` 遍历

## 6. 函数式编程

### 6.1. 高阶函数

把函数作为参数传入，这样的函数称为高阶函数，函数式编程就是指这种高度抽象的编程范式。

高阶函数英文叫 Higher-order function

特点：

* 变量可以指向函数
* 函数名也是变量
* 函数调用时，将函数作为参数传入

map：

```python
>>> def f(x):
...     return 2 * x
...

>>> db_f_iterator = map(f, [1, 2, 3])

>>> next(db_f_iterator)
2

>>> for item in db_f_iterator:
...     print(item)
...
4
6
```

reduce:

```python
>>> def sum(x, y):
...     return x + y
...

>>> from functools import reduce
>>> reduce(sum, [1, 2, 3, 4])
10
```

filter:

```python
>>> def not_empty(s):
...     return s and s.strip()
...

>>> list(filter(not_empty, ['a', '', None, 'b']))
['a', 'b']
```

sorted：

* 格式：`sorted(iterable, *, key=None, reverse=False)`
* 示例

  ```python
  def comparePerson(person):
      return person['name'][0:1]


  person_list = [
    {'name': 'zhangsan'},
    {'name': 'lisi'},
    {'name': 'wangwu'}
  ]

  person_list = sorted(person_list, key=comparePerson)

  print(person_list)
  # [{'name': 'lisi'}, {'name': 'wangwu'}, {'name': 'zhangsan'}]
  ```

### 6.2. 返回函数

函数的返回值为函数，这种结构形成“闭包”

返回的函数可以使用外部函数的可使用的变量

示例：

```python
def lazy_sum(*args):
    def sum():
        s = 0
        for num in args:
            s = s + num
        return s
    return sum


result = lazy_sum(1, 2, 3, 4)()
print(result)  # 10
```

### 6.3. 匿名函数

格式：

* `lambda parameters: expression`

示例：

```python
f = lambda k, v: k + '=' + v

person = {'name': 'zhangsan', 'age': '10'}

for k, v in person.items():
    print(f(k, v))
```

### 6.4. 装饰器

说明：

* 在代码运行期间动态增加功能的方式，称之为“装饰器”（Decorator）。
* 函数对象有一个 `__name__` 属性，可以拿到函数的名字

示例：

```python
import functools

def log(before_text, after_text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print('---- %s() %s ----' % (func.__name__, before_text))
            ret = func(*args, **kw)
            print('---- %s() %s ----' % (func.__name__, after_text))
            return ret
        return wrapper
    return decorator


@log('begin', 'end')
def my_fn():
    print('哇哈哈')


my_fn()
# ---- my_fn() begin ----
# 哇哈哈
# ---- my_fn() end ----
```

### 6.5. 偏函数

当函数的参数个数太多，需要简化时，使用 `functools.partial` 可以创建一个新的函数，这个新函数可以固定住原函数的部分参数，从而在调用时更简单。

示例：

```python
print(int('110', base=2))  # 6

int_binary = lambda binary_num_str: int(binary_num_str, base=2)

print(int_binary('111'))  # 7

import functools
int_binary_2 = functools.partial(int, base=2)

print(int_binary_2('1000'))  # 8
```

## 7. 模块

### 7.1. 包

* 在包下放置空文件 `__init__.py`
* 示例

  ```text
  ${root}/
      main.py
      common/
          __init__.py
          utils/
              location.py
          config/
              constant.py
  ```

* main.py

  ```python
  from common.config import constant
  from common.utils import location

  location.test()
  ```

### 7.2. 模块

约定：

* `__xyz__` 为内部属性
* `_xyz`、`__xyz` 为私有属性

标准模块：

```python
# -*- coding: utf-8 -*-

# 文档注释
'Documentation Comments'

__author__ = '吴钦飞'

def test():
    print('location module')

# 如果当前模块为入口模块，则会执行
if __name__=='__main__':
    test()
```

第三方模块：

* 官网第三方包
  * 地址：[pypi.python.org](https://pypi.python.org/)
  * 安装：`$ pip install pacakge_name`
* Anaconda
  * 作用：安装常用包
  * 地址
    * [官网 Anaconda3-2019.10-MacOSX-x86_64.pkg](https://www.anaconda.com/distribution/#download-section)
    * [repo.continuum.io](https://repo.continuum.io/archive/)

模块搜索路径：

* 说明
  * 当我们试图加载一个模块时，Python 会在指定的路径下搜索对应的.py文件，如果找不到，就会报错
  * 如 `import my_mod`
* 查看搜索路径

  ```python
  >>> import sys
  >>> sys.path
  [
    '',
    '/usr/local/Cellar/python/3.7.2_1/Frameworks/Python.framework/Versions/3.7/lib/python37.zip',
    '/usr/local/Cellar/python/3.7.2_1/Frameworks/Python.framework/Versions/3.7/lib/python3.7',
    '/usr/local/Cellar/python/3.7.2_1/Frameworks/Python.framework/Versions/3.7/lib/python3.7/lib-dynload',
    '/Users/forwardNow/Library/Python/3.7/lib/python/site-packages',
    '/usr/local/lib/python3.7/site-packages'
  ]
  ```

* 动态添加搜索路径

```python
sys.path.append('/x/y/z')
```

* 设置环境变量 `PYTHONPATH`

## 8. 面向对象编程

### 8.1. 类和实例

```python
# 继承 object 类
class Student(object):
    # 构造函数
    def __init__(self, name, score):
        # 公有属性
        self.name = name
        self.score = score


    # 方法：第一个参数为实例
    def print_score(self):
        print('%s: %s' % (self.name, self.score))


zhangSan = Student('张三', 88)
lisi = Student('lisi', 99)

zhangSan.print_score()  # 张三: 88
lisi.print_score()  # lisi: 99
```

### 8.2. 访问限制

双下划线（`__`）打头的属性是私有属性

```python
class Student(object):

    def __init__(self, name, score):
        self.__name = name
        self.__score = score

    def get_name(self):
        return self.__name

    def get_score(self):
        return self.__score


zhangSan = Student('张三', 88)

print(zhangSan.get_name(), zhangSan.get_score())
```

### 8.3. 继承和多态

继承：

```python
class Animal(object):
    def run(self):
        print('Animal is running...')


class Dog(Animal):
    pass


class Cat(Animal):
    def run(self):
        print('Cat is running...')


Dog().run()  # Animal is running...
Cat().run()  # Cat is running...
```

多态：

```python
def run(animal):
    animal.run()


run(Dog())
run(Cat())
```

### 8.4. 类型判断

判断基本类型：

```python
print(type(111))  # <class 'int'>
print(type(111) == int)  # True

print(type('11'))  # <class 'str'>
print(type(True))  # <class 'bool'>
print(type(None))  # <class 'NoneType'>
```

判断引用类型：

```python
import types


def fn():
    pass


print(type(fn))  # <class 'function'>
print(isinstance(fn, types.FunctionType))  # True

print(isinstance(abs, types.BuiltinFunctionType))  # True

print(isinstance(lambda x: x, types.LambdaType))  # True

g = (x for x in range(10))
print(isinstance(g, types.GeneratorType))  # True
```

### 8.5. 对象信息

获取对象信息：

```python
print(dir('a'))
# ['__add__', '__class__','capitalize', ...]
```

操作对象的属性：

```python
class Person(object):
    def __init__(self, id, name):
        self.__id = id
        self.name = name

    def say_hello(self):
        print('%s, hello' % self.name)


person = Person('007', 'zhangsan')


print(type(person))  # <class '__main__.Person'>

print(hasattr(person, 'name'))  # True
print(hasattr(person, '__id'))  # False
print(hasattr(person, 'say_hello'))  # True

print(getattr(person, 'name'))  # zhangsan

setattr(person, 'name', 'lisi')
print(getattr(person, 'name'))  # lisi
```

### 8.6. 类属性和类方法

```python
class Person(object):
    desc = 'Person class'

    @staticmethod
    def get_desc():
        return Person.desc


print(Person.desc)
print(Person.get_desc())
```

## 9. 面向对象高级编程

### 9.1. `__slots__`

限制动态添加的属性

```python
from types import MethodType


class Person(object):
    # 限制动态添加的属性
    __slots__ = ('name', 'get_name')


def get_name(self):
    return self.name


# 给 实例 动态添加属性，只作用于该实例
p = Person()

p.name = '张三'
p.get_name = MethodType(get_name, p)
print(p.get_name())  # 张三


# 给 类 动态添加属性，作用于所有实例
Person.get_name = get_name
p_2 = Person()
p_2.name = '李四'
print(p_2.get_name())  # 李四
```

### 9.2. `@property`

getter/setter 语法糖

```python
class Person(object):
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, name):
        if not isinstance(name, str):
            raise ValueError('name must be a string!')
        self._name = name


p = Person('张三')
print(p.name)

p.name = '李四'
print(p.name)

p.name = 1
```

### 9.3. 多重继承

通过混入，添加额外的属性

```python
class Animal(object):
    def __init__(self, name):
        self._name = name


class RunnableMixIn(object):
    def run(self):
        print(self._name, 'running')


class FlyableMixIn(object):
    def fly(self):
        print(self._name, 'flying')


class Dog(Animal, RunnableMixIn):
    pass


class Bird(Animal, FlyableMixIn):
    pass


Dog('dog').run()
Bird('bird').fly()
```

### 9.4. 定制类

实现“toString”接口：

```python
class Person(object):
    def __init__(self, name):
        self.name = name

    # 对象转字符串。类比 Java 中的 Object 的 toString() 方法
    def __str__(self):
        return 'Person { name: %s }' % self.name

    __repr__ = __str__


print(Person('吴钦飞'))  # Person { name: 吴钦飞 }
```

实现迭代器接口：

```python
class Range(object):
    def __init__(self, start_num=0, stop_num=5):
        self.start_num = start_num
        self.stop_num = stop_num
        self.cur_num = start_num

    def __iter__(self):
        return self

    def __next__(self):
        cur_num = self.cur_num

        if cur_num >= self.stop_num:
            raise StopIteration()

        self.cur_num = cur_num + 1

        return cur_num


for x in Range(10, 13):
    print(x)
```

实现 对象是否可调用 接口：

```python
class Person(object):
    pass


class Man(object):
    def __call__(self, *args, **kwargs):
        pass


print(callable(Person()))  # False
print(callable(Man()))  # True
```

### 9.5. 枚举类

```python
from enum import Enum, unique


@unique
class Weekday(Enum):
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6
    Sun = 7


print(Weekday.Fri.name, Weekday.Fri.value)  # Fri 5

for name, item in Weekday.__members__.items():
    print(name, item, item.value)  # Mon Weekday.Mon 1
```

## 10. 错误、调试、测试

### 10.1. 错误处理

参考：

* [异常类的层级结构](https://docs.python.org/3/library/exceptions.html#exception-hierarchy)

捕获异常：

```python
import logging


try:
    print('try - start')
    v = 1 / 0
    print('try - end')
except ValueError as e:
    print('handle ValueError')
    logging.exception(e)
except Exception as e:
    print('handle Exception')
    logging.exception(e)  # 打印调用堆栈信息
finally:
    print('finally')
```

抛出异常：

```python
class FooError(ValueError):
    pass


def foo(s):
    n = int(s)
    if n == 0:
        raise FooError('invalid value: %s' % s)
    return 10 / n


foo('0')
```
