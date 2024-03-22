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
  /*
  student =new Student(72)
  ekey=new Ekey('','funktioniert','Student','STUD','');
  ausleihe = new Ausleihe(0,this.student.MatrNr,this.ekey.ekeyid,new Date(),true);
*/

  student =new Student(7214799,"Jan","Schneider","jan.schneider090@stud.fh-dortmund.de")
  ekey=new Ekey('35CHRXXXX','funktioniert','Student','STUD','');
  ausleihe = new Ausleihe(0,this.student.matrnr,this.ekey.ekeyid,new Date(),true);
  step=2;
  count : number =0;
  onStudentsubmit() {
    this.http.get<Ausleihe[]>("http://localhost:3000/api/v1/ausleihen?matrnr="+this.student.matrnr).subscribe({next: (l)=> {
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
    this.http.post(this.ROOT_URL+"studenten",this.student).subscribe(l=>console.log(l));
    console.log(this.ausleihe);
    console.log(this.student);
    //TODO: Error Handeling
    console.log("ei neueer ekey:"+this.ausleihe);
    this.step++;
  }
}
