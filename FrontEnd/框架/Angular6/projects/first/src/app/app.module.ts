import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {SearchComponent} from './search/search.component';
import {CarouselComponent} from './carousel/carousel.component';
import {ProductComponent} from './product/product.component';
import {StarComponent} from './star/star.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ProductService} from './shared/product.service';
import {MyPipePipe} from './shared/my-pipe.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilterPipe} from './pipe/filter.pipe';
import {ReactiveFormComponent} from './test/reactive-form/reactive-form.component';
import {ReactiveRegistComponent} from './test/reactive-regist/reactive-regist.component';
import {TemplateFormComponent} from './template-form/template-form.component';
import {MobileValidatorDirective} from './directives/mobile-validator.directive';
import {EqualValidatorDirective} from './directives/equal-validator.directive';
import {HttpClientModule} from '@angular/common/http';
import {WebSocketComponent} from './web-socket/web-socket.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'test/reactiveForm', component: ReactiveFormComponent},
  {path: 'test/reactiveRegist', component: ReactiveRegistComponent},
  {path: 'test/templateForm', component: TemplateFormComponent},
  {path: 'test/ws', component: WebSocketComponent},
  {path: 'home', component: HomeComponent},
  {path: 'productDetail/:productId', component: ProductDetailComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    ProductComponent,
    StarComponent,
    ProductDetailComponent,
    HomeComponent,
    MyPipePipe,
    FilterPipe,
    ReactiveFormComponent,
    ReactiveRegistComponent,
    TemplateFormComponent,
    MobileValidatorDirective,
    EqualValidatorDirective,
    WebSocketComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ProductService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
