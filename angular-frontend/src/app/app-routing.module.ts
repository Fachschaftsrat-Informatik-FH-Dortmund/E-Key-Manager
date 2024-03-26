import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AusleiheComponent} from "./ausleihe/ausleihe.component";
import {EkeyListComponent} from "./ekey-list/ekey-list.component";
import { RueckgabeComponent} from "./rueckgabe/rueckgabe.component";
import {RueckmeldungComponent} from "./rueckmeldung/rueckmeldung.component";
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import {AuthComponent} from "./auth/auth.component";
import {KasseComponent} from "./kasse/kasse.component";
import {KassenfuehrungComponent} from "./kassenfuehrung/kassenfuehrung.component";

//Gute Doku für Guards https://github.com/angular/angularfire/blob/master/site/src/auth/route-guards.md
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInToRoot = () => redirectLoggedInTo(['/']);

const routes: Routes = [
  { path: '',             component: DashboardComponent,    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'ausleihe',     component: AusleiheComponent,     canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'ekey-list',    component: EkeyListComponent,     canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'rückgabe',     component: RueckgabeComponent,    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'rückmeldung',  component: RueckmeldungComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'kasse',        component: KasseComponent,        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'auth',         component: AuthComponent,         canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToRoot }},
  { path: 'kassenfuehrung',component: KassenfuehrungComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
