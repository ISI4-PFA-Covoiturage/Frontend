import { Component, OnInit } from '@angular/core';
import { Annonce } from '../annonce';
import { NgForm, FormControl } from '@angular/forms';
import { AnnonceService } from '../annonce.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Internaute } from '../internaute';
import { Vehicule } from '../vehicule';
import { VehiculeService } from '../vehicule.service';
import { ReservationService } from '../reservation.service';
import { InternauteService } from '../internaute.service';
import { LocalStorageService } from 'ngx-webstorage';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public internautes: Internaute[];
  public infoInternaute: Internaute;
  public infoAnnonce: Annonce;
  public infoVehicule: Vehicule;
  public typeRegulier:boolean = false;
  public sessionId= 1;

  public storageId: number;

  constructor(private annonceService: AnnonceService, private localStorageService: LocalStorageService, private vehiculeService: VehiculeService, private internauteService: InternauteService) {}

  ngOnInit(): void {
    this.storageId=this.localStorageService.retrieve('id');
    this.getInternautesById(this.storageId);
    this.getVehiculeByInternaute(this.storageId);
    console.log(this.storageId);
  }

  public getInternautesById(internauteId: number): void {
    this.internauteService.getInternautesById(internauteId)
    .subscribe(
      (response: Internaute) => {
        this.infoInternaute = response;
        console.log(this.infoInternaute);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public getVehiculeByInternaute(internauteId: number): void {
    this.vehiculeService.getVehiculeByInternaute(internauteId)
    .subscribe(
      (response: Vehicule) => {
        this.infoVehicule = response;
        console.log(this.infoVehicule);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onUpdateInternaute(internaute: Internaute): void {
    document.getElementById('add-profile-form').click();
    this.internauteService.updateInternaute(internaute).subscribe(
      (response: Internaute) => {
        console.log(response);
        this.getInternautesById(this.storageId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateVehicule(vehicule: Vehicule): void {
    document.getElementById('add-vehicule-form').click();
    this.vehiculeService.updateVehicule(vehicule).subscribe(
      (response: Vehicule) => {
        console.log(response);
        this.getInternautesById(this.storageId);
        this.getVehiculeByInternaute(this.storageId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onOpenModal(annonce: Annonce, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    
    if(mode ==='info'){
      this.infoAnnonce = annonce;
      button.setAttribute('data-target','#exampleModal1');
      console.log(annonce);
    }
    container?.appendChild(button);
    button.click();
  }
}
