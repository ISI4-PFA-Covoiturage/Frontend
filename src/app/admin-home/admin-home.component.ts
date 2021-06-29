import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Annonce } from '../annonce';
import { AnnonceService } from '../annonce.service';
import { Internaute } from '../internaute';
import { InternauteService } from '../internaute.service';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';
import { Vehicule } from '../vehicule';
import { VehiculeService } from '../vehicule.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  public internautes: Internaute[];
  public annonces: Annonce[];

//number
public totalAnnonces : number;
public totalInternaute : number;
public totalReservation : number;
public totalVehicule : number;
//

  highcharts = Highcharts;

  annoncesbystatut: object[];
  annoncesStatutCharts = {
    credits: {
      enabled: false,
    },

    chart: {
      type: 'pie',
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{y}',
        },
      },
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
      },
    },

    title: {
      text: 'monthly Avg temp',
    },

    series: [
      {
        name: '',
        data: [8, 6, 3],
        type: undefined,
      },
    ],
  };

  approuveInternauteChart: object[];
  approuveInternautechartOptions = {
    credits: {
      enabled: false,
    },

    chart: {
      type: 'area',
    },

    title: {
      text: 'Internautes Approuve',
    },
    xAxis: {
      categories: ['AVR', 'MAI', 'JUN'],
      title: {
        text: 'Mois',
      },
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: 'Nombre',
      },
    },
    series: [
      {
        name: '',
        data: [8, 6, 3],
        type: undefined,
      }
    ],
  };

  rejeteInternauteChart: object[];
  rejeteInternautechartOptions = {
    credits: {
      enabled: false,
    },

    chart: {
      type: 'area',
    },

    title: {
      text: 'Internautes Rejete',
    },
    xAxis: {
      categories: ['AVR', 'MAI', 'JUN'],
      title: {
        text: 'Mois',
      },
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: 'Nombre',
      },
    },
    plotOptions: {
      series: {
          color: '#FF0000'
      }
  },
    series: [
      {
        name: '',
        data: [8, 6, 3],
        type: undefined,
      }
    ],
  };

  termineAnnoncesChart: object[];
  termineAnnoncesChartOptions = {
    credits: {
      enabled: false,
    },

    title: {
      text: 'Annonces Termine',
    },
    xAxis: {
      categories: ['AVR', 'MAI', 'JUN'],
      title: {
        text: 'Mois',
      },
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: 'Nombre',
      },
    },
    plotOptions: {
      series: {
          color: '#00FF00'
      }
  },
    series: [
      {
        name: '',
        data: [8, 6, 3],
        type: undefined,
      }
    ],
  };

  supprimerAnnoncesChart: object[];
  supprimerAnnoncesChartOptions = {
    credits: {
      enabled: false,
    },

    title: {
      text: 'Annonces Supprimer',
    },
    xAxis: {
      categories: ['AVR', 'MAI', 'JUN'],
      title: {
        text: 'Mois',
      },
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: 'Nombre',
      },
    },
    plotOptions: {
      series: {
          color: '#FF0000'
      }
  },
    series: [
      {
        name: '',
        data: [8, 6, 3],
        type: undefined,
      }
    ],
  };

  constructor(
    private annonceService: AnnonceService,
    private internauteService: InternauteService,
    private reservationService: ReservationService,
    private vehiculeService: VehiculeService
  ) {}

  ngOnInit(): void {
    this.getInternautesByVerifie('En Attend');
    this.getAnnoncesByValide('En Attend');
    this.getCountAnnoncesBystatut();
    this.getApprouveInternauteByDateCreation("Approuve");
    this.getRejeteInternauteByDateCreation("Rejete");
    this.getCountAnnoncesByOnestatutTermine("Termine");
    this.getCountAnnoncesByOnestatutSupprimer("Supprimer");

    //number navbar
    this.getcountAnnoncesTotal();
    this.getcountInternauteTotal();
    this.getcountReservationTotal();
    this.getcountVehiculeTotal();
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

  public onUpdateVerifieInternaute(
    verifie: string,
    idInternaute: number
  ): void {
    this.internauteService
      .updateInternauteVerifie(verifie, idInternaute)
      .subscribe(
        (response: Internaute) => {
          this.getInternautesByVerifie('En Attend');
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
    this.annonceService.updateAnnonceValide(valide, annonceId).subscribe(
      (response: Annonce) => {
        this.getAnnoncesByValide('En Attend');
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //Dashboard
//Number navbar
public getcountAnnoncesTotal(): void {
  this.annonceService.getcountAnnoncesTotal().subscribe(
    (response: number) => {
      this.totalAnnonces = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public getcountInternauteTotal(): void {
  this.internauteService.getcountInternauteTotal().subscribe(
    (response: number) => {
      this.totalInternaute = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public getcountReservationTotal(): void {
  this.reservationService.getcountReservationTotal().subscribe(
    (response: number) => {
      this.totalReservation = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public getcountVehiculeTotal(): void {
  this.vehiculeService.getcountVehiculeTotal().subscribe(
    (response: number) => {
      this.totalVehicule = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

  //Charts

  public getCountAnnoncesBystatut(): void {
    this.annonceService.getCountAnnoncesBystatut().subscribe(
      (response: object[]) => {
        this.annoncesbystatut = response;

        let statut = [] as any;
        let valeurs = [] as any;
        let final = [] as any;
        this.annoncesbystatut.forEach(function (value) {
          statut.push(value[1]);
          valeurs.push(value[0]);
          final.push({
            name: value[1],
            y: value[0],
          });
        });
        console.log(final);
        this.annoncesStatutCharts = {
          credits: {
            enabled: false,
          },

          chart: {
            type: 'pie',
          },

          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                format: '{y}',
              },
            },
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',

              showInLegend: true,
            },
          },

          title: {
            text: 'Annonces',
          },

          series: [
            {
              name: '',
              data: final,
              type: undefined,
            },
          ],
        };
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public getApprouveInternauteByDateCreation(verifie: string): void {
    this.internauteService.getCountInternauteByDateCreation(verifie).subscribe(
      (response: object[]) => {
        this.approuveInternauteChart = response;

        let statut = [] as any;
        let convert : any;
        let valeurs =[] as  any;
        let final = [] as any;
        this.approuveInternauteChart.forEach(function (value) {



          switch (value[1]) {
            case 1:
              convert = "JAN";
                break;
            case 2:
              convert = "FEV";
                break;
            case 3:
              convert = "MAR";
                break;
            case 4:
              convert = "AVR";
                break;
            case 5:
              convert = "MAI";
                break;
            case 6:
              convert = "JUN";
                break;
            case 7:
              convert = "JUL";
                break;
            case 8:
              convert = "AOÛ";
                break;
            case 9:
              convert = "SEP";
                break;
            case 10:
              convert = "OCT";
                break;
            case 11:
              convert = "NOV";
                break;
            case 12:
              convert = "DEC";
                break;
            default:
              convert = "NAN";
                break;
        }
        statut.push(convert);
        valeurs.push(value[0]);
        });
        console.log(statut);
        this.approuveInternautechartOptions = {
          credits: {
            enabled: false,
          },

          chart: {
            type: 'area',
          },
      
          title: {
            text: 'Internautes Approuve',
          },
          xAxis: {
            categories: statut,
            title: {
              text: 'Mois',
            },
          },
          yAxis: {
            allowDecimals: false,
            title: {
              text: 'Nombre',
            },
          },
          series: [
            {
              name: '',
              data: valeurs,
              type: undefined,
            },
          ],
        };
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getRejeteInternauteByDateCreation(verifie: string): void {
    this.internauteService.getCountInternauteByDateCreation(verifie).subscribe(
      (response: object[]) => {
        this.rejeteInternauteChart = response;

        let statut = [] as any;
        let convert : any;
        let valeurs =[] as  any;
        let final = [] as any;
        this.rejeteInternauteChart.forEach(function (value) {



          switch (value[1]) {
            case 1:
              convert = "JAN";
                break;
            case 2:
              convert = "FEV";
                break;
            case 3:
              convert = "MAR";
                break;
            case 4:
              convert = "AVR";
                break;
            case 5:
              convert = "MAI";
                break;
            case 6:
              convert = "JUN";
                break;
            case 7:
              convert = "JUL";
                break;
            case 8:
              convert = "AOÛ";
                break;
            case 9:
              convert = "SEP";
                break;
            case 10:
              convert = "OCT";
                break;
            case 11:
              convert = "NOV";
                break;
            case 12:
              convert = "DEC";
                break;
            default:
              convert = "NAN";
                break;
        }
        statut.push(convert);
        valeurs.push(value[0]);
        });
        console.log(statut);
        this.rejeteInternautechartOptions = {
          credits: {
            enabled: false,
          },

          chart: {
            type: 'area',
          },
      
          title: {
            text: 'Internautes Rejete',
          },
          xAxis: {
            categories: statut,
            title: {
              text: 'Mois',
            },
          },
          yAxis: {
            allowDecimals: false,
            title: {
              text: 'Nombre',
            },
          },
          plotOptions: {
            series: {
                color: '#FF0000'
            }
        },
          series: [
            {
              name: '',
              data: valeurs,
              type: undefined,
            },
          ],
        };
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public getCountAnnoncesByOnestatutTermine(statut: string): void {
    this.annonceService.getCountAnnoncesByOnestatut(statut).subscribe(
      (response: object[]) => {
        this.termineAnnoncesChart = response;

        let statut = [] as any;
        let convert : any;
        let valeurs =[] as  any;
        let final = [] as any;
        this.termineAnnoncesChart.forEach(function (value) {
          switch (value[1]) {
            case 1:
              convert = "JAN";
                break;
            case 2:
              convert = "FEV";
                break;
            case 3:
              convert = "MAR";
                break;
            case 4:
              convert = "AVR";
                break;
            case 5:
              convert = "MAI";
                break;
            case 6:
              convert = "JUN";
                break;
            case 7:
              convert = "JUL";
                break;
            case 8:
              convert = "AOÛ";
                break;
            case 9:
              convert = "SEP";
                break;
            case 10:
              convert = "OCT";
                break;
            case 11:
              convert = "NOV";
                break;
            case 12:
              convert = "DEC";
                break;
            default:
              convert = "NAN";
                break;
        }
        statut.push(convert);
        valeurs.push(value[0]);
        });
        console.log(statut);
        this.termineAnnoncesChartOptions = {
          credits: {
            enabled: false,
          },
      
          title: {
            text: 'Annonces Termine',
          },
          xAxis: {
            categories: statut,
            title: {
              text: 'Mois',
            },
          },
          yAxis: {
            allowDecimals: false,
            title: {
              text: 'Nombre',
            },
          },
          plotOptions: {
            series: {
                color: '#00FF00'
            }
        },
          series: [
            {
              name: '',
              data: valeurs,
              type: undefined,
            },
          ],
        };
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCountAnnoncesByOnestatutSupprimer(statut: string): void {
    this.annonceService.getCountAnnoncesByOnestatut(statut).subscribe(
      (response: object[]) => {
        this.supprimerAnnoncesChart = response;

        let statut = [] as any;
        let convert : any;
        let valeurs =[] as  any;
        let final = [] as any;
        this.supprimerAnnoncesChart.forEach(function (value) {
          switch (value[1]) {
            case 1:
              convert = "JAN";
                break;
            case 2:
              convert = "FEV";
                break;
            case 3:
              convert = "MAR";
                break;
            case 4:
              convert = "AVR";
                break;
            case 5:
              convert = "MAI";
                break;
            case 6:
              convert = "JUN";
                break;
            case 7:
              convert = "JUL";
                break;
            case 8:
              convert = "AOÛ";
                break;
            case 9:
              convert = "SEP";
                break;
            case 10:
              convert = "OCT";
                break;
            case 11:
              convert = "NOV";
                break;
            case 12:
              convert = "DEC";
                break;
            default:
              convert = "NAN";
                break;
        }
        statut.push(convert);
        valeurs.push(value[0]);
        });
        console.log(statut);
        this.supprimerAnnoncesChartOptions = {
          credits: {
            enabled: false,
          },
      
          title: {
            text: 'Annonces Supprimer',
          },
          xAxis: {
            categories: statut,
            title: {
              text: 'Mois',
            },
          },
          yAxis: {
            allowDecimals: false,
            title: {
              text: 'Nombre',
            },
          },
          plotOptions: {
            series: {
                color: '#FF0000'
            }
        },
          series: [
            {
              name: '',
              data: valeurs,
              type: undefined,
            },
          ],
        };
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
