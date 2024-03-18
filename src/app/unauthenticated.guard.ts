import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn, GuardResult, MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class UnauthenticatedGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.auth.user.pipe(map(user => {
      if(user) {
        this.router.navigateByUrl('/');
        return false;
      }

      return true;
    }))
  }
}


