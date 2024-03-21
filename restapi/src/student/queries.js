// abfragen
const getStudenten = "SELECT * FROM student";
const getStudent = "SELECT * FROM student WHERE matrnr = $1";
const addStudent = "INSERT INTO student(matrnr, vorname, nachname, email, hat_Studienbescheinigung) VALUES($1, $2, $3, $4, $5)";
const deleteStudent = "DELETE FROM student WHERE matrnr = $1";
const updateStudent = "UPDATE student SET vorname=$2, nachname=$3, email=$4, hat_Studienbescheinigung=$5 WHERE matrnr=$1"

module.exports = {
  getStudenten,
  getStudent,
  addStudent,
  deleteStudent,
  updateStudent
}
