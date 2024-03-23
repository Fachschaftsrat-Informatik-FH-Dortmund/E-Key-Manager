const express = require("express");
const ekeyRoutes = require("./src/ekey/routes");
const studentRoutes = require("./src/student/routes")
const ausleihRoutes= require("./src/ausleihe/routes")
const kassenRoutes= require("./src/kasse/routes")
var cors = require('cors')

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.use('/api/v1/ekeys', ekeyRoutes);
app.use('/api/v1/studenten', studentRoutes);
app.use('/api/v1/ausleihen', ausleihRoutes);
app.use('/api/v1/kasse', kassenRoutes);
app.listen(port, () => console.log(`App listening on Port ${port}`));
