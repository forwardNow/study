package com.fn.sb.hello.mapper;

import com.fn.sb.hello.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper // 表示这是一个 mybatis 的 mapper 类
@Repository // 纳入 ioc
public interface UserMapper {
    List<User> queryUserList();

//    User queryUserById(String userId);
}
