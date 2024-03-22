// abfragen
const addAusleihe = "INSERT INTO ausleihe( matrnr, ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung) VALUES($1, $2, $3, $4, $5, $6, $7)";
const updateAusleihe = "UPDATE ausleihe SET ende=$2, notiz=$3, letzte_rückmeldung=$4, hat_studienbescheinigung=$5 WHERE ausleihnr=$1"

const getAusleihen = (ask,nuraktive) =>{
  let query = "SELECT * FROM ausleihe";

  let poss =["ausleihnr","matrnr","ekeyid"]
  if (poss.includes(ask)){
    query+=" WHERE " + ask + " = $1"
    if(nuraktive){
      query+=" AND ende ISNULL"
    }
  }else{
    if(nuraktive){
      query+=" WHERE ende ISNULL"
    }
  }


  return query;
}

module.exports = {
  getAusleihen,
  addAusleihe,
  updateAusleihe
}
