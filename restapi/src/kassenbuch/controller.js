const pool = require("../../db");
const queries = require('./queries');
const busboy = require('busboy');

const getKassenbuchEintrag = (req, res) => {
  const id=parseInt(req.params.id);
  console.log("yay")
  pool.query(queries.getKassenbuchEintrag, [id], (error, results) => {
    if(error) throw error;
    console.log(results)
    res.status(200).json(results.rows);
  })
}

const createKassenbuchEintrag = (req, res) => {

}

const createKassenbuchEintragold = async(req, res) =>  {




  const {upload} = req.files;
  if(!upload) {
    return res.status(400).send("Keine Datei ausgewählt");
  }
  console.log(req.body);
  console.log(req.file);
  await pool.query(queries.createKassenbuchEintrag, [upload.data], (error, results) => {
    // Fehlgeschlagen?
    if(error) {
      res.status(400).send("FEHLER:" + error.message);
      console.log(error);
    }else {
      res.status(201).send("Erfolgreich hochgeladen");
    }
  })
}

module.exports = {
  getKassenbuchEintrag,
  createKassenbuchEintrag
};
