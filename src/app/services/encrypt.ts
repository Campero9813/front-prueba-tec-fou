import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Encrypt {
  private apiUrl = 'http://localhost:3000/api/v1/encrypt'

  constructor(private http: HttpClient){}

  encryptText(text: string): Observable<any>{
    return this.http.post(this.apiUrl, { text }, {
      headers: {'Content-Type': 'application/json'}
    });
  }
}
