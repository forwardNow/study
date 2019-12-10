package com.fn.sb.hello.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String userId;
    private String userName;
    private String loginName;
    private String loginPwd;
    private String isEnable;
}
