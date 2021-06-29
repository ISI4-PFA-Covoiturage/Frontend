import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenAdminService } from '../authen-admin.service';

@Component({
  selector: 'app-admin-logout',
  templateUrl: './admin-logout.component.html',
  styleUrls: ['./admin-logout.component.css']
})
export class AdminLogoutComponent implements OnInit {

  constructor(
    private authentocationService: AuthenAdminService,
    private router: Router) {

  }

  ngOnInit() {
    this.authentocationService.logOut();
    this.router.navigate(['admin/login']);
  }

}
