const express = require("express");
const ekeyRoutes = require("./src/ekey/routes");
var cors = require('cors')

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.use('/api/v1/ekeys', ekeyRoutes);
app.listen(port, () => console.log(`App listening on Port ${port}`));