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
import { ReactiveRegistComponent } from './test/reactive-regist/reactive-regist.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { MobileValidatorDirective } from './directives/mobile-validator.directive';
import { EqualValidatorDirective } from './directives/equal-validator.directive';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'test/reactiveForm', component: ReactiveFormComponent},
  {path: 'test/reactiveRegist', component: ReactiveRegistComponent},
  {path: 'test/templateForm', component: TemplateFormComponent},
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
