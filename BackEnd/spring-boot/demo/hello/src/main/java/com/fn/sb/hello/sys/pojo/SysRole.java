package com.fn.sb.hello.sys.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SysRole {
    private String roleId;
    private String roleName;
    private String isEnable;
}
