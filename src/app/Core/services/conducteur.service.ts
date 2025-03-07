import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class ConducteurService {

  private baseUrlAdmin = 'http://localhost:8086/api/admin/conducteurs';
  private baseUrlConducteur= 'http://localhost:8086/api/conducteur';

  constructor(private http : HttpClient) { }

  getConducteurs(): Observable<any> {
    return this.http.get(`${this.baseUrlAdmin}`)
  }

  deleteConducteurs(id : number): Observable<any>{
      return this.http.delete(`${this.baseUrlAdmin}/${id}`)
  }

  getConducteurAccount() : Observable<any>{
    return this.http.get(`${this.baseUrlConducteur}`)
  }

  updateConducteur(id: number, conducteur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrlConducteur}/profile/${id}`, conducteur);
  }

  deleteConducteurAccount(id:number) : Observable<void>{
    return this.http.delete<void>(`${this.baseUrlConducteur}/${id}`);
  }
}
