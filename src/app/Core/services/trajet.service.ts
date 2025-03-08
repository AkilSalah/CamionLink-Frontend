import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trajet } from '../models/trajet.model';

@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  private baseUrl = 'http://localhost:8086/api/admin/trajets';
  private conducteurBaseUrl = "http://localhost:8086/api/conducteur"


  constructor(private http : HttpClient) { }

  getTrajet() : Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}`)
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

  getConducteurTrajet(id :number) : Observable<Trajet[]>{
    return this.http.get<Trajet[]>(`${this.conducteurBaseUrl}/${id}/trajets`)
  }

  updateTrajetStatus(conducteurId: number, trajetId: number, statut: string): Observable<Trajet> {
    const params = new HttpParams().set('statut', statut);
    return this.http.patch<Trajet>(
      `${this.conducteurBaseUrl}/${conducteurId}/trajets/${trajetId}/statut`, 
      null, 
      { params }
    );
  }}
