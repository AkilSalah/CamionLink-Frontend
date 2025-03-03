import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConducteurService {

private baseUrl = 'http://localhost:8086/api/admin/conducteurs';

  constructor(private http : HttpClient) { }

  getConducteurs(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }

  deleteConducteurs(id : number): Observable<any>{
      return this.http.delete(`${this.baseUrl}/${id}`)
  }

}
