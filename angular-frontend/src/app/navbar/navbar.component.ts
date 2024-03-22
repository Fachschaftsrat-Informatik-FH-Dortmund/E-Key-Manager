import {Component} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user$ = this.auth.user;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  ) { }


  logOut():void {
    this.auth.signOut().then(() => this.router.navigateByUrl('/auth'));
  }
}
