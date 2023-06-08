import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json', 
  })
};

const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = '';

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) { }

  register(role: string, firstName: string, lastName: string, email: string, password: string): Observable<any> {
    
    console.log('authService register: ', role, firstName, lastName, email, password);

    return this.http.post(`${BASE_URL}/noAuth/register`, {
      role,
      firstName,
      lastName,
      email,
      password,
    }, httpOptions);
  }

  login(email: string, password: string): Observable<any> {

    this.cookies.set('email', email);
    this.cookies.set('password', password);

    const info = btoa(`${email}:${password}`);
    // const info = email + ':' + password;
    const token = `Basic ${info}`;
    const options = {
      headers: new HttpHeaders({
        Authorization: token,
        'X-Requested-With' : 'XMLHttpRequest'
      }),
      withCredentials: true
    };

    return this.http.post(`${BASE_URL}/Auth/login`, options).pipe(
      tap(() => this.token = token)
    );
  }

  isLoggedIn(): boolean {
    return !!(this.cookies.get('email') && this.cookies.get('password'));
  }

  getToken(): string {
    const authString = `${this.cookies.get('email')}:${this.cookies.get('password')}`;
    return 'Basic ' + btoa(authString);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.cookies.delete('email');
    this.cookies.delete('password');
    sessionStorage.clear();

    this.http.post(`${BASE_URL}/noAuth/logout`, null);
  }

  verifyUser(token: string) {

    fetch(`${BASE_URL}/noAuth/verify/${token}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': "application/json; charset=utf8",
      }),
    })
    .then(() => {
      console.log('verify Success!');
    })
    .catch((error) => {
      console.error('Error:' , error);
      alert("failed to verify")
    });
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
