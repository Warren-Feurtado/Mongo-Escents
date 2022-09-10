import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BrandsService } from 'src/app/brands.service';
import { BrandModel } from 'src/app/Models/brand.model';
import { ProductModel } from 'src/app/Models/product.model';
import { ProductsService } from 'src/app/products.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/admin.service';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  toggle: Boolean = true;
  brands: BrandModel[] = [];
  formData = new FormData();

  constructor(
    private productsService: ProductsService,
    private brandsService: BrandsService,
    private adminService: AdminService,
    private router: Router,
    private location: Location
  ) { }

 
  @ViewChild('imageSrc') imageSrc!: ElementRef<HTMLInputElement>;
  onFileSelected(event: Event): void {
    const file = this.imageSrc.nativeElement?.files?.[0];
    if(!file) return;
    console.log(file);
    this.formData.append('imageSrc', file), file.name;
  };

  addProductForm = new FormGroup({
    prodName: new FormControl(''),
    brand: new FormControl(''),
    gender: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    size: new FormControl(''),
    imageSrc: new FormControl(''),
    imageAlt: new FormControl('')
  })

   //SIDE-MENU TOGGLE
   hideMenu(){
    this.toggle = !this.toggle
  }

  //GO back function
  onGoBack(){
    this.location.back();
  }

  //LOGOUT FUNCTION
  logOut(): void {
    this.adminService.logOut();
  };

  //GET ALL BRANDS
  fetchBrands(){
    this.brandsService.getAllBrands().subscribe((fetchedBrands: any) => {
      this.brands = fetchedBrands.data;
    });
  }
  
  //SAVE NEW PRODUCT
  saveProduct(){
    this.productsService.addNewProduct(this.addProductForm.value).subscribe({
      next: (res) => {
        alert('Product Added Successfully');
        // console.log(res);
        console.log(this.addProductForm.value);
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.log(err);
        alert('Error encountered while trying to add this product.');
        
      }
    });
  }

    file(image:any) {
      this.addProductForm.controls['imageSrc'].setValue(image.files[0]);
      console.log('file works');
      console.log(this.addProductForm.controls['imageSrc'].setValue(image.files[0]));
    }

  ngOnInit(): void {
    this.fetchBrands();
  }

}
