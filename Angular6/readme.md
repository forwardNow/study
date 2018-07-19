 # 笔记

## 1. 介绍

Angular 2 之前的版本 称为 AngularJS，之后的版本称为 Angular。
Angular 不是由 AngularJS 升级而来，而是完全重写。

**AngularJS：典型的MVC架构。**

![AngularJS](./asset/images/1.1.jpg)

**Angular：围绕组件。**

![Angular](./asset/images/1.2.jpg)


## 2. CLI命令

    # 全局安装 CLI
    $ npm install -g @angular/cli
    $ ng -v

    # 创建 ng项目
    $ ng new 项目名

    # 创建带路由的 ng项目
    $ ng new 项目名 --routing

    # 启动
    $ ng serve --open

    # 新建组件
    $ ng generate component navbar

    # 新建服务
    $ ng g service shared/product

CLI安装位置:
`/usr/local/Cellar/node/10.6.0/lib/node_modules/node_modules/@angular/cli/bin/ng`

## 3. 引入第三方库和样式

注：`first` 为项目名

### 3.1. jQuery

**安装**：

    $ npm install jquery --save
    # jquery@3.3.1

**配置文件路径**：

    项目名/
        angular.json

        {
            ...
            "projects": {
                "项目名": {
                    "architect": {
                        "build": {
                            "options": {
                                "styles": [
                                    ...
                                ],
                                "scripts": [
                                    ...
                                    "./node_modules/jquery/dist/jquery.js"
                                ]
                            }
                    }
                }
            }
        }


**类型定义**：

    $ npm install @types/jquery --save-dev

**使用**：

    import * as $ from 'jquery';
    
    $('body').html();

### 3.2. bootstrapp

    $ npm install bootstrap --save
    # bootstrap@3.3.7

    $ npm install @types/bootstrap --save-dev

    "styles": [
        "src/styles.css",
        "./node_modules/bootstrap/dist/css/bootstrap.css"
    ],
    "scripts": [
        "./node_modules/jquery/dist/jquery.js",
        "./node_modules/bootstrap/dist/js/bootstrap.js"
    ]


### 3.3. 父传子

    # 子 <app-start>
    export class StarComponent {
        @Input()
        public rating: number;
    }
    <div>{{ rating }}</div>

    # 父 <app>
    export class AppComponent {
        num = 1;
    }
    <div>
        <app-start [rating]="num">
    </div>

## 4. 路由

### 4.1. 基础

**说明**：

|名称|简介|
|-|-|
| routes | 路由配置 |
| ActivatedRoute | 当前路由，可获取数据 |
| router | 路由器，用于编程导航 |
| `<a [routerLink]="['/']"> `| 路由器导航链接 |
| `<router-outlet>` | 路由器视图插座 |

**示例**：

    # app-routing.module.ts
    const routes: Routes = [
        // 匹配 根路由， "/"
        { path: '', component: HomeComponent },
        // 匹配 主页，"/home"
        { path: 'home', component: HomeComponent },
        // 匹配 产品页，"/product"
        { path: 'product', component: ProductComponent},
        // 匹配 为配置的路由，404
        { path: '**', component: Code404Component }
    ];

    # app.component.html
    <div [routerLink]="['/']">首页</div>
    <div [routerLink]="['/product']">产品页</div>
    <div [routerLink]="['/xxx']">未配置的页</div>
    <div (click)="customNav()">编程导航</div>

    <router-outlet></router-outlet>

    # app.component.ts
    constructor(private router: Router) {}
    customNav() {
        this.router.navigate(['/product']);
    }

### 4.2. 路由参数

#### 4.2.1. 传递参数

查询字符串参数：

    <a [routerLink]="['/product']"
       [queryParams]="{id: 1}">产品页-查询参数</a> 

路径参数：

    routes = [ { path: 'product/:id', ...} ]
    <a [routerLink]="['/product', 1]">产品页-路径参数</a>

#### 4.2.2. 接收参数

参数快照：

    id: number;
    constructor( private activatedRoute: ActivatedRoute ) { }
    ngOnInit() {
        // this.id = this.activatedRoute.snapshot.queryParams.id;
        this.id = this.activatedRoute.snapshot.params.id;
    }

参数订阅：

    this.activatedRoute.queryParams.subscribe(
        (params: Params) => {
            this.id = params.id;
        }
    );

参数快照用于只获取一次参数，参数订阅可多次获取参数。
如果路由自身就需要路由订阅。

### 4.3. 重定向

    routes: [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
    ]

### 4.4. 子路由

路由嵌套，插槽嵌套。

    # app-routing.module.ts
    const routes: Routes = [
        { path: 'product/:id', component: ProductComponent,
          children: [
            { path: 'list/:id', component: ProductListComponent },
            { path: 'desc', component: ProductDescComponent },
          ]
        }
    ];

    # app.component.html
    <a [routerLink]="['/product', 1]">产品页-路径参数</a> <br>
    <router-outlet></router-outlet>

    # product.component.html
    <a [routerLink]="['list', 12]">产品-列表</a><br>
    <a [routerLink]="['desc']">产品-描述</a><br>
    <router-outlet></router-outlet>

### 4.5. 辅助路由

多个插槽。

    # app-routing.module.ts
    const routes: Routes = [
        { path: 'chat', component: ChatComponent, outlet: 'chat' },
    ];

    # app.component.html
    <a [routerLink]="[ { outlets: { chat: 'chat' } } ]">聊天-显示</a> <br>
    <a [routerLink]="[ { outlets: { chat: null } } ]">聊天-隐藏</a> <br>
    <a [routerLink]="[ { outlets: { chat: null, primary: 'home' } } ]">
        隐藏聊天，主槽显示Home</a> <br>
    <router-outlet></router-outlet>
    <router-outlet name="chat"></router-outlet>

### 4.6. 路由守卫

类似于拦截器，显示视图之前进行拦截判断，离开视图之前进行拦截判断。

能否进入：

    # app-routing.module.ts
    const routes: Routes = [
        {
            path: 'product', component: ProductComponent,
            canActivate: [LoginGuard]
        },
    ];
    @NgModule({
        providers: [LoginGuard]
    })

    # login.guard.ts
    export class LoginGuard implements CanActivate {
        canActivate() {
            const loggedIn: boolean = Math.random() < 0.5;
            if (!loggedIn) {
                console.info('您未登录！');
            } else {
                console.info('已登录！');
            }
            return loggedIn;
        }
    }

能否离开：

    # app-routing.module.ts
    const routes: Routes = [
        {
            path: 'home', component: HomeComponent,
            canDeactivate: [UnsavedGuard]
        },
    ];
    @NgModule({
        providers: [UnsavedGuard]
    })

    # unsaved.guard.ts
    export class UnsavedGuard implements CanDeactivate<HomeComponent> {
        canDeactivate() {
            return window.confirm( '是否要离开？' );
        }
    }

## 5. 依赖注入

### 5.1. 概念

依赖注入：
* Dependency Injection，DI
* 强调手段，如何实现控制反转

控制反转：
* Inversion of Control，IoC
* 强调目的，侧重将依赖的控制权从代码的内部转移到外部
* 实现了控制反转模式的框架 称为IoC容器

Angular就是IoC容器，它实现控制反转的手段就是依赖注入。

好处：
* 松耦合
* 可重用性
    * 配置在providers中配置不同的service实现类
* 可测试性
    * 测试时： `LoginComponent` <= `MockLoginService`
    * 实际中： `LoginComponent` <= `RealLoginService`

### 5.2. 注入器和提供器

#### 5.2.1. 注入器

标注为注入器的方式：

* 被 `@Injectable()` 装饰
* 被 `@Component()` 装饰，该装饰是 `@Injectable()` 的子类

注意：
* 所有的 service 都应该加上 `@Injectable()`，即使不依赖其他服务

通过构造函数注入服务：

    constructor( private productService: ProductService ) {}

#### 5.2.2. 提供器

提供器的声明位置：

* 模块：`@NgModule({ providers:[] })`
* 组件：`@Component({ providers:[] })`

声明的方式：

* `providers:[ ProductService ]`
* `providers:[ { provide: ProductService, useClass: ProductService } ]`
* `providers:[ { provide: ProductService, useClass: XxxProductService } ]`
* `providers:[ { provide: ProductService, useFactory: ()=>{...} } ]`

提供器的作用域规则：

* 模块级，模块中所有组件可以使用
* 组件级，该组件及子组件可以使用
* 组件级中同名的提供器会屏蔽模块级

## 6. 数据绑定

默认单向绑定，双向绑定变为可选。

### 6.1. 事件绑定

语法：`(事件名)="模板语句"`

![事件绑定语法](./asset/images/1.3.png)

### 6.2. DOM属性绑定

插值表达式（`{{ }}`）会被转换成属性绑定，即

    # 两者等价：
    <img src="{{imgUrl}}">
    <img [src]="imgUrl">

HTML特性与DOM属性：

    <input value="a" (input)="doInput($event)">

    $event.target.value : DOM属性
    $event.target.getAttribute( "value" ) : HTML特性

    Angular 与 DOM属性 做绑定，不关心HTML特性。

### 6.3. HTML特性绑定

#### 6.3.1. 基本

    [attr.特性名称]="表达式"

    <td [attr.colspan]="tableColspan">

#### 6.3.2. CSS类绑定

    # 绑定类名列表。表达式的值为字符串（类名列表）
    <div class="selector1 selector2" [class]="表达式">

    # 绑定单个类名。表达式的值为布尔值
    <div class="selector1" [class.selector2]="表达式">

    # 绑定多个类。表达式的值为一个对象
    <div [ngClass]="{ selector1: true, selector2: false }">

#### 6.3.3. 样式绑定

    # 绑定单个。表达式的值为字符串（样式属性的值）
    <div [style.color]="表达式">

    # 绑定多个。表达式的值一个对象
    <div [ngStyle]="{'font-size': '12px', 'color': 'red'}">