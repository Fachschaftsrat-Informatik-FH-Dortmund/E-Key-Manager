// abfragen
const getStudenten = "SELECT * FROM student";
const getStudent = "SELECT * FROM student WHERE mat = $1";
const addStudent = "INSERT INTO ekey( ekeyid, besitzer, zustand, berechtigung, notiz) VALUES($1, $2, $3, $4, $5)";
const deleteStudent = "DELETE FROM ekey WHERE ekeyid = $1";
const updateStudent = "UPDATE ekey SET besitzer=$2, zustand=$3, berechtigung=$4, notiz=$5 WHERE ekeyid=$1"

module.exports = {
  getStudenten,
  getStudent,
  addStudent,
  deleteStudent,
  updateStudent
}
