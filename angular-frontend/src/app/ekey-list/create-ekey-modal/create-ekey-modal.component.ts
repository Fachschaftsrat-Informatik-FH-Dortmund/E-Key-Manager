import { Component, inject, TemplateRef } from '@angular/core';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Ekey} from "../../../models/ekey.model";

@Component({
  selector: 'app-create-ekey-modal',
  templateUrl: './create-ekey-modal.component.html',
  styleUrl: './create-ekey-modal.component.css'
})
export class CreateEkeyModalComponent {
  private modalService = inject(NgbModal);
  ekey: Ekey = {
    ekeyID: '',
    berechtigung: '',
    status: '',
    besitzer: '',
    notiz: '',
  };
  submitted: boolean = false;


  saveEkey(): void {
    const data = {
      ekeyID: this.ekey.ekeyID,
      berechtigung: this.ekey.berechtigung
    };
    this.modalService.dismissAll();
  }


  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

}
