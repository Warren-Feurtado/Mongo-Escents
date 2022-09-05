import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  cartCount: any = 0;

  constructor(private cartService: CartService) { }

  countCartProducts(): void {
    this.cartService.getCartItems().subscribe((items: any) => {
      
      this.cartCount = items.data.length;
      console.log(this.cartCount);
    });
  }

  ngOnInit(): void {
    this.countCartProducts();
  }

}
