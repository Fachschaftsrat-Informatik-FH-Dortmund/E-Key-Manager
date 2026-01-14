import { Component } from '@angular/core';
import { saveAs } from "file-saver";

import { HttpClient } from "@angular/common/http";
import {Student} from "../../models/student.model";
import {environment} from "../../environments/environment";


@Component({
    selector: 'app-rueckmeldung',
    templateUrl: './rueckmeldung.component.html',
    styleUrl: './rueckmeldung.component.css',
    standalone: false
})
export class RueckmeldungComponent {
  constructor(private http: HttpClient) {
  }
  gentxt(){
    //mit komma seperiert
  let data=""
    this.http.get<Student[]>(environment.REST_URL+"/studenten/aktive").subscribe({
        next: (auleihen) => {
          auleihen.forEach((auleihe)=> data+=auleihe.email+",")
          data= data.slice(0,-1);
          const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
          saveAs(blob, 'mailinglisteRueckmeldung.txt');
        }
      }
    )

  }
}
