print(int('110', base=2))  # 6

int_binary = lambda binary_num_str: int(binary_num_str, base=2)

print(int_binary('111'))  # 7

import functools
int_binary_2 = functools.partial(int, base=2) 

print(int_binary_2('1000'))  # 8