import { DiscountComponent } from './discount/discount.component';
import { NgModule, ViewChildren } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsComponent } from './brands/brands.component';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { ProductComponent } from './product/product.component';
import { SalesComponent } from './sales/sales.component';
import { DashboardComponentTest } from './dashboard/dashboardtest.component';
import { ImageComponent } from './image/image.component';
import { ProfileComponent } from './profile/profile.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { CancelComponent } from './cancels/cancel.component';
import { SuceessComponent } from './order-suceess/suceess.component';
import { BlogComponent } from './Blog/blog.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponentTest },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'sale', component: SalesComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'product', component: ProductComponent },
  { path: 'news', component: NewsComponent },
  { path: 'cancel', component: CancelComponent },
  { path: 'suceess', component: SuceessComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
