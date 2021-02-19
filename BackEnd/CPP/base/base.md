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
