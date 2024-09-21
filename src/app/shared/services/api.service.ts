import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  printData: BehaviorSubject<any> = new BehaviorSubject({});
   lang: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  get(url: any) {
    return this.http.get(url);
  }

  post(url: any, data: any, token: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(url, JSON.stringify(data), httpOptions);
  }
}
