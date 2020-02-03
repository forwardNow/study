import functools

def log(before_text, after_text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print('---- %s() %s ----' % (func.__name__, before_text))
            ret = func(*args, **kw)
            print('---- %s() %s ----' % (func.__name__, after_text))
            return ret
        return wrapper
    return decorator


@log('begin', 'end')
def my_fn():
    print('哇哈哈')


my_fn()
