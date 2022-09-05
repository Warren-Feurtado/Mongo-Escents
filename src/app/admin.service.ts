import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { AdminModel } from './Models/admin.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private API_SERVER = `${environment.API_SERVER}/admin`;
  private HTTP_HEADERS = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

  constructor(private http: HttpClient, private router: Router) { }

  //ADMIN LOGIN AUTHENTICATION
  adminLoginAuth(loginForm: any): Observable<any> {
    return this.http.post<any>(`${this.API_SERVER}/auth`, loginForm, this.HTTP_HEADERS).pipe(
      tap((data) => {
        console.log(`Login Successful`);
        catchError(error => of(data));
      })
    );
  };

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  };

  //GET ADMIN List
  getAdminList(): Observable<AdminModel[]> {
    return this.http.get<AdminModel[]>(this.API_SERVER).pipe(
      tap((data) => {
        console.log(`Admin List retreived from server`);
        catchError(error => of([]));
      })
    );
  };

  //GET ADMIN BY ID
  getAdminById(id: String): Observable<AdminModel> {
    return this.http.get<AdminModel>(`${this.API_SERVER}/${id}`).pipe(
      tap((data) => {
        console.log(`Admin Details retreived from server.`);
        catchError(error => of(data));
      })
    );
  };

//ADMIN REGISTRATION
  createAdmin(admin: AdminModel): Observable<AdminModel> {

    let formData = new FormData();
    formData.append("photo", admin.photo);
    formData.append("fName", admin.fName.toString());
    formData.append("lName", admin.lName.toString());
    formData.append("email", admin.email.toString());
    formData.append("password", admin.password.toString());

    return this.http.post<AdminModel>(this.API_SERVER, formData).pipe(
      tap((data) => {
        console.log(`Admin successfully added to database.`);
        catchError(error => of(data));
      })
    );
  };

  //UPDATE ADMIN
  UpdateAdmin(id: String, admin: AdminModel): Observable<AdminModel> {
    return this.http.patch<AdminModel>(`${this.API_SERVER}/${id}`, admin, this.HTTP_HEADERS).pipe(
      tap((data) => {
        console.log(`Admin Details Succesfully Updated.`),
        catchError(error => of(data));
      })
    );
  };

  //DELETE ADMIN
  deleteAdmin(id: String): Observable<AdminModel> {
    return this.http.delete<AdminModel>(`${this.API_SERVER}/${id}`, this.HTTP_HEADERS).pipe(
      tap((data) => {
        console.log(`Admin successfully deleted.`),
        catchError(error => of(data));
      })
    );
  };

}
