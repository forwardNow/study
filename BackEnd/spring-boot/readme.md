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

创建项目的方式：

* SPRING INITIALIZR：通过IDEA或者STS工具创建INITIALIZR项目
  * 通过 `New Project` 选择 `Spring Initializr` 创建 spring boot 项目。
  * 由于网络原因，需要反复多次，才能创建成功。
* 创建Maven项目手动添加依赖
* 通过 [https://start.spring.io/](https://start.spring.io/) 生成定制项目

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

## 5. 注解

```java
@Controller
public class O1_HelloWorld {
    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    @ResponseBody
    public String hello() {
        return "hello Spring Boot";
    }
}
```

简写：

```java
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
```

## 6. 原理

### 6.1. POM 文件

当前项目需要认一个 “爹”：

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.2.1.RELEASE</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
```

“爹” 主要是引入一些 plugin，“爹” 也认了 “爹”：

```xml
 <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.2.1.RELEASE</version>
    <relativePath>../../spring-boot-dependencies</relativePath>
  </parent>
```

“爹” 的 “爹” 主要声明依赖的版本 以及各种 [starter](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-starters)

### 6.2. 启动器

Spring Boot 将所有的功能场景都抽取出来，做成一个个的 starter（启动器），
只需要在项目里面引入指定 starter，相关场景的所有依赖都会导入进来，
要用什么功能就导入什么场景的启动器。

官网：[https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-starters](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-starters)

### 6.3. 主程序类（主入口）

```java
@SpringBootApplication
public class HelloApplication {
    public static void main(String[] args) {
        SpringApplication.run(HelloApplication.class, args);
    }
}
```

* `@SpringBootApplication`
  * Spring Boot 应用标注在某个类上说明这个类是 SpringBoot 的主配置类，Spring Boot 会运行这个类的 main 方法来启动 SpringBoot 应用


