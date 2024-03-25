import {Component, OnInit, output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Kassenstand} from "../../models/kassenstand.model";
import {Kassenbuch} from "../../models/kassenbuch.model";
import {Ekey} from "../../models/ekey.model";
import {Observable} from "rxjs";
import {saveAs} from "file-saver";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-kasse',
  templateUrl: './kasse.component.html',
  styleUrl: './kasse.component.css'
})
export class KasseComponent {

  readonly ROOT_URL= "http://localhost:3000/api/v1/kasse/"

  kassenstand:Kassenstand| undefined;
  freierkassenstadn: Kassenstand | undefined;
  kassenbuch:Kassenbuch[]|undefined;
  constructor(private http: HttpClient,public afAuth: AngularFireAuth) { }


  headers: HttpHeaders | undefined;
  ngOnInit() {

    this.afAuth.authState.subscribe(async user => {
      if (user) {
        // Obtain the Firebase ID token
        const idToken = await user.getIdToken(true);
        // Send the ID token in the Authorization header
        this.headers = new HttpHeaders().set('Authorization', idToken);

        this.http.get<Kassenstand[]>(this.ROOT_URL+"/kassenstand",{headers: this.headers}).subscribe({next:(stand)=> {
            this.kassenstand=stand[0];
          }})

        this.http.get<Kassenstand[]>(this.ROOT_URL+"/frei/kassenstand",{headers: this.headers}).subscribe({next:(stand)=> {
            this.freierkassenstadn=stand[0];
          }})
      } else {
        // Handle the case where the user is not signed in
      }
    });


  }
data="";
  kassenbuchGen() {
    this.http.get<Kassenbuch[]>(this.ROOT_URL+"/",{headers: this.headers}).subscribe({next:(kassenbuch)=> {
        this.kassenbuch=kassenbuch;
        this.data= this.gencsv(this.kassenbuch)+"SUMME:"+this.kassenstand?.kassenstand;

        const blob = new Blob([this.data], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'kassenbuch.csv');
      }})
  }

  freiesKassenbuch() {
    this.http.get<Kassenbuch[]>(this.ROOT_URL+"/frei/",{headers: this.headers}).subscribe({next:(kassenbuch)=> {
        this.kassenbuch=kassenbuch;
        this.data= this.gencsv(this.kassenbuch)+"SUMME:"+this.freierkassenstadn?.kassenstand;

        const blob = new Blob([this.data], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'kassenbuch.csv');
    }})
  }
  output="";
  gencsv(kassenbuch:Kassenbuch[]):string{
    this.output ="wert;Datum;Bemerkung\n";
    kassenbuch.forEach((eintrag)=>{
      this.output+=eintrag.wert+";"
      this.output+=eintrag.ausfuehrung+";"
      this.output+=eintrag.bemerkung+";\n"
    })
    return this.output;
  }
}
