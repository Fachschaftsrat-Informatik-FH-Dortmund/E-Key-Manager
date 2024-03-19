import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthenticationGuard} from './authentication.guard'
import {UnauthenticatedGuard} from "./unauthenticated.guard";

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginPageComponent, canActivate: [UnauthenticatedGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
