import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AusleiheComponent} from "./ausleihe/ausleihe.component";
import {EkeyListComponent} from "./ekey-list/ekey-list.component";
import { RueckgabeComponent} from "./rueckgabe/rueckgabe.component";
import {RueckmeldungComponent} from "./rueckmeldung/rueckmeldung.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'ausleihe', component: AusleiheComponent },
  { path: 'ekey-list', component: EkeyListComponent },
  { path: 'rückgabe', component: RueckgabeComponent},
  { path: 'rückmeldung', component: RueckmeldungComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
