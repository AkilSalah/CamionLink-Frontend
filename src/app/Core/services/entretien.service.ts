import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entretien } from '../models/entretien.model';

@Injectable({
  providedIn: 'root'
})
export class EntretienService {
  private baseUrl = 'http://localhost:8086/api/admin/entretiens';
  private base_Url = 'http://localhost:8086/api/conducteur/entretiens';


  constructor(private http : HttpClient) { }

  getAllEntretien(): Observable<Entretien[]> {
    return this.http.get<Entretien[]>(`${this.base_Url}`);
  }
  getEntretienById(id: number): Observable<Entretien> {
    return this.http.get<Entretien>(`${this.base_Url}/${id}`);
  }

  addEntretien(entretien: Entretien): Observable<Entretien> {
    return this.http.post<Entretien>(`${this.baseUrl}`, entretien);
  }

  updateEntretien(id: number, entretien: Entretien): Observable<Entretien> {
    return this.http.put<Entretien>(`${this.baseUrl}/${id}`, entretien);
  }

  deleteEntretien(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
