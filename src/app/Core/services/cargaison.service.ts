import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargaison } from '../models/cargaison.model';

@Injectable({
  providedIn: 'root'
})
export class CargaisonService {
  private baseUrl = 'http://localhost:8086/api/admin/cargaisons';

  constructor(private http:HttpClient) { }

  getCargaisons() : Observable<Cargaison[]>{
    return this.http.get<Cargaison[]>(`${this.baseUrl}`)
  }
  getCargaisonsCount() : Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/count`)
  }

  addCargaison(cargaison: Cargaison): Observable<Cargaison> {
    return this.http.post<Cargaison>(this.baseUrl, cargaison);
  }

  updateCargaison(cargaison: Cargaison, id: number): Observable<Cargaison> {
    return this.http.put<Cargaison>(`${this.baseUrl}/${id}`, cargaison);
  }

  deleteCargaison(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
