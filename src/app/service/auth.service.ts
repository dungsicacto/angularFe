import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3001/';

  constructor(private httpClient: HttpClient, private router: Router) {}

  register(user: any): Observable<any> {
    return this.httpClient.post(this.url + 'register', user);
  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  login(user: any): Observable<any> {
    return this.httpClient.post(this.url + 'login', user);
  }
  authLogin() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token ?? '');
    return this.httpClient.get(this.url + 'authlogin', { headers });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  isAdmin(): boolean {
    const role = JSON.parse(localStorage.getItem('user') ?? '{}').role;
    console.log(typeof role);

    if (role === 0) {
      return false;
    } else return true;
  }
}
