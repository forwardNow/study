package com.fn.sb.hello.sys.mapper;

import com.fn.sb.hello.sys.pojo.SysUser;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper // 表示这是一个 mybatis 的 mapper 类
@Repository // 纳入 ioc
public interface SysUserMapper {
    List<SysUser> queryUserList();

//    User queryUserById(String userId);
}
