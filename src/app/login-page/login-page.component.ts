import { Component } from '@angular/core';
import { Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  email: string='';
  password: string = '';

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  ) { }
  logIn(): void  {
    this.auth.signInWithEmailAndPassword(this.email, this.password).then(() => this.router.navigateByUrl('/'));
  }

}
