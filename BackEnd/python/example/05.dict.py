person = {
    'name': '张三',
    'age': 18
}

# 根据 key 获取 value
print(person['name'])

# 获取不存在的值返回 None
print(person.get('id'))  # None

# 判断属性 'id' 是否在 person 中
print('id' in person)  # False

# key 不存在，报错
# print(person['id'])

# 动态添加属性
person['id'] = 1

print(person)

# 删除 key
person.pop('id')

print(person)
