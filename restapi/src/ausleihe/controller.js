const pool = require("../../db");
const queries = require('./queries');

const getAusleihe = (req, res) => {
  const ausleihnr = parseInt(req.query.ausleihnr);
  const matrnr = parseInt(req.query.matrnr);
  const keyid = req.query.ekeyid;
  const alte=req.query.alte==undefined;
  // USAGE: api/v1/ausleihen?ekeyid=wert&alte=irgendwas
  if(ausleihnr){
    pool.query(queries.getAusleihen("ausleihnr",alte), [ausleihnr], (error, results) => {
      if(error) throw error;
      res.status(200).json(results.rows);
    })
  } else if(matrnr){
    pool.query(queries.getAusleihen("matrnr",alte), [matrnr], (error, results) => {
      if(error) throw error;
      res.status(200).json(results.rows);
    })
  }else if(keyid){
    pool.query(queries.getAusleihen("ekeyid",alte), [keyid], (error, results) => {
      if(error) throw error;
      res.status(200).json(results.rows);
    })
  }else{
    pool.query(queries.getAusleihen(null,alte), (error, results) => {
      if(error) throw error;
      res.status(200).json(results.rows);
    });
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
  const { ausleihnr, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung} = req.body;

  pool.query(queries.updateAusleihe, [parseInt(ausleihnr), ende, notiz, letzte_rückmeldung, hat_studienbescheinigung], (error, results) => {
    if(error) {
      res.status(400).send("FEHLER: "+ error.message);
      throw error;
    }else {
      res.status(200).send("Ausleihe wurde erfolgreich aktualisiert.");
    }
    console.log(results);
  })


}

module.exports = {
  getAusleihe,
  addAusleihe,
  updateAusleihe
};
