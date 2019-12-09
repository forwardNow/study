package com.fn.sb.hello.controller;

import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value = "用户模块")
public class O3_API {
    private static Logger logger = LoggerFactory.getLogger(O3_API.class);

    @GetMapping("/pathVariable/get/{name}")
    public String pathVariable_get(@PathVariable String name) {
        String msg = "pathVariable_get:" + name;
        logger.info(msg);
        return msg;
    }
}
