import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Annonce } from '../annonce';
import { AnnonceService } from '../annonce.service';
import { Internaute } from '../internaute';
import { InternauteService } from '../internaute.service';

@Component({
  selector: 'app-admin-annonce',
  templateUrl: './admin-annonce.component.html',
  styleUrls: ['./admin-annonce.component.css']
})
export class AdminAnnonceComponent implements OnInit {
  public internautes : Internaute[];
  public annonces : Annonce[];
  public jourNaN = "NaN";
  
  public rejeteAnnonce: Annonce;
  public approuveAnnonce: Annonce;

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
        console.log(response);
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


  public onOpenModal(annonce: Annonce, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode ==='rejete'){
      this.rejeteAnnonce = annonce;
      button.setAttribute('data-target','#rejeteAnnonceModal');
    }
    if(mode ==='approuve'){
      this.approuveAnnonce = annonce;
      button.setAttribute('data-target','#approuveAnnonceModal');
    }

    container?.appendChild(button);
    button.click();
  }
  

}
