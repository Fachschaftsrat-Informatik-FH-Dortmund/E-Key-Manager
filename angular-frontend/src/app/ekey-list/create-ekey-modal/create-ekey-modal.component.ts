import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import {environment} from "../../../environments/environment";

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
      Validators.pattern('(.{5,9},)*.{5,9}')
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

      this.http.post(environment.REST_URL+"/ekeys/",this.ekey.getRawValue() , {observe: 'response'}).subscribe({
        error: info => {

          if (info.status == 201) {
            this.toastr.success( "Id: " + id, 'E-Key erfolgreich hinzugefügt');
          }else {
            this.toastr.error( info.error, 'Hinzufüge-Fehler bei ' + id);
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
