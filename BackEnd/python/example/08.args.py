def fn_default_arg(x, y=2):
    print(x, y)


fn_default_arg(1)  # 1 2


def fn_args(*args):
    for arg in args:
        print(arg)


fn_args(3, 4)
# 3
# 4


def fn_args_2(x, y):
    print(x, y)


fn_args_2(*[5, 6])  # 5 6
fn_args_2(*(7, 8))  # 7 8


#  kw 是 dict 类型
def fn_kw(x, **kw):
    print(x, kw)


fn_kw(9, name='吴钦飞', age=18)  # 9 {'name': '吴钦飞', 'age': 18}
fn_kw(11, **{'name': '张三', 'age': 19})


def fn_named_kw(x, *, name, age):
    print(x, name, age)


fn_named_kw(10, name='张三', age=20)

