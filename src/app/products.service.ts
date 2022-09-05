import { Injectable } from '@angular/core';
import { ProductModel } from './Models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_SERVER = "http://localhost:2000/products";
  private HTTP_HEADERS = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  
  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.API_SERVER).pipe(
      tap((data) => {
        console.log(`Products retreived successfully! ${JSON.stringify(data)}`),
        catchError(error => of([data]));
      })
    );
  };

  getProductById(id: String): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.API_SERVER}/${id}`).pipe(
      tap((data) => {
        console.log(`Product retreived successfully!`),
        catchError(error => of(data));
      })
    );
  };

  
  getMenColognes(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.API_SERVER}/men-colognes`).pipe(
      tap((data) => {
        console.log(`Men Colognes retreived successfully! ${JSON.stringify(data)}`),
        catchError(error => of([data]));
      })
    );
  };

  getWomenPerfumes(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.API_SERVER}/women-perfumes`).pipe(
      tap((data) => {
        console.log(`Women perfumes retreived successfully! ${JSON.stringify(data)}`),
        catchError(error => of([data]));
      })
    );
  };

  getUnisexPerfumes(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.API_SERVER}/unisex-fragrances`).pipe(
      tap((data) => {
        console.log(`Unisex fragrances retreived successfully! ${JSON.stringify(data)}`),
        catchError(error => of([data]));
      })
    );
  };

  addNewProduct(product: ProductModel): Observable<ProductModel> {
    let formData = new FormData();
    formData.append("prodName", product.prodName.toString());
    formData.append("gender", product.gender.toString());
    formData.append("brand", product.brand.toString());
    formData.append("description", product.description.toString());
    formData.append("imageSrc", product.imageSrc);
    formData.append("imageAlt", product.imageAlt.toString());
    formData.append("size", product.size.toString());
    formData.append("price", product.price.toString());
    return this.http.post<ProductModel>(this.API_SERVER, formData).pipe(
      tap((data) => {
        console.log('Product added Successfully!'),
        catchError(error => of(data));
      })
    );
  };

  editExistingProduct(id: String, product: ProductModel): Observable<ProductModel> {
    return this.http.patch<ProductModel>(this.API_SERVER, product, this.HTTP_HEADERS).pipe(
      tap((data) => {
        console.log('Product Updated successfully!'),
        catchError(error => of(data));
      })
    );
  };

  deleteProduct(id: String): Observable<ProductModel> {
    return this.http.delete<ProductModel>(`${this.API_SERVER}/${id}`).pipe(
      tap((data) => {
        console.log('Product deleted succesfully!'),
        catchError(error => of(data));
      })
    );
  };

}