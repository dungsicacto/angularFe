import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Iproduct } from '../model/iproduct';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:3001';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}
  createProduct(product: Iproduct): Observable<any> {
    return this.httpClient
      .post(  
        this.url + '/product/add',
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(product);

          return throwError(error);
        })
      );
  }
  getAllProducts(): Observable<any> {
    return this.httpClient
      .get(this.url + '/product')
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  deleteProduct(id: string): Observable<any> {
    return this.httpClient
      .delete(this.url + '/product/' + id)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  updateProduct(id: string, product: Iproduct): Observable<any> {
    return this.httpClient
      .put(
        this.url + '/product/' + id,
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  findProductById(id: string): Observable<any> {
    return this.httpClient
      .get(this.url + '/product/' + id)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  getProductsByCategory(id: string): Observable<any> {
    return this.httpClient
      .get(`${this.url}/category/${id}/product`)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
}
