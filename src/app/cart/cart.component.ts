import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { BrandsService } from '../brands.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: any[] = [];
  itemBrand: any[] = [];
  cartLength: number = 0;
  totalPrice: number = 0;
  tax: number = 0.15;
  quantity: number = 1;


  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private brandsService: BrandsService,
    private router: Router,
    private location: Location,
    ) { }

    //GO BACK FUNCTION
    onGoBack(){
      this.location.back();
    }

    incQuantity(){
      this.quantity++;
    }

    decQuantity(){
      this.quantity--;
    }

  getCartItems(): void {
    this.cartService.getCartItems().subscribe((fetchedItems: any) => {
      this.items = fetchedItems.data;
      this.cartLength = fetchedItems.data.length;
      console.log(this.items);
      

      this.items.forEach((data) => {
        this.totalPrice = this.totalPrice + data.cart_item[0].price;
        console.log(data.cart_item[0].brand);

        this.brandsService.getBrandById(data.cart_item[0].brand).subscribe((brandData) => {

          this.itemBrand.push(brandData);
        });
      });
      console.log(this.itemBrand);
    });
  }

  ngOnInit(): void {
    this.getCartItems();
  }

  removeFromCart(id: any): void {
   this.cartService.removeFromCart(id).subscribe({
    next: (res) => {
      alert('Product removed from cart successfully');
      // this.router.navigate(['/cart']);
      window.location.href = '/cart';
    },
    error: () => {
      console.log('Error encontered. Could not remove product')
    }
   });
  }

  // prodDelete(product: any){
  // this.productsService.removeFromCart(product);
  // this.index = this.items.length;
  // }

}
