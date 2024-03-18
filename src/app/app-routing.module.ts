import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthenticationGuard} from './authentication.guard'
import {UnauthenticatedGuard} from "./unauthenticated.guard";

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginPageComponent, canActivate: [UnauthenticatedGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
