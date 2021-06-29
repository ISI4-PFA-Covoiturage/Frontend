import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from './reservation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
    private apiServerUrl =environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public addReservation(reservation: Reservation): Observable<Reservation>{
        return this.http.post<Reservation>(`${this.apiServerUrl}/reservation/add`,reservation);
      }

    public getReservationByAnnounce(annonceId: number): Observable<Reservation[]>{
        return this.http.get<Reservation[]>(`${this.apiServerUrl}/reservation/findReservationsByAnnonce/${annonceId}`);
      }

      public updateReservationStatut(statut: string, reservationId: number): Observable<Reservation>{
        return this.http.put<Reservation>(`${this.apiServerUrl}/reservation/updateStatut/${statut}/${reservationId}`,{});
      }


    public getCountExistReservationByInternauteAndAnnonce(internauteId: number, annonceId: number): Observable<number>{
        return this.http.get<number>(`${this.apiServerUrl}/reservation/countExistByInternauteAndAnnonce/${internauteId}/${annonceId}`);
    }

    public getReservationByInternauteAndAnnounce(internauteId: number, annonceId: number): Observable<Reservation>{
      return this.http.get<Reservation>(`${this.apiServerUrl}/reservation/findReservationsByInternauteAndAnnonce/${internauteId}/${annonceId}`);
    }
    
    public getReservationByInternaute(internauteId: number): Observable<Reservation[]>{
      return this.http.get<Reservation[]>(`${this.apiServerUrl}/reservation/findReservationsByInternaute/${internauteId}`);
    }


    //Dashboard
    

    //number navbar

    public getcountReservationTotal(): Observable<number>{
      return this.http.get<number>(`${this.apiServerUrl}/reservation/dashboard/countReservationTotal`);
    }

}