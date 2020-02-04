class Student(object):

    def __init__(self, name, score):
        self.name = name
        self.score = score

    def print_score(self):
        print('%s: %s' % (self.name, self.score))


zhangSan = Student('张三', 88)
lisi = Student('lisi', 99)

zhangSan.print_score()  # 张三: 88
lisi.print_score()  # lisi: 99
