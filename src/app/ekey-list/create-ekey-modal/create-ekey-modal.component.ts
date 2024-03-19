import { Component, inject, TemplateRef } from '@angular/core';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Ekey} from "../ekey.model";

@Component({
  selector: 'app-create-ekey-modal',
  templateUrl: './create-ekey-modal.component.html',
  styleUrl: './create-ekey-modal.component.css'
})
export class CreateEkeyModalComponent {
  private modalService = inject(NgbModal);
  protected ekey:Ekey;

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  createEkey() {

    this.modalService.dismissAll();
  }



}
