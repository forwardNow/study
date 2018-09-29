# VI 的使用

## 起步

**安装 iTerm 2**:

自行下载。

**安装 oh my zsh**：

官网：[https://ohmyz.sh/](https://ohmyz.sh/)

**vim 语法高亮**：

```shell
# 编辑 vim 配置文件
$ vi ~/.vimrc
$ cat ~/.vimrc

set ai                  " auto indenting
set ruler               " show the cursor position
set hlsearch            " highlight the last searched term
set history=1000        " keep 1000 lines of history
syntax on               " syntax highlighting
filetype plugin on      " use the file type plugins

" set nu
```
