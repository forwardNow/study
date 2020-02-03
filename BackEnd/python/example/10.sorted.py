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
