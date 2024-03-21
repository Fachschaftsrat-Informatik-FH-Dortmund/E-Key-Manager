export class Student {
  public MatrNr: number;
  public vorname: string;
  public nachname: string;
  public studmail: string;

  constructor(MatrNr: number, vorname: string, nachname: string, studmail: string) {
    this.MatrNr = MatrNr;
    this.vorname = vorname;
    this.nachname = nachname;
    this.studmail = studmail;
  }
}
