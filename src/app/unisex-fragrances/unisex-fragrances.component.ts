import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../brands.service';
import { ProductModel } from '../Models/product.model';
import { ProductsService } from '../products.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-unisex-fragrances',
  templateUrl: './unisex-fragrances.component.html',
  styleUrls: ['./unisex-fragrances.component.css']
})
export class UnisexFragrancesComponent implements OnInit {

  products: any[] = [];
  itemBrand: any[] = [];

  constructor(
    private productsService: ProductsService,
    private brandsService: BrandsService,
    private location: Location
    ) { }

    //GO BACK FUNCTION
    onGoBack(){
      this.location.back();
    }

  fetchUnisexFragrances(): void{
    this.productsService.getUnisexFragrances().subscribe((fetchedProducts: any) => {
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
    this.fetchUnisexFragrances();
  }

}
