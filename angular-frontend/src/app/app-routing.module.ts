import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthenticationGuard} from './authentication.guard'
import {UnauthenticatedGuard} from "./unauthenticated.guard";
import {AusleiheComponent} from "./ausleihe/ausleihe.component";
import {EkeyListComponent} from "./ekey-list/ekey-list.component";

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginPageComponent, canActivate: [UnauthenticatedGuard] },
  { path: 'ausleihe', component: AusleiheComponent },
  { path: 'ekey-list', component: EkeyListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
