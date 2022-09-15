import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, tap, of, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { OrderModel } from './Models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private API_SERVER = `${environment.API_SERVER}/orders`;
  private HTTP_HEADERS = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private location: Location
  ) { }


//FETCH ALL ORDERS
  getAllOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.API_SERVER).pipe(
      tap((data) => {
        console.log('Orders loaded to Orders Service successfully.');
        catchError(error => of([data]));
      })
    );
  };

//FETCH AN ORDER BY ITS ID
  getOrderById(id: String): Observable<OrderModel> {
    return this.http.get<OrderModel>(`${this.API_SERVER}/${id}`).pipe(
      tap((data) => {
        console.log('Order loaded to Orders Service successfully.');
        
      })
    );
  };

  createNewOrder(order: OrderModel): Observable<OrderModel> {
    return this.http.post<OrderModel>(this.API_SERVER, order).pipe(
      tap((data) => {
        console.log('Order added to Orders Service successfully.');
        catchError(error => of(data));
      })
    );
  };

  UpdateOrder(id: String, order: OrderModel): Observable<OrderModel> {
  return this.http.patch<OrderModel>(`${this.API_SERVER}/${id}`, order).pipe(
    tap((data) => {
      console.log('Order updated successfully.');
      catchError(error => of(data));  
    })
  );
  };

  deleteOrder(id: String): Observable<OrderModel> {
    return this.http.delete<OrderModel>(`${this.API_SERVER}/${id}`).pipe(
      tap((data) => {
        console.log('Order deleted successfully.');
        catchError(error => of(data));
      })
    );
  };



}
