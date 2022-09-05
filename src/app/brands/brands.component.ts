import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../brands.service';
import { BrandModel } from '../Models/brand.model';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands: BrandModel[] = [];

  constructor(private brandsService: BrandsService) { }

  fetchAllBrands(): void{
    this.brandsService.getAllBrands().subscribe((fetchedBrands: any) => {
      this.brands = fetchedBrands.data;
    });
  }

  ngOnInit(): void {
    this.fetchAllBrands();
  }

}
