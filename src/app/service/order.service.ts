import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = 'http://localhost:3001/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient, private router: Router) {}
  getOrders() {
    return this.httpClient
      .get<any>(this.url + 'order')
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  cannelOrder(id: any) {
    return this.httpClient
      .delete<any>(this.url + 'order/' + id)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  updateOrder(id: any, status: any): Observable<any> {
    return this.httpClient.put<any>(
      this.url + 'order/' + id,
      JSON.stringify(status),
      this.httpOptions
    ).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
}
