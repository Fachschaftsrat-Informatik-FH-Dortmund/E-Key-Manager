export class Student {
  public matrnr: number;
  public vorname: string;
  public nachname: string;
  public email: string;

  constructor(matrnr: number, vorname: string, nachname: string, email: string) {
    this.matrnr = matrnr;
    this.vorname = vorname;
    this.nachname = nachname;
    this.email = email;
  }
}
