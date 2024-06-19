// cart.service.ts
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private url = 'http://localhost:3001';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token') || '',
    }),
  };
  constructor(private htpClient: HttpClient) {}

  checkout(order: any) {
    return this.htpClient
      .post(this.url + '/order', JSON.stringify(order), this.httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
}
