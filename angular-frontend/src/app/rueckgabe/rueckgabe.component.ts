import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {describe} from "node:test";
import {Ekey} from "../../models/ekey.model";
import {Ausleihe} from "../../models/ausleihe.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import axios from "axios";
import {shouldWatchRoot} from "@angular-devkit/build-angular/src/utils/environment-options";

@Component({
  selector: 'app-rueckgabe',
  templateUrl: './rueckgabe.component.html',
  styleUrl: './rueckgabe.component.css'
})
export class RueckgabeComponent {
  rueckgabe = new FormGroup({
      rueckgabeNachMatrNr: new FormControl<boolean|undefined>(undefined, [
        Validators.required
      ]),
      id: new FormControl<String | undefined>(undefined, [
        Validators.required,
        Validators.pattern('bbbbb')
      ])
    }
  )

  changeMode(){
    if(this.rueckgabe.value.rueckgabeNachMatrNr){
      this.rueckgabe.get('id')?.setValidators([Validators.required,Validators.pattern('.{9}')])
    }else{
      this.rueckgabe.get('id')?.setValidators([Validators.required,Validators.pattern('[0-9]{7}')])

    }
    this.rueckgabe.get('id')?.updateValueAndValidity({emitEvent: false});

  }


  ausleihe: Ausleihe|undefined = undefined;
  showAusleihe=false;
  showResponse=false;
  constructor(private http:HttpClient) {
  }
  readonly ROOT_URL = 'http://localhost:3000/api/v1'
  getAusleihe() {

    let suche;
    if(this.rueckgabe.value.rueckgabeNachMatrNr){
      suche="matnr"
    }else {
      suche="ekeyid"
    }
    this.http.get<Ausleihe[]>(this.ROOT_URL + "/ausleihen?"+suche+"="+this.rueckgabe.value.id).subscribe({next: (data)=> {
        console.log(data[0].matrnr)
        this.ausleihe=data[0];
        this.showAusleihe=true;
      },error: (error)=>{
        console.log(error.status);
      }}
    );
  }

  rueckgabeStarten() {
    if (this.ausleihe) {
      axios.post(this.ROOT_URL + "/ausleihen/end", {
        ekeyid: this.ausleihe.ekeyid,
      })
        .then( (response)=> {
          console.log(response);
          this.showAusleihe= false;
          this.showResponse = true;
        })
        .catch( (error)=> {
          console.log(error);
        })
    }
  }




}
