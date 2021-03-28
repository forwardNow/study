# C++ 核心编程

面向对象

## 1. 内存的分区模型

C++ 程序在执行时，将内存划分为 4 个区域

* 代码区： 存放函数体的二进制代码，由操作系统进行管理
* 全局区： 存放全局变量、静态变量、常量
* 栈区： 由编译器自动分配释放，存放函数的参数值、局部变量等
* 堆区： 由程序员分配和释放，若程序员不释放 则程序结束时由操作系回收

内存四区的意义：

* 不同区域存放的数据，赋予不同的生命周期，给我们更大的灵活性

### 1.1. 程序运行前

在程序编译后，生成了 exe 可执行程序，未执行该程序前分为两个区域

代码区：

* 存放 CPU 执行的机器指令
* 代码区是共享的，共享的目的是对于频繁被执行的程序，只需要在内存中有一份代码即可
* 代码区是只读的，使其只读的原因是防止程序意外地修改了它的指令

全局区：

* 全局变量和静态变量存放在此
* 全局区还包含了常量区，字符串常量和其他常量也存放在此
* 该区域的数据在程序结束后由操作系统释放
* 分类：
  * 全局变量
  * 静态变量 static
  * 常量： 字符串常量、const修饰的全局变量（全局常量）
* 总结：
  * C++中在程序运行前分为全局区和代码区
  * 代码区特点是共享和只读
  * 全局区中存放全局变量、静态变量、常量
  * 常量区中存放 const修饰的全局变量 和 字符串常量

### 1.2. 程序运行后

栈区：

* 由编译器自动分配释放，存放函数的参数值、局部变量等
* 注意事项：不要返回局部变量的地址，栈区开辟的数据由编译器自动释放

```cpp
// 不要返回局部变量的地址，局部变量被释放后，操作该地址的值就是非法了。
int * func() 
{
  int a = 10;
  return &a;
}
```

堆区：

* 有程序员分配释放，若程序员不释放，程序结束时由操作系统回收
* 在 C++ 中主要利用 new 在堆区开辟内存

```cpp
int* func()
{
	int* a = new int(10); // 初始值 10
	return a;
}

int main()
{
	int* p = func();

	cout << *p << endl; // 10

	system("pause");
	return 0;
}
```

### 1.3. new 操作符

C++ 中利用 new 操作符在堆区开辟数据

堆区开辟的数据，由程序员手动开辟、手动释放，释放利用操作符 delete

语法： `new 数据类型`

利用 new 创建的数据，会返回该数据对应的类型的指针

```cpp
#include <iostream>
using namespace std;

int* allocateIntHeapMemory()
{
	int* pNum = new int(10); // 初始值 10
	return pNum;
}

int* allocateIntArrHeapMemory() // 开辟数组
{
	int* pNumArr = new int[3]; // 3 个元素

	pNumArr[0] = 11;
	pNumArr[1] = 22;
	pNumArr[2] = 33;

	return pNumArr;
}

int main()
{
	int* pNum = allocateIntHeapMemory();

	cout << *pNum << endl;

	// 释放堆区的数据
	delete pNum;
  // cout << *pNum << endl; // 报错，释放的空间不可访问



	int* pNumArr = allocateIntArrHeapMemory();

	for (int i = 0; i < 3; i++)
	{
		cout << "pNumArr[" << i << "]: " << pNumArr[i] << endl;
	}
	
	// 释放堆区数组
	delete[] pNumArr;

	system("pause");
	return 0;
}
```

## 2. 引用

### 2.1. 引用的基本使用

作用： 给变量起别名

语法： `数据类型 &别名 = 原名`

示例：

```cpp
int main()
{
	int num = 1;
	int& numAlias = num;

	cout << "num: " << num << endl; // 1
	cout << "numAlias: " << numAlias << endl; // 1

	numAlias = 100;

	cout << "num: " << num << endl; // 100
	cout << "numAlias: " << numAlias << endl; // 100

	system("pause");
	return 0;
}
```