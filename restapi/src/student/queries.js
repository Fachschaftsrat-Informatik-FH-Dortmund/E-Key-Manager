// abfragen
const getStudenten = "SELECT * FROM student";
const getStudent = "SELECT * FROM student WHERE matrnr = $1";
const addStudent = "INSERT INTO student(matrnr, vorname, nachname, email) VALUES($1, $2, $3, $4)";
const deleteStudent = "DELETE FROM student WHERE matrnr = $1";
const updateStudent = "UPDATE student SET vorname=$2, nachname=$3, email=$4 WHERE matrnr=$1"

module.exports = {
  getStudenten,
  getStudent,
  addStudent,
  deleteStudent,
  updateStudent
}
