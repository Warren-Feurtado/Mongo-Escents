import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../Models/product.model';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-unisex-fragrances',
  templateUrl: './unisex-fragrances.component.html',
  styleUrls: ['./unisex-fragrances.component.css']
})
export class UnisexFragrancesComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(private productsService: ProductsService) { }

  fetchUnisexFragrances(): void{

  }

  fetchAllFragrances(): void{
    this.productsService.getAllProducts().subscribe((fetchedProducts: any) => {
      this.products = fetchedProducts.data;
    });
  }


  ngOnInit(): void {
    this.fetchAllFragrances();
  }

}
