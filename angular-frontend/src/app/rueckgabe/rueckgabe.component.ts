import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {describe} from "node:test";

@Component({
  selector: 'app-rueckgabe',
  templateUrl: './rueckgabe.component.html',
  styleUrl: './rueckgabe.component.css'
})
export class RueckgabeComponent {
  rueckgabe = new FormGroup({
      rueckgabeNachMatrNr: new FormControl<boolean | undefined>(undefined, [
        Validators.required
      ]),
      matrNr: new FormControl<number | undefined>(undefined, [
      ]),
      ekeyID: new FormControl<String | undefined>(undefined, [
      ]),
    }
  )



}



