import {Component, inject, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import axios from "axios";

@Component({
  selector: 'app-entsperr-ekey-modal',
  templateUrl: './entsperr-ekey-modal.component.html',
  styleUrl: './entsperr-ekey-modal.component.css'
})
export class EntsperrEkeyModalComponent {
  private modalService = inject(NgbModal);

  ekey = new FormGroup({
    ekeyid: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('(.{9},)*.{9}')
    ]),
    notiz: new FormControl<string>(''),
  });


  saveEkey(): void {
    let ids:string[]=this.ekey.value.ekeyid?.split(',') ??[""];
    ids.forEach((id)=>{

      this.ekey.patchValue({ekeyid: id,notiz: this.ekey.value.notiz});
      axios.post('http://localhost:3000/api/v1/ekeys/entsperren', this.ekey.getRawValue())
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
    })

    this.ekey.reset();
    this.modalService.dismissAll();
  }


  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }
}
