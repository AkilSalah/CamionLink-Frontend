import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depense } from '../models/depense.model';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {
  
  private baseConducteurUrl = 'http://localhost:8086/api/conducteur/depenses';
  private baseAdminUrl = 'http://localhost:8086/api/admin/depenses'

  constructor(private http : HttpClient) { }

  getAllDepenses() : Observable<Depense[]>{
    return this.http.get<Depense[]>(`${this.baseAdminUrl}`);
  }
  getTrajetDepenses(id: number): Observable<Depense[]> {
    return this.http.get<Depense[]>(`${this.baseConducteurUrl}/trajet/${id}`);
  }

  addDepense(depense : Depense): Observable<Depense>{
    return this.http.post<Depense>(`${this.baseConducteurUrl}`,depense);
  }
  
  updateDepense(id: number, depense: Depense): Observable<Depense> {
    return this.http.put<Depense>(`${this.baseConducteurUrl}/${id}`, depense);
  }
  deleteDepense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseConducteurUrl}/${id}`);
  }

  validateDepense(id : number , statut : string): Observable<Depense>{
    const params = new HttpParams().set('statut', statut);
    return this.http.put<Depense>(`${this.baseAdminUrl}/${id}`,null,{params})
  }
}
