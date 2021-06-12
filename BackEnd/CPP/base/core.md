# C++ 核心编程

面向对象

## 1. 内存的分区模型

C++ 程序在执行时，将内存划分为 4 个区域

* 代码区： 存放程序的二进制代码，由操作系统进行管理
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

### 2.2. 引用注意事项

* 声明引用时必须初始化
* 引用在初始化后，不可以改变， 也就是说 &c 作为 a 的引用，不可以再作为 b 的引用

### 2.3. 引用做函数参数

作用： 函数传参时，可以利用引用的技术让形参修饰实参

优点： 可以简化指针修改实参

总结： 通过引用参数产生的效果同按地址传递是一样的，引用的语法更清楚简单。

```cpp
// num1（形参） 是 a（实参） 的别名，直接操作实参
void swap(int& num1, int& num2)
{
	int temp = num1;
	num1 = num2;
	num2 = temp;
}

int main()
{
	int a = 10;
	int b = 20;

	swap(a, b);

	cout << "a = " << a << endl; // 20
	cout << "b = " << b << endl; // 10

	system("pause");
	return 0;
}
```

### 2.4. 引用做函数返回值

作用： 引用是可以作为函数的返回值存在的

注意： 不要返回局部变量的引用

用于： 函数调用作为左值

```cpp
// 不要返回局部变量的引用
int& getLocalVarRef()
{
	int a = 10; // 局部变量，存放在栈区，函数执行完毕后就释放了
	return a;
}

int main()
{
	int& localVarRef = getLocalVarRef();

	// 第一次结果正确，因为编译器做了保留
	cout << "localVarRef = " << localVarRef << endl; // 10

	// 第二次结果错误，因为 a 的内存已经释放了
	cout << "localVarRef = " << localVarRef << endl; // 2027456904

	system("pause");
	return 0;
}
```

```cpp
// 如果函数的返回值是引用，这个函数调用可以作为左值
int& getStaticVarRef()
{
	static int a = 10; // 静态变量，存放在全局区，程序结束后由系统释放
	return a;
}

int main()
{
	int& staticVarRef = getStaticVarRef();

	cout << "staticVarRef = " << staticVarRef << endl; // 10
	cout << "staticVarRef = " << staticVarRef << endl; // 10

	staticVarRef = 20;

	cout << "staticVarRef = " << staticVarRef << endl; // 20

	// 函数调用作为 左值
	getStaticVarRef() = 30;

	cout << "staticVarRef = " << staticVarRef << endl; // 30

	system("pause");
	return 0;
}

```

### 2.5. 引用的本质

本质： 引用的本质在 C++ 内部实现是一个指针常量（指向不可变，指向的值可变）

结论： C++ 推荐引用技术，因为语法方便，引用本质是指针常量，但是所有的指针操作编译器都帮我们做了

```cpp
// 发现是引用，转换为 int* const ref = &a;
void func(int& ref)
{
	ref = 30; // ref 是引用，转换为 *ref = 30
}

int main()
{
	int a = 10;

	// 自动转换为 int* const ref = &a;
	// 指针常量指针指向不可改，这也说明为什么引用不可更改
	int& ref = a;

	cout << "a = " << a << endl; // 10

	// 内部发现 ref 是引用，自动转换为： *ref = 20;
	ref = 20;

	cout << "a = " << a << endl; // 20

	func(a);

	cout << "a = " << a << endl; // 30

	system("pause");
	return 0;
}
```

### 2.6. 常量引用

作用： 常量引用主要用来修饰形参，防止误操作

在函数形参列表中，可以加 const 修饰形参，防止形参改变实参

```cpp
int main()
{
	// 引用本身需要一个合法的内存空间，因此这行错误
	// int& ref = 10; 

	// 加上 const 就可以了，因为编译器优化代码，如下：
	// int temp = 10;
	// const int& ref = temp;
	const int& ref = 10;

	// 使用 const 修饰后，不可以修改变量
	// ref = 100;

	system("pause");
	return 0;
}
```

```cpp
// 引用使用的场景，通常用来修饰形参
void showValue(const int& val)
{
	// 不可以修改 val 的值
	// val = 100;

	cout << val << endl;
}

int main()
{
	int a = 10;

	showValue(a);

	system("pause");
	return 0;
}
```

## 3. 函数提高

### 3.1. 函数默认参数

在 C++ 中，函数的形参列表中的形参是可以有默认值的。

语法： `返回值类型 函数名(参数 = 默认值) {}`

注意：

* 默认参数只能放在参数列表的末尾，从右往左挨个放置默认参数
* 如何函数声明有默认参数，函数实现就不能有

```cpp
int sum(int num1, int num2, int num3 = 30);

int sum(int num1, int num2, int num3)
{
	return num1 + num2 + num3;
}

int main()
{
	cout << sum(10, 20) << endl;
	system("pause");
	return 0;
}
```

### 3.2. 函数占位参数

C++ 中函数的形参列表里可以有占位参数，用来做占位，调用函数时必须填补该位置

语法： `返回值类型 函数名(数据类型) {}`

```cpp
// 函数占位参数，占位参数也可以有默认参数： int = 20
void func(int a, int)
{
	cout << "this is a func" << endl;
}

int main()
{
	func(10, 20);

	system("pause");
	return 0;
}
```

### 3.3. 函数重载

作用： 函数名可以相同，提高复用性

函数重载满足条件：

* 同一个作用域下
* 函数名称相同
* 参数列表不同： 函数参数类型不同 或者 个数不同 或者 顺序不同

注意： 函数的返回值不能作为函数重载的条件

```cpp
void func()
{
	cout << "func()" << endl;
}

void func(int a)
{
	cout << "func(int a)" << endl;
}

int main()
{
	func();
	func(1);

	system("pause");
	return 0;
}
```

注意事项：

* 引用作为重载条件
* 函数重载碰到函数默认参数

```cpp
// 引用作为重载条件

void func(int &a) // int &a = 10; 不合法
{
	cout << "func(int &a)" << endl;
}

void func(const int& a) // const int &a = 10; 合法
{
	cout << "func(const int &a)" << endl;
}

int main()
{
	int a = 10;
	func(a); // 调 func(int &a)

	func(10); // 调 func(const int& a)

	system("pause");
	return 0;
}
```

```cpp
// 函数重载碰到函数默认参数

void func(int a, int b = 20)
{
	cout << "func(int a, int b = 20)" << endl;
}

void func(int a)
{
	cout << "func(int a)" << endl;
}

int main()
{
	// 碰到默认参数产生歧义，需要避免
	// func(10); 

	func(10, 20); // 这个没有二义性

	system("pause");
	return 0;
}
```

## 4. 类和对象

C++ 面向对象的三大特性为： 封装、继承、多态

C++ 认为万事万物都皆为对象，对象上有其属性和行为

例如：

* 人可以作为对象，属性有 姓名、年龄，行为有 走、跑
* 车可以作为对象，属性有 轮胎、方向盘，行为有 载入、放音乐
* 具有相同性质的对象，可以抽象为类，人属于人类，车属于车类

### 4.1. 封装

封装是 C++ 面向对象三大特性之一

#### 4.1.1. 封装的意义

* 将属性和行为作为一个整体，表现生活中的事物
* 将属性和行为加以权限控制

语法：`class 类名{ 访问权限: 属性 / 行为 };`

说明：

* 类中的属性和行为，我们统一称为 成员
* 属性： 成员属性、成员变量
* 行为： 成员函数、成员方法

```cpp
class Student
{
public:
	string m_Name;

	string getName()
	{
		return m_Name;
	}

	void setName(string name)
	{
		m_Name = name;
	}
};

int main()
{
	Student stu;
	stu.setName("张三");

	cout << stu.getName() << endl;

	system("pause");
	return 0;
}
```

访问权限有三种：

* public 		公共权限 类内可以访问 	类外可以访问		子类可以访问
* protected 保护权限 类内可以访问 	类外不可以访问	子类可以访问
* private 	私有权限 类内不可以访问 类外不可以访问  子类不可以访问

```cpp
class Person
{

public:
	string m_Name;

protected:
	string m_Car = "拖拉机";

private:
	string m_Password = "123456";

public:
	void show() {
		cout << m_Name << endl;
		cout << m_Car << endl;
		cout << m_Password << endl;
	}
};

int main()
{
	Person p;

	p.m_Name = "张三";
	p.show();

	system("pause");
	return 0;
}
```

#### 4.1.2. struct 和 class 的区别

在 C++ 中 struct 和 class 的唯一区别就在于默认的访问权限不同

区别：

* struct 默认权限为 公共
* class 默认权限为 私有

```cpp
class StuClass
{
	string m_Name; // 私有
};

struct StuStruct
{
	string m_Name; // 公有
};
```

#### 4.1.3. 成员属性设置为私有

优点：

* 将所有成员属性设置为私有，可以自己控制读写权限
* 对于写权限，我们可以检测数据的有效性

```cpp
class Person
{
public:
	string getName()
	{
		return m_Name;
	}
	void setName(string name)
	{
		if (name == "张三")
		{
			cout << "“张三” 是保留字" << endl;
			return;
		}
		m_Name = name;
	}
private:
	string m_Name = "unnamed";
};

int main()
{
	Person p;
	p.setName("张三");

	cout << p.getName() << endl;

	system("pause");
	return 0;
}
```

#### 4.1.4. 拆分类

说明：

* 声明（.h）和实现（.cpp）

代码：

* teacher.h :

	```cpp
	#pragma once
	#include <string>
	using namespace std;

	class Teacher
	{
	private:
		string m_Name;

	public:
		string getName();
		void setName(string name);
	};
	```

* teacher.cpp :

	```cpp
	#include "teacher.h"

	string Teacher::getName()
	{
		return m_Name;
	}

	void Teacher::setName(string name)
	{
		m_Name = name;
	}
	```

* student.h :

	```cpp
	#pragma once
	#include <string>
	#include <iostream>
	using namespace std;

	#include "teacher.h"

	class Student
	{
	private:
		string m_Name;
		Teacher m_Teacher;

	public:
		string getName();
		void setName(string name);
		Teacher getTeacher();
		void setTeacher(Teacher teacher);
	};
	```

* student.cpp :

	```cpp
	#include "student.h"
	#include <iostream>
	using namespace std;

	string Student::getName()
	{
		return m_Name;
	}

	void Student::setName(string name)
	{
		m_Name = name;
	}


	void Student::setTeacher(Teacher teacher)
	{
		m_Teacher = teacher;
	}

	Teacher Student::getTeacher()
	{
		return m_Teacher;
	}
	```

* main :

	```cpp
	#include <iostream>
	using namespace std;
	#include "student.h";
	#include "teacher.h";

	int main()
	{
		Teacher t;
		t.setName("李四老师");

		Student stu;
		stu.setName("张三");
		stu.setTeacher(t);

		cout << stu.getName() << " 的老师是：" << stu.getTeacher().getName() << endl;

		system("pause");
		return 0;
	}
	```

### 4.2. 对象的初始化和清理

生活中我们买的电子产品都基本会有出厂设置，在某一天我们不用的时候也会删除一些自己的信息数据以保证安全

C++ 中的面向对象来源于生活，每个对象也都会有初始设置以及对象销毁前的清理数据的设置。

#### 4.2.1. 构造函数和析构函数

对象的初始化和清理也是两个非常重要的安全问题

* 一个对象或者变量没有初始状态，对其使用后果未知
* 使用完一个对象或变量，没有及时清理，也会造成一定的安全问题

C++ 利用了构造函数和析构函数解决上述问题，这两个函数将会被编译器自动调用，完成对象初始化和清理工作。

对象的初始化和清理工作是编译器强制要我们做的事情，因此如果我们不提供构造和析构，编译器会提供空实现的构造函数和析构函数。

* 构造函数： 主要作用在于创建对象时为对象的成员属性赋值，构造函数由编译器自动调用，无须手动调用。
* 析构函数： 主要作用在于对象销毁前系统自动调用，执行一些清理工作。

构造函数语法： `类名() {}`

* 没有返回值
* 函数名和类名相同
* 可以有参数，可以重载
* 创建对象时，由程序自动调用一次（仅调用一次），无须手动调用

析构函数语法： `~类名() {}`

* 没有返回值
* 函数名称由 “~” 和 类名 组成
* 不可以由参数，不能重载
* 销毁对象时，由程序自动调用一次（仅调用一次），无须手动调用

```cpp
class Person
{
public:
	Person()
	{
		cout << "执行 构造函数" << endl;
	}

	~Person()
	{
		cout << "执行 析构函数" << endl;
	}
};

void test()
{
	Person p;
}

int main()
{
	test();

	system("pause");
	return 0;
}
```

#### 4.2.2. 构造函数的分类及调用

两种分类方式：

* 按参数分为： 有参构造 和 无参构造
* 按类型分为： 普通构造 和 拷贝构造

三种调用方式：

* 括号法
* 显式法
* 隐式转换法

注意：

* 无参构造函数不要加 “()”，否则编译器会认为是函数声明
* 不要使用拷贝构造函数 初始化匿名对象，编译器认为 `Person(p3) <==> Person p3` 重命名

```cpp
class Person
{
private:
	int m_Age;

public:
	Person()
	{
		m_Age = 18;
		cout << "执行 无参 普通 构造函数" << endl;
	}

	Person(int age)
	{
		m_Age = age;
		cout << "执行 有参 普通 构造函数" << endl;
	}

	Person(const Person& p)
	{
		m_Age = p.m_Age;
		cout << "执行 拷贝 构造函数" << endl;
	}

	~Person()
	{
		cout << "执行 析构函数" << endl;
	}
};

void callParameterlessConstructor()
{
	// 调用无参构造函数（默认构造函数）
	// 注意：不要加“()”
	// Person p(); // 编译器会被认为是函数声明
	Person p;
}

void callParameterizedConstructor()
{
	// 括号法 调用
	Person p(10);
}


void callCopyConstructor()
{
	// 括号法 调用
	Person p(10);

	// 括号法 调用 拷贝构造函数
	Person p2(p);
}

// 显式调用
void explicitCall()
{
	// 匿名构造函数，当前行执行完毕后，系统会立刻回收匿名对象
	Person();

	Person p = Person();
	Person p2 = Person(10);
	Person p3 = Person(p);
}

// 隐式转换法
void implicitTransformation()
{
	Person p = 10;
	Person p2 = p;
}

int main()
{
	//callParameterlessConstructor();
	//callParameterizedConstructor();
	//callCopyConstructor();
	//explicitCall();
	implicitTransformation();

	system("pause");
	return 0;
}
```

#### 4.2.3. 拷贝构造函数调用时机

C++ 中拷贝构造函数调用时机通常有三种情况：

* 使用一个已经创建完毕的对象来初始化一个新对象

	```cpp
	// 调用无参构造函数
	Person p;
	// 调用 拷贝构造函数
	Person p2(p1);
	```

* 值传递的方式给函数参数传值

	```cpp
	// 给新参赋值时，会调用拷贝构造函数 创建一个新的 Person 对象，
	// 此时会调用拷贝构造函数
	void func(Person p)
	{
		// do nothing
	}

	int main()
	{
		Person p(10);
		func(p);

		return 0;
	}
	```

* 以值方式返回局部对象

	```cpp
	Person func()
	{
		Person p;
		cout << "func()中 p 的地址： " << (int*) &p << endl;
		
		// 此时会调用 拷贝构造函数 创建一个新的对象返回
		return p;
	}

	int main()
	{
		Person p = func();
		cout << "main()中 p 的地址： " << (int*) &p << endl;
		return 0;
	}
	```

#### 4.2.4. 构造函数调用规则

默认情况下，C++ 编译器至少给一个类添加 3 个函数：

1. 默认构造函数（无参，函数体为空）
2. 默认析构函数（无参，函数体为空）
3. 默认拷贝构造函数，对属性进行值拷贝

构造函数调用规则如下：

* 如果用户定义有参构造函数
	* C++ 不再提供默认无参构造， 但是会提供默认拷贝构造
* 如果用户定义拷贝构造函数
	* C++ 不会再提供其他构造函数（有参或无参构造函数）

#### 4.2.5. 深拷贝和浅拷贝

浅拷贝： 简单的赋值拷贝操作

深拷贝： 在堆区重新申请空间，进行拷贝操作

浅拷贝带来 重复释放堆区内存 的问题： 

```cpp
class Person
{
private:
	int* m_Height;

public:

	Person(int age, int height)
	{
		cout << "执行 有参 普通 构造函数" << endl;
		m_Height = new int(height);
	}

	// 通过深拷贝，解决这个问题：
	Person(const Person &p)
	{
		m_Height = new int(*p.m_Height);
	}

	~Person()
	{
		cout << "执行 析构函数" << endl;
		if (m_Height != NULL)
		{
			delete m_Height;
			m_Height = NULL;
		}
	}
};

// 栈，后进先出，p2 先释放，p1 再释放
void test()
{
	Person p1(160); // p1 后解构，再去释放 m_Height 就报错了

	Person p2(p1); // p2 先解构，把 m_Height 释放掉了 
}


int main()
{
	test();
	system("pause");
	return 0;
}
```

如果属性有在堆区开辟的，一定要自己提供拷贝构造函数，防止浅拷贝带来的问题。

#### 4.2.6. 初始化列表

作用： C++ 提供了初始化列表语法，用来初始化属性。

语法：`构造函数(): 属性1(值1), 属性2(值2) ... {}`

示例：

```cpp
class Person
{
public:
	int m_A;
	int m_B;
	int m_C;

	Person() : m_A(101), m_B(102), m_C(103)
	{}

	Person(int a, int b, int c) : m_A(a), m_B(b), m_C(c) 
	{}

	void print(string prefix = "person.")
	{
		cout << prefix << "m_A = " << m_A << endl;
		cout << prefix << "m_B = " << m_B << endl;
		cout << prefix << "m_C = " << m_C << endl;
	}
};

int main()
{
	Person p1;
	Person p2(201, 202, 203);

	p1.print("p1.");
	p2.print("p2.");

	system("pause");
	return 0;
}
```

#### 4.2.7. 类对象作为类成员

说明： C++ 类中的成员可以是另一个类的对象，称之为 对象成员。

例如：

```cpp
class A {}

class B
{
	A a;
}
```

B 类中有对象 A 作为成员，A 为对象成员。

那么当创建 B 对象时，A 与 B 的构造和析构的顺序是怎样的？

```cpp

class Phone
{
public:
	string m_PName;
	Phone(string pName)
	{
		m_PName = pName;
		cout << "Phone 构造" << endl;
	}
	~Phone() 
	{
		cout << "Phone 析构" << endl;
	}
};

class Person
{
public:
	Phone m_Phone;
	// 隐式转换： 
	// string pName = "华为P40";
	// Phone p = pName;
	Person(string pName): m_Phone(pName)
	{
		cout << "Person 构造" << endl;
	}
	~Person()
	{
		cout << "Person 析构" << endl;
	}
};

void test()
{
	Person p("华为P40");

	cout << p.m_Phone.m_PName << endl;

	// 隐式转换
	//string phoneName = "华为P20";
	//Phone phone = phoneName;
	//cout << phone.m_PName << endl;
}

int main()
{
	test();
	system("pause");
	return 0;
}
```

构造： 先构造其他类（依赖类），在构造自身
析构： 先析构自身，再析构其他类

#### 4.2.8. 静态成员

在 成员变量或成员函数 前加上 static 关键字，就是静态成员。

静态成员分为：

* 静态成员变量

	* 所有对象共享用一份数据
	* 在编译阶段分配内存
	* 类内声明，类外初始化

* 静态成员函数

	* 所有对象共享同一个函数
	* 静态成员函数只能访问静态成员变量

访问静态成员的方式：

* 通过对象

	```cpp
	Person p;

	p.staticVar = 1;
	p.staticFunc();
	```

* 通过类名

	```cpp
	Person::staticFunc();
	Person::staticVar = 1;
	```

示例：

```cpp
class Person
{
public:
	// 在类内声明
	static int m_Desc;
	
	static int getDesc()
	{
		return m_Desc;
	}
};

// 在类外初始化
int Person::m_Desc = 1;

void test()
{
	Person p;

	cout << p.m_Desc << endl;
	cout << Person::m_Desc << endl;

	cout << p.getDesc() << endl;
	cout << Person::getDesc() << endl;
}

int main()
{
	test();
	system("pause");
	return 0;
}
```

### 4.3. C++ 对象模型和 this 指针

#### 4.3.1. 成员变量和成员函数分开存储

在 C++ 中，类内的成员变量和成员函数分开存储

只有非静态成员变量才属于类的对象上

空对象：

```cpp
class Person
{
};

void test()
{
	Person p;
	
	// 空对象占用 1 字节空间
	// 每个对象所占用的内存位置都不同，
	// 每个空对象都会分配 1 字节内存空间，用于占位
	cout << "size of p = " << sizeof(p) << endl; // 1
}

int main()
{
	test();
	system("pause");
	return 0;
}
```

非静态成员变量：

```cpp
class Person
{
	// 非静态成员变量，属于类的对象
	int m_A;
};

void test()
{
	Person p;
	
	cout << "size of p = " << sizeof(p) << endl; // 4
}
```

静态成员变量：

```cpp
class Person
{
	// 非静态成员变量，属于类的对象
	int m_A;

	// 静态成员变量，不属于类对象
	static int m_B;
};

int Person::m_B = 1;

void test()
{
	Person p;
	
	cout << "size of p = " << sizeof(p) << endl; // 4
}
```

非静态成员函数：

```cpp
class Person
{
	// 非静态成员变量，属于类的对象
	int m_A;

	// 非静态成员函数，不属于类对象
	void func() {}
};

void test()
{
	Person p;
	
	cout << "size of p = " << sizeof(p) << endl; // 4
}
```

静态成员函数：

```cpp
class Person
{
	// 非静态成员变量，属于类的对象
	int m_A;

	// 静态成员函数，不属于类对象
	static void func() {}
};

void test()
{
	Person p;
	
	cout << "size of p = " << sizeof(p) << endl; // 4
}
```

#### 4.3.2. this 指针概念

C++ 中成员变量和成员函数是分开存储的

每个非静态成员函数只会诞生一份函数实例，也就是说多个同类型的对象会共用一块代码

那么问题是： 这一块代码是如何区分哪个对象调用自己的呢？

C++通过提供特殊的对象指针， this 指针，解决上述问题。this指针指向被调用的成员函数所属的对象。

this指针是隐含在每个非静态成员函数内的一种指针

this指针不需要定义，直接使用即可。

this指针的用途：

* 当形参和成员变量名同名时，可用 this 指针来区分
* 在类的非静态成员函数中返回对象本身，可使用 `return *this`

示例：

```cpp
class Person
{
public:
	Person(int age)
	{
		// 区分名称空间
		this->age = age;
	}

	Person& addAge(int age)
	{
		this->age += age;
		// 返回对象本身
		return *this;
	}

	int age;
};

void test()
{
	Person p(18);
	
	cout << p.age << endl; // 18

	p.addAge(1).addAge(2).addAge(3).addAge(4);

	cout << p.age << endl; // 28
}

int main()
{
	test();
	system("pause");
	return 0;
}
```

#### 4.3.3. 空指针访问成员函数

C++ 中空指针也是可以调用成员函数的，但是也要注意有没有用到 this 指针

如果用到 this 指针，需要加以判断保证代码的健壮性

示例：

```cpp
class Person
{
public:
	int age;
	
	void printClassName()
	{
		cout << "Person" << endl;
	}

	void printPersonAge()
	{
		if (this == NULL)
		{
			return;
		}
		// this 为 NULL 时会报 nullptr 错误
		cout << this->age << endl;
	}
};

void test()
{
	Person* p = NULL;

	p->printClassName(); // Person
	p->printPersonAge(); // 返回
}
```

#### 4.3.4. const 修饰成员函数

常函数：

* 成员函数后加 const 后，我们称这个函数为 常函数
* 常函数 内不可以修改成员属性
* 成员属性声明时加关键字 mutable 后，在常函数中依然可以修改

常对象：

* 声明对象前加 const 称该对象为 常对象
* 常对象只能调用常函数

示例：

```cpp
class Person
{
public:
	int m_A;

	// 特殊变量，在常函数中，也可以修改这个值
	mutable int m_B;
	
	// this 指针的本质是指针常量：
	//	   Person * const this; // 指针的指向是不可以修改的
	// 在成员函数后加 const，让指针的指向的值也不可能修改：
	// 	   const Person * const this;
	//
	void changeA() const
	{
		// this->m_A = 100; // 不可以修改
	}

	void changeB() const
	{
		 this->m_B = 100;
	}

	void showPerson()
	{}
};

void test()
{
	// 常对象
	const Person p;

	//p.m_A = 100; // 不可以修改普通成员变量
	//p.showPerson(); // 不可以调用普通成员函数

	p.m_B = 200;
	p.changeA();
}

int main()
{
	test();
	system("pause");
	return 0;
}
```

### 4.4. 友元

生活中你的家有客厅（public），卧室（private）。

客厅，所有客人都可以进去；卧室，只有你才可以进去，但是你可以允许你的好朋友进去。

在程序里，有些私有属性也想让类外特殊的一些函数或者类进行访问，就需要用到友元的技术。

友元的目的是让一个函数或者类 访问另一个类中私有成员。

友元的关键字是 `friend`

友元的三种实现：

* 全局函数做友元
* 类做友元
* 成员函数做友元

#### 4.4.1. 全局函数做友元

```cpp
class House
{
	// 全局函数 做友元： 把方法声明放这里就可以了
	friend void test();

public:
	House() 
	{
		this->m_Bedroom = "私密空间";
	}

private:
	string m_Bedroom;
};

void test()
{
	House house;

	cout << house.m_Bedroom << endl;
}

int main()
{
	test();
	system("pause");
	return 0;
}
```