import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Internaute } from './internaute';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InternauteService {
    private apiServerUrl =environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getInternautesById(id: number): Observable<Internaute>{
      return this.http.get<Internaute>(`${this.apiServerUrl}/internaute/findById/${id}`);
    }

    public updateInternaute(internaute: Internaute): Observable<Internaute>{
      return this.http.put<Internaute>(`${this.apiServerUrl}/internaute/update`,internaute);
    }
    
  //admin---------------------------------------------------------------------------------------------------------------
    public getInternautesByVerifie(verifie: string): Observable<Internaute[]>{
        return this.http.get<Internaute[]>(`${this.apiServerUrl}/internaute/findByVerifie/${verifie}`);
      }

    public updateInternauteVerifie(verifie: string, internauteId: number): Observable<Internaute>{
        return this.http.put<Internaute>(`${this.apiServerUrl}/internaute/updateVerifie/${verifie}/${internauteId}`,{});
      }
      

  //dashboard
      public getCountInternauteByDateCreation(verifie: string): Observable<object[]>{
        return this.http.get<object[]>(`${this.apiServerUrl}/internaute/dashboard/countInternauteByDateCreation/${verifie}`);
      }

  //number navbar
  public getcountInternauteTotal(): Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/internaute/dashboard/countInternauteTotal`);
  }

}