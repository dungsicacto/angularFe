import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICategory } from '../model/icategory';
@Injectable({
  providedIn: 'root',
})
export class CategoryServiceService {
  private url = 'http://localhost:3001';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAllCategory(): Observable<any> {
    return this.httpClient
      .get<any>(this.url + '/category')
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  createCategory(category: ICategory): Observable<any> {
    return this.httpClient
      .post(
        this.url + '/category/add',
        JSON.stringify(category),
        this.httpOptions
      )
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  deleteCategory(id: string) {
    return this.httpClient
      .delete(this.url + '/category/' + id)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  updateCategory(id: string, category: ICategory): Observable<any> {
    return this.httpClient
      .put(
        this.url + '/category/' + id,
        JSON.stringify(category),
        this.httpOptions
      )
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  findCategoryById(id: string): Observable<any> {
    return this.httpClient
      .get<any>(this.url + '/category/' + id)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
}
