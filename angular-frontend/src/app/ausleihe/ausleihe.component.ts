import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../models/student.model';
import {Ausleihe} from "../../models/ausleihe.model";
import {Ekey} from "../../models/ekey.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ausleihe',
  templateUrl: './ausleihe.component.html',
  styleUrl: './ausleihe.component.css',
})
export class AusleiheComponent {
  readonly ROOT_URL = 'http://localhost:3000/api/v1/'

  constructor(private http: HttpClient) { }
  student =new Student(72)
  ekey=new Ekey('','funktioniert','Student','STUD','');
  ausleihe = new Ausleihe(0,this.student.MatrNr,this.ekey.ekeyid,new Date(),true);

  ausl: Observable<Ausleihe[]> | undefined;
  step=0;
  onStudentsubmit() {

    this.ausl=this.http.get<Ausleihe[]>(this.ROOT_URL+"ausleihen?matrnr="+this.student.MatrNr)

    this.ausl.subscribe(value => console.log('Observable emitted the next value: ' + value[0]))

    if(Object.keys(this.http.get(this.ROOT_URL+"ausleihen?matrnr="+this.student.MatrNr)).length>0){
      console.log("möp")
    }

    this.step++;
  }

  onKeySumbmit(){
    //TODO: Prüfen ob key echt ist
    //TODO: PDF erstellen
    this.step++;
  }

  submit(){
    //TODO: ekey in datenbank schreiben
    //TODO: Error Handeling
    console.log("ei neueer ekey:"+this);
    this.step++;
  }
}
