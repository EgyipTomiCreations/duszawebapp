var config = require('./backend-config');
var mysql = require('mysql');

function csoportmodositas(id, modositottnev, modositotttag1id, modositotttag2id, modositotttag3id, modositottleiras, callback){
  var con = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password
});

con.connect(function (err) {
    if (err) {
      con.end();
      return callback("Sikeretelen kapcsolat az adatbázissal! Hiba: " + err);
    }
  });
  
  con.query(`USE ${config.adatbazisnev}`, function (err) {
    if (err) 
    {
      con.end();
      return callback("Nem sikerült az adatbázis használatba venni! Hiba: "+err);
    }
    
  });

  con.query(`UPDATE csoportok SET nev = "${modositottnev}", tag1id = "${modositotttag1id}", tag2id = "${modositotttag2id}", tag3id = "${modositotttag3id}", leiras = "${modositottleiras}" WHERE id = ${id}`, function (err, result) {
    if (err)
    {
      con.end();
      callback("Hiba a csoport módosítása közben: "+err);
    }
    con.end();
    callback(null, "Sikeres csoport adatmódosítás!")    
});
}

module.exports = csoportmodositas;