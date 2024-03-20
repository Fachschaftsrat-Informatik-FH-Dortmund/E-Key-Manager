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
  model = new Ausleihe(new Student(72),new Ekey('','funktioniert','ausgeliehen','STUD',''),new Date());

  studentsubmitted = false;
  keysubmitted=false;
  onStudentsubmit() {
    //TODO: prüfen ob Student schon E-Key hat
    this.studentsubmitted = true;
  }

  onKeySumbmit(){
    //TODO: Prüfen ob key echt ist
    this.keysubmitted=true;
  }
}
