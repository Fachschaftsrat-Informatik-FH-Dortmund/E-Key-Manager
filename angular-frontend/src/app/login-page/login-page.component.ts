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
  error: string = '';

  errorMessageMap: any = {
    'auth/invalid-email': 'Email ungültig',
    'auth/invalid-credential': 'Falsches Passwort oder Account existiert nicht',
    'auth/missing-password': 'Passwort fehlt',
    'auth/too-many-requests': 'Zu viele Versuche. Versuchs später erneut'
  }

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  ) { }

  logIn(): void  {
    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => this.router.navigateByUrl('/'))
      .catch(error => {
        for(let errorType of Object.keys(this.errorMessageMap)) {
          if(error.message.includes(errorType)) {
            this.error = this.errorMessageMap[errorType];
            break;
          }
        }
      });
  }
}
