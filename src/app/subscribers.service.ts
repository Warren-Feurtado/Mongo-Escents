import { Injectable } from '@angular/core';
import { SubscriberModel } from './Models/subscriber.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  private API_SERVER = `${environment.API_SERVER}/subscribers`;
  private HTTP_HEADERS = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };


  constructor(private http: HttpClient) { }


  
  addNewSubscriber(subscriber: any): Observable<SubscriberModel> {
    
    return this.http.post<SubscriberModel>(this.API_SERVER, subscriber, this.HTTP_HEADERS).pipe(
      tap((data) => {
        console.log('Product added Successfully!'),
        catchError(error => of(data));
      })
    );
  };

  getAllSubscribers(): Observable<SubscriberModel[]> {
    return this.http.get<SubscriberModel[]>(this.API_SERVER).pipe(
      tap((data) => {
        console.log(`Subscribers retreived successfully!`),
        catchError(error => of([data]));
      })
    );
  };

  getSubscriberById(id: String): Observable<SubscriberModel> {
    return this.http.get<SubscriberModel>(`${this.API_SERVER}/${id}`).pipe(
      tap((data) => {
        console.log(`Subscriber retreived successfully!`),
        catchError(error => of(data));
      })
    );
  };

  deleteSubscriber(id: String): Observable<SubscriberModel> {
    return this.http.delete<SubscriberModel>(`${this.API_SERVER}/${id}`).pipe(
      tap((data) => {
        console.log('Subscriber removed!'),
        catchError(error => of(data));
      })
    );
  };

  

  

}
