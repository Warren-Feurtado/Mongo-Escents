import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
// import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IvyCarouselModule } from 'angular-responsive-carousel';

import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { AddBrandComponent } from './Admin/add-brand/add-brand.component';
import { AddProductComponent } from './Admin/add-product/add-product.component';
import { EditProductComponent } from './Admin/edit-product/edit-product.component';
import { EditBrandComponent } from './Admin/edit-brand/edit-brand.component';
import { AdminProductsComponent } from './Admin/admin-products/admin-products.component';
import { AdminBrandsComponent } from './Admin/admin-brands/admin-brands.component';
import { HomeComponent } from './home/home.component';
import { TopNavComponent } from './top-nav/top-nav.component';

import { ProductsService } from './products.service';
import { BrandsService } from './brands.service';
import { FooterComponent } from './footer/footer.component';
import { FragrancesComponent } from './fragrances/fragrances.component';
import { WomenPerfumesComponent } from './women-perfumes/women-perfumes.component';
import { MenColognesComponent } from './men-colognes/men-colognes.component';
import { UnisexFragrancesComponent } from './unisex-fragrances/unisex-fragrances.component';
import { BrandsComponent } from './brands/brands.component';
import { LogInFormComponent } from './Admin/log-in-form/log-in-form.component';
import { CartComponent } from './cart/cart.component';

import { AdminGuard } from './admin.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AddBrandComponent,
    AddProductComponent,
    EditProductComponent,
    EditBrandComponent,
    AdminProductsComponent,
    AdminBrandsComponent,
    HomeComponent,
    TopNavComponent,
    FooterComponent,
    FragrancesComponent,
    WomenPerfumesComponent,
    MenColognesComponent,
    UnisexFragrancesComponent,
    BrandsComponent,
    CartComponent,
    ProductDetailsComponent,
    LogInFormComponent,
    SubscribeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatIconModule,
    CarouselModule,
    IvyCarouselModule,
    BrowserAnimationsModule
  ],
  providers: [ProductsService, BrandsService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
