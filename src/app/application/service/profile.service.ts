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

const BASE_URL = 'http://localhost:8082';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) { }

  addProfileData(firstName: string, lastName: string, phoneNumber: string, address: string, zip: string, salary: number): Observable<any>{
    return this.http.put(`${BASE_URL}/Auth/updateEmployeeProfile`, {
      firstName,
      lastName,
      phoneNumber,
      address,
      zip,
      salary,
    }, httpOptions);
  }

  getProfileData(): Observable<ProfileData>{
    return this.http.get<ProfileData>(`${BASE_URL}/Auth/employeeDetails`); 
  }

  deleteUser(): Observable<void>{
    return this.http.delete<void>(`${BASE_URL}/Auth/deleteAccount`);  
  }

  changePassword(password: string): Observable<any> {

    const newPassword = password;

    const email = this.cookies.get('email');
    const passwordToken = this.cookies.get('password');

    console.log(email, passwordToken);

    const info = btoa(`${email}:${passwordToken}`);
    const token = `Basic ${info}`;
    const options = {
      headers: new HttpHeaders({
        Authorization: token,
        'X-Requested-With' : 'XMLHttpRequest'
      }),
      withCredentials: true
    };
  
  
    return this.http.put(`${BASE_URL}/Auth/resetPassword/${newPassword}`, options); // Use updated authorization token in the API request
  }
}
