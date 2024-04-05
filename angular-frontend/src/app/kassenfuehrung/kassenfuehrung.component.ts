import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {response} from "express";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-kassenfuehrung',
  templateUrl: './kassenfuehrung.component.html',
  styleUrl: './kassenfuehrung.component.css'
})
export class KassenfuehrungComponent {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  file: any;
  eintrag = this.formBuilder.group({
    isEinzahlung: [undefined, [
      Validators.required,
    ]],
    person: this.formBuilder.group({
      name: ['', [
        Validators.required,
      ]],
      iban: [undefined]
    }),
    titel: ['', [
      Validators.required,
    ]],
    beschreibung: [''],
    betrag: [undefined, [
      Validators.required,
    ]],
    konto: [undefined, [
      Validators.required,
      Validators.pattern('Barkasse|Konto'),
    ]],
    beschlussDatum: [undefined],
    ausfuehrungsDatum: [undefined],
    erstellungsDatum: [new Date()],
  })

  changeMode(nachMatriknr: boolean) {
    //setValidators
  }

  /*  onChangeFile(event:any) {
      if(event.target.files.length >0) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        this.http.post('http://localhost:3000/api/v1/kassenbuch/', formData).subscribe((res:any) => {
          debugger
        })
      }

    }*/
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file)
  }

  submitFile() {
    if (!this.file) {
      console.error("keins ausgewählt");
      return;
    }

    const formData = new FormData();
    formData.append("tesrfile", this.file);
    console.log(formData)

    this.http.post<any>("http://localhost:3000/api/v1/kassenbuch/", formData, {observe: 'response'}).subscribe({
      error: info => {

        if (info.status == 201) {
          console.log("Kassenbucheintrag erfolgreich eingetragen");
        } else {
          console.log("Fehler beim Einfügen des Kassenbucheintrags")
          console.log(info);
        }
      }
    })

  }

  download() {
    const blob = new Blob([this.file], {type: "text/csv"});
    saveAs(this.file);

  }

}
