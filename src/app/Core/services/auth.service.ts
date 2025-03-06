import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8086/api/auth'; 

   constructor(private http : HttpClient) { }

  register(user: any) : Observable<any>{
    return this.http.post(`${this.baseUrl}/register/conducteur`,user)
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user).pipe(
      tap((response) => {
        if (response.token) {
          this.saveSession(response.token, response);
        }
      })
    );
  }

  logout(): Observable<any> {
    const token = this.getToken();
    if (!token) return new Observable(observer => observer.complete());

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.baseUrl}/logout`, {}, { headers, responseType: 'text' }).pipe(
      tap(() => this.clearSession())
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private saveSession(token: string, response: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({
      nom: response.nom,
      prenom: response.prenom,
      type: response.type
    }));
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }
}
