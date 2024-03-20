export class Ekey {
  public ekeyID: string;
  public besitzer: string;
  public status: string;
  public berechtigung: string;
  public notiz: string;

  constructor(ekeyID: string, status: string, besitzer: string, berechtigung: string, notiz: string) {
    this.ekeyID = ekeyID;

    if(besitzer == "FSR" || besitzer == "ausgeliehen" || besitzer == "verloren") {
      this.besitzer = besitzer;
    }else {
      throw new Error("Ungültiger Besitzer. Besitzer muss FSR, ausgeliehen oder verloren sein!");
    }

    if(status=="defekt" || status=="gesperrt" || status=="funktioniert") {
      this.status =  status;
    }else {
      throw new Error("Ungültiger Status. Status muss defekt, gesperrt oder funktioniert sein!");
    }

    if(berechtigung=="STUD" || berechtigung=="FSRF" || "FSR") {
      this.berechtigung = berechtigung;
    }else {
      throw new Error("Ungültige Berechtigung. Berechtigung muss STUD, FSRF oder FSR sein!");
    }

    this.notiz = notiz;
  }
}
