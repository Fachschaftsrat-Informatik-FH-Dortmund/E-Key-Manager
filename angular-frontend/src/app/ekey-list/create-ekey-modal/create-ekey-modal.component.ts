import { Component, inject, TemplateRef } from '@angular/core';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Ekey} from "../../../models/ekey.model";
import axios from "axios";
import {FormControl, FormGroup, UntypedFormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-ekey-modal',
  templateUrl: './create-ekey-modal.component.html',
  styleUrl: './create-ekey-modal.component.css'
})
export class CreateEkeyModalComponent {
  private modalService = inject(NgbModal);

  ekey = new FormGroup({
    ekeyid: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(9)
    ]),
    berechtigung: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('STUD|FSRF|FSR')
    ]),
    zustand: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('defekt|gesperrt|funktioniert')
    ]),
    besitzer: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('FSR|ausgeliehen|verloren')
    ]),
    notiz: new FormControl<string>(''),
  });


  saveEkey(): void {
    axios.post('http://localhost:3000/api/v1/ekeys/', this.ekey.getRawValue())
      .then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
      console.log(error);
    })
    this.ekey.reset();
    this.modalService.dismissAll();
  }


  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

}
