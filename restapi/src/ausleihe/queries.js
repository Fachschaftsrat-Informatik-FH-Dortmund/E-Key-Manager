// abfragen
const getAusleihen = "SELECT * FROM ausleihe";
const getAusleihemitid = "SELECT * FROM ausleihe WHERE ausleihnr = $1 AND ende ISNULL";
const getAusleihemtimatrnr = "SELECT * FROM ausleihe WHERE matrnr = $1 AND ende ISNULL";
const getAusleihemtiKeyid = "SELECT * FROM ausleihe WHERE ekeyid = $1 AND ende ISNULL";
const addAusleihe = "INSERT INTO ausleihe( matrnr, ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung) VALUES($1, $2, $3, $4, $5, $6, $7)";
const updateAusleihe = "UPDATE ausleihe SET ekeyid=$2, beginn=$3, ende=$4, notiz=$5, letzte_rückmeldung=$6, hat_studienbescheinigung=$7 WHERE matrnr=$1"

module.exports = {
  getAusleihen,
  getAusleihemitid,
  getAusleihemtimatrnr,
  getAusleihemtiKeyid,
  addAusleihe,
  updateAusleihe
}
