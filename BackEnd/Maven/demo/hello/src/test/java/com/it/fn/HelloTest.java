package com.it.fn;
import org.junit.Test;
import junit.framework.Assert;

public class HelloTest {
    @Test
    public void testHello() {
        Hello hello = new Hello();
        String result = hello.sayHello("zhangsan");
        Assert.assertEquals("hello zhangsan", result);
    }
}
