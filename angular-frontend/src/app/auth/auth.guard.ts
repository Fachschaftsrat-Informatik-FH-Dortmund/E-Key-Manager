import {inject, Injectable} from '@angular/core';
import {
  CanActivateFn,
  CanActivateChildFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree, CanActivate, MaybeAsync, GuardResult,
} from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map, Observable} from 'rxjs';
import {user} from "@angular/fire/auth";

@Injectable({providedIn:'root'})
export class AuthGuard implements  CanActivate {
  constructor(private auth: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.auth.user.pipe(map(user => {
      return !!user;
    }))
  }
}
