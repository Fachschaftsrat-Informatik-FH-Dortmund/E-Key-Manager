import {Component, inject, Input, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import axios from "axios";
import {Ekey} from "../../../models/ekey.model";
import {Ausleihe} from "../../../models/ausleihe.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-edit-ekey-modal',
  templateUrl: './edit-ekey-modal.component.html',
  styleUrl: './edit-ekey-modal.component.css'
})
export class EditEkeyModalComponent {
  readonly ROOT_URL = 'http://localhost:3000/api/v1/ekeys'
  @Input() ekeyid!: string;
  private modalService = inject(NgbModal);
  protected ekeydata:Ekey|undefined;

  constructor(private http:HttpClient) {
  }

  ekey = new FormGroup({
    berechtigung: new FormControl<string>('FSR', [
      Validators.required,
      Validators.pattern('FSR|STUD|FSRF')
    ]),
    notiz: new FormControl<string>(''),
  });



  saveEkey(): void {

    this.http.put(this.ROOT_URL,{ ekeyid:this.ekeyid, berechtigung:this.ekey.value.berechtigung, notiz:this.ekey.value.notiz} , {observe: 'response'}).subscribe({
      error: info => {

        if (info.status != 200) {
          console.log("Da ist etwas scheif gelaufen mit den einfügen vom Vertrag")
          console.log(info);
        }
      }
    })

    this.ekey.reset();
    this.modalService.dismissAll();
  }


  open(content: TemplateRef<any>) {

    this.http.get<Ekey[]>(this.ROOT_URL +"/"+this.ekeyid).subscribe({next: (data)=> {
        this.ekeydata=data[0];
        this.ekey.setValue({berechtigung:this.ekeydata.berechtigung,notiz: this.ekeydata.notiz});
      },error: (error)=>{
        console.log(error.status);
      }}
    );


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })


  }

}
