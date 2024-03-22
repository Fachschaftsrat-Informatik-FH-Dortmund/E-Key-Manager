const pool = require("../../db");
const queries = require('./queries');
const getAusleihen = (req, res)=> {
  pool.query(queries.getAusleihen, (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  });
};

const getAusleihe = (req, res) => {
  const ausleihnr = parseInt(req.query.ausleihnr);
  const matrnr = parseInt(req.query.matrnr);
  const keyid = req.query.ekeyid;

  if(ausleihnr){
    pool.query(queries.getAusleihemitid, [ausleihnr], (error, results) => {
      if(error) throw error;
      res.status(200).json(results.rows);
    })
  } else if(matrnr){
    pool.query(queries.getAusleihemtimatrnr, [matrnr], (error, results) => {
      if(error) throw error;
      res.status(200).json(results.rows);
    })
  }else if(keyid){
    pool.query(queries.getAusleihemtiKeyid, [keyid], (error, results) => {
      if(error) throw error;
      res.status(200).json(results.rows);
    })
  }else{
    res.status(400).send("Bitte als Parameter ausleihnr, ekeyid oder matrnr angeben")
  }

}

const addAusleihe = (req, res) =>  {
  const { ausleihnr, matrnr, ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung} = req.body;
  console.log(req.body)
  // Hinzufügen
  pool.query(queries.addAusleihe, [parseInt(matrnr), ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung], (error, results) => {
    // Fehlgeschlagen?
    if(error) {
      res.status(400).send("FEHLER:" + error.message);
      console.log(error);
    }else {
      res.status(201).send("Ausleihe wurde erfolgreich erstellt.");
    }
  })
}


const updateAusleihe = (req, res) => {
  const { ausleihnr, matrnr, ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung} = req.body;
  pool.query(queries.getAusleihe, [parseInt(ausleihnr)], (error, results) => {
    const noAusleiheFound = !results.rows.length;
    if (noAusleiheFound) {
      res.send("FEHLER: Ausleihe konnte nicht gefunden werden.")
    } else {
      pool.query(queries.updateAusleihe, [parseInt(ausleihnr), parseInt(matrnr), ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung], (error, results) => {
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
  updateAusleihe
};
