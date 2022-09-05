import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../Models/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-men-colognes',
  templateUrl: './men-colognes.component.html',
  styleUrls: ['./men-colognes.component.css']
})
export class MenColognesComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(private productsService: ProductsService) { }

  fetchMenColognes(): void{

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
