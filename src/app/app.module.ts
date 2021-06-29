import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminAnnonceComponent } from './admin-annonce/admin-annonce.component';
import { AdminInternauteComponent } from './admin-internaute/admin-internaute.component';
import { HomeComponent } from './home/home.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { SignOutComponent } from './Auth/sign-out/sign-out.component';
import { ChooseVAComponent } from './choose-v-a/choose-v-a.component';
import { HttpClientInterceptor } from './http-client-interceptor';
import { Ng2Webstorage } from 'ngx-webstorage';
import { ProfileComponent } from './profile/profile.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminLogoutComponent } from './admin-logout/admin-logout.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AdminComponent,
    AdminHomeComponent,
    AdminAnnonceComponent,
    AdminInternauteComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    ProfileComponent,
    ChooseVAComponent,
    AdminLoginComponent,
    AdminLogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2Webstorage.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    HighchartsChartModule,
    ReactiveFormsModule


  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
//console.log(addForm.controls["internaute"].value);