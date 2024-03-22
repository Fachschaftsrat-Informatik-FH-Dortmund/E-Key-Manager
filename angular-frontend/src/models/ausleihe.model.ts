import {Student} from "./student.model";
import {Ekey} from "./ekey.model";

export class Ausleihe {
  public ausleihnr: number;
  public matrnr: number;
  public ekeyid: String;
  public beginn: Date;
  public ende: Date|null;
  public notiz: string|null;
  public hat_studienbescheinigung: boolean;
  public letztemeldung: Date|null;


  constructor(ausleihnr: number,matrnr: number, ekeyid: String, beginn: Date,hat_studienbescheinigung:boolean, ende?: Date,notiz?:string, letztemeldung?: Date) {
    this.ausleihnr=ausleihnr;
    this.matrnr = matrnr;
    this.ekeyid = ekeyid;
    this.beginn = beginn;
    this.ende = ende ?? null;
    this.notiz= notiz ??null;
    this.hat_studienbescheinigung = hat_studienbescheinigung;
    this.letztemeldung=letztemeldung??null;
  }
}
