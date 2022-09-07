import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../cart.service';
import { ProductModel } from '../Models/product.model';
import { CartModel } from '../Models/cart.model';
import { ProductsService } from '../products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-fragrances',
  templateUrl: './fragrances.component.html',
  styleUrls: ['./fragrances.component.css']
})
export class FragrancesComponent implements OnInit {

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

  addToCart(): void {
    // this.cartService.addToCart(this.addCartForm.value).subscribe({
    //   next: (res) => {
    //     alert('Product added to cart');
    //     // this.router.navigate(['/cart']);
    //     console.log(res);
    //   },
    //   error: (err) => {
    //     alert('Error encountered While adding item to cart');
    //     console.log(err);
    //   }
    // });
  }

  ngOnInit(): void {
    this.fetchProducts();
    // console.log(this.addCartForm.value)
  }

}
