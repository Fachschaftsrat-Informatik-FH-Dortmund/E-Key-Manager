import { Component } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
    standalone: false
})
export class AuthComponent {
  isLoginMode = true;
  isLoading= false;
  errorMessageMap: any = {
    'auth/invalid-email': 'Email ungültig',
    'auth/invalid-credential': 'Falsches Passwort oder Account existiert nicht',
    'auth/missing-password': 'Passwort fehlt',
    'auth/email-already-in-use': 'Email wird bereits verwendet'
  }
  error: string = '';
  constructor(private auth: AngularFireAuth, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm) {
    if(!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password

    this.isLoading=true;
    if(this.isLoginMode) {
      this.auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          this.isLoading = false;
          this.router.navigate(['/']);
        })
        .catch(error => {
          for (let errorType of Object.keys(this.errorMessageMap)) {
            if (error.message.includes(errorType)) {
              this.isLoading=false;
              this.error = this.errorMessageMap[errorType];
              break;
            }
            this.isLoading=false;
            this.error = error;
          }
        });

    }else {
      this.auth.createUserWithEmailAndPassword(email, password)
        .then(() =>
          this.isLoading=false
        )
        .catch(error => {
          for (let errorType of Object.keys(this.errorMessageMap)) {
            if (error.message.includes(errorType)) {
              this.isLoading=false;
              this.error = this.errorMessageMap[errorType];
              break;
            }
            this.isLoading=false;
            this.error = error;
          }
        });
    }

    form.reset();
    this.error='';
  }

}
