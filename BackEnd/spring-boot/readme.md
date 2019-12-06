# spring boot

## 1. 参考

* [稀客大大 - springboot](https://zed058.cn/code/dev/springboot-00%E8%AF%BE%E5%89%8D%E5%87%86%E5%A4%87.html#_1%E3%80%81spring-boot-%E7%AE%80%E4%BB%8B)
* [【spring boot】2019年最新版springboot2.1+IDEA](https://www.bilibili.com/video/av39775932?from=search&seid=15792996901631099901)
* [IDEA构建Maven+springboot+mybatis项目](https://blog.csdn.net/a290270915/article/details/79176859)

## 2. 环境

SpringBoot2.0 环境约束

* jdk1.8+
* maven 3.3+
* SpringBoot 2.1.1.RELEASE

## 3. 搭建

通过 `New Project` 选择 `Spring Initializr` 创建 spring boot 项目。

由于网络原因，需要反复多次，才能创建成功。

## 4. banner

1. 在 idea 插件市场安装 [`figlet` 插件](https://plugins.jetbrains.com/plugin/12005-figlet)
2. 创建文件 `src/main/resources/banner.txt`
3. 在编辑器里选中文本，使用菜单 `Code -> Generate` 选择 `ASCII Art...`
4. 选择字体样式

  ```text
  ${AnsiColor.BLUE}

  ██╗  ██╗███████╗██╗     ██╗      ██████╗     ███████╗██████╗
  ██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ██╔════╝██╔══██╗
  ███████║█████╗  ██║     ██║     ██║   ██║    ███████╗██████╔╝
  ██╔══██║██╔══╝  ██║     ██║     ██║   ██║    ╚════██║██╔══██╗
  ██║  ██║███████╗███████╗███████╗╚██████╔╝    ███████║██████╔╝
  ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝     ╚══════╝╚═════╝

  -----版本号-----${spring-boot.version}
  ```
