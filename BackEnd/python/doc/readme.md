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

## 3. print() 和 input()

```python
name = input("what's your name? ")
print("hello", name)
```

## 4. 注释、代码块

```python
# “#” 打头的都为注释
num = 1

# “:” 后面缩进的一部分是代码块
if num == 1:
  print(num)
```

## 5. 数据类型

整数：

* 十进制： 1 、100、-123、0 等
* 十六进制： 以 `0x` 打头，如 `0xff00`

浮点数：

* 数学写法：1.23、-1.234 等
* 科学计数法：如 `1.23e9`

字符串：

* 通过单引号（`'`）或双引号（`"`）界定单行内容
* 通过三引号（`'''`）界定多行内容
* `\`开头的表示转义字符，如 `"\n"`

布尔值：

* 值：`True` 、`False`
* 逻辑运算符：`and` 、`or`、`not`

空值：

* 值：`None`
