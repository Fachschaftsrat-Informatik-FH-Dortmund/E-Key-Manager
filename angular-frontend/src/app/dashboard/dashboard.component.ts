import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  readonly ROOT_URL= "http://localhost:3000/api/v1/ekeys/"
  constructor(private http: HttpClient) { }
  tresorKeycount=0;
  gesperrtTresorKeycount=0;
  ausgegebenKeycount=0;
  gesamtworkingKeycount=0;


  ngOnInit() {

    this.http.get<number>(this.ROOT_URL+"/count?zustand=funktioniert&besitzer=FSR").subscribe({next:(stand)=> {
        console.log(stand)
        this.tresorKeycount=stand;
    }})

    this.http.get<number>(this.ROOT_URL+"/count?zustand=funktioniert&besitzer=Student").subscribe({next:(stand)=> {
      console.log(stand)
        this.ausgegebenKeycount=stand;
      }})

    this.http.get<number>(this.ROOT_URL+"/count?zustand=funktioniert").subscribe({next:(stand)=> {
        console.log(stand)
        this.gesamtworkingKeycount=stand;
      }})
    this.http.get<number>(this.ROOT_URL+"/count?zustand=gesperrt&besitzer=FSR").subscribe({next:(stand)=> {
        console.log(stand)
        this.gesperrtTresorKeycount=stand;
      }})

  }
}
