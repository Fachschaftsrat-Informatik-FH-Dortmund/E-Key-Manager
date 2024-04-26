import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from "axios";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-ekey-modal',
  templateUrl: './create-ekey-modal.component.html',
  styleUrl: './create-ekey-modal.component.css'
})
export class CreateEkeyModalComponent {
  private modalService = inject(NgbModal);

  constructor(private http:HttpClient, private toastr: ToastrService) {
  }

  ekey = new FormGroup({
    ekeyid: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('(.{9},)*.{9}')
    ]),
    berechtigung: new FormControl<string>('STUD', [
      Validators.required,
      Validators.pattern('STUD|FSRF|FSR')
    ]),
    zustand: new FormControl<string>('funktioniert', [
      Validators.required,
      Validators.pattern('defekt|gesperrt|funktioniert')
    ]),
    besitzer: new FormControl<string>('FSR', [
      Validators.required,
      Validators.pattern('FSR|Student|verloren')
    ]),
    notiz: new FormControl<string>(''),
  });


  saveEkey(): void {
    let ids:string[]=this.ekey.value.ekeyid?.split(',') ??[""];
    ids.forEach((id)=>{
      this.ekey.patchValue({ekeyid: id});

      this.http.post("http://localhost:3000/api/v1/ekeys/",this.ekey.getRawValue() , {observe: 'response'}).subscribe({
        error: info => {

          if (info.status != 201) {
            this.toastr.error( info.error, 'Fehler bei ' + id);
          }else {
            this.toastr.success( "Id: " + id, 'Erfolgreich hinzugefügt');
          }
        }
      })
    })

    this.ekey.reset();
    this.modalService.dismissAll();
  }


  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

}
