import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panne } from '../models/panne.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanneService {

  private adminBaseUrl = "http://localhost:8086/api/admin/pannes";
  private conducteurBaseUrl = "http://localhost:8086/api/conducteur/pannes"

  constructor(private http : HttpClient) { }
  
  createPanne(panne: Panne): Observable<Panne> {
    return this.http.post<Panne>(`${this.conducteurBaseUrl}`, panne);
  }

  getPannesByTrajet(trajetId: number): Observable<Panne[]> {
    return this.http.get<Panne[]>(`${this.conducteurBaseUrl}/trajet/${trajetId}`);
  }
  deletePanne(panneId: number): Observable<void> {
    return this.http.delete<void>(`${this.conducteurBaseUrl}/${panneId}`);
  }

  getPanneById(panneId: number): Observable<Panne> {
    return this.http.get<Panne>(`${this.adminBaseUrl}/${panneId}`);
  }
  
 getAllPannes(): Observable<Panne[]> {
    return this.http.get<Panne[]>(this.adminBaseUrl);
  }

}
