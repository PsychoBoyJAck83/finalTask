import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';

//const apiUrl = 'http://localhost:3000/';
const apiUrl = 'http://26-alb-593388902.eu-central-1.elb.amazonaws.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  public listObjects(): Observable<any> {
    return this.http
      .get(apiUrl + 'listobjects')
      .pipe(catchError(this.handleError));
  }

  public upload(formData: FormData): Observable<any> {
    return this.http
      .post(apiUrl + 'upload', formData)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      )
      .pipe(catchError(this.handleError));
  }

  public getAll(): Observable<any> {
    return this.http.get(apiUrl + 'getAll').pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
