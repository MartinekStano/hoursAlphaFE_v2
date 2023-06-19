import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json', 
  })
};

const BASE_URL = 'http://localhost:8082';

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
  //   this.cookies.set('email', email);
  //   this.cookies.set('password', password);
  
  //   const info = btoa(`${email}:${password}`);
  //   const token = `Basic ${info}`;
  //   const headers = new HttpHeaders({
  //     Authorization: token,
  //     'X-Requested-With' : 'XMLHttpRequest'
  //   });
  
  //   const options = { headers: headers, withCredentials: true };
  
  //   return this.http.post(`${BASE_URL}/Auth/login`, {}, options).pipe(
  //     tap(() => this.token = token)
  //   );
  // }
  

  // login(email: string, password: string): Observable<any> {
  //   this.cookies.set('email', email);
  //   this.cookies.set('password', password);
  
  //   const emailSend = email;
  //   const passwordSend = password;
  
  //   const info = btoa(`${email}:${password}`);
  //   const token = `Basic ${info}`;
  //   const headers = new HttpHeaders({
  //     Authorization: token,
  //     'X-Requested-With': 'XMLHttpRequest'
  //   });
  
  //   const body = {
  //     email: emailSend,
  //     password: passwordSend
  //   };
  
  //   const options = {
  //     headers: headers,
  //     withCredentials: true,
  //   };

  //   console.log('authService login: ', email, password, body, options)
  
  //   return this.http.post(`${BASE_URL}/Auth/login`, body, options).pipe(
  //     tap(() => this.token = token)
  //   );
  // }
  

  // login(email: string, password: string): Observable<any> {

  //   this.cookies.set('email', email);
  //   this.cookies.set('password', password);

  //   const emailSend = email;
  //   const passwordSend = password;

  //   const info = btoa(`${email}:${password}`);
  //   const token = `Basic ${info}`;
  //   const options = {
  //     headers: new HttpHeaders({
  //       Authorization: token,
  //       'X-Requested-With' : 'XMLHttpRequest'
  //     }),
  //     withCredentials: true
  //   };

  //   return this.http.post(`${BASE_URL}/Auth/login`, {}, options).pipe(
  //     tap(() => this.token = token)
  //   );
  // }

  // isLoggedIn(): boolean {
  //   return !!(this.cookies.get('email') && this.cookies.get('password'));
  // }

  // getToken(): string {
  //   return this.token;
  // }

  // logout(): void {
  //   console.log('before clear:', this.token);
  //   this.token = '';
  //   console.log('after clear:', this.token);
  //   console.log('----------------------');
  //   console.log('before clear:', this.cookies.get('email'));
  //   this.cookies.delete('email');
  //   console.log('after clear:', this.cookies.get('email'));
  //   console.log('----------------------');
  //   console.log('before clear:', this.cookies.get('password'));
  //   this.cookies.delete('password');
  //   console.log('after clear:', this.cookies.get('password'));
  //   sessionStorage.clear();

  //   this.http.post(`${BASE_URL}/noAuth/logout`, null).subscribe(() => console.log('logout success!'));
  // }

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  login(email: string, password: string): Observable<any> {
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