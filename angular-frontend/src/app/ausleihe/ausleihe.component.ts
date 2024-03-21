import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../models/student.model';
import {Ausleihe} from "../../models/ausleihe.model";
import {Ekey} from "../../models/ekey.model";

@Component({
  selector: 'app-ausleihe',
  templateUrl: './ausleihe.component.html',
  styleUrl: './ausleihe.component.css',
})
export class AusleiheComponent {
  model = new Ausleihe(new Student(72),new Ekey('','funktioniert','Student','STUD',''),new Date());

  step=0;
  onStudentsubmit() {
    //TODO: prüfen ob Student schon E-Key hat
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
    console.log("ei neueer ekey:"+this.model);
    this.step++;
  }
}
