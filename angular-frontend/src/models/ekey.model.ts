export class Ekey {
  public ekeyID: string;
  public besitzer: string;
  public zustand: string;
  public berechtigung: string;
  public notiz: string;

  constructor(ekeyID: string, zustand: string, besitzer: string, berechtigung: string, notiz: string) {
    this.ekeyID = ekeyID;

    if(besitzer == "FSR" || besitzer == "Student" || besitzer == "verloren") {
      this.besitzer = besitzer;
    }else {
      throw new Error("Ungültiger Besitzer. Besitzer muss FSR, Student oder verloren sein!");
    }

    if(zustand=="defekt" || zustand=="gesperrt" || zustand=="funktioniert") {
      this.zustand =  zustand;
    }else {
      throw new Error("Ungültiger Zustand. Status muss defekt, gesperrt oder funktioniert sein!");
    }

    if(berechtigung=="STUD" || berechtigung=="FSRF" || "FSR") {
      this.berechtigung = berechtigung;
    }else {
      throw new Error("Ungültige Berechtigung. Berechtigung muss STUD, FSRF oder FSR sein!");
    }

    this.notiz = notiz;
  }
}
