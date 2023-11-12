var config = require('./backend-config');
var mysql = require('mysql');

function kitolteslezaras(versenyzoid, ido, valaszok, callback){
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

  var pontszam = 0;
  valaszok.array.forEach(element => {
    if (valaszok.helyes == valaszok.adott) {
        pontszam++;
    }
  });

  con.query(`UPDATE kitoltesek SET zarasiido = "${ido}" valaszok = "${valaszok} teljesitesiido = (${ido} - kezdesiido) pontszam = ${pontszam}" WHERE versenyzoid = ${versenyzoid}`, function (err, result) {
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