import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAnnonceComponent } from './admin-annonce/admin-annonce.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminInternauteComponent } from './admin-internaute/admin-internaute.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminLogoutComponent } from './admin-logout/admin-logout.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { SignOutComponent } from './Auth/sign-out/sign-out.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { AutomobilisteComponent } from './automobiliste/automobiliste.component';
import { ChooseVAComponent } from './choose-v-a/choose-v-a.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { VoyageurComponent } from './voyageur/voyageur.component';

const routes: Routes = [
  {path:"voyageur", component: VoyageurComponent},
  {path:"signin", component: SignInComponent},
  {path:"signup", component: SignUpComponent},
  {path:"signout", component: SignOutComponent},
  {path:"choose", component: ChooseVAComponent, canActivate: [AuthGuard]},
  {path:"automobiliste", component: AutomobilisteComponent},
  {path:"profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path:"admin", component: AdminComponent},
  {path:"admin/home", component: AdminHomeComponent},
  {path:"admin/annonce", component: AdminAnnonceComponent},
  {path:"admin/internaute", component: AdminInternauteComponent},
  {path:"admin/login", component: AdminLoginComponent},
  {path:"admin/logout", component: AdminLogoutComponent},
  {path:"", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [VoyageurComponent,AdminLogoutComponent,AdminLoginComponent,AutomobilisteComponent,SignInComponent,SignUpComponent,SignOutComponent,ChooseVAComponent]
