const express = require("express");

const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to a Tob application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*
– import express and cors modules:

  Express is for building the Rest apis
cors provides Express middleware to enable CORS with various options.
– create an Express app, then add body-parser (json, urlencoded) and cors middlewares using app.use() method. Notice that we set origin: http://localhost:8081.
  – define a GET route which is simple for test.
  – listen on port 8080 for incoming requests.*/
