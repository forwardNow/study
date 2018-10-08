# npm模块管理器

## 1. 简介

npm 是 Node 默认的模块管理器，是一个命令行下的软件，用来安装和管理 Node 模块。

npm 不需要单独安装。在安装 Node 的时候，会连带一起安装 npm。

但是，Node 附带的 npm 可能不是最新版本，最好用下面的命令，更新到最新版本。

```shell
$ npm install npm@latest -g
/usr/local/bin/npx -> /usr/local/lib/node_modules/npm/bin/npx-cli.js
/usr/local/bin/npm -> /usr/local/lib/node_modules/npm/bin/npm-cli.js
+ npm@6.3.0
added 265 packages from 147 contributors, removed 551 packages and updated 16 packages in 13.291s
```

上面的命令中， `@latest` 表示最新版本，`-g` 表示全局安装。所以，命令的主干是 `npm install npm` ，也就是使用 npm 安装自己。之所以可以这样，是因为 npm 本身与 Node 的其他模块没有区别。

然后，运行下面的命令，查看各种信息。

```shell
# 查看 npm 命令列表
$ npm help

# 查看各个命令的简单用法
$ npm -l

# 查看 npm 的版本
$ npm -v

# 查看 npm 的配置
$ npm config list -l
```

## 2. npm init

`npm init` 用来初始化生成一个新的 `package.json` 文件。它会向用户提问一系列问题，如果你觉得不用修改默认配置，一路回车就可以了。

如果使用了 `-f`（代表force）、`-y`（代表yes），则跳过提问阶段，直接生成一个新的 `package.json` 文件。

```shell
npm init -y
```

## 3. npm ls --depth=0

查看安装的包

## 4. npm set

`npm set` 用来设置环境变量。

可通过 `npm config list -l` 查看可设置的环境变量。

```shell
$ npm set init-author-name 'Your name'
$ npm set init-author-email 'Your email'
$ npm set init-author-url 'http://yourdomain.com'
$ npm set init-license 'MIT'
x
```

上面命令等于为 `npm init` 设置了默认值，以后执行 `npm init` 的时候，`package.json` 的作者姓名、邮件、主页、许可证字段就会自动写入预设的值。这些信息会存放在用户主目录的 `~/.npmrc` 文件，使得用户不用每个项目都输入。如果某个项目有不同的设置，可以针对该项目运行 `npm config`。

```shell
npm set save-exact true
```

上面命令设置加入模块时，`package.json` 将记录模块的确切版本，而不是一个可选的版本范围。

## 5. npm config

```shell
npm config set prefix $dir
```

上面的命令将指定的 `$dir` 目录，设为模块的全局安装目录。如果当前有这个目录的写权限，那么运行 `npm install` 的时候，就不再需要 `sudo` 命令授权了。

```shell
npm config set init.author.name $name
npm config set init.author.email $email
```

上面命令指定使用 `npm init` 时，生成的 `package.json` 文件的字段默认值。

```shell
npm config set registry https://registry.npmjs.org/
```

设置npm包的仓库

## 6. npm info

`npm info` 命令可以查看每个模块的具体信息

```shell
$ npm info rxjs

rxjs@6.2.2 | Apache-2.0 | deps: 1 | versions: 90
Reactive Extensions for modern JavaScript
https://github.com/ReactiveX/RxJS

dist
.tarball http://registry.npm.taobao.org/rxjs/download/rxjs-6.2.2.tgz
.shasum: eb75fa3c186ff5289907d06483a77884586e1cf9

dependencies:
tslib: ^1.9.0

maintainers:
- blesh <ben@benlesh.com>

dist-tags:
alpha: 6.0.0-alpha.4                    rc: 6.0.0-uncanny-rc.7
beta: 6.0.0-beta.4                      smoosh: 6.0.0-smoosh.1
forward-compat: 5.6.0-forward-compat.5  unsmoosh: 6.0.0-smoosh.2
latest: 6.2.2

published a month ago by blesh <ben@benlesh.com>
```

## 7. npm search

`npm search` 命令用于搜索npm仓库

## 8. npm list

`npm list` 命令以树型结构列出当前项目安装的所有模块，以及它们依赖的模块。

```shell
npm list
```

加上 `global` 参数，会列出全局安装的模块。

```shell
npm list -global
```

列出单个模块:

```shell
npm list rxjs-compat
```

## 9. npm install

### 9.1. 基本用法

Node 模块采用 `npm install` 命令安装。

每个模块可以“全局安装”，也可以“本地安装”。

“全局安装”指的是将一个模块安装到系统目录中，各个项目都可以调用。一般来说，全局安装只适用于工具模块，比如 `eslint` 和 `gulp` 。

“本地安装”指的是将一个模块下载到当前项目的 `node_modules` 子目录，然后只有在项目目录之中，才能调用这个模块。

```shell
# 本地安装
npm install <package name>

# 全局安装
$ sudo npm install -global <package name>
$ sudo npm install -g <package name>
```

`npm install` 也支持直接输入 Github 代码库地址。

```shell
npm install git://github.com/package/path.git
npm install git://github.com/package/path.git#0.1.0
```

安装之前，`npm install` 会先检查，`node_modules` 目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。

如果你希望，一个模块不管是否安装过，npm 都要强制重新安装，可以使用 `-f` 或 `--force` 参数。

```shell
npm install <packageName> --force
```

如果你希望，所有模块都要强制重新安装，那就删除 `node_modules` 目录，重新执行 `npm install` 。

```shell
rm -rf node_modules
npm install
```

### 9.2. 安装不同版本

`install` 命令总是安装模块的最新版本，如果要安装模块的特定版本，可以在模块名后面加上@和版本号。

```shell
npm install sax@latest
npm install sax@0.1.1
npm install sax@">=0.1.0 <0.2.0"
```

`install` 命令可以使用不同参数，指定所安装的模块属于哪一种性质的依赖关系，即出现在 `packages.json` 文件的哪一项中。

* `-–save`：模块名将被添加到 dependencies，可以简化为参数 `-S` 。
* `–-save-dev`: 模块名将被添加到 devDependencies ，可以简化为参数 `-D` 。

```shell
npm install sax --save
npm install node-tap --save-dev
# 或者
npm install sax -S
npm install node-tap -D
```

如果要安装 beta 版本的模块，需要使用下面的命令。

```shell
# 安装最新的beta版
$ npm install <module-name>@beta (latest beta)

# 安装指定的beta版
$ npm install <module-name>@1.3.1-beta.3
```

`npm install` 默认会安装 `dependencies` 字段和 `devDependencies` 字段中的所有模块，如果使用`--production` 参数，可以只安装 `dependencies` 字段的模块。

```shell
npm install --production
```

一旦安装了某个模块，就可以在代码中用 `require` 命令加载这个模块。

```javascript
var backbone = require('backbone')
console.log(backbone.VERSION)
```

## 10. npm update

`npm update` 命令可以更新本地安装的模块。

```shell
# 升级当前项目的指定模块
$ npm update [package name]

# 升级全局安装的模块
$ npm update -global [package name]
```

它会先到远程仓库查询最新版本，然后查询本地版本。如果本地版本不存在，或者远程版本较新，就会安装。

使用 `-S` 或 `--save` 参数，可以在安装的时候更新 `package.json` 里面模块的版本号。

注意，从 npm v2.6.1 开始，`npm update` 只更新顶层模块，而不更新依赖的依赖，以前版本是递归更新的。如果想取到老版本的效果，要使用下面的命令。

```shell
npm --depth 9999 update
```

## 11. npm uninstall

`npm uninstall` 命令，卸载已安装的模块。

```shell
$ npm uninstall [package name]

# 卸载全局模块
$ npm uninstall [package name] -global
```

## 12. npm run

`npm` 不仅可以用于模块管理，还可以用于执行脚本。`package.json` 文件有一个 `scripts` 字段，可以用于指定脚本命令，供 `npm` 直接调用。

列出 `package.json` 里面所有可以执行的脚本命令：

```shell
npm run
```

`npm run` 命令会自动在环境变量 `$PATH` 添加 `node_modules/.bin` 目录，所以 `scripts` 字段里面调用命令时不用加上路径，这就避免了全局安装 NPM 模块。

`npm run` 会创建一个 Shell，执行指定的命令，并临时将 `node_modules/.bin` 加入PATH变量，这意味着本地模块可以直接运行。

举例来说，你执行 ESLint 的安装命令。

```shell
npm i eslint --save-dev
```

运行上面的命令以后，会产生两个结果。首先，ESLint 被安装到当前目录的 `node_modules` 子目录；其次，`node_modules/.bin` 目录会生成一个符号链接 `node_modules/.bin/eslint` ，指向 ESLint 模块的可执行脚本。

然后，你就可以在 `package.json` 的 `script` 属性里面，不带路径的引用 `eslint` 这个脚本。

```json
{
  "name": "Test Project",
  "devDependencies": {
    "eslint": "^1.10.3"
  },
  "scripts": {
    "lint": "eslint ."
  }
}
```

等到运行 `npm run lint` 的时候，它会自动执行 `./node_modules/.bin/eslint .` 。