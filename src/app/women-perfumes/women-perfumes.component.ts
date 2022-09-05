import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../Models/product.model';
import { ProductsService } from '../products.service';
import { BrandsService } from '../brands.service';


@Component({
  selector: 'app-women-perfumes',
  templateUrl: './women-perfumes.component.html',
  styleUrls: ['./women-perfumes.component.css']
})
export class WomenPerfumesComponent implements OnInit {

  products: ProductModel[] = [];
  itemBrand: any[] = [];

  constructor(
    private productsService: ProductsService,
    private brandsService: BrandsService
    ) { }


  fetchAllFragrances(): void{
    this.productsService.getAllProducts().subscribe((fetchedProducts: any) => {
      this.products = fetchedProducts.data;
    });
  }

  fetchWomenPerfumes(): void{
    this.productsService.getWomenPerfumes().subscribe((fetchedProducts: any) => {
      this.products = fetchedProducts.data;

      this.products.forEach((data: any) => {
        console.log(data.brand);

        this.brandsService.getBrandById(data.brand).subscribe((brandData: any) => {
          console.log(brandData);

          this.itemBrand.push(brandData.data);
        });
      });
    });
  }

  ngOnInit(): void {
    this.fetchWomenPerfumes();
  }

}
