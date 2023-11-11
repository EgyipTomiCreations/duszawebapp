var config = require('./backend-config');
var mysql = require('mysql');

function felhasznalolekerdezes(){

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

  con.query("SELECT * FROM felhasznalok;", function (err, result) {
    if (err)
    {
      con.end();
      callback("Hiba a felhasználók lekérése közben!: "+err);
    }
        con.end();
        var adatlista = [{}];
        result.array.forEach(element => {
          var adatobjektum = {};
          adatobjektum.id = element.id;
          adatobjektum.nev = element.nev;
          adatobjektum.jelszo = element.jelszo;
          adatobjektum.szerepkor = element.szerepkor;
          adatobjektum.evfolyam = element.evfolyam;
          adatobjektum.osztalyjel = element.osztalyjel;
          adatlista.push(adatobjektum);
        });
        callback(null,adatlista);
        
    });
}

module.exports = felhasznalolekerdezes;

    

    