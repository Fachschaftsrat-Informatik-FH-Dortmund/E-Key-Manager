const pool = require("../../db");
const queries = require('./queries');
const getEkeys = (req, res)=> {
  pool.query(queries.getEkeys, (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  });
};

const getEkeyById = (req, res) => {
  const ekeyID = req.params.ekeyID;
  pool.query(queries.getEkeyById, [ekeyID], (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  })
}

const addEkey = (req, res) =>  {
  const { ekeyid, besitzer, zustand, berechtigung, notiz} = req.body;

  // check if ekey already exists
  pool.query(queries.getEkeyById, [ekeyid], (error, results) => {
    if(results.rows.length) {
      res.send("FEHLER: E-Key existiert bereits.");
    }else {
      pool.query(queries.addEkey, [ ekeyid, besitzer, zustand, berechtigung, notiz], (error, results) => {
        if(error) throw error;
        res.status(201).send("Ekey wurde erfolgreich erstellt.");
      })
    }
  })
}

const deleteEkeyById = (req, res) => {
  const ekeyID = req.params.ekeyID;
  pool.query(queries.getEkeyById, [ekeyID], (error, results) => {
    const noEkeyFound = !results.rows.length;
    if(noEkeyFound)  {
      res.send("FEHLER: Ekey konnte nicht gefunden werden.")
    }else {
      pool.query(queries.deleteEkeyById, [ekeyID], (error, results) => {
        if(error) throw error;
        res.status(200).send("Ekey wurde erfolgreich gelöscht.");
      })
    }
    if(error) throw error;
  })
}

const updateEkey = (req, res) => {
  const { ekeyid, besitzer, zustand, berechtigung, notiz} = req.body;
  pool.query(queries.getEkeyById, [ekeyid], (error, results) => {
    const noEkeyFound = !results.rows.length;
    if (noEkeyFound) {
      res.send("FEHLER: Ekey konnte nicht gefunden werden.")
    } else {
      pool.query(queries.updateEkey, [ekeyid, besitzer, zustand, berechtigung, notiz], (error, results) => {
        if(error) throw error;
        res.status(200).send("Ekey wurde erfolgreich aktualisiert.");
      })
    }
    if(error) throw error;
  });
}

module.exports = {
  getEkeys,
  getEkeyById,
  addEkey,
  deleteEkeyById,
  updateEkey,
};
