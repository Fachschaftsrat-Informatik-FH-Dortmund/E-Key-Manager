// abfragen
const addAusleihe = "INSERT INTO ausleihe( matrnr, ekeyid, beginn, ende, notiz, letzte_rückmeldung, hat_studienbescheinigung) VALUES($1, $2, $3, $4, $5, $6, $7)";
const updateAusleihe = "UPDATE ausleihe SET ekeyid=$2, beginn=$3, ende=$4, notiz=$5, letzte_rückmeldung=$6, hat_studienbescheinigung=$7 WHERE matrnr=$1"

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
