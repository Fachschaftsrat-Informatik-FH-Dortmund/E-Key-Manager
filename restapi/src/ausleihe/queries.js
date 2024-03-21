// abfragen
const getAusleihen = "SELECT * FROM ausleihe";
const getAusleihemitid = "SELECT * FROM ausleihe WHERE ausleihnr = $1 AND ende NOTNULL";
const getAusleihemtimatrnr = "SELECT * FROM ausleihe WHERE matrnr = $1 AND ende NOTNULL";
const addAusleihe = "INSERT INTO ausleihe( ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung) VALUES($1, $2, $3, $4, $5 $6)";
const updateAusleihe = "UPDATE ausleihe SET ekeyid=$2, beginn=$3, ende=$4, notiz=$5, letzte_rückmeldung=$6, hat_studienbescheinigung=$7 WHERE matrnr=$1"

module.exports = {
  getAusleihen,
  getAusleihemitid,
  getAusleihemtimatrnr,
  addAusleihe,
  updateAusleihe
}
