import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../Models/product.model';
import { Location } from '@angular/common';
import { ProductsService } from '../products.service';
import { BrandsService } from '../brands.service';

@Component({
  selector: 'app-men-colognes',
  templateUrl: './men-colognes.component.html',
  styleUrls: ['./men-colognes.component.css']
})
export class MenColognesComponent implements OnInit {

  products: any = [];
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

  fetchMenColognes(): void{
    this.productsService.getMenColognes().subscribe((fetchedProducts: any) => {
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
    this.fetchMenColognes();
  }

}
