import { Component } from '@angular/core';
import { Ekey } from "./ekey.model";

@Component({
  selector: 'app-ekey-list',
  templateUrl: './ekey-list.component.html',
  styleUrl: './ekey-list.component.css'
})
export class EkeyListComponent {
  ekeys: Ekey[] = [
    new Ekey("17236TEST", 'defekt', "FSR", "STUD", ""),
    new Ekey("16699TEST", 'funktioniert', "ausgeliehen", "FSR", "halolo"),
    new Ekey("17sd6TEST", 'defekt', "verloren", "FSRF", ""),
  ];

}
