const pool = require("../../db");
const queries = require('./queries');

const getKassenstand = (req, res) => {
  pool.query(queries.qgetKassenstand, (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  })
}
const getFreiekassenstand = (req, res) => {
  pool.query(queries.qgetFreieKassenstand, (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  })
}
const getKasse = (req, res) => {
  console.log("yay")
  pool.query(queries.qgetKasse, (error, results) => {
    if(error) throw error;
    console.log(results)
    res.status(200).json(results.rows);
  })
}
const getFreieKasse = (req, res) => {
  pool.query(queries.qgetFreieKasse, (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  })
}

const abbuchenKasse = (req, res) =>  {
  const { wert,notiz } = req.body;

  pool.query(queries.qabbuchungKasse, [wert,notiz], (error, results) => {
    // Fehlgeschlagen?
    if(error) {
      res.status(400).send("FEHLER:" + error.message);
      console.log(error);
    }else {
      res.status(201).send("Geld erfolgreich abgebucht.");
    }
  })
}

module.exports = {
  getKassenstand,
  getFreiekassenstand,
  getKasse,
  getFreieKasse,
  abbuchenKasse
};
