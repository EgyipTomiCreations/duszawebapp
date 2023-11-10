var bejelentkezesinev = "tesztecske";
var bejelentkezesijelszo = "asdf";
var hibauzenet = "";
var bejelentkezes_sikeres = false;

var nev = "";
var szerepkor = "";
var osztaly = "";
var id = 0;

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
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

con.query("USE test", function (err) {
    if (err) throw err;
    });

    con.query(`SELECT nev FROM felhasznalok WHERE nev = "${bejelentkezesinev}";`, function (err, result, fields) {
        if (err) throw err;

        if (result[0].nev == bejelentkezesinev) 
            con.query(`SELECT * FROM felhasznalok WHERE jelszo = "${bejelentkezesijelszo}" AND nev = "${bejelentkezesinev}";`, function (err, result, fields) {
                if (err) throw err;           
                 if (result[0].jelszo == bejelentkezesijelszo)
                 {
                    nev = result[0].nev;
                    szerepkor = result[0].szerepkor;
                    osztaly = result[0].evfolyam + "." + result[0].osztalyjel;
                    id = result[0].id;
                    bejelentkezes_sikeres = true;
                    if(osztaly = "0.") osztaly = null;

                    console.log(osztaly)
                 }
                else
                hibauzenet = "Nem megfelelő jelszó!";
    
            });
        else
            hibauzenet = "Nem létezik felhasználó ilyen névvel!";

        });