import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../cart.service';
import { ProductModel } from '../Models/product.model';
import { CartModel } from '../Models/cart.model';
import { ProductsService } from '../products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-fragrances',
  templateUrl: './fragrances.component.html',
  styleUrls: ['./fragrances.component.css']
})
export class FragrancesComponent implements OnInit {

  imgPath = 'public/product-image';
  products: any[] = [];

  
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private fb: FormBuilder,
    private location: Location
    ) { }

    addCartForm = this.fb.group({
      productId: ['', [Validators.required]],
    });

    onGoBack(){
      this.location.back();
    }

  fetchProducts(): void{
    this.productsService.getAllProducts().subscribe((fetchedProducts: any) => {
      this.products = fetchedProducts.data;
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

}
