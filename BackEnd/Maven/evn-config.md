# 环境配置

## 1. 参考

* [MAC 设置环境变量PATH 和 查看PATH](https://www.jianshu.com/p/acb1f062a925)

## 2. 安装

下载并将其置于 `/usr/local`：

```shell
# 下载
$ curl -O http://mirrors.hust.edu.cn/apache/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz

# 解压并将其放入 /usr/local/maven
$ sudo mv -f apache-maven-3.3.9 /usr/local/maven
```

在 `~/.bash_profile` 中添加到环境变量：

>`~/.bash_profile` 中设置的环境变量重启 iTerm2/terminal 后不生效

```shell
$ vim ~/.bash_profile
$ cat ~/.bash_profile

export MAVEN_HOME=/usr/local/maven/apache-maven-3.3.9
export PATH=$MAVEN_HOME/bin:$PATH

# 执行，让其生效
$ source ~/.bash_profile

# 查看是否生效
$ echo $path
```