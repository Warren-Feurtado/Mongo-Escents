
import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../brands.service';
import { ProductsService } from '../products.service';
import { BrandModel } from '../Models/brand.model';
import { ProductModel } from '../Models/product.model';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  server_link = environment.production === true ? environment.API_PRODUCTION_SERVER : environment.API_SERVER;
  imgPath = 'public/product-image';

  brands: any[] = [];
  products: any[] = [];
  seclectedIndex = 0;
  marginChange: any = 0;
  margin = this.marginChange;

  constructor(private productsService: ProductsService, private brandsService: BrandsService) { }

  ngOnInit(): void {
    this.fetchBrands();
    this.fetchProducts();
  }

   //GET ALL BRANDS
   fetchBrands(): void {
    this.brandsService.getAllBrands().subscribe((fetchedBrands: any) => {
        this.brands = fetchedBrands.data;
        // this.brandCount = fetchedBrands.data.length;
        console.log(`Brands Successfully loaded to Admin-Dashboard-Component.`, this.brands);
    });
  };

  //GET ALL PRODUCTS
  fetchProducts(): void {
    this.productsService.getAllProducts().subscribe((fetchedProducts: any) => {
      this.products = fetchedProducts.data;
      console.log(`Products Successfully loaded to Admin-Dashboard-Component.`);
    });
  };


}
