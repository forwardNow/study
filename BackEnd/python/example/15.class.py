class Student(object):

    def __init__(self, name, score):
        self.__name = name
        self.__score = score

    def get_name(self):
        return self.__name

    def get_score(self):
        return self.__score


zhangSan = Student('张三', 88)

print(zhangSan.get_name(), zhangSan.get_score())
