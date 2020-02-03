f = lambda k, v: k + '=' + v

person = {'name': 'zhangsan', 'age': '10'}

for k, v in person.items():
    print(f(k, v))
