import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../Models/product.model';
import { ProductsService } from '../products.service';
import { BrandsService } from '../brands.service';

@Component({
  selector: 'app-men-colognes',
  templateUrl: './men-colognes.component.html',
  styleUrls: ['./men-colognes.component.css']
})
export class MenColognesComponent implements OnInit {

  products: ProductModel[] = [];
  itemBrand: any[] = [];

  constructor(
    private productsService: ProductsService,
    private brandsService: BrandsService
    ) { }

  // fetchMenColognes(): void{

  // }

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
