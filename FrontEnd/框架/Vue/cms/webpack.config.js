const Webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
module.exports = {
    mode: "development",
    devtool: "source-map",
    
    // 入口
    entry:{ 
        //main是默认入口,也可以是多入口
        main:"./src/main.js"
    },
    //出口
    output:{
        filename:"./build.js", 
        path: path.join(__dirname,"./dist") //最好是绝对路径
    },
    module:{
        rules:[      
            {
                test: /\.vue$/,
                // exclude: /node_modules/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        // scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                        extractCSS: true, // 使用 extract-text-webpack-plugin 自动提取 CSS
                    }
                }
            }, 
            {
                /*
                    "style-loader" 必须放在 fallback 中，如果置于 use 中，则会报错
                    Module build failed (from ./node_modules/style-loader/index.js):ReferenceError: window is not defined
                 */
                test: /\.css$/,
                // use: [ "style-loader", "css-loader", "postcss-loader" ]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [ "css-loader", "postcss-loader" ]
                })
            }, 
            {
                test: /\.less$/,
                // use: [{
                //     loader: "style-loader" // creates style nodes from JS strings
                // }, {
                //     loader: "css-loader" // translates CSS into CommonJS
                // }, {
                //     loader: "postcss-loader" 
                // },{
                //     loader: "less-loader" // compiles Less to CSS
                // }]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [ "css-loader", "postcss-loader", "less-loader" ]
                })
            },
            {
                test: /\.scss$/,
                // use: [{
                //     loader: "style-loader" // creates style nodes from JS strings
                // }, {
                //     loader: "css-loader" // translates CSS into CommonJS
                // }, {
                //     loader: "postcss-loader" 
                // },{
                //     loader: "less-loader" // compiles Less to CSS
                // }]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [ "css-loader", "postcss-loader", "sass-loader" ]
                })
            },
            {
                test: /\.(jpg|png|gif|svg|ttf|woff|woff2|eot)$/,
                // loader:"url-loader?limit=4096&name=[name].[ext]",
                // "?" 后面可以传参数，也可以 以下面这种写法。
                use: {
                    loader: "url-loader",
                    options:{
                        limit: 4096,
                        name: "[name].[ext]"
                    }
                }
            },
            {
                // 处理ES6的js
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"],
                        plugins: ["transform-runtime"]
                    }
                }
            }
        ]
    },

    // 插件的执行顺序是依次执行的
    plugins:[

        new ExtractTextPlugin( "main.css" ),

        // 将 template属性指定的文件，移动到 output.path
        new HtmlWebpackPlugin( {
            title: "Hello, webpack.", // html5文件中<title>部分
            filename: "index.html", // 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样，最终完整文件路径是output.path+filename，如果filename中有子文件夹形式，如`./ab/cd/front.html`，只取`./front.html`
            template: "./src/index.html", //如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
            inject: "body", // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js

        } ),

        new Webpack.HotModuleReplacementPlugin(),

        new VueLoaderPlugin()
    ],
    devServer: {
        host: "localhost", // 127.0.0.1
        port: 8181,
        contentBase: path.join(__dirname, "./dist"), //网站的根目录为 根目录/dist
        index: "index.html",
        open: true, // 自动打开浏览器
        inline: true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
        hot: true, // Enable webpack"s Hot Module Replacement feature,
        compress: true, //压缩
        // 代理，如 /api/dept/list => http://localhost:3000/dept/list
        proxy: {
            "/api": {
              target: "http://localhost:3000",
              pathRewrite: {"^/api" : ""}
            }
          }
    },

}
