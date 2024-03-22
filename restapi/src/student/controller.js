const pool = require("../../db");
const queries = require('./queries');
const getStudenten = (req, res)=> {
  pool.query(queries.getStudenten, (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudent = (req, res) => {
  const matrnr = req.params.matrnr;
  pool.query(queries.getStudent, [parseInt(matrnr)], (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  })
}

const addStudent = (req, res) =>  {
  const { matrnr, vorname, nachname, email} = req.body;

  // Existiert Student schon?
  pool.query(queries.getStudent, [parseInt(matrnr)], (error, results) => {
    if(results.rows.length) {
      res.status(409).send("FEHLER: Student existiert bereits.");
      return;
    }else{

      // Hinzufügen
      pool.query(queries.addStudent, [ matrnr, vorname, nachname, email], (error, results) => {
        // Fehlgeschlagen?
        if(error) {
          res.status(400).send("FEHLER:" + error.message);
          console.log(error);
        }else {
          res.status(201).send("Student wurde erfolgreich erstellt.");
        }
      })
    }
  })



}

const deleteStudent = (req, res) => {
  const matrnr = req.params.matrnr;
  pool.query(queries.getStudent, [parseInt(matrnr)], (error, results) => {
    const noStudentFound = !results.rows.length;
    if(noStudentFound)  {
      res.send("FEHLER: Student konnte nicht gefunden werden.")
    }else {
      pool.query(queries.deleteStudent, [matrnr], (error, results) => {
        if(error) throw error;
        res.status(200).send("Student wurde erfolgreich gelöscht.");
      })
    }
    if(error) throw error;
  })
}

const updateStudent = (req, res) => {
  const { matrnr, vorname, nachname, email } = req.body;
  pool.query(queries.getStudent, [parseInt(matrnr)], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("FEHLER: Student konnte nicht gefunden werden.")
    } else {
      pool.query(queries.updateStudent, [matrnr, vorname, nachname, email], (error, results) => {
        if(error) throw error;
        res.status(200).send("Student wurde erfolgreich aktualisiert.");
      })
    }
    if(error) throw error;
  });
}

module.exports = {
  getStudenten,
  getStudent,
  addStudent,
  deleteStudent,
  updateStudent
};
