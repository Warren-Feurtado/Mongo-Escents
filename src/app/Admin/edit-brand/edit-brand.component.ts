import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BrandsService } from 'src/app/brands.service';
import { BrandModel } from 'src/app/Models/brand.model';
import { AdminService } from 'src/app/admin.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {

  toggle: boolean = true;

  brand!: BrandModel;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private brandsService: BrandsService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

    brandEditForm = this.fb.group({
      brandName: [''],
      logoSrc: [''],
      logoAlt: [''],
  
    });

  ngOnInit(): void {
    this.fetchBrandToEdit();
  }

   //SIDE-MENU TOGGLE
   hideMenu(){
    this.toggle = !this.toggle
  }

    //LOGOUT FUNCTION
    logOut(): void {
      this.adminService.logOut();
    };

  //BACK FUNCTION
  onGoBack(){
    this.location.back();
  }

  fetchBrandToEdit(): void {
    this.brandsService.getBrandById(this.route.snapshot.params['id']).subscribe((brand: any) => {
      this.brand = brand.data;
      this.brandEditForm = this.fb.group({
      brandName: [this.brand.brandName],
      logoSrc: [this.brand.logoSrc],
      logoAlt: [this.brand.logoAlt],
      });
    });
  }

  onUpdateBrand(): void {
    this.brandsService.editExistingBrand(this.route.snapshot.params['id'], this.brandEditForm.value).subscribe({
      next: (res) => {
        alert('Brand Updated Successfully');
        console.log(res);
        this.router.navigate(['/admin/brands']);
      },
      error: (err) => {
        console.log(err);
        alert('Error encountered while updating this brand.');
        
      }
    });
  }

  file(ev:any) {
    this.brandEditForm.controls['logoSrc'].setValue(ev.target.files[0]);
  }



}
