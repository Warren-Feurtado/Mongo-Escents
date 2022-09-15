import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { BrandsService } from 'src/app/brands.service';
import { ProductModel } from 'src/app/Models/product.model';
import { BrandModel } from 'src/app/Models/brand.model';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  toggle: Boolean = true;

  brands: BrandModel[] = [];
  products: ProductModel[] = [];
  productCount!: Number;
  brandCount!: Number;
  sizes: any = [];

  constructor(
    private productsService: ProductsService,
    private adminService: AdminService,
    private brandsService: BrandsService
    ) { }

  hideMenu(){
    this.toggle = !this.toggle
  }

  //LOGOUT FUNCTION
  logOut(): void {
    this.adminService.logOut();
  };

  //GET ALL BRANDS
  fetchBrands(): void {
    this.brandsService.getAllBrands().subscribe((fetchedBrands: any) => {
        this.brands = fetchedBrands.data;
        this.brandCount = fetchedBrands.data.length;
        console.log(`Brands Successfully loaded to Admin-Dashboard-Component.`);
    });
  };

  //GET ALL PRODUCTS
  fetchProducts(): void {
    this.productsService.getAllProducts().subscribe((fetchedProducts: any) => {
      this.products = fetchedProducts.data;
      this.productCount = fetchedProducts.data.length;      
      console.log(`Products Successfully loaded to Admin-Dashboard-Component.`); 
    });
  };

  ngOnInit(): void {
    this.fetchBrands();
    this.fetchProducts();
  }

}
