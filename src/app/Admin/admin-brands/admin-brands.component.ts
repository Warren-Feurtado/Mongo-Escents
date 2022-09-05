import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { BrandsService } from 'src/app/brands.service';
import { BrandModel } from 'src/app/Models/brand.model';


@Component({
  selector: 'app-admin-brands',
  templateUrl: './admin-brands.component.html',
  styleUrls: ['./admin-brands.component.css']
})
export class AdminBrandsComponent implements OnInit {

  brands: BrandModel[] = [];
  toggle: Boolean = true;
  idToDelete: string = '';
  deletePrompt: boolean = false;

  constructor(
    private brandsService: BrandsService,
    private adminService: AdminService,
    private location: Location
  ) { }

  //SIDE-MENU TOGGLE
  hideMenu(){
    this.toggle = !this.toggle
  }

  onGoBack(){
    this.location.back();
  }

  //LOGOUT FUNCTION
  logOut(): void {
    this.adminService.logOut();
  };

  //GET ALL BRANDS
  fetchBrands(): void {
    this.brandsService.getAllBrands().subscribe((fetchedBrands: any) => {
        this.brands = fetchedBrands.data;
        console.log(`Brands Successfully loaded to Admin-Dashboard-Component.`);
        // console.log(`Brands Successfully loaded to Admin-Dashboard-Component. ${fetchedBrands}`);
    });
  };

  //SHOW DELETE VARIFICATION MESSAGE BOX
  deleteConfirmation(id: any){

    this.deletePrompt = true;
    this.idToDelete = id;
  }

  //DELETE A BRAND
  deleteBrand(): void {
    this.brandsService.deleteBrand(this.idToDelete).subscribe({
      next: (res) => {
        alert('Brand deleted successfully');
        this.fetchBrands();
        this.idToDelete = '';
        this.deletePrompt = false;
      },
      error: () => {
        alert('Error encontered. Could not delete brand')
      }
    });
  };

  //CANCEL DELETE (HIDE DELETE MESSAGE BOX)
  cancelDelete(){
    this.deletePrompt = false;
  }

  ngOnInit(): void {
    this.fetchBrands();
  }

}
