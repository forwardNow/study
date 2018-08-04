 # webpack

## 1. 项目目录

    project/
        src/    # 存放以功能进行划分的源代码，给人看。
        dist/   # 存放上线的代码（减少请求、混淆代码等），给机器看。
        webpack.config.js   # 打包生成代码到 dist 
        package.json        # 包信息描述

webpack-dev-server 运行 src 下的代码，虚拟出 build.js 进行测试。

## 2. 安装NPM包

    init
        $ npm init -y

    webpack
        $ npm install webpack webpack-cli --save-dev
        
    babel(ES6转ES5)
        $ npm install babel-loader babel-core babel-preset-env babel-plugin-transform-runtime --save-dev

    CSS
        $ npm install style-loader css-loader --save-dev

    postcss
        # postcss.config.js 进行配置
        $ npm install postcss-loader autoprefixer --save-dev

    extract-text
        # @next： 使用 @4.0.0-beta.0
        $ npm install extract-text-webpack-plugin@next --save-dev

    less
        $ npm install less-loader less --save-dev

    scss
        $ npm install sass-loader node-sass webpack --save-dev

    html
        $ npm install html-webpack-plugin --save-dev
        # 在 plugin 配置

    dev-server
        $ npm install webpack-dev-server --save-dev
        # 在 plugin 配置 

    vue
        $ npm install vue-hot-reload-api vue-html-loader vue-loader vue-style-loader vue-template-compiler --save-dev
        $ npm install vue --save
        # 在 plugin 配置



## 3. package.json

package.json： 

    ......
    "scripts": {
        // 开发时的命令
        "dev": "webpack-dev-server",
        // 打包代码到生产环境的命令
        "build": "webpack"
    },

通过命令行可以运行 "`scripts`" 里的脚本命令：

    $ npm run dev
    

## 4. webpack-ES6的处理

使用 `babel` 将 ES6 转 ES5。

* `babel`
    - `babel-loader` ( 内部依赖 babel-core )
        + `presets` 和 `es2015`：处理关键字
        + `plugins` 和 `babel-plugin-transform-runtime`：处理函数