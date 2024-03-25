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
      ])
    }
  )

  changeMode(nachMatriknr:boolean){
    if(nachMatriknr){

      this.rueckgabe.get('id')?.setValidators([Validators.required,Validators.pattern('[0-9]{7}')])
    }else{
      this.rueckgabe.get('id')?.setValidators([Validators.required,Validators.pattern('.{9}')])

    }
    this.rueckgabe.get('id')?.updateValueAndValidity({emitEvent: false});

  }


  ausleihe: Ausleihe|undefined = undefined;
  ekey: Ekey|undefined;
  showAusleihe=false;
  showResponse=false;
  geschehen="";
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
        this.ausleihe=data[0];
        console.log(data)
        if(this.ausleihe===undefined){

        this.http.get<Ekey[]>(this.ROOT_URL + "/ekeys/"+this.rueckgabe.value.id).subscribe({next: (data)=> {
            this.ekey=data[0];
            this.showAusleihe=true;
          },error: (error)=>{
            console.log(error.status);
          }}
        );
        }else{
          this.showAusleihe=true;
        }
      },error: (error)=>{
        console.log(error.status);
      }}
    );
  }

  rueckgabeStarten() {
    if (this.ausleihe) {

      this.http.post(this.ROOT_URL + "/ausleihen/end",{ekeyid: this.ausleihe.ekeyid} , {observe: 'response'}).subscribe({
        error: info => {

          if (info.status == 200) {
            this.showAusleihe= false;
            this.showResponse = true;
            this.geschehen="Rückgabe"
          } else {
            console.log("Fehler beim Einfügen der Ausleihe")
            console.log(info);
          }
        }
      })

    }
  }

  keysperren() {
    if (this.ausleihe) {


      this.http.post(this.ROOT_URL + "/ausleihen/end",{ekeyid: this.ausleihe.ekeyid} , {observe: 'response'}).subscribe({
        error: info => {

          if (info.status == 200) {
            this.showAusleihe= false;
            this.showResponse = true;
            this.geschehen="Sperrung"
          } else {
            console.log("Fehler beim Aktualisieren vom Ekey")
            console.log(info);
          }
        }
      })
    }
  }

  back() {
    this.ausleihe=undefined;
    this.showAusleihe=false;
    this.showResponse=false;
  }

  zuruecknehmenVonGesperrt() {
    if(this.ekey){
    axios.post(this.ROOT_URL + "/ekeys/zuruecknehmen", {
      ekeyid: this.ekey.ekeyid,
    })
      .then( (response)=> {
        console.log(response);
        this.showAusleihe= false;
        this.showResponse = true;
        this.geschehen="Zurücknehmen"
      })
      .catch( (error)=> {
        console.log(error);
      })
    }
  }
}
