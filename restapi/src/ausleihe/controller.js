const pool = require("../../db");
const queries = require('./queries');
const getAusleihen = (req, res)=> {
  pool.query(queries.getAusleihen, (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  });
};

const getAusleihe = (req, res) => {
  const ausleihnr = req.params.ausleihnr;
  pool.query(queries.getAusleihe, [ausleihnr], (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  })
}

const addAusleihe = (req, res) =>  {
  const { matrnr, ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung} = req.body;

  // Hinzufügen
  pool.query(queries.addAusleihe, [matrnr, ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung], (error, results) => {
    // Fehlgeschlagen?
    if(error) {
      res.status(400).send("FEHLER:" + error.message);
      console.log(error);
    }else {
      res.status(201).send("Ausleihe wurde erfolgreich erstellt.");
    }
  })
}

const deleteStudent = (req, res) => {
  const ausleihnr = req.params.ausleihnr;
  pool.query(queries.getAusleihe, [ausleihnr], (error, results) => {
    const noAusleiheFound = !results.rows.length;
    if(noAusleiheFound)  {
      res.send("FEHLER: Ausleihe konnte nicht gefunden werden.")
    }else {
      pool.query(queries.deleteAusleihe, [ausleihnr], (error, results) => {
        if(error) throw error;
        res.status(200).send("Ausleihe wurde erfolgreich gelöscht.");
      })
    }
    if(error) throw error;
  })
}

const updateAusleihe = (req, res) => {
  const { ausleihnr, matrnr, ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung} = req.body;
  pool.query(queries.getAusleihe, [ausleihnr], (error, results) => {
    const noAusleiheFound = !results.rows.length;
    if (noAusleiheFound) {
      res.send("FEHLER: Ausleihe konnte nicht gefunden werden.")
    } else {
      pool.query(queries.updateAusleihe, [ausleihnr, matrnr, ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung], (error, results) => {
        if(error) throw error;
        res.status(200).send("Ausleihe wurde erfolgreich aktualisiert.");
      })
    }
    if(error) throw error;
  });
}

module.exports = {
  getAusleihen,
  getAusleihe,
  addAusleihe,
  deleteStudent,
  updateAusleihe
};
