import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { ProductModel } from 'src/app/Models/product.model';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  toggle: Boolean = true;
  products: ProductModel[] = [];
  deletePrompt: Boolean = false;
  idToDelete: string = '';
  

  constructor(
    private productsService: ProductsService,
    private adminService: AdminService,
    private location: Location
  ) { }

  //SIDE-MENU TOGGLE
  hideMenu(){
    this.toggle = !this.toggle
  }

  //GO BACK FUNCTION
  onGoBack(){
    this.location.back();
  }

  //LOGOUT FUNCTION
  logOut(): void {
    this.adminService.logOut();
  };

  fetchProducts(): void {
    this.productsService.getAllProducts().subscribe((fetcheProducts: any) => {
      this.products = fetcheProducts.data;
    });
  }

   //SHOW DELETE VARIFICATION MESSAGE BOX
   deleteConfirmation(id: any){
    this.deletePrompt = true;
    this.idToDelete = id;
  }

  //DELETE A BRAND
  deleteProduct(): void {
    this.productsService.deleteProduct(this.idToDelete).subscribe({
      next: (res) => {
        alert('Product deleted successfully');
        this.fetchProducts();
        this.idToDelete = '';
        this.deletePrompt = false;
      },
      error: () => {
        alert('Error encontered. Could not delete product')
      }
    });
  };

  //CANCEL DELETE (HIDE DELETE MESSAGE BOX)
  cancelDelete(){
    this.deletePrompt = false;
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

}
