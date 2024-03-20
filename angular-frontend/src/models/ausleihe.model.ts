import {Student} from "./student.model";
import {Ekey} from "./ekey.model";

export class Ausleihe {
  public student: Student;
  public ekey: Ekey;
  public beginn: Date;
  public ende: Date|null;
  public letztemeldung: Date|null;


  constructor(student: Student, ekey: Ekey, beginn: Date, ende?: Date, letztemeldung?: Date) {
    this.student = student;
    this.ekey = ekey;
    this.beginn = beginn;
    this.ende = ende ?? null;
    this.letztemeldung=letztemeldung??null;
  }
}
