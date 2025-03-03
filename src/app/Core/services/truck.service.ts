import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Camion } from '../models/camion.model';

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  private baseUrl = "http://localhost:8086/api/admin/camions"

  constructor(private http : HttpClient) { }

  getTrucks(): Observable<Camion[]> {
    return this.http.get<Camion[]>(this.baseUrl);
  }

  addTruck(camion : Camion) : Observable<Camion>{
    return this.http.post<Camion>(`${this.baseUrl}`,camion)
  }

  updateTruck(camion : Camion, id: number) : Observable<Camion>{
    return this.http.put<Camion>(`${this.baseUrl}/${id}`,camion)
  }

  deleteTruck(id: number) : Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }
}
