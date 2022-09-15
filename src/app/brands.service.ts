import { Injectable } from '@angular/core';
import { BrandModel } from './Models/brand.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private API_SERVER = `${environment.API_SERVER}/brands`;
  private HTTP_HEADERS = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };
  
  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<BrandModel[]> {
    return this.http.get<BrandModel[]>(this.API_SERVER).pipe(
      tap((data) => {
        console.log(`Brands retreived successfully!`),
        catchError(error => of([]));
      })
    );
  };

  getBrandById(id: String): Observable<BrandModel> {
    return this.http.get<BrandModel>(`${this.API_SERVER}/${id}`).pipe(
      tap((data) => {
        console.log(`Brand retreived successfully! Brand data is: ${JSON.stringify(data)}`),
        catchError(error => of(data));
      })
    );
  };

  addNewBrand(brand: BrandModel): Observable<BrandModel> {
    // let formData = new FormData();
    // formData.append("logoSrc", brand.logoSrc);
    // formData.append("brandName", brand.brandName.toString());
    // formData.append("logoAlt", brand.logoAlt.toString());
    return this.http.post<BrandModel>(`${this.API_SERVER}`, brand).pipe(
      tap((data) => {
        console.log('Brand added successfully'),
        catchError(error => of(data));
      })
    );
  };

  editExistingBrand(id: String, brand: BrandModel): Observable<BrandModel> {
    return this.http.patch<BrandModel>(`${this.API_SERVER}/${id}`, brand, this.HTTP_HEADERS).pipe(
      tap((data) => {
        console.log('Brand Updated Successfully!'),
        catchError(error => of(data))
      })
    );
  };

  deleteBrand(id: String): Observable<BrandModel> {
    return this.http.delete<BrandModel>(`${this.API_SERVER}/${id}`, this.HTTP_HEADERS).pipe(
      tap((data) => {
        console.log('Brand deleted Successfully'),
        catchError(error => of(data))
      })
    );
  };


}
