import {Component} from '@angular/core';

import {Ausleihe} from "../../models/ausleihe.model";
import {Ekey} from "../../models/ekey.model";
import { HttpClient } from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-ausleihe',
  templateUrl: './ausleihe.component.html',
  styleUrl: './ausleihe.component.css',
})
export class AusleiheComponent {
  readonly ROOT_URL = environment.REST_URL;
  readonly VERTRAG_URL=  environment.VERTRAG_URL;
  constructor(private http: HttpClient, private formBuilder:FormBuilder, private router: Router, private toastr: ToastrService ) {
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
      Validators.pattern('[a-zA-Z-]+\\.[a-zA-Z-]+\\d{3}')
    ]],
    hat_studienbescheinigung: [true, [
    ]]
  });

  prozessInfos = this.formBuilder.group({
    ekeyid: ['', [
      Validators.required,
      Validators.pattern('^(.{9}|\\d{5})$')
    ]],
    ausleihenotiz: ['', [
    ]]
  })
  ekeyBerechtigung:string = "";

  step = 0

  count: number = 0;

  onStudentsubmit() {
    // @ts-ignore
    if(!this.student.value.email.includes('@stud.fh-dortmund.de')) {
      this.student.value.email+='@stud.fh-dortmund.de';
    }

    this.http.get<Ausleihe[]>(this.ROOT_URL+"/ausleihen?matrnr=" + this.student.value.matrnr).subscribe({
      next: (l) => {
        if (l.length == 0) {
          this.step++;
        } else {
            this.toastr.error(l[0].matrnr  + " besitzt bereits "+l[0].ekeyid, "Ausleihe existiert bereits");
        }
      }
    }
    )
  }

  async onKeySubmit() {
    this.http.get<Ekey[]>(this.ROOT_URL+"/ekeys/" + this.prozessInfos.value.ekeyid).subscribe({
      next: (l) => {

        if (l.length == 0) {
          this.toastr.error("E-Key existiert nicht");
          return;
        }
        this.ekeyBerechtigung = l[0].berechtigung;
        if (l[0].besitzer != "FSR") {
            this.toastr.error("Besitzer: "+l[0].besitzer,"E-Key nicht im Besitz des FSR ");
          return;
        }
          if(l[0].zustand != "funktioniert"){
          this.toastr.error("E-Key ist " + l[0].zustand, "Ungültiger Zustand");
          return;
        }
        if (l.length > 0 && l[0].besitzer == "FSR" && l[0].zustand == "funktioniert") {
            if(l[0].berechtigung == "STUD") {
            this.toastr.info("STUD-Ekey", "E-Key ist gültig");
            }else {
            this.toastr.warning("Berechtigung: " + l[0].berechtigung, "Ekey besitzt höhere Rechte");
          }
          this.openPrinter();
          this.step++;
        } else {
          this.toastr.error("Unbekannter Fehler", "Fehler");
        }
      }
    }
    )
  }

  openPrinter() {
    window.open(this.VERTRAG_URL+`/?vorname=${this.student.value.vorname}&name=${this.student.value.nachname}&matnr=${parseInt( <string> this.student.value.matrnr)}&email=${this.student.value.email}&keyid=${this.prozessInfos.value.ekeyid}`, "_blank");
  }

  submit() {
    let ausleihe: Ausleihe;

    if (<string> this.prozessInfos.value.ausleihenotiz == "") {
      ausleihe = new Ausleihe(0, parseInt( <string>  this.student.value.matrnr), <string> this.prozessInfos.value.ekeyid, new Date(), true)
    } else {
      ausleihe = new Ausleihe(0, parseInt( <string> this.student.value.matrnr), <string> this.prozessInfos.value.ekeyid, new Date(), true, <string> this.prozessInfos.value.ausleihenotiz)
    }

    console.log(this.student.value)
    console.log(ausleihe)
    //Student
    this.http.post(this.ROOT_URL + "/studenten", this.student.value, {observe: 'response'}).subscribe({
      error: info => {
        if (info.status == 201 || info.status == 409) {
          this.toastr.success( "Id: "+ausleihe.matrnr, 'Student erfolgreich hinzugefügt');
          //Ausleihe
          this.http.post(this.ROOT_URL + "/ausleihen", ausleihe, {observe: 'response'}).subscribe({
            error: info => {
              if (info.status == 201) {
                this.toastr.success( ausleihe.matrnr+", "+ausleihe.ekeyid, 'Ausleihe erfolgreich hinzugefügt');
                this.router.navigateByUrl('/');
              } else {
                this.toastr.error( info.error, 'Hinzufüge-Fehler bei Ausleihe ' + ausleihe.ekeyid);
              }
            }
          })
        } else {
          this.toastr.error( info.error, 'Hinzufüge-Fehler bei Student ' + ausleihe.matrnr);
        }
      }
    });

  }
}
