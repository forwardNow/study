# 介绍

## 1. 说明

maven，`[ˈmeɪvn]`，n. <美口>专家，内行。

基于项目对象模型（缩写：POM）概念，Maven利用一个中央信息片断能管理一个项目的构建、报告和文档等步骤。

Maven 是一个项目管理工具，可以对 Java 项目进行构建、依赖管理。

## 2. 功能

* 构建
* 依赖
* 发布
* 分发
* 文档生成
* 报告
* SCMs
* 邮件列表

## 3. 约定配置

提倡使用一个共同的标准目录结构，Maven 使用约定优于配置的原则，大家尽可能的遵守这样的目录结构。

```text
${basedir}/     # 存放pom.xml和所有的子目录
  /src
    /main
      /java       # 项目的 java 源代码
      /resources  # 项目的资源，比如说 property 文件，spring-mvc.xml
      /webapp
        /WEB-INF    # web 应用文件目录，web 项目的信息，比如存放 web.xml、本地图片、jsp 视图页面
    /test
      /java       # 项目的测试类，比如说Junit代码
      /resources  # 测试用用的资源
  /target     # 打包输出目录
    /classes      # 编译输出目录
    /test-classes # 测试编译输出目录

Test.java   # Maven 只会自动运行符合该命名规则的测试类
~/.m2/repository # Maven 默认的本地仓库目录位置
```

## 4. 特点

* 项目设置遵循统一的规则。
* 任意工程中共享。
* 依赖管理包括自动更新。
* 一个庞大且不断增长的库。