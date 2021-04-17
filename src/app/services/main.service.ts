import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/operators';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }


  GET = (URL: string, base64?: string): Observable<any> => {
    if (base64) {
      this.http.get(environment.API_URL + '/' + URL + '/' + base64).pipe(
        retry(1)
      )
    } else {
      return this.http.get(environment.API_URL + '/' + URL).pipe(
        retry(1), // retry failed request up to 1
        // catchError(err => this.errorHandler.errorHandler(err))
      )
    }
  }
  GETID = (ID: string, URL: string, base64?: string) => {
    if (base64) {
      this.http.get(environment.API_URL + '/' + URL + '/' + base64 + '/' + ID);
    } else {
      return this.http.get<any>(environment.API_URL + '/' + URL + '/' + ID);
    }
  }
  POSTBLOB = (URL: string, body: object): Observable<any> => {
    return this.http.post(environment.API_URL + '/' + URL, body, { responseType: 'blob' });
  }
  GETBLOB = (ID: string, URL: string): Observable<any> => {
    return this.http.get(environment.API_URL + '/' + URL + '/' + ID, { responseType: 'blob' });
  }
  POST = (URL: string, ID?: number): Observable<any> => {
    if (ID)
      return this.http.post(environment.API_URL + '/' + URL + '/' + ID, '');
    else
      return this.http.post(environment.API_URL + '/' + URL, '');
  }
  POSTSG = (URL: string, ID?: string): Observable<any> => {
    return this.http.post(environment.API_URL + '/' + URL + '/' + ID, '');
  }
  POSTBODY = (URL: string, body: object): Observable<any> => {
    return this.http.post(environment.API_URL + '/' + URL, body);
  }
  PUT = (URL: string, body: object): any => {
  }
  DELETE = (URL: string, id: number): Observable<any> => {
    return this.http.delete(environment.API_URL + '/' + URL + '/' + id).pipe(
      retry(1)
    );
  }
}
