const express = require("express");
const ekeyRoutes = require("./src/ekey/routes");
const studentRoutes = require("./src/student/routes")
const ausleihRoutes= require("./src/ausleihe/routes")
const kassenRoutes= require("./src/kasse/routes")
var cors = require('cors')

const app = express();
const port = 3000;



const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

 async function checkauth (req, res, next)  {
  const idToken = req.headers.authorization; // Assuming the token is sent in the Authorization header
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach the decoded token to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};

app.use(cors());
app.use(checkauth)

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.use('/api/v1/ekeys', ekeyRoutes);
app.use('/studenten', studentRoutes);
app.use('/api/v1/ausleihen', ausleihRoutes);
app.use('/api/v1/kasse', kassenRoutes);
app.listen(port, () => console.log(`App listening on Port ${port}`));
