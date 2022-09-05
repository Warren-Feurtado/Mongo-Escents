import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';
import { ProductModel } from '../Models/product.model';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any = [];
  productIdFromRoute: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productsService : ProductsService,
    private cartService : CartService
    ) { }

    ngOnInit(): void {

      // First get the product id from the current route.
      const routeParams = this.route.snapshot.paramMap;
      this.productIdFromRoute = (routeParams.get('id'));
      console.log(`id is: ${this.productIdFromRoute}`);
    
      this.getProductById(this.productIdFromRoute);
    }


    idToAddToCart = this.fb.group({
      productId: ['', Validators.required]
    });

  getProductById(id: any): void{
    this.productsService.getProductById(id).subscribe((fetchedProd: any) => {
      this.product = fetchedProd.data;
      this.idToAddToCart.setValue({
        productId: this.product._id
      });
      console.log(fetchedProd);
      
    });
  }

  addToCart( ) {
    this.cartService.addToCart(this.idToAddToCart.value).subscribe({
      next: (res) => {
        alert('Product added to cart');
        this.router.navigate(['/cart']);
        console.log(res);
      },
      error: (err) => {
        alert('Error encountered While adding item to cart');
        console.log(err);
      }
    });
    // window.alert('Your product has been added to the cart!');
  }


}
