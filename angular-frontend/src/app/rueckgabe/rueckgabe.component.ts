import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {describe} from "node:test";
import {Ekey} from "../../models/ekey.model";
import {Ausleihe} from "../../models/ausleihe.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import axios from "axios";

@Component({
  selector: 'app-rueckgabe',
  templateUrl: './rueckgabe.component.html',
  styleUrl: './rueckgabe.component.css'
})
export class RueckgabeComponent {
  rueckgabe = new FormGroup({
      rueckgabeNachMatrNr: new FormControl<boolean>(true, [
        Validators.required
      ]),
      matrNr: new FormControl<number | undefined>(undefined, [
      ]),
      ekeyID: new FormControl<String | undefined>(undefined, [
      ]),
    }
  )
  ausleihe: Ausleihe|undefined = undefined;
  showAusleihe=false;

  constructor(private http:HttpClient) {
  }
  readonly ROOT_URL = 'http://localhost:3000/api/v1'
  getAusleihe() {
    this.showAusleihe=true;
    this.http.get<Ausleihe[]>(this.ROOT_URL + "/ausleihen?matrnr="+this.rueckgabe.value.matrNr).subscribe({next: (data)=> {
        console.log(data[0].matrnr)
        this.ausleihe=data[0];
      },error: (error)=>{
        console.log(error.status);
      }}
    );
  }

  rueckgabeStarten() {
    if (this.ausleihe) {
      axios.put(this.ROOT_URL + "/ausleihen/", {
        ausleihnr: this.ausleihe.ausleihnr,
        ende: new Date(),
        notiz: this.ausleihe.notiz,
        letzte_rückmeldung: this.ausleihe.letztemeldung,
        hat_studienbescheinigung: this.ausleihe.hat_studienbescheinigung
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }



}

async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

