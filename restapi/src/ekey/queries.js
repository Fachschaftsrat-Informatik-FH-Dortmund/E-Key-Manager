// abfragen
const getEkeys = "SELECT * FROM ekey";
const getEkeyById = "SELECT * FROM ekey WHERE ekeyid = $1";
const addEkey = "INSERT INTO ekey( ekeyid, besitzer, zustand, berechtigung, notiz) VALUES($1, $2, $3, $4, $5)";
const deleteEkeyById = "DELETE FROM ekey WHERE ekeyid = $1";
const updateEkey = "UPDATE ekey SET besitzer=$2, zustand=$3, berechtigung=$4, notiz=$5 WHERE ekeyid=$1"
const sperreEkey = "SELECT keysperren($1)"
const getUebersicht="SELECT  * FROM ekey WHERE besitzer LIKE $1 AND zustand LIKE $2 AND berechtigung LIKE $3;"
const zuruechnehmen ="SELECT keyzurueck($1)"

module.exports = {
  getEkeys,
  getEkeyById,
  addEkey,
  deleteEkeyById,
  updateEkey,
  sperreEkey,
  getUebersicht,
  zuruecknehmen
}
