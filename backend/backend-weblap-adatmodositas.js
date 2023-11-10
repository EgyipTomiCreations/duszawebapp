var config = require('./backend-config');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: ""
});

var modositottnev = "";
var modositottleiras = "";
var modositottikonbase64 = "";

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

    con.query(`UPDATE weblapadatok SET nev = ${modositottnev}, leiras = ${modositottleiras}, ikonbase64 ${modositottikonbase64} WHERE id = 0;`, function (err, result, fields) {
        if (err) throw err;
            console.log(result[0].id);
            
        });