import {Component, inject, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import axios from "axios";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-entsperr-ekey-modal',
  templateUrl: './entsperr-ekey-modal.component.html',
  styleUrl: './entsperr-ekey-modal.component.css'
})
export class EntsperrEkeyModalComponent {
  private modalService = inject(NgbModal);
  constructor(private http: HttpClient) {
  }

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
      this.http.post("http://localhost:3000/api/v1/ekeys/entsperren",this.ekey.getRawValue() , {observe: 'response'}).subscribe({
        error: info => {

          if (info.status != 200) {
            console.log("Da ist etwas scheif gelaufen beim entsperren vom Ekey")
            console.log(info);
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
