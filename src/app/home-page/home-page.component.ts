import { Component } from '@angular/core';
import { Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {


  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  ) { }
  logOut():void {
    this.auth.signOut().then(() => this.router.navigateByUrl('/login'));
  }

}
