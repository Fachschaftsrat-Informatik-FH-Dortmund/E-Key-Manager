const db = require("../models");
const Ekey = db.ekey;
const Op = db.Sequelize.Op;

// Create and Save a new Ekey
exports.create = (req, res) => {
  // Validate request
  if (!req.body.ekeyID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an Ekey
  const ekey = {
    ekeyID: req.body.ekeyID,
    besitzer: req.body.besitzer,
    status: req.body.status,
    berechtigung: req.body.berechtigung,
    notiz: req.body.notiz
  };

  // Save Ekey in the database
  Ekey.create(ekey)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ekey."
      });
    });
};

// Retrieve all Ekeys from the database.
exports.findAll = (req, res) => {

};

// Find a single Ekey with an id
exports.findOne = (req, res) => {

};

// Update a Ekey by the id in the request
exports.update = (req, res) => {

};

// Delete a Ekey with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Ekeys from the database.
exports.deleteAll = (req, res) => {

};

