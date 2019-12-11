package com.fn.sb.hello.sys.controller;

import com.fn.sb.hello.sys.mapper.SysUserMapper;
import com.fn.sb.hello.sys.pojo.SysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SysUserController {

    @Autowired
    private SysUserMapper sysUserMapper;

    @GetMapping("/queryUserList")
    public List<SysUser> queryUserList() {
        List<SysUser> sysUserList = sysUserMapper.queryUserList();

        return sysUserList;
    }
}
