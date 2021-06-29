import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Annonce } from '../annonce';
import { AnnonceService } from '../annonce.service';
import { Internaute } from '../internaute';
import { InternauteService } from '../internaute.service';

@Component({
  selector: 'app-admin-internaute',
  templateUrl: './admin-internaute.component.html',
  styleUrls: ['./admin-internaute.component.css']
})
export class AdminInternauteComponent implements OnInit {
  public internautes : Internaute[];
  public annonces : Annonce[];
  public rejeteInternaute : Internaute;
  public approuveInternaute : Internaute;

  constructor(private annonceService: AnnonceService, private internauteService: InternauteService) {}

  ngOnInit(): void {
    this.getInternautesByVerifie("En Attend");
    this.getAnnoncesByValide("En Attend");
  }

  //Internaute---------------------------------------------------------------------------------------------------------------
    public getInternautesByVerifie(verifie: string): void {
    this.internauteService.getInternautesByVerifie(verifie).subscribe(
      (response: Internaute[]) => {
        this.internautes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public onUpdateVerifieInternaute(verifie: string, idInternaute: number): void {
    this.internauteService.updateInternauteVerifie(verifie,idInternaute).subscribe(
      (response: Internaute) => {
        this.getInternautesByVerifie("En Attend");
        console.log(response);
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // Annonce ---------------------------------------------------------------------------------------------------------------
  public getAnnoncesByValide(valide: string): void {
    this.annonceService.getAnnoncesByValide(valide).subscribe(
      (response: Annonce[]) => {
        this.annonces = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateValideAnnonce(valide: string, annonceId: number): void {
    this.annonceService.updateAnnonceValide(valide,annonceId).subscribe(
      (response: Annonce) => {
        this.getAnnoncesByValide("En Attend");
        console.log(response);
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onOpenModal(internaute: Internaute, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode ==='rejete'){
      this.rejeteInternaute = internaute;
      button.setAttribute('data-target','#rejeteInternauteModal');
    }
    if(mode ==='approuve'){
      this.approuveInternaute = internaute;
      button.setAttribute('data-target','#approuveInternauteModal');
    }

    container?.appendChild(button);
    button.click();
  }
  

}
