import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult, MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.auth.user.pipe(map(user => {
      if(user) {
        return true;
      }
      this.router.navigateByUrl('/login');
      return false;
    }))
  }
}


