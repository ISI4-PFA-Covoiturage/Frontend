import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Annonce } from './annonce';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  private apiServerUrl =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAnnonces(): Observable<Annonce[]>{
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonce/all`);
  }

  public addAnnonce(annonce: Annonce): Observable<Annonce>{
    return this.http.post<Annonce>(`${this.apiServerUrl}/annonce/add`,annonce);
  }

  public updateAnnonce(annonce: Annonce): Observable<Annonce>{
    return this.http.put<Annonce>(`${this.apiServerUrl}/annonce/update`,annonce);
  }

  public deleteAnnonce(annonceId: number): Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/annonce/delete/${annonceId}`,{});
  }

  public getAnnonceByInternaute(internauteId: number): Observable<Annonce[]>{
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonce/findByInternaute/${internauteId}`);
  }

  public getAnnonceExceptInternaute(internauteId: number): Observable<Annonce[]>{
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonce/findExceptInternaute/${internauteId}`);
  }

  //Automobiliste--------------------------------------------------------------------------------------------------------
  public getAnnoncesRegulierId(internauteId: number): Observable<Annonce[]>{
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonce/findRegulierInternaute/${internauteId}`);
  }

  public getAnnoncesPonctuelId(internauteId: number): Observable<Annonce[]>{
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonce/findPonctuelInternaute/${internauteId}`);
  }

  public updateAnnonceStatut(statut: string, annonceId: number): Observable<Annonce>{
    return this.http.put<Annonce>(`${this.apiServerUrl}/annonce/updateStatut/${statut}/${annonceId}`,{});
  }

  //Voyageur------------------------------------------------------------------------------------------------------------
  public getAnnonceRegulierExceptInternaute(internauteId: number): Observable<Annonce[]>{
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonce/findRegulierExceptInternaute/${internauteId}`);
  }
  
  public getAnnoncePonctuelExceptInternaute(internauteId: number): Observable<Annonce[]>{
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonce/findPonctuelExceptInternaute/${internauteId}`);
  }

  //admin---------------------------------------------------------------------------------------------------------------

    public getAnnoncesByValide(valide: string): Observable<Annonce[]>{
        return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonce/findByValide/${valide}`);
      }

    public updateAnnonceValide(valide: string, annonceId: number): Observable<Annonce>{
        return this.http.put<Annonce>(`${this.apiServerUrl}/annonce/updateValide/${valide}/${annonceId}`,{});
      }

      public getCountAnnoncesBystatut(): Observable<object[]>{
        return this.http.get<object[]>(`${this.apiServerUrl}/annonce/dashboard/countAnnoncesBystatut`);
      }
      public getCountAnnoncesByOnestatut(statut: string): Observable<object[]>{
        return this.http.get<object[]>(`${this.apiServerUrl}/annonce/dashboard/countAnnoncesByOnestatut/${statut}`);
      }

      public getcountAnnoncesTotal(): Observable<number>{
        return this.http.get<number>(`${this.apiServerUrl}/annonce/dashboard/countAnnoncesTotal`);
      }

}
