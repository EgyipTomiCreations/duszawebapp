var config = require('./backend-config');
var mysql = require('mysql');

var nev = "";
var leiras = "";
var ikonbase64 = "";

var con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: ""
});

con.connect(function(err) {
    if (err) 
    {
      hibauzenet = "Sikeretelen kapcsolat az adatbázissal! Hiba: "+err;
      throw err;
    }
    console.log("Sikeres adatbázis csatlakozás!");
  });

con.query(`USE ${config.adatbazisnev}`, function (err) {
    if (err) throw err;
    });

    con.query("SELECT nev, leiras, ikonbase64 FROM weblapadatok;", function (err, result) {
        if (err) throw err;
            nev = result[0].nev;
            leiras = result[0].leiras;
            ikonbase64 = result[0].ikonbase64;
            
        });