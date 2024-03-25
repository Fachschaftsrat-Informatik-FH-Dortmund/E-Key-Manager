// abfragen
const getEkeys = "SELECT * FROM ekey";
const getEkeyById = "SELECT * FROM ekey WHERE ekeyid = $1";
const addEkey = "INSERT INTO ekey( ekeyid, besitzer, zustand, berechtigung, notiz) VALUES($1, $2, $3, $4, $5)";
const deleteEkeyById = "DELETE FROM ekey WHERE ekeyid = $1";
const updateEkey = "UPDATE ekey SET berechtigung=$2, notiz=$3 WHERE ekeyid=$1"
const sperreEkey = "SELECT keysperren($1)"
const getUebersicht="SELECT  * FROM ekey WHERE besitzer LIKE $1 AND zustand LIKE $2 AND berechtigung LIKE $3;"

module.exports = {
  getEkeys,
  getEkeyById,
  addEkey,
  deleteEkeyById,
  updateEkey,
  sperreEkey,
  getUebersicht
}
