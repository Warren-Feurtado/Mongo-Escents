import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../Models/product.model';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-women-perfumes',
  templateUrl: './women-perfumes.component.html',
  styleUrls: ['./women-perfumes.component.css']
})
export class WomenPerfumesComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(private productsService: ProductsService) { }

  fetchWomenPerfumes(): void{

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
