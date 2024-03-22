import {ChangeDetectorRef, Component} from '@angular/core';
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
  ekeys: Ekey[]= [];

  step=1;
  count : number =0;
  onStudentsubmit() {
    this.http.get<Ausleihe[]>("http://localhost:3000/api/v1/ausleihen?matrnr="+this.student.MatrNr).subscribe({next: (l)=> {
        if (l.length == 0) {
          this.step++;
        } else {
          console.log("Dieser Student besitzt bereits einen E-Key aktiv")
          //TODO: Error behandlugn wenn schon ein Key ausgeliehen ist
        }
      }}
    )
  }

  onKeySumbmit(){

    this.http.get<Ekey[]>("http://localhost:3000/api/v1/ekeys/"+this.ekey.ekeyid).subscribe({next: (l)=> {
        if (l.length >0 ) {
          this.step++;
        } else {
          console.log("dieser E-Key existiert nicht")
          //TODO: Error behandlugn wenn so ein key nicht existiert
        }
      }}
    )
    //TODO: PDF erstellen
  }

  submit(){
    //TODO: ekey in datenbank schreiben
    //TODO: Error Handeling
    console.log("ei neueer ekey:"+this);
    this.step++;
  }
}
