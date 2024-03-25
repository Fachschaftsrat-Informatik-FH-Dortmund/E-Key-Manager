import {Component, OnInit} from '@angular/core';
import { Ekey } from "../../models/ekey.model";
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";

@Component({
  selector: 'app-ekey-list',
  templateUrl: './ekey-list.component.html',
  styleUrl: './ekey-list.component.css'
})
export class EkeyListComponent implements OnInit{
  readonly ROOT_URL = 'http://localhost:3000/api/v1/ekeys/'
  ekeys: Observable<Ekey[]> | undefined;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.ekeys = this.http.get<Ekey[]>(this.ROOT_URL);
    }
}
