import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from './vehicule';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
    private apiServerUrl =environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

   
   public addVehicule(vehicule: Vehicule): Observable<Vehicule>{
        return this.http.post<Vehicule>(`${this.apiServerUrl}/vehicule/add`,vehicule);
    }

    public getVehiculeByInternaute(internauteId: number): Observable<Vehicule>{
        return this.http.get<Vehicule>(`${this.apiServerUrl}/vehicule/findByInternaute/${internauteId}`);
    }

    public getCountVehiculeByInternaute(internauteId: number): Observable<number>{
        return this.http.get<number>(`${this.apiServerUrl}/vehicule/countByInternaute/${internauteId}`);
    }
    
    public getcountVehiculeTotal(): Observable<number>{
        return this.http.get<number>(`${this.apiServerUrl}/vehicule/dashboard/countVehiculeTotal`);
    }

    public updateVehicule(vehicule: Vehicule): Observable<Vehicule>{
      return this.http.put<Vehicule>(`${this.apiServerUrl}/vehicule/update`,vehicule);
    }
    

}