import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBrandComponent } from './Admin/add-brand/add-brand.component';
import { AddProductComponent } from './Admin/add-product/add-product.component';
import { AdminBrandsComponent } from './Admin/admin-brands/admin-brands.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './Admin/admin-products/admin-products.component';
import { EditBrandComponent } from './Admin/edit-brand/edit-brand.component';
import { EditProductComponent } from './Admin/edit-product/edit-product.component';
import { HomeComponent } from './home/home.component';
import { FragrancesComponent } from './fragrances/fragrances.component';
import { MenColognesComponent } from './men-colognes/men-colognes.component';
import { WomenPerfumesComponent } from './women-perfumes/women-perfumes.component';
import { UnisexFragrancesComponent } from './unisex-fragrances/unisex-fragrances.component';
import { BrandsComponent } from './brands/brands.component';
import { LogInFormComponent } from './Admin/log-in-form/log-in-form.component';
import { AdminGuard } from './admin.guard';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'fragrances', component: FragrancesComponent},
  {path: 'brands', component: BrandsComponent},
  {path: 'men-colognes', component: MenColognesComponent},
  {path: 'women-perfumes', component: WomenPerfumesComponent},
  {path: 'unisex-fragrances', component: UnisexFragrancesComponent},
  {path: 'cart', component: CartComponent},
  {path: 'about', component: AboutComponent},
  {path: 'details/:id', component: ProductDetailsComponent},


 //ADMIN ROUTES
  {path: 'admin/auth', component: LogInFormComponent},
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard]},
  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AdminGuard]},
  {path: 'admin/brands', component: AdminBrandsComponent, canActivate: [AdminGuard]},
  {path: 'admin/add/product', component: AddProductComponent, canActivate: [AdminGuard]},
  {path: 'admin/add/brand', component: AddBrandComponent, canActivate: [AdminGuard]},
  {path: 'admin/edit-product/:id', component: EditProductComponent, canActivate: [AdminGuard]},
  {path: 'admin/edit-brand/:id', component: EditBrandComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
