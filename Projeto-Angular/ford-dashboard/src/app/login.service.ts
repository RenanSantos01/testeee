import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3001/login'; // ✅ endpoint da sua API

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<boolean> {
    return this.http.post<{ success: boolean }>(this.apiUrl, { username, password }).pipe(
      map(response => response.success),
      catchError(() => of(false))
    );
  }
}
