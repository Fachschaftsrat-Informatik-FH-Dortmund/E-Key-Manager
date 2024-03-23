import {ChangeDetectorRef, Component} from '@angular/core';

import {Student} from '../../models/student.model';
import {Ausleihe} from "../../models/ausleihe.model";
import {Ekey} from "../../models/ekey.model";
import {HttpClient} from "@angular/common/http";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-ausleihe',
  templateUrl: './ausleihe.component.html',
  styleUrl: './ausleihe.component.css',
})
export class AusleiheComponent {
  readonly ROOT_URL = 'http://localhost:3000/api/v1/'
  readonly  VERTRAG_URL="http://localhost:4000"
  error: string = '';
  constructor(private http: HttpClient, private formBuilder:FormBuilder) {
  }

  student = this.formBuilder.group({
    matrnr: ['', [
      Validators.required,
      Validators.pattern('\\d{7}'),
    ]],
    vorname: ['', [
      Validators.required,
      Validators.minLength(1)
    ]],
    nachname: ['', [
      Validators.required,
      Validators.minLength(1)
    ]],
    email:['', [
      Validators.required,
      Validators.pattern('\\w+.\\w+\\d{3}')
    ]],
  });

  ekey = this.formBuilder.group({
    ekeyid: ['', [
      Validators.required,
      Validators.pattern('.{9}')
    ]]
  })

  //ekey = new Ekey('', 'funktioniert', 'Student', 'STUD', '');
  ausleihenotiz = ""
  step = 0

  /* only for db debug
    student =new Student(7024496,"Jan","Schneider","jan.schneider090@stud.fh-dortmund.de")
    ekey=new Ekey('35CHRXXXX','funktioniert','Student','STUD','');
    ausleihe = new Ausleihe(0,this.student.value.matrnr,this.ekey.value.ekeyid,new Date(),true);
  ausleihenotiz = ""
    step=1;
*/

  count: number = 0;

  onStudentsubmit() {
    // @ts-ignore
    if(!this.student.value.email.includes('@stud.fh-dortmund.de')) {
      this.student.value.email+='@stud.fh-dortmund.de';
    }

    this.http.get<Ausleihe[]>("http://localhost:3000/api/v1/ausleihen?matrnr=" + this.student.value.matrnr).subscribe({
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

  async onKeySumbmit() {
    this.http.get<Ekey[]>("http://localhost:3000/api/v1/ekeys/" + this.ekey.value.ekeyid).subscribe({
        next: (l) => {
          if (l.length == 0) {
            console.log("dieser E-Key existiert nicht")
            this.error="dieser E-Key existiert nicht";
            return;
          }
          if (l[0].besitzer != "FSR") {
            console.log("dieser E-Key sollte gerade verliehen sein, ist nicht im FSR Besitz");
            this.error="dieser E-Key sollte gerade verliehen sein, ist nicht im FSR Besitz";
            return;
          }
          if(l[0].zustand != "funktioniert"){
            console.log("dieser E-Key gilt als" + l[0].zustand)
            this.error="dieser E-Key gilt als" + l[0].zustand;
            return;

          }
          if (l.length > 0 && l[0].besitzer == "FSR" && l[0].zustand == "funktioniert") {
            window.open(`http://localhost:4000/?vorname=${this.student.value.vorname}&name=${this.student.value.nachname}&matnr=${parseInt( <string> this.student.value.matrnr)}&email=${this.student.value.email}&keyid=${this.ekey.value.ekeyid}`, "_blank");
            this.step++;

          } else {
            console.log("Fehler")
            this.error="Unbekannter Fehler";
          }
        }
      }
    )

  }

  submit() {
    let ausleihe: Ausleihe;

    if (this.ausleihenotiz == "") {
      ausleihe = new Ausleihe(0, parseInt( <string>  this.student.value.matrnr), <string> this.ekey.value.ekeyid, new Date(), true)
    } else {

      ausleihe = new Ausleihe(0, parseInt( <string> this.student.value.matrnr), <string> this.ekey.value.ekeyid, new Date(), true, this.ausleihenotiz)
    }

    console.log(this.student.value)
    console.log(ausleihe)
    //Student
    this.http.post(this.ROOT_URL + "studenten", this.student.value, {observe: 'response'}).subscribe({
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
