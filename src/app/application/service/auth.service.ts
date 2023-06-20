import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json', 
  })
};

const BASE_URL = 'https://hours-alpha-7e10789ba85b.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = '';
  logOutMessage: string = '';

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) { }

  register(firstName: string, lastName: string, email: string, phoneNumber: string, password: string): Observable<any> {
    
    console.log('authService register: ', firstName, lastName, email, phoneNumber, password);

    return this.http.post(`${BASE_URL}/noAuth/register`, {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    }, httpOptions);
  }

  getToken(): string {
    const authString = `${this.cookies.get('email')}:${this.cookies.get('password')}`;
    return 'Basic ' + btoa(authString);
  }

  isLoggedIn(): boolean {
    return !!(this.cookies.get('email') && this.cookies.get('password'));
  }

  login(email: string, password: string): Observable<any> {

    this.cookies.set('email', email);
    this.cookies.set('password', password);

    const info = btoa(`${email}:${password}`);
    const token = `Basic ${info}`;
    const options = {
      headers: new HttpHeaders({
        Authorization: token,
        'X-Requested-With' : 'XMLHttpRequest'
      }),
      withCredentials: true
    };

    const body = {
      email: email,
      password: password
    }
    
    return this.http.post(`${BASE_URL}/Auth/login`, body, options).pipe(
      tap(() => this.token = token)
    );
  }

  logout(): void {
    this.token = '';
    this.cookies.deleteAll();
  }

  verifyUser(token: string) {

    console.log('verifyUser: ', token);

    this.http.post(`${BASE_URL}/noAuth/afterVerifyEmail/${token}`, null).subscribe(
      () => console.log('verify Success!'),
    );
  }

  sendForgotPasswordEmail(email: string){
    return this.http.post(`${BASE_URL}/noAuth/sendResetPasswordEmail/${email}`, httpOptions);
  }

  resetPassword(password: string, verificationToken: string){
    const url = `${BASE_URL}/noAuth/resetPassword/${verificationToken}`;

    this.cookies.set('password', password);
    const info = btoa(`${this.cookies.get('email')}:${password}`);
    const token = `Basic ${info}`;

    const formData = new FormData();
    formData.append('password', password);
    //RequestParam equals formData

    return this.http.put(url, formData);
  }

  resendVerifyEmail(email: string): Observable<any> {
    return this.http.post(`${BASE_URL}/noAuth/resendVerificationEmail/${email}`, httpOptions);
  }
}