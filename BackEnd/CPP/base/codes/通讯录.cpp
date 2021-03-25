#include<iostream>
using namespace std;
#include<string>

#define MAX 10

struct Person
{
	string m_Name;
	int m_Sex;
	int m_Age;
	string m_Phone;
	string m_Addr;
};

struct AddressBooks
{
	struct Person personArray[MAX];
	int m_Size;
};

void showMenu()
{
	cout << "***************************" << endl;
	cout << "*****  1、添加联系人  *****" << endl;
	cout << "*****  2、显示联系人  *****" << endl;
	cout << "*****  3、删除联系人  *****" << endl;
	cout << "*****  4、查找联系人  *****" << endl;
	cout << "*****  5、修改联系人  *****" << endl;
	cout << "*****  6、清空联系人  *****" << endl;
	cout << "*****  0、退出通讯录  *****" << endl;
	cout << "***************************" << endl;
}

void addPerson(AddressBooks* addressBooks)
{
	string m_Name;
	int m_Sex;
	int m_Age;
	string m_Phone;
	string m_Addr;

	int m_Size = addressBooks->m_Size;

	cout << "请输入姓名：" << endl;
	cin >> m_Name;
	addressBooks->personArray[m_Size].m_Name = m_Name;

	cout << "请输入性别（1 - 男；2 - 女）：" << endl;
	while (true)
	{
		cin >> m_Sex;
		if (m_Sex == 1 || m_Sex == 2)
		{
			addressBooks->personArray[m_Size].m_Sex = m_Sex;
			break;
		}
		cout << "请输入正确的年龄！" << endl;
	}

	cout << "请输入年龄：" << endl;
	cin >> m_Age;
	addressBooks->personArray[m_Size].m_Age = m_Age;

	cout << "请输入电话：" << endl;
	cin >> m_Phone;
	addressBooks->personArray[m_Size].m_Phone = m_Phone;

	cout << "请输入地址：" << endl;
	cin >> m_Addr;
	addressBooks->personArray[m_Size].m_Addr = m_Addr;

	addressBooks->m_Size++;

	cout << "添加成功！" << endl;
	system("pause");
	system("cls");
}

void showPerson(AddressBooks* addressBooks)
{
	int m_Size = addressBooks->m_Size;

	if (m_Size == 0)
	{
		cout << "联系人为空！" << endl;
		system("pause");
		system("cls");
		return;
	}

	for (int i = 0; i < m_Size; i++)
	{
		Person person = addressBooks->personArray[i];
		cout << "姓名=" << person.m_Name << "\t"
			<< "性别=" << (person.m_Sex == 1 ? "男" : "女") << "\t"
			<< "年龄=" << person.m_Age << "\t"
			<< "电话=" << person.m_Phone << "\t"
			<< "地址=" << person.m_Addr << endl;
	}
	system("pause");
	system("cls");
}

int findPersonIndex(AddressBooks* addressBooks, string name)
{
	for (int i = 0; i < addressBooks->m_Size; i++)
	{
		if (addressBooks->personArray[i].m_Name == name)
		{
			return i;
		}
	}
	return -1;
}

void findPerson(AddressBooks* addressBooks)
{
	string m_Name;
	cout << "请输入要查找人的姓名：" << endl;
	cin >> m_Name;

	int index = findPersonIndex(addressBooks, m_Name);

	if (index == -1)
	{
		cout << "不存在此人" << endl;
		system("pause");
		system("cls");
		return;
	}
	Person person = addressBooks->personArray[index];

	cout << "姓名=" << person.m_Name << "\t"
		<< "性别=" << (person.m_Sex == 1 ? "男" : "女") << "\t"
		<< "年龄=" << person.m_Age << "\t"
		<< "电话=" << person.m_Phone << "\t"
		<< "地址=" << person.m_Addr << endl;
	system("pause");
	system("cls");
}

void deletePerson(AddressBooks* addressBooks)
{
	string m_Name;
	cout << "请输入要删除人的姓名：" << endl;
	cin >> m_Name;

	int index = findPersonIndex(addressBooks, m_Name);

	if (index == -1)
	{
		cout << "不存在此人" << endl;
		system("pause");
		system("cls");
		return;
	}

	for (int i = index; i < addressBooks->m_Size; i++)
	{
		addressBooks->personArray[i] = addressBooks->personArray[i + 1];
	}

	addressBooks->m_Size--;

	cout << "删除成功" << endl;
	
	system("pause");
	system("cls");
}

void modifyPerson(AddressBooks* addressBooks)
{
	string m_Name;
	int m_Sex;
	int m_Age;
	string m_Phone;
	string m_Addr;

	int index = -1;

	while (true)
	{
		cout << "请输入要修改人的姓名：" << endl;
		cin >> m_Name;
	
		index = findPersonIndex(addressBooks, m_Name);

		if (index != -1)
		{
			break;
		}
		cout << "不存在此人" << endl;
	}

	cout << "请输入姓名：" << endl;
	cin >> m_Name;
	addressBooks->personArray[index].m_Name = m_Name;

	cout << "请输入性别（1 - 男；2 - 女）：" << endl;
	while (true)
	{
		cin >> m_Sex;
		if (m_Sex == 1 || m_Sex == 2)
		{
			addressBooks->personArray[index].m_Sex = m_Sex;
			break;
		}
		cout << "请输入正确的性别！" << endl;
	}

	cout << "请输入年龄：" << endl;
	cin >> m_Age;
	addressBooks->personArray[index].m_Age = m_Age;

	cout << "请输入电话：" << endl;
	cin >> m_Phone;
	addressBooks->personArray[index].m_Phone = m_Phone;

	cout << "请输入地址：" << endl;
	cin >> m_Addr;
	addressBooks->personArray[index].m_Addr = m_Addr;


	cout << "添加成功！" << endl;
	system("pause");
	system("cls");
}

void emptyPerson(AddressBooks* addressBooks)
{
	bool isConfirm = false;

	cout << "确认清空：" << endl;
	cin >> isConfirm;

	if (isConfirm == 1)
	{
		addressBooks->m_Size = 0;
		cout << "已清空" << endl;
	}

	system("pause");
	system("cls");
}

int main()
{
	int select = 0;

	AddressBooks addressBooks;

	addressBooks.m_Size = 0;

	while (true)
	{
		showMenu();

		cin >> select;

		switch (select)
		{
		case 1: // 添加
			addPerson(&addressBooks);
			break;
		case 2: // 显示
			showPerson(&addressBooks);
			break;
		case 3: // 删除
			deletePerson(&addressBooks);
			break;
		case 4: // 查找
			findPerson(&addressBooks);
			break;
		case 5: // 修改
			modifyPerson(&addressBooks);
			break;
		case 6: // 清空
			emptyPerson(&addressBooks);
			break;
		case 0:
			cout << "欢迎下次使用" << endl;
			system("pause");
			return 0;
			break;
		default:
			break;
		}
	}

	return 0;
}