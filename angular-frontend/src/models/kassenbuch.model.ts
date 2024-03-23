export class Kassenbuch {
  public wert: number;
  public ausfuehrung: string;
  public bemerkung: string;

  constructor(wert: number, ausfuehrung: string, bemerkung: string) {
    this.wert = wert;
    this.ausfuehrung = ausfuehrung;
    this.bemerkung = bemerkung;
  }
}
