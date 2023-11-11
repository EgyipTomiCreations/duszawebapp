var config = require('./backend-config');
var mysql = require('mysql');

function felhasznalomodositas(id, modositottnev, modositottjelszo, modositottszerepkor, modositottevfolyam, modositottosztalyjel, callback){
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

  con.query(`UPDATE felhasznalok SET nev = "${modositottnev}", jelszo = "${modositottjelszo}", szerepkor = "${modositottszerepkor}", evfolyam = "${modositottevfolyam}", osztalyjel = "${modositottosztalyjel}" WHERE id = ${id}`, function (err, result) {
    if (err)
    {
      con.end();
      callback("Hiba a felhasználó módosítása közben: "+err);
    }
    con.end();
    callback(null, "Sikeres felhasználói adatmódosítás!")    
});
}

module.exports = felhasznalomodositas;