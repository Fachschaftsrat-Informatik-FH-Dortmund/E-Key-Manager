// abfragen
const getAusleihen = "SELECT * FROM ausleihe";
const getAusleihe = "SELECT * FROM ausleihe WHERE ausleihnr = $1";
const addAusleihe = "INSERT INTO ausleihe( ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung) VALUES($1, $2, $3, $4, $5 $6)";
const deleteAusleihe = "DELETE FROM ausleihe WHERE ausleihnr = $1";
const updateAusleihe = "UPDATE ausleihe SET ekeyid=$2, beginn=$3, ende=$4, notiz=$5, letzte_rückmeldung=$6, hat_studienbescheinigung=$7 WHERE matrnr=$1"

module.exports = {
  getAusleihen,
  getAusleihe,
  addAusleihe,
  deleteAusleihe,
  updateAusleihe
}
