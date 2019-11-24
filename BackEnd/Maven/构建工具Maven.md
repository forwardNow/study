# Maven

[构建工具 Maven 视频教程全集（35P）| 5 小时从入门到精通](https://www.bilibili.com/video/av59640042/)

## 1. 目前掌握的技术

![技术](./images/01_1.jpg)

## 2. 目前的技术在开发中存在的问题（why）

* 一个项目就是一个工程
  * 如果项目非常庞大，就不适合继续使用 package 来划分模块
  * 最好是每一个模块对应一个工程，利于分工协作
  * 借助 Maven 就可以将一个项目拆分成多个工程
* 项目中需要的 jar 包必须手动“复制”、“粘贴”到 `WEB-INF/lib` 目录下
  * 带来的问题是：同样的 jar 包文件重复出现在不同的项目工程中，既浪费存储空间，又让工程比较臃肿
  * 借助 Maven，可以将 jar 包仅仅保存在“仓库”中，有需要使用 jar 的工程“引用”这个文件即可，并不需要真的把 jar 包复制过来。
* jar 包需要别人替我们准备好，或到官网下载
  * 不同技术的官网提供 jar 包下载的形式是五花八门的
  * 有些技术的官网就是通过 Maven 或 SVN 等专门的工具来提供下载的
  * 如果是来路不正的 jar 包，可能会引起莫名其妙的问题
  * 借助 Maven 可以以一种规范的方式下载 jar 包，因为所有知名框架或第三方工具的 jar 包按照统一的规范存放于 Maven 的中央仓库中
  * 以规范的方式下载的 jar 包，内容也是可靠的
* 一个 jar 包依赖的其他 jar 包需要自己手动加入到项目中
  * 如果所有 jar 包之间的依赖关系都需要程序员去管理，会增加额外的成本
  * Maven 会自动将依赖的 jar 包导入进来

## 3. Maven 是什么（what）

* Maven 是一款服务于 Java 平台的自动化构建工具
  * 构建工具历史：Make -> Ant -> Maven -> Gradle
* 构建
  * 概念：以“Java 源文件”、“配置文件”、“静态资源” 等作为“原材料”，去“生产”一个可以运行的项目的过程
    * 编译
    * 部署
    * 搭建
  * 编译
    * Java 源文件 ---编译---> class 字节码文件
    * 活蹦乱跳的鸡 ---处理---> 黄焖鸡
  * 部署：将“编译的结果”放到服务器指定的目录下之后启动服务器的过程
    * 运行时：项目中 jre、tomcat 都只是引用，而没有真正拷贝到项目中去
* 构建过程中的各个环节
  * 清理：将以前编译得到的旧的 class 字节码文件删除，为下一次编译做准备
  * 编译：将 Java 源程序编译成 class 字节码文件
  * 测试：自动测试，自动调用 Junit 程序
  * 报告：测试程序执行的结果
  * 打包：动态 Web 工程打 war 包，Java 工程打 jar 包
  * 安装：Maven 特定的概念 —— 将打包得到的文件复制到“仓库”中的指定位置
  * 部署：将动态 Web 工程生成的 war 包复制到 Web 容器的指定目录下，使其可以运行
* 自动化构建
  * 操作路径：操作步骤

## 4. 安装 Maven 核心程序

* 配置 JAVA_HOEM 环境变量
  * windows：需要配置
  * OSX：无需配置
* [下载](http://maven.apache.org/download.cgi)
* 解压到非中文无空格的路径
  * `/Users/forwardNow/develop/mvn/apache-maven-3.6.2`
* 配置 Maven 环境变量
  * M2_HOME 或 MAVEN_HOEM
  * 添加到 PATH

    ```shell
    sudo open ~/.zshrc

    # Maven
    export M2_HOME="/Users/forwardNow/develop/mvn/apache-maven-3.6.2"
    export PATH=$M2_HOME/bin:$PATH

    source ~/.zshrc
    ```

* 验证 Maven 是否安装成功

  ```shell
  mvn -v
  
  Apache Maven 3.6.2 (40f52333136460af0dc0d7232c0dc0bcf0d9e117; 2019-08-27T23:06:16+08:00)
  Maven home: /Users/forwardNow/develop/mvn/apache-maven-3.6.2
  Java version: 1.8.0_172, vendor: Oracle Corporation, runtime: /Library/Java/JavaVirtualMachines/jdk1.8.0_172.jdk/Contents/Home/jre
  
  Default locale: en_CN, platform encoding: UTF-8
  OS name: "mac os x", version: "10.13.6", arch: "x86_64", family: "mac"
  ```

## 5. Maven 的核心概念

* 约定的目录结构（*）
* POM（*）
* 坐标（*）
* 依赖（***）
* 仓库
* 生命周期/插件/目标
* 继承
* 聚合

## 6. 第一个 Maven 工程

* 创建约定的目录
  
  ```text
  ${root}/          # 工程名称
    src/              # 源码
      main/             # 存放主程序
        java/             # 存放 Java 源码
        resources/        # 存放框架或其他工具的配置文件
      test/           # 存放测试程序
        java/
        resources/
    pom.xml           # Maven 工程的核心配置文件
  ```

* 为什么要遵守约定的目录结果
  * 约定 > 配置 > 编码
    * 编码：编码解决问题，基本功
    * 配置：对框架有比较深的了解
    * 约定：对架构有比较深的了解
  * 以配置的方式明确告知框架，容易出错且可读写差。
  * 如果我们自己定义的东西想让框架或工具知道，有两种方法：
    * 以配置的方式明确告诉框架
    * 遵循框架内部已经存在的约定

## 7. 常用 Maven 命令

* 注意：与构建过程相关的 Maven 命令，必须进入 pom.xml 所在目录
* 常用命令
  * `mvn clean` ：清理
  * `mvn compile` ： 编译
  * `mvn test-compile` ： 编译测试
  * `mvn test` ： 执行测试
  * `mvn package` ： 打包

## 8. 关于联网问题

* Maven 的核心程序中仅仅定义了抽象的生命周期，具体的工作必须由特定的插件来完成。而插件本身并不包含在 Maven 的核心程序中。
* 当我们执行 `mvn compile` 命令时需要用到一些插件，Maven 核心程序会首先到本地仓库中查找
  * 默认本地仓库：`${user.home}/.m2/repository`
  * 可在 `${M2_HOME}/conf/settings.xml` 的 `<localRepository>/path/to/local/repo</localRepository>` 中修改本地仓库路径

## 9. POM

* 含义：Project Object Model，项目对象模型
* `pom.xml` 对于 Maven 工程是核心配置文件，与构建过程相关的一切设置都在这个文件中进行配置

## 10. 坐标

* 在数学中的坐标
  * 平面中，通过 `(x,y)` 可以唯一定位任意一个点
* 在 Maven 中的坐标（`(g,a,v)`）
  * 通过 `<groupId>` 、`<artifactId>`、`<version>` 唯一定位一个 Maven 工程
  * `<groupId>` ：公司的域名的倒序 + 项目名
  * `<artifactId>` ：模块名
  * `<version>` ： 版本
* 坐标与仓库中路径的对应关系
  * 坐标
  
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <project ...>
        <!-- 使用下面三个标签可以唯一定位一个 Maven 工程 -->
        <groupId>com.it.fn</groupId>
        <artifactId>hello</artifactId>
        <version>1.0-SNAPSHOT</version>
    </project>
    ```
  
  * 仓库中路径

    ```text
    ${user.home}/.m2/repository/ com/it/fn/hello/1.0-SNAPSHOT
    ```

## 11. 仓库

* 仓库的分类
  * 本地仓库：`${user.home}/.m2/repository`
  * 远程仓库
    * 局域网（私服，Nexus）：搭建在局域网环境中的，为当前局域网范围内地所有 Maven 工程服务，替你去请求依赖
      * ![./images/01-2.jpg](./images/01-2.jpg)
    * 中央仓库：假设在 Internet 上，为全世界所有的 Maven 工程服务
    * 中央仓库镜像：为了分担中央仓库的流量（负载），替身用户访问速度
* 仓库中保存的内容：Maven 工程
  * Maven 自身所需要的插件
  * 第三方框架或工具的 jar 包（也是通过 Maven 来打包的）
    * 第一方：JDK
    * 第二方：自己
    * 第三方：JDK 和 自己都难以解决的问题，就找第三方
  * 我们自己开发的 Maven 工程
