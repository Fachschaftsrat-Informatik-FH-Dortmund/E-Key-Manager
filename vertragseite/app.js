const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.set("views", "./");

app.use(express.static("./"));

app.use(function(req, res, next) {
  res.status(200).render("index",{vorname:req.query.vorname,name:req.query.name, matnr: req.query.matnr,email:req.query.email,keyid:req.query.keyid})
})



app.listen(4000, function() {
  console.log("Moin, ich bin der Server und lausche auf http://localhost:4000");
});
