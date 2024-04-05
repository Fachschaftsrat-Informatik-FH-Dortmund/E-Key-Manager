// abfragen
const getKassenbuchEintrag= "SELECT kassenid, file FROM kassenbuch"
const createKassenbuchEintrag ="INSERT into kassenbuch (file) VALUES ($1)"

module.exports = {
  getKassenbuchEintrag,
  createKassenbuchEintrag
}
