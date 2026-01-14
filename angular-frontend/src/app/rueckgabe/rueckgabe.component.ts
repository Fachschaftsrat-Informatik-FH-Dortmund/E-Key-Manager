import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Ekey} from "../../models/ekey.model";
import {Ausleihe} from "../../models/ausleihe.model";
import { HttpClient } from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-rueckgabe',
  templateUrl: './rueckgabe.component.html',
  styleUrl: './rueckgabe.component.css'
})
export class RueckgabeComponent {
  rueckgabe = new FormGroup({
      rueckgabeNachMatrNr: new FormControl<boolean | undefined>(undefined, [
        Validators.required
      ]),
      id: new FormControl<String | undefined>(undefined, [])
    }
  )

  changeMode(nachMatriknr: boolean) {
    if (nachMatriknr) {

      this.rueckgabe.get('id')?.setValidators([Validators.required, Validators.pattern('[0-9]{7}')])
    } else {
      this.rueckgabe.get('id')?.setValidators([Validators.required, Validators.pattern('^(.{9}|\\d{5})$')])

    }
    this.rueckgabe.get('id')?.updateValueAndValidity({emitEvent: false});

  }


  ausleihe: Ausleihe | undefined = undefined;
  ekey: Ekey | undefined;
  showAusleiheDetails = false;
  geschehen = "";

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  readonly ROOT_URL = environment.REST_URL;

  getAusleihe() {

    let suche;
    if (this.rueckgabe.value.rueckgabeNachMatrNr) {
      suche = "matrnr"
    } else {
      suche = "ekeyid"
    }

    this.http.get<Ausleihe[]>(this.ROOT_URL + "/ausleihen?" + suche + "=" + this.rueckgabe.value.id).subscribe({  //TODO ich hasse diesen Baum, aber es geht irgendwie
        next: (data) => {
          this.ausleihe = data[0];
          console.log(data)
          if (this.ausleihe === undefined) {

            this.http.get<Ekey[]>(this.ROOT_URL + "/ekeys/" + this.rueckgabe.value.id).subscribe({
                next: (data) => {
                  this.ekey = data[0];

                  if(this.ekey == undefined) {
                    if(this.rueckgabe.value.rueckgabeNachMatrNr) {
                      this.toastr.error("Dieser Studi existiert nicht oder hat keine Ausleihe");
                      return;
                    }else if (!this.rueckgabe.value.rueckgabeNachMatrNr) {
                      this.toastr.error("Dieser E-Key existiert nicht");
                      return;
                    }
                  }

                  if(this.ekey.zustand!='gesperrt'||this.ekey.zustand=='gesperrt' && this.ekey.besitzer=='FSR') {
                    this.toastr.error("Keine Ausleihe existiert");
                    return;
                  }
                  this.showAusleiheDetails = true;
                }, error: (error) => {
                  this.toastr.error(error.error, "Fehler");
                }
              }
            );
          } else {
            this.showAusleiheDetails = true;
          }
        }, error: (error) => {
        this.toastr.error(error.error, "Fehler");
          console.log(error.status);
        }
      }
    );
  }

  rueckgabeStarten() {
    if (this.ausleihe) {

      this.http.post(this.ROOT_URL + "/ausleihen/end", {ekeyid: this.ausleihe.ekeyid}, {observe: 'response'}).subscribe({
        error: info => {

          if (info.status == 200) {
            this.showAusleiheDetails = false;
            this.geschehen = "Rückgabe"
            this.toastr.success("Rückgabe wurde eingefügt");
          } else {
            this.toastr.error(info.error, "Ausleihe konnte nicht eingefügt werden");
            console.log(info);
          }
        }
      })

    }
  }

  keysperren() {
    if (this.ausleihe) {


      this.http.post(this.ROOT_URL + "/ekeys/sperren", {ekeyid: this.ausleihe.ekeyid}, {observe: 'response'}).subscribe({
        error: info => {

          if (info.status == 200) {
            this.showAusleiheDetails = false;
            this.geschehen = "Sperrung"
            this.toastr.success(this.ekey?.ekeyid, "Ekey wurde gesperrt");

          } else {
            this.toastr.error(info.error, "Fehler");
            console.log(info);
          }
        }
      })
    }
  }

  back() {
    this.ausleihe = undefined;
    this.showAusleiheDetails = false;
  }

  zuruecknehmenVonGesperrt() {
    if (this.ekey) {
      this.http.post(this.ROOT_URL + "/ekeys/zuruecknehmen", {ekeyid: this.ekey.ekeyid}, {observe: 'response'}).subscribe({
        error: info => {
          if (info.status == 200) {
            this.showAusleiheDetails = false;
            this.geschehen = "Zurücknehmen";
            this.toastr.success("ID"+ this.ekey?.ekeyid, "E-Key erfolgreich zurückgenommen");
          } else {
            this.toastr.error(info.error, "Fehler beim zurück nehmen");
            console.log("Fehler beim zurück nehmen! \n" + info)
          }
        }
      })
    }
  }
}
