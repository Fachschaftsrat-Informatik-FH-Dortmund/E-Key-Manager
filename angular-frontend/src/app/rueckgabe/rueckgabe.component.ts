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
      rueckgabeNachMatrNr: new FormControl<boolean | undefined>(undefined, [
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
      this.ausleihe.ende = new Date();
      axios.put(this.ROOT_URL + "/", this.ausleihe);
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

