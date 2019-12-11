package com.fn.sb.hello.sys.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SysUser {
    private String userId;
    private String userName;
    private String loginName;
    private String loginPwd;
    private String isEnable;
}
