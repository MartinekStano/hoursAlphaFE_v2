import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json', 
  })
};

const BASE_URL = 'http://localhost:8081';

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

  // login(email: string, password: string): Observable<any> {
  //   console.log('authService login: ', email, password);
  
  //   const url = `${BASE_URL}/Auth/login`; 
  
  //   const body = {
  //     email,
  //     password
  //   };
  
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'X-Requested-With': 'XMLHttpRequest'
  //     }),
  //     withCredentials: true
  //   };
  
  //   return this.http.post(url, body, httpOptions);
  // }

  login(email: string, password: string): Observable<any> {
    console.log('authService login: ', email, password);
  
    const url = 'http://localhost:8081/Auth/login'; // Replace with your login endpoint URL
  
    const body = {
      email,
      password
    };

    this.cookies.set('email', email);
    this.cookies.set('password', password);

    console.log('authService login: ', this.cookies.get('email'), this.cookies.get('password'));
  
    const token = `Basic ${this.b64EncodeUnicode(`${email}:${password}`)}`;
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: token
      }),
      withCredentials: true
    };
  
    return this.http.post(url, body, httpOptions);
  }
  
  b64EncodeUnicode(str: string): string {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode(parseInt(p1, 16))));
  }

  // login(email: string, password: string): Observable<any> {

  //   this.cookies.set('email', email);
  //   this.cookies.set('password', password);

  //   console.log('authService login: ', this.cookies.get('email'), this.cookies.get('password'));

  //   const info = btoa(`${email}:${password}`);
  //   const token = `Basic ${info}`;
  //   const options = {
  //     headers: new HttpHeaders({
  //       Authorization: token,
  //       'X-Requested-With' : 'XMLHttpRequest'
  //     }),
  //     withCredentials: true
  //   };

  //   return this.http.post(`${BASE_URL}/Auth/login`, options).pipe(
  //     tap(() => this.token = token)
  //   );
  // }

  isLoggedIn(): boolean {
    return !!(this.cookies.get('email') && this.cookies.get('password'));
  }

  getToken(): string {
    const authString = `${this.cookies.get('email')}:${this.cookies.get('password')}`;
    return 'Basic ' + btoa(authString);
  }

  logout(): void {
    // localStorage.removeItem('token');
    this.token = '';
    // this.cookies.delete('email');
    // this.cookies.delete('password');
    // sessionStorage.clear();

    const logOutMessage = this.logOutMessage;

    this.http.post(`${BASE_URL}/noAuth/logout`, logOutMessage).subscribe(
      () => console.log('logout Success!'),
    );
  }

  verifyUser(token: string) {

    console.log('verifyUser: ', token);

    this.http.post(`${BASE_URL}/noAuth/afterVerifyEmail/${token}`, null).subscribe(
      () => console.log('verify Success!'),
    );
  }

  sendForgotPasswordEmail(email: string){
    const url = `${BASE_URL}/noAuth/forgotPassword`;

    const formData = new FormData();
    formData.append('email', email);

    return this.http.post(url, formData);
  }

  resetPassword(password: string, verificationToken: string){
    const url = `${BASE_URL}/noAuth/resetPasswordViaVerification/${verificationToken}`;

    this.cookies.set('password', password);
    const info = btoa(`${this.cookies.get('email')}:${password}`);
    const token = `Basic ${info}`;

    const formData = new FormData();
    formData.append('password', password);

    return this.http.put(url, formData);
  }

  resendVerifyEmail(email: string): Observable<any> {
    return this.http.post(`${BASE_URL}/noAuth/resendVerifyEmail/${email}`, {
    }, httpOptions);
  }
}
