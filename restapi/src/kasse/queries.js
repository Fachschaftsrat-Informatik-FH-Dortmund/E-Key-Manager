// abfragen
const qgetKasse= "SELECT wert, ausfuehrung,bemerkung FROM pfandKasse"
const qgetFreieKasse ="SELECT wert, ausfuehrung, bemerkung  FROM einbehaltenesPfand;"
const qgetKassenstand = "SELECT sum(wert) AS kassenstand FROM pfandKasse"
const qgetFreieKassenstand = "SELECT sum(wert) AS kassenstand FROM einbehaltenesPfand"
const qabbuchungKasse ="INSERT into einbehaltenesPfand (wert,bemerkung) VALUES ($1,$2)"

module.exports = {
  qgetKasse,
  qgetFreieKasse,
  qgetKassenstand,
  qgetFreieKassenstand,
  qabbuchungKasse
}
