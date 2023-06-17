import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ProfileData } from '../model/profileData';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json', 
  })
};

const BASE_URL = 'http://localhost:8081';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) { }

  addProfileData(firstName: string, lastName: string, email: string, phoneNumber: string, address: string, zip: string): Observable<any>{
    return this.http.put(`${BASE_URL}/editUser`, {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      zip,
    }, httpOptions);
  }

  getProfileData(): Observable<ProfileData>{
    return this.http.get<ProfileData>(`${BASE_URL}/getUserDetails`); 
  }

  deleteUser(): Observable<void>{
    return this.http.delete<void>(`${BASE_URL}/deleteUser`);  
  }

  changePassword(newPassword: string): Observable<any> {

    const email = this.cookies.get('email');
    const password = this.cookies.get('password');

    console.log(email, password);

    const info = btoa(`${email}:${password}`);
    const token = `Basic ${info}`;
    const options = {
      headers: new HttpHeaders({
        Authorization: token,
        'X-Requested-With' : 'XMLHttpRequest'
      }),
      withCredentials: true
    };
  
    const url = `${BASE_URL}/resetPassword`;
  
    const formData = new FormData();
    formData.append('newPassword', newPassword);
  
    return this.http.put(url, formData, options); 
  }
}
