# C++ 基础入门

## 1. C++ 初识

### 1.1. 第一个 C++ 程序

编写一个 C++ 程序总共分为 4 个步骤
* 创建项目
* 创建文件
* 编写代码
* 运行程序

#### 1.1.1. 创建项目

使用 Visual Studio 编写 C++ 程序
* 文件（菜单） -> 创建 “空项目” （01_helloworld）

环境相关的问题：
* [关于Visual Studio 2019安装时VS installer无法下载文件，进度条为0，显示网络有问题的解决办法](https://blog.csdn.net/qq_43085848/article/details/109901050) 
* [windows开发笔记——VS 2019遇到windows SDK找不到](https://blog.csdn.net/chengxu_kuangrexintu/article/details/102980348)

#### 1.1.2. 创建文件

![创建文件](./images/1.1.2.png)

#### 1.1.3. 编写文件

```c++
#include <iostream>
using namespace std;

int main()
{
	cout << "hello world" << endl;
	system("pause");

	return 0;
}
```

界面设置：
* [VS2017如何更改字体大小](https://blog.csdn.net/fadbgfnbxb/article/details/89788194)

#### 1.1.4. 运行程序

![创建文件](./images/1.1.4.jpg)

### 1.2. 注释

单行注释： `// 注释的内容`

多行注释： `/* 注释的内容 */`

### 1.3. 变量

作用： 给一段指定的内存空间起名，方便操作这段内存。方便我们管理内存空间

语法： `数据类型 变量名 = 初始值;`

### 1.4. 常量

作用： 用于记录程序中不可更改的数据

定义常量的两种方式：
1. #define 宏常量： `#define 常量名 常量值`
	 * 通常在文件上方定义，表示一个常量
	 * 示例 `#define Day 7`
2. const 修饰的变量： `const 数据类型 常量名 = 常量值;`
	 * 通常在变量定义前加关键字 const，修饰该变量为常量，不可修改
	 * 示例 `const int day = 7;`

### 1.5. 关键字

asm
do
if
return
typedef
auto
double
inline
short
typeid
bool
dynamic_cast
int
signed
typename
break
else
long
sizeof
union
case
enum
mutable
static
unsigned
catch
explicit
namespace
static_cast
using
char
export
new
struct
virtual
class
extern
operator
switch
void
const
false
private
template
volatile
const_cast
float
protected
this
wchar_t
continue
for
public
throw
while
default
friend
register
true
delete
goto
reinterpret_cast
try

### 1.6. 标识符命名规则

给变量命名时：以 下划线、字母 打头的 字母、数字、下划线 组合。

## 2. 数据类型

C++ 规定在创建一个变量或者常量时，必须要指定出相应的数据类型，否则无法给变量分配内存。

### 2.1. 整形

作用：整形变量表示的是整数类型的数据

整数类型，区别在于所占内存空间不同，进而取值范围不同：

* `short` 短整型
* `int` 整型
* `long` 长整型
* `long long` 长长整型


### 2.2. sizeof 关键字

作用： 利用 sizeof 关键字可以统计数据类型所占内存空间字节数

语法： `sizeof(数据类型 | 变量)`

示例；

```c++
cout << "int: " << sizeof(int) << endl; // => int: 4
cout << "long long: " << sizeof(long long) << endl; // => long long: 8
```

### 2.3. 实型（浮点型）

作用：表示实数（带小数部分的数）

有两种：

* float，单精度，4字节，7位有效数字
* double，双精度，8字节，7位有效数字

说明：

* 默认情况下，输出一个小数，只会显示 6 位有效数字

示例：

```c++
float pi = 3.14f;
double pi2 = 3.1415926; 

// 科学计数法
double money = 1.0e2; // 1.0 * 10 ^ 2
```

### 2.4. 字符型

作用： 字符型变量用于显示单个字符

语法： `char valid = 'Y';`

注意：

* 值 是单个字符，用单引号界定
* 1 个字节，存储的是 ASCII 编码

示例：

```c++
// 将字符转为 ASCII
cout << (int)'a' << endl; // 97
```

### 2.5. 转义字符

作用： 用于表示一些不能显示出来的 ASCII 字符

常用的转义字符：

* `\n`
* `\\`
* `\t`

### 2.6. 字符串型

作用： 用于表示一串字符

两种风格：

* C 风格： `char 变量名[] = "变量的值";`
* C++ 风格： `string 变量名 = "变量的值";`

注意：

* C++ 风格字符串需要包含头文件 `#include <string>`

### 2.7. 布尔类型 bool

作用： 布尔数据类型代表真或假的值

只有两个值：

* true ： 真，本质是 1
* false ： 假，本质是 0

说明：

* 占 1 个字节

### 2.8. 数据的输入

作用： 用于从键盘获取数据

关键字： `cin`

语法： `cin >> 变量;`

注意：

* bool 类型的值，除了 0 是假 其他都是真

示例：

```cpp
int num = 0;

cout << "请给 num 赋值： ";
cin >> num;

cout << "num = " << num << endl;

system("pause");
return 0;
```

## 3. 运算符

作用： 用于执行代码的运算

主要讲解以下几类运算符：

* 算术运算符，用于处理四则运算
* 赋值运算符，用于将表达式的值赋给变量
* 比较运算符，用于表达式的比较，并返回一个真值或假值
* 逻辑运算符，用于根据表达式的值返回真值或假值

### 3.1. 算术运算符

作用： 用于处理四则运算

包括以下符号：

* `+` 加
* `-` 减
* `*` 乘
* `/` 除，两个整数相除结果为整数，除数不能为 0
* `%` 取模（取余），第二个操作数不能为 0，两个小数之间不能取模，整数之间才可以取模
* `++` 前置递增 先让变量 +1 后进行表达式的运算，后置递增 先进行表达式运算后让变量 +1
* `--` 递减

### 3.2. 赋值运算符

作用： 用于将表达式的值赋给变量

包括以下符号：

* `=`		a = 1;
* `+=`	a += 1;
* `-=`
* `*=`
* `/=`
* `%=`

### 3.3. 比较运算符

作用： 用于表达式的比较，并返回一个真值或假值

包括以下符号：

* `==`:	`4 == 3; //=> 0`
* `!=`: `4 != 3; //=> 1`
* `<`
* `>`
* `<=`
* `>=`

### 3.4. 逻辑运算符

作用： 逻辑运算

包括以下运算符：

* `!` 非
* `&&` 与
* `||` 或

示例：

```cpp
int num = 0;

cout << !num << endl; //=> 1
cout << !!num << endl;//=> 0
```

## 4. 程序流程结构

C/C++ 支持最基本的三种程序运行结构： 顺序、选择、循环

* 顺序： 程序按顺序执行，不发生跳转

* 选择： 依据条件是否满足，有选择的执行相应功能

	```cpp
	int score = 80;

	if (score > 90)
	{
		cout << "A";
	} 
	else if (score > 60) 
	{
		cout << "B";
	} 
	else 
	{
		cout << "C";
	}


	// 三目运算符

	int num1 = 10;
	int num2 = 20;
	
	int max = num1 > num2 ? num1 : num2;


	// switch
	switch(score) // score 的数据类型只能是 整型或字符型
	{
		case 100:
			cout << "A";
			break;
		case 90:
		case 80:
			cout << "B";
			break;
		default:
			cout << "C";
			break;
	}
	```

* 循环： 依据条件是否满足，循环多次执行某段代码

	```cpp
	int num = 0;

	while (num < 10)
	{
		cout << num << endl;
		num++;
	}

	do
	{
		cout << num << endl;
		num--;
	} while (num > 0);

	// break; // 可以终止当前循环
	// continue; // 跳过本次循环

	for (int i = 0; i < 10; i++)
	{
		cout << i << endl;
	}
	```

* 跳转

	```cpp
	// ...
	// ...

	goto FLAG;

	// ...
	// ...

	FLAG:

	// ...
	// ...

	```

## 5. 数组

说明：

* 集合，里面存放相同类型的数据元素
* 连续的内存空间
* 定义数组时，必须指定长度（或可推断出来）
* 下标从 0 开始
* 数组名是常量，不可以进行赋值操作

一维数组：

```cpp
/*
定义方式1：
*/
int nums[2];
nums[0] = 1;
nums[1] = 2;

cout << nums[1] << endl; //=> 2

/*
定义方式2：
*/
// 初始化时，缺省的元素默认为 0
string fruits[3] = { "apple", "banana" };

cout << fruits[1] << endl; //=> banana


/*
定义方式3：
*/
bool flags[] = { true, false };

cout << flags[1] << endl; //=> 0


/*
数组名的作用
*/
int arr[] = { 1, 2 };

cout << "数组占用内存空间为：" << sizeof(arr) << endl; // 8
cout << "单个元素占用内存空间为：" << sizeof(arr[0]) << endl; // 4
cout << "数组首地址为：" << arr << endl; // 002BF68C
cout << "数组第一个元素的地址为：" << &arr[0] << endl; // 002BF68C


// arr = { 1 };  // 不能赋值

```

二维数组：

```cpp
/*
定义方式1：
*/
int arr1[2][2];

arr1[0][0] = 11;
arr1[0][1] = 12;
arr1[1][0] = 21;
arr1[1][1] = 22;

/*
定义方式2：
	推荐使用此种方式定义 二维数组
*/
int arr2[2][3] = {
	{11, 12, 13}, // row1
	{21, 22, 23}  // row2
};


/*
定义方式3：
*/
int arr3[2][3] = { 
	11, 12, 13, // row1
	21, 22, 23	// row2
};


/*
定义方式4：
	可推算出是2行
*/
int arr4[][3] = {
	11, 12, 13, // row1
	21, 22, 23	// row2
};


/*
二维数组名称用途：
	1. 查看占用内存空间大小
	2. 查看首地址
*/
int arr5[2][3] = {
	{11, 12, 13}, // row1
	{21, 22, 23}  // row2
};

cout << "查看占用内存空间大小: " << sizeof(arr5) << endl; // 24
cout << "查看首地址: " << int(arr5) << endl; // 9697484
```

## 6. 函数

作用：将一段经常使用的代码封装起来，减少重复代码。

函数的定义与调用：

```text
// 定义
返回值类型 函数名(形参列表)
{
	函数体语句

	return 表达式
}

// 调用
函数名(实参列表)
```

```cpp
int add(int num1, int num2)
{
	int sum = num1 + num2;
	return sum;
}

/*
	无返回值则 返回值类型为 void
	return 语句可以不要
*/
void test() {
	return;
}

int main()
{
	int a = 1;
	int b = 2;
	
	int c = add(a, b);

	cout << "a + b = " << c << endl; // 3
	
	system("pause");
	return 0;
}
```

值传递：

* 形参改变不会影响到实参

函数声明：

* 告诉编译器有这个函数
*	声明可以有多次

```cpp
// 声明
int add(int num1, int num2);

int main()
{
	int a = 1;
	int b = 2;
	
	int c = add(a, b);

	cout << "a + b = " << c << endl; // 3
	
	system("pause");
	return 0;
}

// 定义
int add(int num1, int num2)
{
	int sum = num1 + num2;
	return sum;
}
```

函数分文件编写：

* 头文件 swap.h
	```cpp
	// 函数定义中使用的头文件也要在这里引入
	#include <iostream>
	using namespace std;

	// 函数声明
	void swap(int a, int b);
	```

* 源文件 swap.cpp
	```cpp
	#include "swap.h" // 关联头文件，注意是 双引号

  // 函数定义
	void swap(int a, int b)
	{
		cout << "a = " << a << endl;
		cout << "b = " << b << endl;
	}
	```

* 调用
	```cpp
	#include"swap.h"

	int main()
	{
		swap(1, 2);
		return 0;
	}
	```

## 7. 指针

作用：

* 通过指针间接访问内存
* 可以用指针变量保持地址

定义和使用：

```cpp
int num = 10;

int* p = &num;

cout << "p = " << p << endl; // 005BFAA4

// 解引用
cout << "*p = " << *p << endl; // 10
```

指针所占空间：

* 在 32 位操作系统下，占 4 个字节（32位）
* 在 64 位操作系统下，占 8 个字节（64位）

	```cpp
	int num = 10;

	int* p = &num;

	cout << "sizeof(p) = " << sizeof(p) << endl; // 4
	cout << "sizeof(int*) = " << sizeof(int*) << endl; // 4
	```

空指针：

* 指针变量指向内存中编号为 0 的空间
* 用于初始化指针变量
* 空指针指向的内存是不可以访问的
* 0 ~ 255 的内存编号是系统占用的，不可以访问

	```cpp
	int* p = NULL;
	```

野指针：

* 指针变量指向非法的内存空间

	```cpp
	// 不是我们申请的空间，访问会报错
	int* p = (int*)0x1100;
	```

const 修饰指针：

* const 修饰指针 —— 常量指针： 常量（const）*（指针）
	* `const int* p = &num;`
	* const 修饰 *，则取 * 的操作不允许重新赋值， *p 的值不可以改
* const 修饰常量 —— 指针常量 
	* `int* const p = &num;` 
	* const 修饰 p，则 p 的值不允许重新赋值，p 的值不可以改
* const 既修饰指针 又修饰常量
	* `const int* const p = &num;` 

	```cpp
		int num = 10;
		int money = 20;

		// 常量指针
		const int* p1 = &num;
		p1 = &money;
		// *p1 = 100; // error

		// 指针常量
		int* const p2 = &num;
		// p2 = &money; // error
		*p2 = 200;
	```

指针和数组：

```cpp
// 利用指针访问数组中的元素

int arr[3] = { 11, 22, 33 };

int* p = arr; // arr 就是第一个元素的地址

cout << "第1个元素的值：" << *p << endl;

p++; // 往后移动4个字节（int类型的指针移动一次就是4个字节）

cout << "第2个元素的值：" << *p << endl;

cout << "第3个元素的值：" << *(++p) << endl;
```

指针和函数：

```cpp
#include <iostream>
using namespace std;

// 利用指针作为函数参数，可以修改实参的值
// 地址传递
void swap(int* num1, int* num2)
{
	int temp = *num1;
	*num1 = *num2;
	*num2 = temp;
}

int main()
{
	int a = 100;
	int b = 200;

	// 地址传递
	swap(&a, &b);

	cout << "a = " << a << endl; // 200
	cout << "b = " << b << endl; // 100

	system("pause");
	return 0;
}

```

## 8. 结构体

结构体属于用户自定义的数据类型，允许用户存储不同的数据类型。

语法： `struct 结构体名 { 结构体成员列表 };`

```cpp
struct Student
{
	string name;
	int age;
	int score;
};


int main()
{
	// 挨个属性赋值
	struct Student stu;

	stu.name = "张三";
	stu.age = 18;
	stu.score = 100;

	// 通过 “.” 读写结构体中的成员

	cout << "name = " << stu.name << endl;

	// 一次性全部赋值
	struct Student stu2 = { "李四", 16, 90 };

	stu2 = { "王五", 17, 80 };

	cout << "name = " << stu2.name << endl;

	// 创建结构体变量时， struct 关键字可以省
	Student stu3;

	system("pause");
	return 0;
}
```

结构体数组；（ `struct 结构体类型 变量名[元素个数] = { {...}, {...}, ... }` ）

```cpp
struct Student
{
	string name;
	int age;
	int score;
};


int main()
{
	Student arr[2] = {
		{ "李四", 18, 80 },
		{ "王五", 19, 90 },
	};

	cout << arr[1].name << endl;
	cout << arr[1].age << endl;
	cout << arr[1].score << endl;

	system("pause");
	return 0;
}
```

结构体指针：

```cpp
struct Student
{
	string name;
	int age;
	int score;
};


int main()
{
	// 通过指针访问结构体中的成员
	// 利用操作符 “结构体指针->结构体属性名” 访问结构体属性， p->name
	Student stu = { "张三", 18, 90 };

	Student* p = &stu;

	cout << p->name << endl;
	cout << p->age << endl;
	cout << p->score << endl;

	system("pause");
	return 0;
}
```

结构体嵌套：

```cpp
struct Student
{
	string name;
	int score;
};

struct Teacher
{
	string name;
	struct Student stu;
};

int main()
{
	Teacher teacher = { 
		"老王", 
		{ "张三", 100}
	};

	Teacher* p = &teacher;

	cout << teacher.name << endl;
	cout << teacher.stu.name << endl;

	system("pause");
	return 0;
}
```

结构体作为函数参数：

```cpp
struct Student
{
	string name;
	int score;
};

// 值传递
void changeScoreByValue(Student student)
{
	student.score = 100; // 不影响实参
}
// 地址传递
void changeScoreByPointer(Student* p)
{
	p -> score = 100; // 改变实参的成员的值
}

int main()
{
	Student stu = { "张三", 60 };

	Student* p = &stu;

	cout << "改变前：" << stu.score << endl; // 60

	changeScoreByValue(stu);

	cout << "值传递：" << stu.score << endl; // 60，未改变

	changeScoreByPointer(&stu);

	cout << "值传递：" << stu.score << endl; // 100，已改变


	system("pause");
	return 0;
}
```

结构体中 const 使用场景：

```cpp
// 避免误操作
void printStudent(const Student* p)
{
	// p -> score = 100; // 不可以写
	cout << "name=" << p->name << "  score=" << p->score << endl;
}
```

案例（2个老师带5个学生）：

```cpp
#include <iostream>
#include <string> 
#include <ctime> 
using namespace std;

struct Student
{
	string name;
	int score;
};

struct Teacher
{
	string name;
	Student students[3];
};

void allocateSpace(Teacher teachers[], int teacherTotal)
{
	string nameSeed = "ABCDEF";

	for (int i = 0; i < teacherTotal; i++)
	{
		string tname = "Teacher_" + to_string(i + 1);

		teachers[i].name = tname;

		for (int j = 0; j < 3; j++)
		{
			string sname = "Student_";
			sname += nameSeed[3 * i + j];

			teachers[i].students[j].name = sname;

			int score = rand() % 41 + 60;
			teachers[i].students[j].score = score;
		}
	}
}

void printInfo(Teacher teachers[], int teacherTotal)
{
	for (int i = 0; i < teacherTotal; i++)
	{
		cout << teachers[i].name << endl;;

		int studentTotal = 3;

		for (int j = 0; j < studentTotal; j++)
		{
			string sname = teachers[i].students[j].name;
			int score = teachers[i].students[j].score;
			cout << "\t" << sname << "\t" << score << endl;
		}
	}
}

int main()
{
	// 随机数种子
	srand((unsigned int)time(NULL));

	Teacher teachers[2];

	int teacherTotal = sizeof(teachers) / sizeof(teachers[0]);

	allocateSpace(teachers, teacherTotal);

	printInfo(teachers, teacherTotal);
	/*
	Teacher_1
					Student_A       86
					Student_B       75
					Student_C       98
	Teacher_2
					Student_D       84
					Student_E       86
					Student_F       92
	*/

	system("pause");
	return 0;
}
```

案例（给结构体数组排序）：

```cpp
#include <iostream>
#include <string> 
#include <ctime> 
using namespace std;

struct Student
{
	string name;
	int score;
};


void sort(Student students[], int num)
{
	for (int i = 0; i < num; i++)
	{
		for (int j = 0; j < num - i - 1; j++)
		{
			if (students[j].score > students[j + 1].score)
			{
				Student temp = students[j];
				students[j] = students[j + 1];
				students[j + 1] = temp;
			}
		}
	}
}

void printStudents(Student students[], int num)
{
	for (int i = 0; i < num; i++)
	{
		Student stu = students[i];
		cout << stu.name << "\t" << stu.score << endl;
	}
}


int main()
{
	Student students[5] = {
		{ "张三", 92},
		{ "李四", 93},
		{ "王五", 90},
		{ "赵六", 91},
		{ "钱七", 89}
	};

	int len = sizeof(students) / sizeof(students[0]);

	sort(students, len);

	printStudents(students, len);

	system("pause");
	return 0;
}
```