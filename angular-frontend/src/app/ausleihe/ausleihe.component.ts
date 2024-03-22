import {ChangeDetectorRef, Component} from '@angular/core';

import {Student} from '../../models/student.model';
import {Ausleihe} from "../../models/ausleihe.model";
import {Ekey} from "../../models/ekey.model";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-ausleihe',
  templateUrl: './ausleihe.component.html',
  styleUrl: './ausleihe.component.css',
})
export class AusleiheComponent {
  readonly ROOT_URL = 'http://localhost:3000/api/v1/'

  constructor(private http: HttpClient) {
  }

  student = new Student(72)
  ekey = new Ekey('', 'funktioniert', 'Student', 'STUD', '');
  ausleihenotiz = ""
  step = 0

  /* obly for db debug
    student =new Student(7024496,"Jan","Schneider","jan.schneider090@stud.fh-dortmund.de")
    ekey=new Ekey('35CHRXXXX','funktioniert','Student','STUD','');
    ausleihe = new Ausleihe(0,this.student.matrnr,this.ekey.ekeyid,new Date(),true);
    step=2;
    */

  count: number = 0;

  onStudentsubmit() {
    this.http.get<Ausleihe[]>("http://localhost:3000/api/v1/ausleihen?matrnr=" + this.student.matrnr).subscribe({
        next: (l) => {
          if (l.length == 0) {
            this.step++;
          } else {
            console.log("Dieser Student besitzt bereits einen E-Key aktiv")
            //TODO: Error behandlugn wenn schon ein Key ausgeliehen ist
          }
        }
      }
    )
  }

  onKeySumbmit() {

    this.http.get<Ekey[]>("http://localhost:3000/api/v1/ekeys/" + this.ekey.ekeyid).subscribe({
        next: (l) => {
          if (l.length == 0) {
            console.log("dieser E-Key existiert nicht")

            return;
          }
          if (l[0].besitzer != "FSR") {
            console.log("dieser E-Key sollte gerade verliehen sein, ist nicht im FSR Besitz");
            return;
          }
          if(l[0].zustand != "funktioniert"){
            console.log("dieser E-Key gilt als" + l[0].zustand)
            return;

          }
          if (l.length > 0 && l[0].besitzer == "FSR" && l[0].zustand == "funktioniert") {
            this.step++;
          } else {
            console.log("Fehler")
          }
        }
      }
    )
    //TODO: PDF erstellen
  }

  submit() {
    let ausleihe: Ausleihe;

    if (this.ausleihenotiz == "") {
      ausleihe = new Ausleihe(0, this.student.matrnr, this.ekey.ekeyid, new Date(), true)
    } else {

      ausleihe = new Ausleihe(0, this.student.matrnr, this.ekey.ekeyid, new Date(), true, this.ausleihenotiz)
    }

    console.log(this.student)
    console.log(ausleihe)
    //Student
    this.http.post(this.ROOT_URL + "studenten", this.student, {observe: 'response'}).subscribe({
      error: info => {
        if (info.status == 201 || info.status == 409) {

          //Ausleihe
          this.http.post(this.ROOT_URL + "ausleihen", ausleihe, {observe: 'response'}).subscribe({
            error: info => {

              if (info.status == 201) {
                console.log("ei neueer ekey:" + ausleihe);
                this.step++;
              } else {
                console.log("Da ist etwas scheif gelaufen mit den einfügen vom Vertrag")
              }
            }
          })


        } else {
          console.log("Da ist etwas scheif gelaufen mit den einfügen vom Studenten")
        }
      }
    });

  }
}
