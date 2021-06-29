import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Internaute } from '../internaute';
import { InternauteService } from '../internaute.service';

@Component({
  selector: 'app-choose-v-a',
  templateUrl: './choose-v-a.component.html',
  styleUrls: ['./choose-v-a.component.css']
})
export class ChooseVAComponent implements OnInit {

  public internautes: Internaute[];
  public infoInternaute: Internaute;
  public storageId: number;

  constructor(private localStorageService: LocalStorageService, private internauteService: InternauteService) { }

  ngOnInit(): void {
    this.storageId=this.localStorageService.retrieve('id');
    this.getInternautesById(this.storageId);
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

}
