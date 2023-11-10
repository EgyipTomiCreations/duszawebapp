var config = require('./backend-config');
var mysql = require('mysql');

var id = "";
var modositottnev = "";
var modositottjelszo = "";
var modositottszerepkor = "";
var modositottevfolyam = "";
var modositottosztalyjel = "";

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

    con.query(`UPDATE felhasznalok SET nev = ${modositottnev}, jelszo = ${modositottjelszo}, szerepkor = ${modositottszerepkor}, evfolyam = ${modositottevfolyam}, osztalyjel = ${modositottosztalyjel} WHERE id = ${id}`, function (err, result, fields) {
        if (err) throw err;
            console.log(result[0].id);
            
        });