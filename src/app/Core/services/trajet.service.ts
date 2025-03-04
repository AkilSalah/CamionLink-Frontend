import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trajet } from '../models/trajet.model';

@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  private baseUrl = 'http://localhost:8086/api/admin/trajets';

  constructor(private http : HttpClient) { }

  getTrajet() : Observable<Trajet[]>{
    return this.http.get<Trajet[]>(`${this.baseUrl}`)
  }
  addTrajet(trajet: Trajet): Observable<Trajet> {
    return this.http.post<Trajet>(`${this.baseUrl}`, trajet);
  }

  updateTrajet(id: number, trajet: Trajet): Observable<Trajet> {
    return this.http.put<Trajet>(`${this.baseUrl}/${id}`, trajet);
  }

  deleteTrajet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
