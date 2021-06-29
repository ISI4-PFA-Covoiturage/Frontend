import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenAdminService } from '../authen-admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {


  username = ''
  password = ''
  invalidLogin = false

  constructor(private router: Router,
    private loginservice: AuthenAdminService) { }

  ngOnInit() {
  }

  checkLogin() {
    if (this.loginservice.authenticate(this.username, this.password)
    ) {
      this.router.navigate(['admin/internaute'])
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }
}
