import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductComponent} from './product/product.component';
import {Code404Component} from './code404/code404.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDescComponent} from './product-desc/product-desc.component';

const routes: Routes = [
  // 匹配 根路由， "/"
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // 匹配 主页，"/home"
  { path: 'home', component: HomeComponent },
  // 匹配 产品页，"/product"
  { path: 'product', component: ProductComponent},
  { path: 'product/:id', component: ProductComponent,
    children: [
      { path: 'list/:id', component: ProductListComponent },
      { path: 'desc', component: ProductDescComponent },
    ]
  },
  // 匹配 为配置的路由，404
  { path: '**', component: Code404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
