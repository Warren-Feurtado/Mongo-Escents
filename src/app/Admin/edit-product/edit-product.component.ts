import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/products.service';
import { ProductModel } from 'src/app/Models/product.model';
import { BrandsService } from 'src/app/brands.service';
import { BrandModel } from 'src/app/Models/brand.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  toggle: Boolean = true;

  product!: ProductModel;
  brands: BrandModel[] = [];

  constructor(
    private adminService: AdminService,
    private productsService: ProductsService,
    private brandsService: BrandsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.fetchProductToEdit();
    this.fetchAllBrands()
  }

  prodEditForm = this.fb.group({
    prodName: [''],
    brand: [''],
    gender: [''],
    price: [''],
    size: [''],
    description: [''],
    imageSrc: [''],
    imageAlt: [''],

  });

  //SIDE-MENU TOGGLE
  hideMenu(){
    this.toggle = !this.toggle
  }

   //LOGOUT FUNCTION
   logOut(): void {
    this.adminService.logOut();
  };

   //GO BACK FUNCTION
   onGoBack(){
    this.location.back();
  }

  fetchProductToEdit(): void {
    this.productsService.getProductById(this.route.snapshot.params['id']).subscribe((product: any) => {
      this.product = product.data;
      
      const brand: any = this.product.brand;

      this.prodEditForm = this.fb.group({
        prodName: [this.product.prodName],
        brand: [brand._id],
        gender: [this.product.gender],
        price: [this.product.price],
        size: [this.product.size],
        description: [this.product.description],
        imageSrc: [this.product.imageSrc],
        imageAlt: [this.product.imageAlt],
      });
    });
  }

  onUpdateProduct(): void {
    this.productsService.editExistingProduct(this.route.snapshot.params['id'], this.prodEditForm.value).subscribe({
      next: (res) => {
        alert('Product Updated Successfully');
        console.log(res);
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.log(err);
        alert('Error encountered while updating this product.');
        
      }
    });
  }

  fetchAllBrands() {
    this.brandsService.getAllBrands().subscribe((brands: any) => {
      this.brands = brands.data
    });
  }

  file(ev:any) {
    this.prodEditForm.controls['imageSrc'].setValue(ev.target.files[0]);
  }

}
