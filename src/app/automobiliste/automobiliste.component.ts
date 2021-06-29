import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Annonce } from '../annonce';
import { AnnonceService } from '../annonce.service';
import { Vehicule } from '../vehicule';
import { VehiculeService } from '../vehicule.service';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { LocalStorageService } from 'ngx-webstorage';






@Component({
  selector: 'app-automobiliste',
  templateUrl: './automobiliste.component.html',
  styleUrls: ['./automobiliste.component.css']
})
export class AutomobilisteComponent implements OnInit {
  public vehicule : Vehicule;
  public countVehicule : number;
  public annonces : Annonce[];
  public annoncesByInternaute : Annonce[];
  public editAnnonce : Annonce;
  public deleteAnnonce: Annonce;
  public termineAnnonce: Annonce;
  public infoAnnonce: Annonce;
  public typeRegulier:boolean = false;
  public annoncesRegulierByInternaute : Annonce[];
  public annoncesPonctuelByInternaute : Annonce[];

  public reservartionByAnnonce : Reservation[];

  public sessionAutomobilisteId:number = 1;

  public storageId: number;

  MiniSearchDebut_trajet : any;
  MiniSearchArrivee_trajet : any;


  //Data for Table Ponctuel
  dataPonctuel: any;
  displayedColumnsPonctuel: string[] = ['debut_trajet', 'arrivee_trajet', 'date_debut', 'date_arrivee', 'heure_debut', 'heure_arrivee', 'nbr_place', 'frais', 'statut', 'valide', 'Action'];

  debut_trajetPonctuelFilter = new FormControl('');
  arrivee_trajetPonctuelFilter = new FormControl('');
  date_debutPonctuelFilter = new FormControl('');
  date_arriveePonctuelFilter = new FormControl('');
  filterPonctuelValues = {
    debut_trajet: '',
    arrivee_trajet: '',
    date_debut: '',
    date_arrivee: ''
  };

  @ViewChild('TablePonctuelSort') sortPonctuel: MatSort;
  @ViewChild('TablePonctuelPaginator') paginatorPonctuel: MatPaginator;

  //Data for Table Regulier
  dataRegulier: any;
  displayedColumnsRegulier: string[] = ['debut_trajet', 'arrivee_trajet', 'heure_debut', 'heure_arrivee', 'jour', 'nbr_place', 'frais', 'statut', 'valide', 'Action'];

  debut_trajetRegulierFilter = new FormControl('');
  arrivee_trajetRegulierFilter = new FormControl('');
  heure_debutRegulierFilter = new FormControl('');
  heure_arriveeRegulierFilter = new FormControl('');
  filterRegulierValues = {
    debut_trajet: '',
    arrivee_trajet: '',
    heure_debut: '',
    heure_arrivee: ''
  };

  @ViewChild('TableRegulierSort') sortRegulier: MatSort;
  @ViewChild('TableRegulierPaginator') paginatorRegulier: MatPaginator;

  //End Of Data

  constructor(private annonceService: AnnonceService,private localStorageService: LocalStorageService, private vehiculeService: VehiculeService, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.storageId=this.localStorageService.retrieve('id');
    console.log(this.storageId);
    //Get number of vehicule by internaute
    this.getCountVehiculeByInternaute(this.storageId);


    // 1 is the Id_Internaute (Display only Annonces of Internaute who have id = 1 ^^ .. )
   this.getAnnonceByInternaute(this.storageId);
    //To display All Annonce Use this method and change this in  <tr *ngFor="let annonce of annonces"> after <tbody>
    //this.getAnnonces();
   this.getAnnoncesPonctuelId(this.storageId);
    this.getAnnoncesRegulierId(this.storageId);

    this.MiniSearchDebut_trajet="";

    //Filter Ponctuel

    this.debut_trajetPonctuelFilter.valueChanges.subscribe(
      debut_trajet => {
        this.filterPonctuelValues.debut_trajet = debut_trajet;
        this.dataPonctuel.filter = JSON.stringify(this.filterPonctuelValues);
      }
    )
    this.arrivee_trajetPonctuelFilter.valueChanges.subscribe(
        arrivee_trajet => {
          this.filterPonctuelValues.arrivee_trajet = arrivee_trajet;
          this.dataPonctuel.filter = JSON.stringify(this.filterPonctuelValues);
        }
    )
    this.date_debutPonctuelFilter.valueChanges.subscribe(
      date_debut => {
        this.filterPonctuelValues.date_debut = date_debut;
        this.dataPonctuel.filter = JSON.stringify(this.filterPonctuelValues);
      }
    )
    this.date_arriveePonctuelFilter.valueChanges.subscribe(
      date_arrivee => {
        this.filterPonctuelValues.date_arrivee = date_arrivee;
        this.dataPonctuel.filter = JSON.stringify(this.filterPonctuelValues);
      }
    )

//Filter Regulier

this.debut_trajetRegulierFilter.valueChanges.subscribe(
  debut_trajet => {
    this.filterRegulierValues.debut_trajet = debut_trajet;
    this.dataRegulier.filter = JSON.stringify(this.filterRegulierValues);
  }
)
this.arrivee_trajetRegulierFilter.valueChanges.subscribe(
    arrivee_trajet => {
      this.filterRegulierValues.arrivee_trajet = arrivee_trajet;
      this.dataRegulier.filter = JSON.stringify(this.filterRegulierValues);
    }
)
this.heure_debutRegulierFilter.valueChanges.subscribe(
  heure_debut => {
    this.filterRegulierValues.heure_debut = heure_debut;
    this.dataRegulier.filter = JSON.stringify(this.filterRegulierValues);
  }
)
this.heure_arriveeRegulierFilter.valueChanges.subscribe(
  heure_arrivee => {
    this.filterRegulierValues.heure_arrivee = heure_arrivee;
    this.dataRegulier.filter = JSON.stringify(this.filterRegulierValues);
  }
)
// End of Filter

  }

  public getVehiculeByInternaute(internauteId: number): void {
    this.vehiculeService.getVehiculeByInternaute(internauteId)
    .subscribe(
      (response: Vehicule) => {
        this.vehicule = response;
        console.log(this.vehicule);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCountVehiculeByInternaute(internauteId: number): void {
    this.vehiculeService.getCountVehiculeByInternaute(internauteId)
    .subscribe(
      (response: number) => {
        this.countVehicule = response;
        console.log(this.countVehicule);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  createPonctuelFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      console.log(data);
      return data.debut_trajet.toLowerCase().indexOf(searchTerms.debut_trajet) !== -1
      //  && data.arrivee_trajet.toString().toLowerCase().indexOf(searchTerms.arrivee_trajet) !== -1
        && data.arrivee_trajet.toLowerCase().indexOf(searchTerms.arrivee_trajet) !== -1
        && data.date_debut.toLowerCase().indexOf(searchTerms.date_debut) !== -1
        && data.date_arrivee.toLowerCase().indexOf(searchTerms.date_arrivee) !== -1
      //  && data.date_arrivee.toLowerCase().indexOf(searchTerms.date_arrivee) !== -1
        ;
    }
    return filterFunction;
  }

  createRegulierFilter(): (data: any, filter: string) => boolean {
    let filterRegulierFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.debut_trajet.toLowerCase().indexOf(searchTerms.debut_trajet) !== -1
      //  && data.arrivee_trajet.toString().toLowerCase().indexOf(searchTerms.arrivee_trajet) !== -1
        && data.arrivee_trajet.toLowerCase().indexOf(searchTerms.arrivee_trajet) !== -1
        && data.heure_debut.toLowerCase().indexOf(searchTerms.heure_debut) !== -1
        && data.heure_arrivee.toLowerCase().indexOf(searchTerms.heure_arrivee) !== -1
      //  && data.date_arrivee.toLowerCase().indexOf(searchTerms.date_arrivee) !== -1
        ;
    }
    return filterRegulierFunction;
  }

  public getAnnonces():void{
    this.annonceService.getAnnonces().subscribe(
      (response: Annonce[])=>{
        this.annonces = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  public getAnnonceByInternaute(internauteId: number): void {
    this.annonceService.getAnnonceByInternaute(internauteId).subscribe(
      (response: Annonce[]) => {
        this.annoncesByInternaute = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAnnoncesRegulierId(internauteId: number): void {
    this.annonceService.getAnnoncesRegulierId(internauteId).subscribe(
      (response: Annonce[]) => {
        this.annoncesRegulierByInternaute = response;
        this.dataRegulier = new MatTableDataSource(response) ;
        this.dataRegulier.sort=this.sortRegulier;
        this.dataRegulier.paginator=this.paginatorRegulier;
        this.dataRegulier.filterPredicate = this.createRegulierFilter();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAnnoncesPonctuelId(internauteId: number): void {
    this.annonceService.getAnnoncesPonctuelId(internauteId).subscribe(
      (response: Annonce[]) => {
        this.annoncesPonctuelByInternaute = response;
        this.dataPonctuel = new MatTableDataSource(response) ;
        this.dataPonctuel.sort=this.sortPonctuel;
        this.dataPonctuel.paginator=this.paginatorPonctuel;
        this.dataPonctuel.filterPredicate = this.createPonctuelFilter();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onAddAnnonce(addForm: NgForm): void {
    document.getElementById('add-annonce-form').click();
    this.annonceService.addAnnonce(addForm.value).subscribe(
      (response: Annonce) => {
        console.log(response);
        this.getAnnonceByInternaute(this.storageId);
        this.getAnnoncesPonctuelId(this.storageId);
        this.getAnnoncesRegulierId(this.storageId);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
        this.typeRegulier=false;
      }
    );
  }

  public onUpdateAnnonce(annonce: Annonce): void {
    this.annonceService.updateAnnonce(annonce).subscribe(
      (response: Annonce) => {
        console.log(response);
        this.getAnnonceByInternaute(this.storageId);
        this.getAnnoncesPonctuelId(this.storageId);
        this.getAnnoncesRegulierId(this.storageId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAnnonce(annonceId: number): void {
    this.annonceService.deleteAnnonce(annonceId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAnnonceByInternaute(this.storageId);
        this.getAnnoncesPonctuelId(this.storageId);
        this.getAnnoncesRegulierId(this.storageId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateStatutAnnonce(statut: string, annonceId: number): void {
    this.annonceService.updateAnnonceStatut(statut,annonceId).subscribe(
      (response: Annonce) => {
        this.getAnnonceByInternaute(this.storageId);
        this.getAnnoncesPonctuelId(this.storageId);
        this.getAnnoncesRegulierId(this.storageId);
        console.log(response);
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddVehicule(addForm: NgForm): void {
    document.getElementById('add-vehicule-form').click();
    this.vehiculeService.addVehicule(addForm.value).subscribe(
      (response: Vehicule) => {
        console.log(response);
    this.getCountVehiculeByInternaute(this.storageId);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
        this.typeRegulier=false;
      }
    );
  }
  
  public searchAnnonces(key: string): void{
    const results: Annonce[]=[];
    for(const annonce of this.annonces){
      if(annonce?.debut_trajet.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || annonce?.arrivee_trajet.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || annonce?.nbr_place.toString().indexOf(key) !== -1 ){
        results.push(annonce);
      }
    }
    this.annonces=results;
    if(results.length === 0 || !key){
      this.getAnnonces();
    }
  }

  public onOpenModal(annonce: Annonce, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode ==='addVehicule'){
      button.setAttribute('data-target','#addVehiculeModal');
    }
    if(mode ==='add'){
      this.getVehiculeByInternaute(this.storageId);
      button.setAttribute('data-target','#addAnnonceModal');
    }
    if(mode ==='edit'){
      this.editAnnonce = annonce;
      this.typeRegulier=annonce.regulier;
      console.log(this.calculateDiff(annonce.date_debut,annonce.heure_debut));
      button.setAttribute('data-target','#updateAnnonceModal');
    }
    if(mode ==='delete'){
      this.deleteAnnonce = annonce;
      button.setAttribute('data-target','#deleteAnnonceModal');
    }
    if(mode ==='termine'){
      this.termineAnnonce = annonce;
      button.setAttribute('data-target','#termineAnnonceModal');
    }
    if(mode ==='info'){
      this.infoAnnonce = annonce;
      this.typeRegulier=annonce.regulier;
      this.getReservationByAnnounce(this.infoAnnonce.id);
      button.setAttribute('data-target','#infoAnnonceModal');
      console.log(annonce);
    }
    container?.appendChild(button);
    button.click();
  }

  calculateDiff(DateDebut,HeureDebut){
   
    let todayDate = new Date();
    let sentOnDate = new Date(DateDebut);
    
    let TimeSplited = HeureDebut.split(":", 3); 
    sentOnDate.setHours(TimeSplited[0]);
    sentOnDate.setUTCMinutes(TimeSplited[1]);
    sentOnDate.setSeconds(TimeSplited[2])
    sentOnDate.setDate(sentOnDate.getDate());
     
    let differenceInTime = todayDate.getTime() - sentOnDate.getTime();
    // To calculate the no. of days between two dates
    let differenceInDays = Math.floor((todayDate.getTime() - sentOnDate.getTime()) / (1000 * 3600)); 
    console.log(differenceInDays);
    return differenceInDays;
}


public getReservationByAnnounce(annonceId: number): void {
  this.reservationService.getReservationByAnnounce(annonceId).subscribe(
    (response: Reservation[]) => {
      this.reservartionByAnnonce = response;
      console.log(this.reservartionByAnnonce);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onUpdateStatutReservation(statut: string, idReservation: number): void {
  this.reservationService.updateReservationStatut(statut,idReservation).subscribe(
    (response: Reservation) => {
      console.log(response);
      this.getReservationByAnnounce(this.infoAnnonce.id);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

}
