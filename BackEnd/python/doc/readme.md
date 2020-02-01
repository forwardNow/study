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

内置函数：

* 官网：[https://docs.python.org/3/library/functions.html](https://docs.python.org/3/library/functions.html)

数据类型转换：

* `int()`
* `float()`
* `str()`
* `bool()`

定义函数：

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

空函数：

* 说明
  * 使用 pass 语句，作为占位符
* 示例

  ```python
  def do_nothing:
      pass
  ```

参数检查：

* 说明
  * 通过 `isinstance(target, tuple)` 判断变量 target 是否为指定的类型
* 示例

  ```python
  num = 1
  print(isinstance(1, (int, float)))
  print(isinstance('1', (int, float)))
  ```

返回多个值：

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

参数：

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
