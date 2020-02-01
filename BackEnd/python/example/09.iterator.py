from collections.abc import Iterable

my_list = [1, 2, 3]
if isinstance(my_list, Iterable):
    for item in my_list:
        print(item)

my_tuple = (4, 5, 6)
if isinstance(my_tuple, Iterable):
    for item in my_tuple:
        print(item)

my_str = 'abc'
if isinstance(my_str, Iterable):
    for item in my_str:
        print(item)

my_dict = {'name': 'wqf', 'age': 18}
if isinstance(my_dict, Iterable):
    for key in my_dict:
        print('key =', key)
    for val in my_dict.values():
        print('val =', val)
    for k, v in my_dict.items():
        print('key-val =', k, v)
