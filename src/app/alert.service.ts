import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alert } from './alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private apiServerUrl= environment.apiBaseUrl;

  constructor(private httpClient:HttpClient) {}

 

  public AddAlert(alert:Alert): Observable<Alert> {
    return this.httpClient.post<Alert>(`${this.apiServerUrl}/alert/add`, alert);
  }
  

}
