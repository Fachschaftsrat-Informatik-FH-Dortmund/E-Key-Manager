import {Component, OnInit} from '@angular/core';
import { Ekey } from "../../models/ekey.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-ekey-list',
  templateUrl: './ekey-list.component.html',
  styleUrl: './ekey-list.component.css'
})
export class EkeyListComponent implements OnInit{
  readonly ROOT_URL = 'http://localhost:3000/api/v1/ekeys/'
  ekeys: Observable<Ekey[]> | undefined;
  constructor(private http: HttpClient,public afAuth: AngularFireAuth) {
  }

  uid:string="";
  ngOnInit() {
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        // Obtain the Firebase ID token
        const idToken = await user.getIdToken(true);
        // Send the ID token in the Authorization header
        const headers = new HttpHeaders().set('Authorization', idToken);
        this.ekeys= this.http.get<Ekey[]>(this.ROOT_URL, { headers });

      } else {
        // Handle the case where the user is not signed in
      }
    });
  }

}
