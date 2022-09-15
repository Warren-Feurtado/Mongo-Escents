import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { ProductModel } from 'src/app/Models/product.model';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/admin.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  // server_link = environment.production === true
  //  ? environment.API_PRODUCTION_SERVER 
  //  : environment.API_SERVER;
   
  imgPath = 'public/product-image';

  toggle: Boolean = true;
  products: any[] = [];
  deletePrompt: Boolean = false;
  idToDelete: string = '';
  

  constructor(
    private productsService: ProductsService,
    private adminService: AdminService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

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

  // Fetch all products.
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

}
