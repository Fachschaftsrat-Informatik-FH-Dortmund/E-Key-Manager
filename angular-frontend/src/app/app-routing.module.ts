import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AusleiheComponent} from "./ausleihe/ausleihe.component";
import {EkeyListComponent} from "./ekey-list/ekey-list.component";
import { RueckgabeComponent} from "./rueckgabe/rueckgabe.component";
import {RueckmeldungComponent} from "./rueckmeldung/rueckmeldung.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "@angular/fire/auth-guard";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'login', component: LoginPageComponent },
  { path: 'ausleihe', component: AusleiheComponent },
  { path: 'ekey-list', component: EkeyListComponent },
  { path: 'rückgabe', component: RueckgabeComponent},
  { path: 'rückmeldung', component: RueckmeldungComponent},
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
