import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartModel } from './Models/cart.model';
import { catchError, of, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private API_SERVER = `${environment.API_SERVER}/cart`;
  private HTTP_HEADERS = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<CartModel[]> {
    return this.http.get<CartModel[]>(`${this.API_SERVER}`).pipe(
      tap((data) => {
        console.log(`Products Successfully loaded to Cart Service.`);
        catchError(error => of([data]));
      })
    );
  };

  addToCart(data: any): Observable<any> {
    return this.http.post<CartModel>(`${this.API_SERVER}`, data, this.HTTP_HEADERS).pipe(
      tap((data) => {
        console.log(`Product Added to Cart Successfully.`);
        catchError(error => of(data));
      })
    );
  };

  removeFromCart(id: any): Observable<CartModel> {
    return this.http.delete<CartModel>(`${this.API_SERVER}/${id}`, this.HTTP_HEADERS).pipe(
      tap((data) => {
        console.log(`Product Successfully Removed from Cart.`);
        catchError(error => of(data));
      })
    );
  };

  clearCart(): Observable<CartModel[]> {
    return this.http.delete<CartModel[]>(`${this.API_SERVER}/delete`, this.HTTP_HEADERS).pipe(
      tap((data) => {
        console.log(`Products Successfully Removed From Cart`);
        catchError(error => of(data));
      })
    );
  };






}
