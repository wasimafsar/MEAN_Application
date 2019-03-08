import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "/api";
const authenticate = "authenticate";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private comparePasswordData(res: Response) {
    let body = res;
    return body || { };
  }
  
  authenticateUser(user): Observable<any>{
   // const url = apiUrl+'/authenticate';
   const authenticateUser = `${apiUrl}/${authenticate}`;
    return this.http.post(authenticateUser, user,httpOptions)
    .pipe(map(this.comparePasswordData));
  }

  getBooks(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  getBook(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  postBook(data): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions)    // replace {} with data for post book
      .pipe(
        catchError(this.handleError)
      );
  }
  
  updateBook(data): Observable<any> {
    return this.http.put(apiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  deleteBook(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  postUser(data): Observable<any> {
    const user ='user';
    const userUrl = `${apiUrl}/${user}`;
    return this.http.post(userUrl, data, httpOptions)    // replace {} with data for post book
      .pipe(
        catchError(this.handleError)
      );
  }
}
