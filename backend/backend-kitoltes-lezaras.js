var config = require('./backend-config');
var mysql = require('mysql');

function kitolteslezaras(versenyzoid, ido, callback){
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

  con.query(`UPDATE kitoltesek SET zarasiido = "${ido}" WHERE versenyzoid = ${versenyzoid}`, function (err, result) {
    if (err)
    {
      con.end();
      callback("Hiba a felhasználó módosítása közben: "+err);
    }
    con.end();
    callback(null, "Sikeres kitoltés lezárás");    
});
}

module.exports = kitolteslezaras;