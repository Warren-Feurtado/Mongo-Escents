import { Component, OnInit } from '@angular/core';
import { BrandModel } from 'src/app/Models/brand.model';
import { BrandsService } from 'src/app/brands.service';
import { AdminService } from 'src/app/admin.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  toggle: Boolean = true;

  // addBrandForm = this.fb.group({
  //   logoSrc: [''],
  //   brandName: ['']
  // });

  addBrandForm = new FormGroup({
    logoSrc: new FormControl(),
    brandName: new FormControl(''),
    logoAlt: new FormControl(''),
  })

  constructor(
    private brandsService: BrandsService,
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router,
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

  //SAVE BRAND
  saveBrand(): void{
    this.brandsService.addNewBrand(this.addBrandForm.value).subscribe({
      next: (res) => {
        alert('Brand added successfully');
        this.router.navigate(['/admin/brands']);
        console.log(res);
      },
      error: (err) => {
        alert('Error encountered While adding The New brand');
        console.log(err);
      }
    });
  }

  file(ev:any) {
    this.addBrandForm.controls['logoSrc'].setValue(ev.target.files[0]);
  }


  ngOnInit(): void {

  }

}
