package com.fn.sb.hello.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // 等同于 @Controller + @ResponseBody
public class O2_Annotation {
    @GetMapping("/hello2") // @RequestMapping 的 GET 方法
    public String hello2(){
        return "@RequestMapping 的 GET 方法";
    }

    @PostMapping("/hello3") // @RequestMapping 的 POST 方法
    public String hello3(){
        return "@RequestMapping 的 POST 方法";
    }
}
