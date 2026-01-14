import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Ekey} from "../../models/ekey.model";
import {saveAs} from "file-saver";
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  readonly ROOT_URL= environment.REST_URL+"/ekeys/"
  constructor(private http: HttpClient) { }
  tresorKeycount=0;
  gesperrtTresorKeycount=0;
  ausgegebenKeycount=0;
  gesamtworkingKeycount=0;


  ngOnInit() {

    this.http.get<number>(this.ROOT_URL+"/count?zustand=funktioniert&besitzer=FSR").subscribe({next:(stand)=> {
        this.tresorKeycount=stand;
    }})

    this.http.get<number>(this.ROOT_URL+"/count?zustand=funktioniert&besitzer=Student").subscribe({next:(stand)=> {
        this.ausgegebenKeycount=stand;
      }})

    this.http.get<number>(this.ROOT_URL+"/count?zustand=funktioniert").subscribe({next:(stand)=> {
        this.gesamtworkingKeycount=stand;
      }})
    this.http.get<number>(this.ROOT_URL+"/count?zustand=gesperrt&besitzer=FSR").subscribe({next:(stand)=> {
        this.gesperrtTresorKeycount=stand;
      }})

  }

  listeGenerieren() {
    this.http.get<Ekey[]>(this.ROOT_URL+"?zustand=gesperrt&besitzer=FSR").subscribe({next:(data)=> {
        let cvs="";
        data.forEach((key)=>{
          cvs+=key.ekeyid+"\n"
        })
        const blob = new Blob([cvs], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'zuentsperren.csv');
      }})

  }
}
