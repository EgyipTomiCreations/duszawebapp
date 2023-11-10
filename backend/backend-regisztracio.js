var config = require('./backend-config');
var adatbazisnev = "test";

var regisztraciosnev = "tesztecske";
var regisztraciosjelszo = "asdf";
var regisztraciosszerepkor = "Tanár";
var regisztraciosevfolyam = "";
var reisztraciososztalyjel = "";
var hibauzenet = "";

var mysql = require('mysql');

var con = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password
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

con.query(`SELECT nev FROM felhasznalok WHERE nev = "${regisztraciosnev}";`, function (err, result, fields) {
    if (err) throw err;
    if (result[0].nev == regisztraciosnev)
    {
        hibauzenet = "Már létezik ilyen felhasználó!";
    }
    else
    {
        con.query(`INSERT INTO felhasznalok (nev, jelszo, szerepkor, evfolyam, osztalyjel) VALUES ("${regisztraciosnev}", "${regisztraciosjelszo}", "${regisztraciosszerepkor}", "${regisztraciosevfolyam}", "${reisztraciososztalyjel}")`, function (err, result) {
            if (err) throw err;
            console.log("Siker!!!");
          });
    }
        
});




