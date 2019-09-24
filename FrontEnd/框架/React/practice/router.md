# React Router 4.0

参考官方教程：[https://reacttraining.com/react-router/web/example/basic](https://reacttraining.com/react-router/web/example/basic)

## 1. 安装

插件：

* `react-router`： 路由的基础包
* `react-router-dom`： 基于基础包的封装，在浏览器端使用路由，只需要安装这个包即可。

```shell
npm install react-router-dom

yar add react-router-dom
```

说明：

* 4.0 版本中，不需要路由配置文件，一切皆组件
* react-router：提供核心功能，如 Router、Route、Switch 等
* react-router-dom：提供了 BrowserRouter、HashRouter、Route、Link、NavLink

## 2. react-router-dom 的用法

### 2.1. 核心用法

* HashRouter、BrowserRouter
* Route：path、exact（精准匹配）、component、render
* NavLink、Link（路由跳转）
* Switch
* Redirect

### 2.2. HashRouter 和 BrowserRouter 的区别

HashRouter：基于 URL hash 的变化进行路由，如 `http://127.0.0.1/#/login`

HashRouter：基于 HTML5 的 history 进行路由，如 `http://127.0.0.1/login`

### 2.3. Route 的用法

```jsx
<Route path='/admin/ui/buttons' component={Buttons} />
```

### 2.4. Link

```jsx
import { Link } from 'react-router-dom';
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/three'>Three</Link></li>
      </ul>
    </nav>
  </header>
);
```

```jsx
<Link to={{ pathname: '/three/7' }}></Link>

<Link to={{ pathname: '/three/7', search: '', hash: '', key: '', state: {} }}></Link>
```

* 定义： `<Router path="/three/:number" />`
* 取值： `this.props.match.params.number`
