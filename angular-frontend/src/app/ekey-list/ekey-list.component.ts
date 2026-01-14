import {Component, OnInit} from '@angular/core';
import { Ekey } from "../../models/ekey.model";
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-ekey-list',
    templateUrl: './ekey-list.component.html',
    styleUrl: './ekey-list.component.css',
    standalone: false
})
export class EkeyListComponent implements OnInit{
  readonly ROOT_URL = environment.REST_URL+'/ekeys/'
  ekeys: Observable<Ekey[]> | undefined;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.ekeys = this.http.get<Ekey[]>(this.ROOT_URL);
    }
}
