import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Annonce } from '../annonce';
import { AnnonceService } from '../annonce.service';
import { ReservationService } from '../reservation.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { Reservation } from '../reservation';
import { Alert } from '../alert';
import { AlertService } from '../alert.service';
import { Internaute } from '../internaute';
import { InternauteService } from '../internaute.service';
import { LocalStorageService } from 'ngx-webstorage';


@Component({
  selector: 'app-voyageur',
  templateUrl: './voyageur.component.html',
  styleUrls: ['./voyageur.component.css']
})
export class VoyageurComponent implements OnInit {
  public annonces : Annonce[];
  public annoncesByInternaute : Annonce[];
  public annoncesExceptInternaute : Annonce[];
  public editAnnonce : Annonce;
  public deleteAnnonce: Annonce;
  public infoAnnonce: Annonce;
  public infoReservation: Reservation;
  public typeRegulier:boolean = false;
  public annoncesRegulierExceptInternaute : Annonce[];
  public annoncesPonctuelExceptInternaute : Annonce[];

  public existReservation: number;
  public reservationVoyageur: Reservation;
  public reservationsInternaute: Reservation[];

  public infoInternaute: Internaute;

  public sessionVoyageurId:number = 2;

  public storageId: number;


  MiniSearchDebut_trajet : any;
  MiniSearchArrivee_trajet : any;

  currentDate = new Date();

 //Data for Table Ponctuel
 dataPonctuel: any;
 displayedColumnsPonctuel: string[] = ['debut_trajet', 'arrivee_trajet', 'date_debut', 'date_arrivee', 'heure_debut', 'heure_arrivee', 'nbr_place', 'frais', 'Action'];

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
 displayedColumnsRegulier: string[] = ['debut_trajet', 'arrivee_trajet', 'heure_debut', 'heure_arrivee', 'jour', 'nbr_place', 'frais', 'Action'];

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


  //Data for Table Reservation
  dataReservation: any;
  displayedColumnsReservation: string[] = ['debut_trajet', 'arrivee_trajet', 'regulier', 'statut', 'Action'];
 
  debut_trajetReservationFilter = new FormControl('');
  arrivee_trajetReservationFilter = new FormControl('');
  filterReservationValues = {
    debut_trajet: '',
    arrivee_trajet: ''
  };
 
  @ViewChild('TableReservationSort') sortReservation: MatSort;
  @ViewChild('TableReservationPaginator') paginatorReservation: MatPaginator;
 
  //End Of Data


  constructor(private annonceService: AnnonceService, private reservationService: ReservationService, private localStorageService: LocalStorageService, private alertService: AlertService, private internauteService: InternauteService) { }

  ngOnInit(): void {
    this.storageId=this.localStorageService.retrieve('id');
    // 1 is the Id_Internaute (Display only Annonces of Internaute who have id = 1 ^^ .. )
   // this.getAnnonceExceptInternaute(2);
    //To display All Annonce Use this method and change this in  <tr *ngFor="let annonce of annonces"> after <tbody>
    //this.getAnnonces();

    this.getAnnonceRegulierExceptInternaute(this.storageId);
    this.getAnnoncePonctuelExceptInternaute(this.storageId);
    this.getInternautesById(this.storageId);

    this.getReservationByInternaute(this.storageId);

    this.debut_trajetPonctuelFilter.valueChanges
    .subscribe(
      debut_trajet => {
        this.filterPonctuelValues.debut_trajet = debut_trajet;
        this.dataPonctuel.filter = JSON.stringify(this.filterPonctuelValues);
      }
    )
    this.arrivee_trajetPonctuelFilter.valueChanges
      .subscribe(
        arrivee_trajet => {
          this.filterPonctuelValues.arrivee_trajet = arrivee_trajet;
          this.dataPonctuel.filter = JSON.stringify(this.filterPonctuelValues);
        }
    )
    this.date_debutPonctuelFilter.valueChanges
    .subscribe(
      date_debut => {
        this.filterPonctuelValues.date_debut = date_debut;
        this.dataPonctuel.filter = JSON.stringify(this.filterPonctuelValues);
      }
    )
    this.date_arriveePonctuelFilter.valueChanges
    .subscribe(
      date_arrivee => {
        this.filterPonctuelValues.date_arrivee = date_arrivee;
        this.dataPonctuel.filter = JSON.stringify(this.filterPonctuelValues);
      }
    )

//Filter Regulier

this.debut_trajetRegulierFilter.valueChanges
.subscribe(
  debut_trajet => {
    this.filterRegulierValues.debut_trajet = debut_trajet;
    this.dataRegulier.filter = JSON.stringify(this.filterRegulierValues);
  }
)
this.arrivee_trajetRegulierFilter.valueChanges
  .subscribe(
    arrivee_trajet => {
      this.filterRegulierValues.arrivee_trajet = arrivee_trajet;
      this.dataRegulier.filter = JSON.stringify(this.filterRegulierValues);
    }
)
this.heure_debutRegulierFilter.valueChanges
.subscribe(
  heure_debut => {
    this.filterRegulierValues.heure_debut = heure_debut;
    this.dataRegulier.filter = JSON.stringify(this.filterRegulierValues);
  }
)
this.heure_arriveeRegulierFilter.valueChanges
.subscribe(
  heure_arrivee => {
    this.filterRegulierValues.heure_arrivee = heure_arrivee;
    this.dataRegulier.filter = JSON.stringify(this.filterRegulierValues);
  }
)
// End of Filter


//Filter Reservation

this.debut_trajetReservationFilter.valueChanges
.subscribe(
  debut_trajet => {
    this.filterReservationValues.debut_trajet = debut_trajet;
    this.dataReservation.filter = JSON.stringify(this.filterReservationValues);
  }
)
this.arrivee_trajetReservationFilter.valueChanges
  .subscribe(
    arrivee_trajet => {
      this.filterReservationValues.arrivee_trajet = arrivee_trajet;
      this.dataReservation.filter = JSON.stringify(this.filterReservationValues);
    }
)

// End of Filter

  }

  createPonctuelFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
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

  createReservationFilter(): (data: any, filter: string) => boolean {
    let filterReservationFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.debut_trajet.toLowerCase().indexOf(searchTerms.debut_trajet) !== -1
      //  && data.arrivee_trajet.toString().toLowerCase().indexOf(searchTerms.arrivee_trajet) !== -1
        && data.arrivee_trajet.toLowerCase().indexOf(searchTerms.arrivee_trajet) !== -1
      //  && data.date_arrivee.toLowerCase().indexOf(searchTerms.date_arrivee) !== -1
        ;
    }
    return filterReservationFunction;
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

  public getAnnonceExceptInternaute(internauteId: number): void {
    this.annonceService.getAnnonceExceptInternaute(internauteId).subscribe(
      (response: Annonce[]) => {
        this.annoncesExceptInternaute = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAnnonceRegulierExceptInternaute(internauteId: number): void {
    this.annonceService.getAnnonceRegulierExceptInternaute(internauteId).subscribe(
      (response: Annonce[]) => {
        this.annoncesRegulierExceptInternaute = response;
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
  public getAnnoncePonctuelExceptInternaute(internauteId: number): void {
    this.annonceService.getAnnoncePonctuelExceptInternaute(internauteId).subscribe(
      (response: Annonce[]) => {
        this.annoncesPonctuelExceptInternaute = response;
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
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateAnnonce(annonce: Annonce): void {
    this.annonceService.updateAnnonce(annonce).subscribe(
      (response: Annonce) => {
        console.log(response);
        this.getAnnonceByInternaute(this.storageId);
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
        this.getAnnonces();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
    if(mode ==='add'){
      button.setAttribute('data-target','#addAnnonceModal');
    }
    if(mode ==='edit'){
      this.editAnnonce = annonce;
      this.typeRegulier=annonce.regulier;
      button.setAttribute('data-target','#updateAnnonceModal');
    }
    if(mode ==='delete'){
      this.deleteAnnonce = annonce;
      button.setAttribute('data-target','#deleteAnnonceModal');
    }
    if(mode ==='info'){
      this.infoAnnonce = annonce;
      this.getCountExistReservationByInternauteAndAnnonce(this.storageId,this.infoAnnonce.id);
      console.log(this.existReservation);
      this.getReservationByInternauteAndAnnounce(this.storageId,this.infoAnnonce.id);
      console.log(this.reservationVoyageur);
      button.setAttribute('data-target','#infoAnnonceModal');
      console.log(annonce);
    }
    if(mode ==='addAlert'){
      button.setAttribute('data-target','#addAlertModal');
    }

    container?.appendChild(button);
    button.click();
  }


  public onOpenModalReservation(reservation: Reservation, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode ==='infoReservation'){
      this.infoReservation = reservation;
      button.setAttribute('data-target','#infoReservationModal');
      console.log(reservation);
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddReservation(addForm: NgForm): void {
    document.getElementById('add-reservation-form').click();
    this.reservationService.addReservation(addForm.value).subscribe(
      (response: Reservation) => {
        console.log(response);
        //this.getAnnonceByInternaute(1);
        
    this.getReservationByInternaute(this.storageId);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
        
      }
    );
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
   // console.log(differenceInDays);
    return differenceInDays;
}

  public getCountExistReservationByInternauteAndAnnonce(internauteId: number, annonceId: number): void {
    this.reservationService.getCountExistReservationByInternauteAndAnnonce(internauteId,annonceId)
    .subscribe(
      (response: number) => {
        this.existReservation = response;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  
  public getReservationByInternauteAndAnnounce(internauteId: number, annonceId: number): void {
    this.reservationService.getReservationByInternauteAndAnnounce(internauteId,annonceId)
    .subscribe(
      (response: Reservation) => {
        this.reservationVoyageur = response;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getReservationByInternaute(internauteId: number): void {
    this.reservationService.getReservationByInternaute(internauteId)
    .subscribe(
      (response: Reservation[]) => {
        this.reservationsInternaute = response;
        this.dataReservation = new MatTableDataSource(response) ;
        this.dataReservation.sort=this.sortReservation;
        this.dataReservation.paginator=this.paginatorReservation;
        this.dataReservation.filterPredicate = this.createReservationFilter();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }



  public onAddAlert(addAForm :NgForm): void {
    document.getElementById('add-vehicule-form').click();
    this.alertService.AddAlert(addAForm.value)
        .subscribe( (responce:Alert) => {
          console.log(responce);
          addAForm.reset();
         
        },
        (error:HttpErrorResponse)=>{
          alert(error.message);
          addAForm.reset();
          
        }
        );

  };

  

}