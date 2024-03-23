import { Component, inject, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-abbuchen-modal',
  templateUrl: './abbuchen-modal.component.html',
  styleUrl: './abbuchen-modal.component.css'
})
export class AbbuchenModalComponent {
  private modalService = inject(NgbModal);
  constructor(private http: HttpClient) {
  }


  abbuchungForm = new FormGroup({
    wert: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[0-9]+')
    ]),
    notiz: new FormControl<string>('', [
      Validators.required,
    ])
  })

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }


  abbuchungdurchfuehren() {

    const abbuchung = this.abbuchungForm.getRawValue();
    abbuchung.wert= "-"+abbuchung.wert;
    this.http.post('http://localhost:3000/api/v1/kasse/frei', abbuchung, {observe: 'response'}).subscribe({
      error: info => {

        if (info.status == 201) {
          console.log("Abbuchung durchgeführt");
        } else {
          console.log("Da ist etwas scheif gelaufen")
        }
      }
    })
    this.abbuchungForm.reset();
    this.modalService.dismissAll();
  }
}
