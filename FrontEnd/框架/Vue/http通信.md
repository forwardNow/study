 # http通信

## 1. vue-resource

**说明**：
* [官网](https://github.com/pagekit/vue-resource)
* vue插件，用于发送web请求和处理响应，使用XMLHttpRequest和JSONP。
* 现在已经停止维护了，推荐使用 [axios](https://github.com/axios/axios)

**安装**：

    $ npm install vue-resource --save

**引入**：

```javascript
import VueResource from "vue-resource";
// 安装：将 $http 挂载到Vue的原型。
Vue.use( VueResource );
```

**示例**：
```javascript
export default {
    created() {
        this.$http.get( "https://www.baidu.com" )
            .then( res => {
                console.info( res );
            }, error => {
                console.info( error );
            } );

        this.$http.post( "https://www.baidu.com", {
            deptId: 1
        }, {
            emulateJSON: true
        } ).then( res => {
            console.info( res );
        }, error => {
            console.info( error );
        } );
    }
}
```

**注意**：

    `application/json`：指定消息体的数据是JSON格式

    `application/x-www-form-urlencoded`：指定消息体的数据是表单数据（`&`连接的）

    当发送 跨域的`application/json` 请求时，
    浏览器会先发送 options 预检请求，以判断服务器是否支持 `content-type` 这个头。
    若服务器未正确处理options预检请求，则浏览器抛出异常。

    所以，客户端发送请求时可以将消息体设置为  `application/x-www-form-urlencoded`，
    以避免 options 预检请求。



## 2. axios

### 2.1. 基础使用

说明:
* [官网](https://github.com/axios/axios)

安装：

    $ npm install axios --save

引入：
```javascript
import Axios from "axios";
// 配置 axios
Vue.prototype.$axios = Axios;
// 设置默认参数
Axios.defaults.baseURL = "http://www.baidu.com";
```

使用：

```javascript
this.$axios.get( "/list", {
    // 查询字符串
    params: {
        deptId: 1
    },
    headers: {
        "content-type": "application/json"
    }
} ).then( res => {
    console.info( res );
} ).catch( error => {
    console.info( error );
} );

this.$axios.post( "/detail", {
    deptId: 1
} ).then( res => {
    console.info( res );
} ).catch( error => {
    console.info( error );
} );
```

注意：
* `this.$axiso.get( url, options )`
* `this.$axiso.post( url, data, options )`
    * `data` 为字符串，则自动转换为查询字符串
    * `data` 为JS对象，则使用 `application/json`

### 2.2. 合并请求

应用场景：必须保证两次请求都成功，只要其中一个请求不成功 就算失败。

示例：
```javascript
this.$axios.all( [
    this.$axios.post( url1, data1, options1 ),
    this.$axios.get( url2, options2 )
] )
// 分发响应
.then( this.$axios.spread( ( res1, res2 ) => {
    // ...
} ) )
.catch( error => {
    console.log( error );
} );
```

### 2.3. 拦截器

#### 2.3.1. 基础

过滤，在一次请求与响应中 进行添油加醋。

设置优先级由低到高：
* `Axios.defaults`：默认参数设置 `defaults`
* `this.$axios.get(url, options)`：单次请求设置 `options`
* `Axios.interceptors.request.use(config=>config)`：拦截器配置 `config`

示例：
```javascript
Axios.interceptors.request.use( function( config ) {

    // 追加一个值
    config.headers.accept = "wuqinfei";
    //=> Accept: application/json, text/plain, */*, wuqinfei

    // 如果不返回，则不发请求
    return config;
} );
```

#### 2.3.2. token

HTTP协议是无状态的，浏览器、移动端原生应用都可以使用。

浏览器通过 session和cookie机制 来保存通信身份，cookie自动带一个字符串。

移动端原生应用没有cookie，可以通过自定义头添加token来识别身份。

拦截器可以用在添加token上。

#### 2.3.3. 操作 loading

```javascript
Axios.interceptors.request.use( function( config ) {

    // 发起请求之前，显示 loading
    Mint.Indicator.open();

    return config;
} );

Axios.interceptors.response.use( function( config ) {

    // 获取响应后，隐藏 loading
    Mint.Indicator.close();

    return config;
} );
```